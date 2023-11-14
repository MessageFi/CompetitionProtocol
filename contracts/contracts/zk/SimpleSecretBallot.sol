//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Context.sol";
import "./interfaces/ISemaphoreVoting.sol";
import "./interfaces/ISimpleSecretBallot.sol";

contract SimpleSecretBallot is ISimpleSecretBallot, Context{

    ISemaphoreVoting public voting;

    /// @dev Gets a ballot id returns the ballot data.
    mapping (uint256 => Ballot) public ballots;

    /// @dev Checks if the host is the transaction sender.
    /// @param ballotId: Id of the ballot.
    modifier onlyHost(uint256 ballotId) {
        if (ballots[ballotId].host != _msgSender()) {
            revert CallerIsNotTheHost();
        }
        _;
    }

    /// @dev Checks if the ballot is not started.
    /// @param ballotId: Id of the ballot.
    modifier notStarted(uint256 ballotId) {
        if (voting.pollState(ballotId) != ISemaphoreVoting.PollState.Created) {
            revert BallotWasStarted();
        }
        _;
    }

    /// @dev Initializes the Semaphore Voting used to do vote by the user's ZK proofs.
    /// @param _voting: Semaphore Voting address.
    constructor(ISemaphoreVoting _voting) {
        voting = _voting;
    }

    /// @dev See {ISimpleSecretBallot-createBallot}.
    function createBallot(uint32[] memory options,
     address[] memory voters) public virtual override{
        if(options.length == 0){
            revert InvalidParams();
        }
        
        uint256 id = voting.createPoll(address(this), 20);
        Ballot storage ballot = ballots[id];
        ballot.host = _msgSender();
        for (uint i = 0; i < options.length; i++) {
            ballot.options[options[i]].valid = true;
        }
        for (uint i = 0; i < voters.length; i++) {
            ballot.voters[voters[i]].valid = true;
        }
        emit BallotCreated(id, _msgSender(), options, voters);
    }

    /// @dev See {ISimpleSecretBallot-addVoter}.
    function addVoter(uint256 ballotId, address voter) public virtual override
     onlyHost(ballotId) notStarted(ballotId){
        ballots[ballotId].voters[voter].valid = true;
        emit VoterAdded(ballotId, voter);
    }

    /// @dev See {ISimpleSecretBallot-removeVoter}.
    function removeVoter(uint256 ballotId, address voter) public virtual override
     onlyHost(ballotId) notStarted(ballotId){
        delete ballots[ballotId].voters[voter];
        emit VoterRemoved(ballotId, voter);
    }

    /// @dev See {ISimpleSecretBallot-addOption}.
    function addOption(uint256 ballotId, uint32 option) public virtual override
     onlyHost(ballotId) notStarted(ballotId){
        ballots[ballotId].options[option].valid = true;
        emit OptionAdded(ballotId, option);
    }

    /// @dev See {ISimpleSecretBallot-removeOption}.
    function removeOption(uint256 ballotId, uint32 option) public virtual override
     onlyHost(ballotId) notStarted(ballotId){
        delete ballots[ballotId].options[option];
        emit OptionRemoved(ballotId, option);
    }

    /// @dev See {ISimpleSecretBallot-registerCommitment}.
    function registerCommitment(uint256 ballotId, uint256 identityCommitment) public virtual override{
        if (!ballots[ballotId].voters[_msgSender()].valid) {
            revert CallerIsNotVoter();
        }
        if (ballots[ballotId].voters[_msgSender()].registered) {
            revert VoterAllreadyRegistered();
        }
        ballots[ballotId].voters[_msgSender()].registered = true;

        voting.addVoter(ballotId, identityCommitment);
        emit VoterRegistered(ballotId, _msgSender());
    }

    /// @dev See {ISimpleSecretBallot-startBallot}.
    function startBallot(uint256 ballotId, uint256 duration) public virtual override
     onlyHost(ballotId) {
        if (duration == 0) {
            revert InvalidTime();
        }
        uint endtime = block.timestamp + duration;
        ballots[ballotId].endtime = endtime;
        voting.startPoll(ballotId, 0);

        emit BallotStarted(ballotId, endtime);
    }

    /// @dev See {ISimpleSecretBallot-endBallot}.
    function endBallot(uint256 ballotId) public virtual override {
        if (ballots[ballotId].endtime > block.timestamp) {
            revert BallotIsOnGoing();
        }
        voting.endPoll(ballotId, 0);

        emit BallotEnded(ballotId);
    }

    function castVote(uint32 option, uint256 nullifierHash,
     uint256 ballotId, uint256[8] calldata proof) public virtual override {
        _vote(option, nullifierHash, ballotId, proof);
     }

     function _vote(uint32 option, uint256 nullifierHash,
     uint256 ballotId, uint256[8] calldata proof) internal{
        if (voting.pollState(ballotId) != ISemaphoreVoting.PollState.Ongoing 
            || ballots[ballotId].endtime <= block.timestamp) {
            revert BallotIsNotOnGoing();
        }
        if (!ballots[ballotId].options[option].valid) {
            revert InvalidParams();
        }
        ballots[ballotId].options[option].tickets++;
        voting.castVote(option, nullifierHash, ballotId, proof);

        emit Vote(ballotId, option);
     }
}
