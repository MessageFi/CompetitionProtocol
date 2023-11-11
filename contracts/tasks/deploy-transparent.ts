import { task, types } from "hardhat/config"

task("deploy:competitionProtocol", "Deploy default competition protocol contracts")
    .addOptionalParam("logs", "Print the logs", true, types.boolean)
    .setAction(async ({ logs}, 
        { ethers, upgrades, run }) =>{
            const DefaultCompetition = await ethers.getContractFactory("DefaultCompetition");
            const competitionProtocol = await upgrades.deployProxy(DefaultCompetition, []);

            if(logs){
                console.log("DefaultCompetition deployed to:", await competitionProtocol.getAddress());
            }

            return {competitionProtocol}
    });

task("deploy:erc20", "Deploy test erc20 coins")
    .addOptionalParam("logs", "Print the logs", true, types.boolean)
    .setAction(async ({ logs}, 
        { ethers }) =>{
            const Ticket20 = await ethers.getContractFactory("Ticket20");
            const ticket = await Ticket20.deploy();
            await ticket.waitForDeployment();

            const Reward20 = await ethers.getContractFactory("Reward20");
            const reward = await Reward20.deploy();
            await reward.waitForDeployment();

            if(logs){
                console.log("Ticket20 deployed to:", await ticket.getAddress());
                console.log("Reward20 deployed to:", await reward.getAddress());
            }

            return {ticket, reward}
    });

task("deploy:hackthon", "Deploy test hackthon contracts")
    .addOptionalParam<boolean>("competition", "Competition protocol address", undefined, types.string)
    .addOptionalParam("logs", "Print the logs", true, types.boolean)
    .setAction(async ({ logs, competition: competitionAddress}, 
        { ethers, run }) =>{
            if(!competitionAddress){
                const { competition } = await run("deploy:competitionProtocol", {
                    logs
                })
                competitionAddress = await competition.getAddress()
            }

            const OnchainHackthon = await ethers.getContractFactory("OnchainHackthon");
            const hackthon = await OnchainHackthon.deploy(competitionAddress);
            await hackthon.waitForDeployment();

            if(logs){
                console.log("OnchainHackthon deployed to:", await hackthon.getAddress());
            }

            return {hackthon}
    });

task("deploy:autoDistribution", "Deploy auto distribution competition contracts")
    .addOptionalParam("logs", "Print the logs", true, types.boolean)
    .setAction(async ({ logs}, 
        { ethers, upgrades, run }) =>{
            const AutoDistributionCompetition = await ethers.getContractFactory("AutoDistributionCompetition");
            const autoCompetition = await upgrades.deployProxy(AutoDistributionCompetition, []);

            if(logs){
                console.log("AutoDistributionCompetition deployed to:", await autoCompetition.getAddress());
            }

            return {autoCompetition}
    });