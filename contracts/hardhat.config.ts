import { HardhatUserConfig } from "hardhat/config";
import { NetworksUserConfig } from "hardhat/types"
import "@nomicfoundation/hardhat-toolbox";
import { config as dotenvConfig } from "dotenv"
import { resolve } from "path"
import '@openzeppelin/hardhat-upgrades'
import "./tasks/deploy"
import "./tasks/deploy-transparent"

dotenvConfig({ path: resolve(__dirname, ".env") })

function getNetworks(): NetworksUserConfig {
  if (!process.env.INFURA_API_KEY || !process.env.ETHEREUM_PRIVATE_KEY) {
      return {}
  }

  const accounts = [`0x${process.env.ETHEREUM_PRIVATE_KEY}`]
  const infuraApiKey = process.env.INFURA_API_KEY

  return {
      goerli: {
          url: `https://goerli.infura.io/v3/${infuraApiKey}`,
          chainId: 5,
          accounts
      },
      sepolia: {
          url: `https://sepolia.infura.io/v3/${infuraApiKey}`,
          chainId: 11155111,
          accounts
      },
      mumbai: {
          url: `https://polygon-mumbai.infura.io/v3/${infuraApiKey}`,
          chainId: 80001,
          accounts
      },
      "optimism-goerli": {
          url: `https://optimism-goerli.infura.io/v3/${infuraApiKey}`,
          chainId: 420,
          accounts
      },
      "arbitrum-goerli": {
          url: "https://goerli-rollup.arbitrum.io/rpc",
          chainId: 421613,
          accounts
      },
      arbitrum: {
          url: "https://arb1.arbitrum.io/rpc",
          chainId: 42161,
          accounts
      }
  }
}

const hardhatConfig: HardhatUserConfig = {
  solidity: {
    compilers: [
        {
          version: "0.8.4"
        },
        {
          version: "0.8.20",
        }
      ]
  },
  typechain: {
    outDir: "./build/typechain",
    target: "ethers-v6"
  },
  networks: {
      hardhat: {
          chainId: 1337
      },
      ...getNetworks()
  },
  gasReporter: {
      currency: "USD",
      enabled: process.env.REPORT_GAS === "true",
      coinmarketcap: process.env.COINMARKETCAP_API_KEY
  },
  etherscan: {
      apiKey: process.env.ETHERSCAN_API_KEY
  }
};

export default hardhatConfig;
