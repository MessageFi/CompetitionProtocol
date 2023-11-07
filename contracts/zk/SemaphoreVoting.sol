//SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

import "@semaphore-protocol/contracts/interfaces/ISemaphoreVerifier.sol";
import "@semaphore-protocol/contracts/base/SemaphoreGroups.sol";
import "./interfaces/ISemaphoreVoting.sol";

/// @title Semaphore voting contract.
/// @notice It allows users to vote anonymously in a poll.
/// @dev The following code allows you to create polls, add voters and allow them to vote anonymously.
contract SemaphoreVoting is ISemaphoreVoting, SemaphoreGroups {
    ISemaphoreVerifier public verifier;

    uint256 public totalPoll;

    /// @dev Gets a poll id and returns the poll data.
    mapping(uint256 => Poll) internal polls;

    /// @dev Checks if the poll coordinator is the transaction sender.
    /// @param pollId: Id of the poll.
    modifier onlyCoordinator(uint256 pollId) {
        if (polls[pollId].coordinator != _msgSender()) {
            revert Semaphore__CallerIsNotThePollCoordinator();
        }

        _;
    }

    /// @dev Initializes the Semaphore verifier used to verify the user's ZK proofs.
    /// @param _verifier: Semaphore verifier address.
    constructor(ISemaphoreVerifier _verifier) {
        verifier = _verifier;
    }

    /// @dev See {ISemaphoreVoting-pollState}.
    function pollState(uint256 pollId) public view override returns(PollState){
        return polls[pollId].state;
    }

    /// @dev See {ISemaphoreVoting-createPoll}.
    function createPoll(address coordinator, uint256 merkleTreeDepth) public override returns(uint256){
        if (merkleTreeDepth < 16 || merkleTreeDepth > 32) {
            revert Semaphore__MerkleTreeDepthIsNotSupported();
        }
        totalPoll++;
        _createGroup(totalPoll, merkleTreeDepth);

        polls[totalPoll].coordinator = coordinator;

        emit PollCreated(totalPoll, coordinator);
        return totalPoll;
    }

    /// @dev See {ISemaphoreVoting-addVoter}.
    function addVoter(uint256 pollId, uint256 identityCommitment) public override onlyCoordinator(pollId) {
        if (polls[pollId].state != PollState.Created) {
            revert Semaphore__PollHasAlreadyBeenStarted();
        }

        _addMember(pollId, identityCommitment);
    }

    /// @dev See {ISemaphoreVoting-addVoter}.
    function startPoll(uint256 pollId, uint256 encryptionKey) public override onlyCoordinator(pollId) {
        if (polls[pollId].state != PollState.Created) {
            revert Semaphore__PollHasAlreadyBeenStarted();
        }

        polls[pollId].state = PollState.Ongoing;

        emit PollStarted(pollId, _msgSender(), encryptionKey);
    }

    /// @dev See {ISemaphoreVoting-castVote}.
    function castVote(uint256 vote, uint256 nullifierHash, uint256 pollId, uint256[8] calldata proof) public override {
        if (polls[pollId].state != PollState.Ongoing) {
            revert Semaphore__PollIsNotOngoing();
        }

        if (polls[pollId].nullifierHashes[nullifierHash]) {
            revert Semaphore__YouAreUsingTheSameNillifierTwice();
        }

        uint256 merkleTreeDepth = getMerkleTreeDepth(pollId);
        uint256 merkleTreeRoot = getMerkleTreeRoot(pollId);

        verifier.verifyProof(merkleTreeRoot, nullifierHash, vote, pollId, proof, merkleTreeDepth);

        polls[pollId].nullifierHashes[nullifierHash] = true;

        emit VoteAdded(pollId, vote);
    }

    /// @dev See {ISemaphoreVoting-publishDecryptionKey}.
    function endPoll(uint256 pollId, uint256 decryptionKey) public override onlyCoordinator(pollId) {
        if (polls[pollId].state != PollState.Ongoing) {
            revert Semaphore__PollIsNotOngoing();
        }

        polls[pollId].state = PollState.Ended;

        emit PollEnded(pollId, _msgSender(), decryptionKey);
    }
}
