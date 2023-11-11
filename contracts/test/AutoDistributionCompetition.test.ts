import { ethers, run } from "hardhat"
// @ts-ignore: typechain folder will be generated after contracts compilation
import { AutoDistributionCompetition, Ticket20, Reward20 } from "../build/typechain"
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers"
import { config } from "../package.json"

describe("SecretBallot", () => {
    let autoCompetition: AutoDistributionCompetition
    let ticket: Ticket20
    let reward: Reward20
    let singer: HardhatEthersSigner

    before(async () => {
        [singer] = await ethers.getSigners();

        autoCompetition = await run("deploy:autoDistribution", {
            logs: false
        })
        const result = await run("deploy:erc20", {
            logs: false
        })
        ticket = result.tikcet;
        reward = result.reward;
    })
})