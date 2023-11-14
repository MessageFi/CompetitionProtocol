import { Group } from "@semaphore-protocol/group"
import { Identity } from "@semaphore-protocol/identity"
import { generateProof } from "@semaphore-protocol/proof"
import { ethers, run } from "hardhat"
// @ts-ignore: typechain folder will be generated after contracts compilation
import { GasslessSecretBallot, SemaphoreVoting } from "../build/typechain"
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers"
import { TypedDataDomain, TypedDataField, TypedDataEncoder } from "ethers"
import { config } from "../package.json"

describe("GasslessBallot", () => {
    let gasslessBallot: GasslessSecretBallot
    let votingContract: SemaphoreVoting
    const voters = ["0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"]
    const options = [1, 2]
    let singer: HardhatEthersSigner
    const users: Identity[] = []
    let group: Group
    const ballotId = 1;
    const SIGNATURE_VOTING = ethers.keccak256(
        Buffer.from("castVoteBySignature(uint32 option,uint256 nullifierHash,uint256 ballotId,uint256[8] proof)")
    );
    const networkId = 1337;

    before(async () => {
        [singer] = await ethers.getSigners();

        const { semaphoreVoting } = await run("deploy:voting", {
            logs: false
        })
        votingContract = semaphoreVoting

        gasslessBallot = await run("deploy:gasslessBallot", { logs: false, semaphoreVoting: await semaphoreVoting.getAddress() })

        users.push(new Identity())
        users.push(new Identity())

    })

    describe("# create ballot", () => {
        it("Should create a ballot", async () => {
            await expect(gasslessBallot.createBallot(options, voters))
            .to.emit(gasslessBallot, "BallotCreated")
            .withArgs(ballotId, singer.address, options, voters)
            group = new Group(ballotId)
        })
    })

    describe("# register commitment", () => {
        it("Should register a commitment", async () => {
            await expect(gasslessBallot.registerCommitment(1, users[0].commitment))
            .to.emit(gasslessBallot, "VoterRegistered")
            .withArgs(ballotId, singer.address);
            group.addMember(users[0].commitment)
        })
    })

    describe("# cast vote with random signer", () => {
        const wasmFilePath = `${config.paths.build["snark-artifacts"]}/semaphore.wasm`
        const zkeyFilePath = `${config.paths.build["snark-artifacts"]}/semaphore.zkey`
        const option = options[1];

        it("Should cast vote with proof", async () => {
            
            await expect(gasslessBallot.startBallot(ballotId, 60))
            .to.emit(gasslessBallot, "BallotStarted")
            
            const fullProof = await generateProof(users[0], group, group.id, option, {
                wasmFilePath,
                zkeyFilePath
            })

            const signers = await ethers.getSigners()

            // typed data
            const typedMessage = {
                domain: {
                  name: 'GasslessSecretBallot',
                  version: '1',
                  chainId: networkId, 
                  verifyingContract: await gasslessBallot.getAddress()
                },
                message: {
                    option: option,
                    nullifierHash: fullProof.nullifierHash,
                    ballotId: ballotId,
                    proof: fullProof.proof
                },
                primaryType: "castVoteBySignature",
                types: {
                    castVoteBySignature: [
                        { name: "option", type: "uint32" },
                        { name: "nullifierHash", type: "uint256" },
                        { name: "ballotId", type: "uint256" },
                        { name: "proof", type: "uint256[8]" },
                    ]
                }
              }

            const randomSigner = ethers.Wallet.createRandom()

            const signature = await randomSigner.signTypedData(typedMessage.domain, typedMessage.types, typedMessage.message)

            await expect(gasslessBallot.connect(signers[1]).castVoteBySignature(
                randomSigner.address,
                option,
                fullProof.nullifierHash,
                ballotId,
                fullProof.proof,
                signature
            )).to.emit(gasslessBallot, "Vote").withArgs(ballotId, option);
        })
    })
})
