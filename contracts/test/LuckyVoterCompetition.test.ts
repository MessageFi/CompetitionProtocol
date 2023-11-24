import {
    time,
  } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { ethers, run } from "hardhat"
// @ts-ignore: typechain folder will be generated after contracts compilation
import { LuckyVoterCompetition, Ticket20, Reward20 } from "../build/typechain"
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { any } from "hardhat/internal/core/params/argumentTypes";

describe("LuckyVoterCompetition", () => {
    let luckyVoterCompetition: LuckyVoterCompetition
    let ticket: Ticket20
    let reward: Reward20
    const rewards = [10000, 5000]
    const competitionId = 1
    const candidates = [1, 2]
    const voterPrizes = [2000, 1000]

    before(async () => {
        let result = await run("deploy:luckyCompetition", {
            logs: false
        })
        luckyVoterCompetition = result["luckyCompetition"]
        result = await run("deploy:erc20", {
            logs: false
        })
        ticket = result["ticket"];
        reward = result["reward"];
    })

    async function waitSecond(time: number): Promise<void> {
        return new Promise(resolve => {
          setTimeout(() => {
            resolve();
          }, time * 1000); 
        });
    }

    describe("# host competition", () => {
        it("Should create a competition", async () => {
            const competitionAddress = await luckyVoterCompetition.getAddress();

            await ticket.approve(competitionAddress, 1e9);
            await reward.approve(competitionAddress, 1e9);
            const endTime = await time.latest() + 8;
            const [singer] = await ethers.getSigners();
            await expect(luckyVoterCompetition.create(await ticket.getAddress(), 
                await reward.getAddress(), rewards, 0, endTime))
                .to.emit(luckyVoterCompetition, "NewCompetition")
            .withArgs(competitionId, singer.address)
        })

        it("Should put lucky prizes", async () => {
            await expect(luckyVoterCompetition.putLuckyPrizes(competitionId, 
                voterPrizes))
                .to.emit(luckyVoterCompetition, "PuttingLuckyPrizes")
            .withArgs(competitionId, voterPrizes)
        })

        it("Should add a candidate", async () => {

            const signers = await ethers.getSigners()
            for (let index = 0; index < candidates.length; index++) {
                const candidate = candidates[index];
                const player = signers[index].address;
                await expect(luckyVoterCompetition.registerCandidate(competitionId, 
                    player))
                    .to.emit(luckyVoterCompetition, "NewCandidate")
                    .withArgs(competitionId, candidate, player)
            }
            
        })

        it("Should send tickets", async () => {
            const [singer] = await ethers.getSigners();
            for (let index = 0; index < candidates.length; index++) {
                const candidate = candidates[index];
                await expect(luckyVoterCompetition.vote(competitionId, 
                    candidate, 10 + index))
                    .to.emit(luckyVoterCompetition, "Vote")
                    .withArgs(competitionId, candidate, singer.address, 10 + index)
            }
            
        })
    })
})