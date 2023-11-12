import {
    time,
  } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { ethers, run } from "hardhat"
// @ts-ignore: typechain folder will be generated after contracts compilation
import { AutoDistributionCompetition, Ticket20, Reward20 } from "../build/typechain"
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";

describe("AutoDistributionCompetition", () => {
    let autoCompetition: AutoDistributionCompetition
    let ticket: Ticket20
    let reward: Reward20
    const rewards = [10000, 5000]
    const competitionId = 1;
    const candidates = [1, 2]

    before(async () => {
        let result = await run("deploy:autoDistribution", {
            logs: false
        })
        autoCompetition = result["autoCompetition"]
        result = await run("deploy:erc20", {
            logs: false
        })
        ticket = result["ticket"];
        reward = result["reward"];
    })

    describe("# host competition", () => {
        it("Should create a competition", async () => {
            const competitionAddress = await autoCompetition.getAddress();

            await ticket.approve(competitionAddress, 1e9);
            await reward.approve(competitionAddress, 1e9);
            const endTime = await time.latest() + 5;
            const [singer] = await ethers.getSigners();
            await expect(autoCompetition.create(await ticket.getAddress(), 
                await reward.getAddress(), rewards, 0, endTime))
                .to.emit(autoCompetition, "NewCompetition")
            .withArgs(competitionId, singer.address)
        })

        it("Should add a candidate", async () => {

            const signers = await ethers.getSigners()
            for (let index = 0; index < candidates.length; index++) {
                const candidate = candidates[index];
                const player = signers[index].address;
                await expect(autoCompetition.registerCandidate(competitionId, 
                    player))
                    .to.emit(autoCompetition, "NewCandidate")
                    .withArgs(competitionId, candidate, player)
            }
            
        })

        it("Should send tickets", async () => {
            const [singer] = await ethers.getSigners();
            for (let index = 0; index < candidates.length; index++) {
                const candidate = candidates[index];
                await expect(autoCompetition.vote(competitionId, 
                    candidate, 10 + index))
                    .to.emit(autoCompetition, "Vote")
                    .withArgs(competitionId, candidate, singer.address, 10 + index)
            }
            
        })
    })

    describe("# auto finish competition", () => {
        
    })
})