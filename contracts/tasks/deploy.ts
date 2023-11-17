import { task, types } from "hardhat/config"
import { poseidonContract } from "circomlibjs"

task("deploy", "Deploy contracts")
    .addOptionalParam("logs", "Print the logs", true, types.boolean)
    .setAction(async ({ logs}, 
        { ethers, run }) => {
        const { competitionProtocol } = await run("deploy:competitionProtocol", {
            logs
        })
        const { semaphoreVoting, pairingAddress, semaphoreVerifierAddress, 
            poseidonAddress, incrementalBinaryTreeAddress } = await run("deploy:voting", {
                logs
        })

        const {baloot} = await run("deploy:secretBallot", {semaphoreVoting:await semaphoreVoting.getAddress(),
            logs: logs
        })


        return {competitionProtocol,semaphoreVoting,semaphoreVerifierAddress, baloot}
    });