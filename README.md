# Competition Protocol

[![Github license](https://img.shields.io/github/license/semaphore-protocol/boilerplate.svg?style=flat-square)]()

Competition protocol is an infrastructure to create on-chain events and secret ballets quickly, using ZK snarks technology to provide anonymous voting.

Competition protocol([original version][pre]) started from the [Eth Hong Kong Hackthon][hackthon hk] Otc. 2023 and won the second prize. Now, it is rebuilt by yarn and other features.
Here is the list of developing plans:

| Task         | Classification   | State   | Progress rate |
|--------------|---------|---------|---------------|
| Base Competition | Transparent contracts|Completed    | 100%     |
| Auto Distribution Competition | Transparent contracts|Completed    | 100%     |
| Lucky Voter Competition | Transparent contracts|Completed    | 100%     |
| Share Prize Competition | Transparent contracts|Completed    | 100%     |
| Share Prize And Tickets Competition | Transparent contracts|Completed    | 100%     |
| Secret Voting | ZK contracts|Completed    | 100%     |
| Gassless Secret Voting | ZK contracts|Completed    | 100%     |
| Auto Distribution Gassless Secret Voting | ZK contracts|Planned    | 0%     |
| The graph | Backend |Planned    | 0%     |
| Front-end Demo | Front-end |Developing    | 40%     |

[Contract Addresses](https://github.com/MessageFi/CompetitionProtocol/blob/main/contracts/README.md)

## Features

- Totally onchain events, transprant or anonymous competition
- ZK proof base Semaphore library, Snarks and Merkel tree
- Auto distribute prizes by Chainlink automation
- Generate random result by Chainlink VRF
- Support EIP712 to do vote in secret ballots without gass payment
- High scalable and expandable

## System Structure
![structure](https://github.com/WeyNiDrop/CompetitionProtocol/blob/main/CompetitionProtocol.drawio.png?raw=true)

## Build and tests

```sh
git clone https://github.com/MessageFi/CompetitionProtocol
cd CompetitionProtocol/contracts
cp .env.example .env
yarn
```
Run test
```sh
yarn test
```



   [pre]: <https://github.com/MessageFi/CompetitonProtocol>
   [hackthon hk]: <https://build.bewater.xyz/zh/campaigns/mUwy-2023ETH-HongKong-Hackathon/result>
