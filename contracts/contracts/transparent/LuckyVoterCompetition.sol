// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "./AutoDistributionCompetition.sol";
import "@chainlink/contracts/src/v0.8/automation/AutomationCompatible.sol";
import "@chainlink/contracts/src/v0.8/interfaces/VRFCoordinatorV2Interface.sol";
import "@chainlink/contracts/src/v0.8/vrf/VRFConsumerBaseV2.sol";

/**
 * @title LuckyVoterCompetition
 * @author Evan
 * @notice LuckyVoterCompetition is base AutoDistributionCompetition, in this contract, lucky voters will get sepecial prizes after a competition finished.
 *  Using chainlink VRF to generate the lucky dog.
 */
contract LuckyVoterCompetition is AutoDistributionCompetition, VRFConsumerBaseV2{

    error LuckyPrizesAlreadyPut();
    error InvalidParams();

    event PuttingLuckyPrizes(uint256 id, uint256[] prizes);
    event SendPrizeToLuckyVoter(uint256 id, address voter, uint256 prize);
    
    mapping (uint256 => address[]) internal voters;
    mapping (uint256 => uint256[]) public luckyPrizes;

    mapping (uint256 => uint256[]) internal vrfRequests;

    //dev: chanlink configure

    VRFCoordinatorV2Interface private COORDINATOR;
    //subscription ID.
    uint64 private subscriptionId;
    bytes32 private keyHash;

    constructor(uint64 _subscriptionId, address _vrfCoordinator,  bytes32 _keyHash) VRFConsumerBaseV2(_vrfCoordinator){
        COORDINATOR = VRFCoordinatorV2Interface(_vrfCoordinator);
        subscriptionId = _subscriptionId;
        keyHash = _keyHash;
    }

    /**
     * @dev Deposit prizes of lucky voters
     * 
     */
    function putLuckyPrizes(uint256 id, uint256[] calldata prizes) external onlyHost(competitionMapping[id]){
        if(competitionMapping[id].endTime < block.timestamp){
            revert CompetitionEnded();
        }
        if(luckyPrizes[id].length != 0){
            revert LuckyPrizesAlreadyPut();
        }
        uint256 total = _totalRewards(prizes);
        SafeERC20.safeTransferFrom(competitionMapping[id].rewardCoin
        ,_msgSender(), address(this), total);

        luckyPrizes[id] = prizes;

        emit PuttingLuckyPrizes(id, prizes);
    }

    function vote(
        uint256 id,
        uint256 candidate,
        uint256 tickets
    ) external override virtual nonReentrant ongoing(competitionMapping[id]) {
        _vote( id, candidate, tickets);
        voters[id].push(_msgSender());
    }

    function performUpkeep(bytes calldata performData) external virtual override{
        uint256[10] memory finishedCompetitions = abi.decode(performData, (uint256[10]));
        if(finishedCompetitions[0] == 0){
            revert InvalidParams();
        }
        for (uint i = 0; i < finishedCompetitions.length; ++i) {
            if(finishedCompetitions[i] == 0){
                break;
            }
            // Update check index
            if(finishedCompetitions[i] == checkIndex + 1){
                checkIndex++;
            }
            _withdrawPrize(finishedCompetitions[i]);
        }
        uint256 requestId = requestRandomWords(uint32(finishedCompetitions.length));
        vrfRequests[requestId] = finishedCompetitions;
    }

    

    /**
     *@dev Request random words to VRF Coordinator
     */
    function requestRandomWords(uint32 numWords) internal returns(uint256){
        // Will revert if subscription is not set and funded.
        return COORDINATOR.requestRandomWords(
        keyHash,
        subscriptionId,
        3, // requestConfirmations The default is 3, but you can set this higher.
        1e6, // callbackGasLimit
        numWords
        );
    }

    /**
     *@dev Callback function used by VRF Coordinator
     */
    function fulfillRandomWords(uint256 requestId, uint256[] memory randomWords) internal override {
        uint256[] memory finishedCompetitions = vrfRequests[requestId];
        for (uint i = 0; i < finishedCompetitions.length; ++i) {
            uint competition = finishedCompetitions[i];
            if(competition == 0) break;
            uint seed = randomWords[i];
            uint voterNumber = voters[competition].length;
            for (uint j = 0; j < luckyPrizes[competition].length; ++j) {
                address luckyVoter = voters[competition][createRandom(voterNumber, seed)];
                SafeERC20.safeTransfer(competitionMapping[competition].rewardCoin, luckyVoter, luckyPrizes[competition][j]);
                emit SendPrizeToLuckyVoter(competition, luckyVoter, luckyPrizes[competition][j]);
                ++seed;
            }
        }
    }

    /**
     * @dev Create a random number.
     */
    function createRandom(uint256 max, uint256 seed) internal pure returns (uint256)
    { 
        return uint(keccak256(abi.encodePacked(seed))) % max;
    }

}