//SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

/// @title ISimpleSecretBallot contract interface.
interface ISimpleSecretBallot {
    error CallerIsNotTheHost();
    error InvalidParams();
    error InvalidTime();
    error CallerIsNotVoter();
    error VoterAllreadyRegistered();
    error BallotWasStarted();
    error BallotIsOnGoing();
    error BallotIsNotOnGoing();
    
    /// @dev Emitted when a new ballot is created.
    /// @param ballotId: Id of the ballot.
    /// @param host: host of the ballot.
    /// @param options: options of the ballot.
    /// @param voters: voters of the ballot.
    event BallotCreated(uint256 ballotId, address indexed host, uint32[] options, address[] voters);

    /// @dev Emitted when a new voter is added.
    /// @param ballotId: Id of the ballot.
    /// @param voter: new voter.
    event VoterAdded(uint256 ballotId, address voter);

    /// @dev Emitted when the voter is removed.
    /// @param ballotId: Id of the ballot.
    /// @param voter: removed voter.
    event VoterRemoved(uint256 ballotId, address voter);

    /// @dev Emitted when the voter register identity commitment.
    /// @param ballotId: Id of the ballot.
    /// @param voter: removed voter.
    event VoterRegistered(uint256 ballotId, address voter);

    /// @dev Emitted when a new option is added.
    /// @param ballotId: Id of the ballot.
    /// @param option: new option.
    event OptionAdded(uint256 ballotId, uint32 option);

    /// @dev Emitted when the option is removed.
    /// @param ballotId: Id of the ballot.
    /// @param option: removed option.
    event OptionRemoved(uint256 ballotId, uint32 option);

    /// @dev Emitted when the ballot start.
    /// @param ballotId: Id of the ballot.
    /// @param endtime: endtime of the ballot.
    event BallotStarted(uint256 ballotId, uint256 endtime);

    /// @dev Emitted when the ballot end.
    /// @param ballotId: Id of the ballot.
    event BallotEnded(uint256 ballotId);

    /// @dev Emitted when cast vote.
    /// @param ballotId: Id of the ballot.
    event Vote(uint256 ballotId, uint32 option);

    struct Option {
        bool valid;
        uint32 tickets;
    }

    struct Voter {
        bool valid;
        bool registered;
    }

    struct Ballot {
        address host;
        uint256 endtime;
        mapping (address => Voter) voters;
        mapping (uint32 => Option) options;
    }
    
    function createBallot(uint32[] memory options,
     address[] memory voters) external;

    function addVoter(uint256 ballotId, address voter) external;

    function removeVoter(uint256 ballotId, address voter) external;

    function addOption(uint256 ballotId, uint32 option) external;

    function removeOption(uint256 ballotId, uint32 option) external;

    function registerCommitment(uint256 ballotId, uint256 identityCommitment) external;

    function startBallot(uint256 ballotId, uint256 duration) external;

    function endBallot(uint256 ballotId) external;

    /// @dev Casts an anonymous vote in a ballot.
    /// @param option: The option.
    /// @param nullifierHash: Nullifier hash.
    /// @param ballotId: Id of the ballot.
    /// @param proof: Private zk-proof parameters.
    function castVote(uint32 option, uint256 nullifierHash, uint256 ballotId, uint256[8] calldata proof) external;

}