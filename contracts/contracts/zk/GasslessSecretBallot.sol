//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./SimpleSecretBallot.sol";
import "@openzeppelin/contracts/utils/cryptography/draft-EIP712.sol";
import "@openzeppelin/contracts/utils/cryptography/SignatureChecker.sol";

contract GasslessSecretBallot is SimpleSecretBallot, EIP712{

    error InvalidSignature();

    error AbandonedMethod();

    bytes32 internal constant SIGNATURE_VOTING = keccak256(
            "castVoteBySignature(uint32 option,uint256 nullifierHash,uint256 ballotId,uint256[8] proof)"
        );
    
    /// @dev Initializes the Semaphore Voting used to do vote by the user's ZK proofs.
    /// @param _voting: Semaphore Voting address.
    constructor(ISemaphoreVoting _voting)
     SimpleSecretBallot(_voting) EIP712("GasslessSecretBallot", "1"){
    }

    function castVoteBySignature(address signer, uint32 option, uint256 nullifierHash,
     uint256 ballotId, uint256[8] calldata proof, bytes memory signature) external{
        bytes32 digest = keccak256(abi.encode
        (SIGNATURE_VOTING, option, nullifierHash, ballotId, keccak256(abi.encode(proof)))
        );
        digest = keccak256(abi.encodePacked("\x19\x01", _domainSeparatorV4(), digest));
        
        if(SignatureChecker.isValidSignatureNow(signer, digest, signature)){
            _vote(option, nullifierHash, ballotId, proof);
        }else {
            revert InvalidSignature();
        }
    }

    function castVote(uint32, uint256,
     uint256, uint256[8] calldata) public pure override{
        revert AbandonedMethod();
    }

    function _splitSignature(bytes memory signature) internal pure returns (bytes32 r, bytes32 s, uint8 v) {
        require(signature.length == 65, "InvalidSignature"); 

        assembly {
            r := mload(add(signature, 0x20))
            s := mload(add(signature, 0x40))
            v := byte(0, mload(add(signature, 0x60)))
        }
    }

}

