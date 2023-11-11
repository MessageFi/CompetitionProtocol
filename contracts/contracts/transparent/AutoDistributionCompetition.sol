// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "./DefaultCompetition.sol";
import "hardhat/console.sol";
import "@chainlink/contracts/src/v0.8/automation/AutomationCompatible.sol";

contract AutoDistributionCompetition is DefaultCompetition, AutomationCompatible{

    uint256 checkIndex = 1;

    function checkUpkeep(
        bytes calldata /* checkData */
    )
        external
        view
        override
        returns (bool upkeepNeeded, bytes memory performData)
    {
        uint256[10] memory finishedCompetitions;
        uint count = 0;
        // search finished competitions
        for (uint i = 0; i < 100; ++i) {
            if (competitionMapping[i + checkIndex].endTime <= block.timestamp) {
                finishedCompetitions[count] = i + checkIndex;
                ++count;
            }
            if(count == 10){
                break;
            }
        }
        if(finishedCompetitions[0] > 0){
            upkeepNeeded = true;
            performData = abi.encode(finishedCompetitions);
        }

    }

    function performUpkeep(bytes calldata performData) external override {
        uint256[10] memory finishedCompetitions = abi.decode(performData, (uint256[10]));
        for (uint i = 0; i < finishedCompetitions.length; ++i) {
            if(finishedCompetitions[i] == 0){
                break;
            }
            // Update check index
            if(finishedCompetitions[i] == checkIndex){
                checkIndex++;
            }
            _withdrawPrize(finishedCompetitions[i]);
        }
    }

    function _withdrawPrize(
        uint256 id
    ) internal nonReentrant {
        Structs.Competition memory competition = competitionMapping[id];
        if (block.timestamp <= competition.endTime) {
            revert CompetitionNotEnd();
        }
        for (uint i = 0; i < competition.winners.length; ++i) {
            if(competition.winners[i] == 0){
                break;
            }
            if(!rewardIsWithdraw[id][competition.winners[i]]){
                rewardIsWithdraw[id][competition.winners[i]] = true;
                address player = candidateMapping[id][competition.winners[i]].player;
                SafeERC20.safeTransfer(competition.rewardCoin,
                 player, competition.rewards[i]);

                emit WithdrawByPlayer(id, competition.winners[i], player, competition.rewards[i], 0);
            }
        }
    }
}