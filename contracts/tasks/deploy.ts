import { task, types } from "hardhat/config"
import { poseidonContract } from "circomlibjs"

task("deploy", "Deploy contracts")
    .addOptionalParam("logs", "Print the logs", true, types.boolean)
    .setAction(async ({ logs}, 
        { ethers, run }) => {
        const { tc, rc, hackson, competitionProtocol } = await run("deploy:competitionProtocol", {
            logs
        })
        const { semaphoreVoting, pairingAddress, semaphoreVerifierAddress, 
            poseidonAddress, incrementalBinaryTreeAddress } = await run("deploy:voting", {
                logs
        })

        const baloot = await run("deploy:secretBallot", {semaphoreVoting:await semaphoreVoting.getAddress(),
            logs: logs
    })


        return {tc, rc, hackson, competitionProtocol,semaphoreVoting,semaphoreVerifierAddress, baloot}
    });

task("deploy:competitionProtocol", "Deploy competition protocol contracts")
    .addOptionalParam("logs", "Print the logs", true, types.boolean)
    .setAction(async ({ logs}, 
        { ethers, upgrades, run }) =>{
            const DefaultCompetition = await ethers.getContractFactory("DefaultCompetition");
            const competitionProtocol = await upgrades.deployProxy(DefaultCompetition, []);

            const Ticket20 = await ethers.getContractFactory("Ticket20");
            const tc = await Ticket20.deploy();
            await tc.waitForDeployment();

            const Reward20 = await ethers.getContractFactory("Reward20");
            const rc = await Reward20.deploy();
            await rc.waitForDeployment();

            const OnchainHackson = await ethers.getContractFactory("OnchainHackson");
            const hackson = await OnchainHackson.deploy(await competitionProtocol.getAddress());
            await hackson.waitForDeployment();

            if(logs){
                console.log("DefaultCompetition deployed to:", await competitionProtocol.getAddress());
                console.log("Ticket20 deployed to:", await tc.getAddress());
                console.log("Reward20 deployed to:", await rc.getAddress());
                console.log("OnchainHackson deployed to:", await hackson.getAddress());
            }

            return {tc, rc, hackson, competitionProtocol}
    });

task("deploy:secretBallot", "Deploy a secret ballot contracts")
    .addOptionalParam<boolean>("semaphoreVoting", "Semaphore voting address", undefined, types.string)
    .addOptionalParam("logs", "Print the logs", true, types.boolean)
    .setAction(async ({semaphoreVoting: votingAddress, logs}, 
        { ethers, upgrades, run }) =>{

            if (!votingAddress) {
                const { semaphoreVoting } = await run("deploy:voting", {
                    logs
                })
    
                votingAddress = await semaphoreVoting.getAddress()
            }

            const SimpleSecretBallot = await ethers.getContractFactory("SimpleSecretBallot");
            const ballot = await SimpleSecretBallot.deploy(votingAddress);
            await ballot.waitForDeployment();

            if(logs){
                console.log("SimpleSecretBallot deployed to:", await ballot.getAddress());
            }

            return ballot
    });

task("deploy:voting", "Deploy a SemaphoreVoting contract")
    .addOptionalParam<boolean>("pairing", "Pairing library address", undefined, types.string)
    .addOptionalParam<boolean>("semaphoreVerifier", "SemaphoreVerifier contract address", undefined, types.string)
    .addOptionalParam<boolean>("poseidon", "Poseidon library address", undefined, types.string)
    .addOptionalParam<boolean>(
        "incrementalBinaryTree",
        "IncrementalBinaryTree library address",
        undefined,
        types.string
    )
    .addOptionalParam<boolean>("logs", "Print the logs", true, types.boolean)
    .setAction(
        async (
            {
                logs,
                pairing: pairingAddress,
                semaphoreVerifier: semaphoreVerifierAddress,
                poseidon: poseidonAddress,
                incrementalBinaryTree: incrementalBinaryTreeAddress
            },
            { ethers, network }
        ): Promise<any> => {
            if (!semaphoreVerifierAddress) {
                if (!pairingAddress) {
                    const PairingFactory = await ethers.getContractFactory("Pairing")
                    const pairing = await PairingFactory.deploy()

                    await pairing.waitForDeployment()

                    pairingAddress = await pairing.getAddress()

                    if (logs) {
                        console.info("Pairing library has been deployed to:" , pairingAddress)
                    }

                    
                }

                const SemaphoreVerifierFactory = await ethers.getContractFactory("SemaphoreVerifier", {
                    libraries: {
                        Pairing: pairingAddress
                    }
                })

                const semaphoreVerifier = await SemaphoreVerifierFactory.deploy()

                await semaphoreVerifier.waitForDeployment()
                semaphoreVerifierAddress = await semaphoreVerifier.getAddress()

                if (logs) {
                    console.info("SemaphoreVerifier contract has been deployed to:", semaphoreVerifierAddress)
                }

                
            }

            if (!incrementalBinaryTreeAddress) {
                if (!poseidonAddress) {
                    const poseidonABI = poseidonContract.generateABI(2)
                    const poseidonBytecode = poseidonContract.createCode(2)
                    const [singer] = await ethers.getSigners();
                    
                    const PoseidonFactory = new ethers.ContractFactory(poseidonABI, poseidonBytecode)
                    const poseidon = await PoseidonFactory.connect(singer).deploy()

                    await poseidon.waitForDeployment()
                    poseidonAddress = await poseidon.getAddress()

                    if (logs) {
                        console.info("Poseidon library has been deployed to: ", poseidonAddress)
                    }

                    
                }

                const IncrementalBinaryTreeFactory = await ethers.getContractFactory("IncrementalBinaryTree", {
                    libraries: {
                        PoseidonT3: poseidonAddress
                    }
                })
                const incrementalBinaryTree = await IncrementalBinaryTreeFactory.deploy()

                await incrementalBinaryTree.waitForDeployment()
                incrementalBinaryTreeAddress = await incrementalBinaryTree.getAddress()
                if (logs) {
                    console.info("IncrementalBinaryTree library has been deployed to: ", incrementalBinaryTreeAddress)
                }

                
            }

            const SemaphoreVotingFactory = await ethers.getContractFactory("SemaphoreVoting", {
                libraries: {
                    IncrementalBinaryTree: incrementalBinaryTreeAddress
                }
            })

            const semaphoreVoting = await SemaphoreVotingFactory.deploy(semaphoreVerifierAddress)

            await semaphoreVoting.waitForDeployment()

            if (logs) {
                console.info("SemaphoreVoting contract has been deployed to: ", await semaphoreVoting.getAddress())
            }

            return {
                semaphoreVoting,
                pairingAddress,
                semaphoreVerifierAddress,
                poseidonAddress,
                incrementalBinaryTreeAddress
            }
        }
    );