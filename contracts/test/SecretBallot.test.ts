import { Group } from "@semaphore-protocol/group"
import { Identity } from "@semaphore-protocol/identity"
import { generateProof } from "@semaphore-protocol/proof"
import { ethers, run } from "hardhat"
import { encodeBytes32String } from "ethers"
// @ts-ignore: typechain folder will be generated after contracts compilation
import { SimpleSecretBallot, SemaphoreVoting } from "../build/typechain"
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers"
import { config } from "../package.json"

describe("SecretBallot", () => {
    let ballotContract: SimpleSecretBallot
    let votingContract: SemaphoreVoting
    const voters = ["0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"]
    const options = [1, 2]
    let singer: HardhatEthersSigner
    const users: Identity[] = []
    let group: Group
    const ballotId = 1;

    before(async () => {
        [singer] = await ethers.getSigners();

        const { semaphoreVoting } = await run("deploy:voting", {
            logs: false
        })
        votingContract = semaphoreVoting

        ballotContract = await run("deploy:secretBallot", { logs: false, semaphoreVoting: await semaphoreVoting.getAddress() })

        users.push(new Identity())
        users.push(new Identity())
    })

    describe("# create ballot", () => {
        it("Should create a ballot", async () => {
            await expect(ballotContract.createBallot(options, voters))
            .to.emit(ballotContract, "BallotCreated")
            .withArgs(ballotId, singer.address, options, voters)
            group = new Group(ballotId)
        })
    })

    describe("# register commitment", () => {
        it("Should register a commitment", async () => {
            await expect(ballotContract.registerCommitment(1, users[0].commitment))
            .to.emit(ballotContract, "VoterRegistered")
            .withArgs(ballotId, singer.address);
            group.addMember(users[0].commitment)
        })

        it("Should revert VoterAllreadyRegistered", async () => {
            await expect(ballotContract.registerCommitment(1, users[1].commitment))
            .to.revertedWithCustomError(ballotContract, "VoterAllreadyRegistered");
        })
    })

    describe("# cast vote with random signer", () => {
        const wasmFilePath = `${config.paths.build["snark-artifacts"]}/semaphore.wasm`
        const zkeyFilePath = `${config.paths.build["snark-artifacts"]}/semaphore.zkey`
        const option = options[1];

        it("Should revert BallotIsNotOnGoing", async () => {
            
            const fullProof = await generateProof(users[0], group, group.id, option, {
                wasmFilePath,
                zkeyFilePath
            })

            const transaction = ballotContract.castVote(
                option,
                fullProof.nullifierHash,
                ballotId,
                fullProof.proof
            )

            await expect(transaction).to.revertedWithCustomError(ballotContract, "BallotIsNotOnGoing");
        })

        it("Should cast vote with proof", async () => {

            await expect(ballotContract.startBallot(ballotId, 60))
            .to.emit(ballotContract, "BallotStarted")
            
            const fullProof = await generateProof(users[0], group, group.id, option, {
                wasmFilePath,
                zkeyFilePath
            })
            const signers = await ethers.getSigners()

            const transaction = ballotContract.connect(signers[1]).castVote(
                option,
                fullProof.nullifierHash,
                ballotId,
                fullProof.proof
            )

            await expect(transaction).to.emit(ballotContract, "Vote").withArgs(ballotId, option);
        })
    })
})
