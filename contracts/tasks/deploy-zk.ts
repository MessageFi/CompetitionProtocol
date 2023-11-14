import { task, types } from "hardhat/config"
import { poseidonContract } from "circomlibjs"

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

task("deploy:gasslessBallot", "Deploy a gasless ballot contracts")
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

            const GasslessSecretBallot = await ethers.getContractFactory("GasslessSecretBallot");
            const gasslessBallot = await GasslessSecretBallot.deploy(votingAddress);
            await gasslessBallot.waitForDeployment();

            if(logs){
                console.log("GasslessSecretBallot deployed to:", await gasslessBallot.getAddress());
            }

            return gasslessBallot
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