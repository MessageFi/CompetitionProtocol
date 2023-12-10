import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt, Address, Bytes } from "@graphprotocol/graph-ts"
import {
  DistributePrizes,
  Initialized,
  NewCandidate,
  NewCompetition,
  PuttingLuckyPrizes,
  RoleAdminChanged,
  RoleGranted,
  RoleRevoked,
  SendPrizeToLuckyVoter,
  Vote,
  WithdrawByPlayer,
  WithdrawByVoter
} from "../generated/TransparentUpgradeableProxy/TransparentUpgradeableProxy"

export function createDistributePrizesEvent(
  id: BigInt,
  rewards: Array<BigInt>,
  winners: Array<BigInt>
): DistributePrizes {
  let distributePrizesEvent = changetype<DistributePrizes>(newMockEvent())

  distributePrizesEvent.parameters = new Array()

  distributePrizesEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromUnsignedBigInt(id))
  )
  distributePrizesEvent.parameters.push(
    new ethereum.EventParam(
      "rewards",
      ethereum.Value.fromUnsignedBigIntArray(rewards)
    )
  )
  distributePrizesEvent.parameters.push(
    new ethereum.EventParam(
      "winners",
      ethereum.Value.fromUnsignedBigIntArray(winners)
    )
  )

  return distributePrizesEvent
}

export function createInitializedEvent(version: i32): Initialized {
  let initializedEvent = changetype<Initialized>(newMockEvent())

  initializedEvent.parameters = new Array()

  initializedEvent.parameters.push(
    new ethereum.EventParam(
      "version",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(version))
    )
  )

  return initializedEvent
}

export function createNewCandidateEvent(
  id: BigInt,
  candidate: BigInt,
  player: Address
): NewCandidate {
  let newCandidateEvent = changetype<NewCandidate>(newMockEvent())

  newCandidateEvent.parameters = new Array()

  newCandidateEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromUnsignedBigInt(id))
  )
  newCandidateEvent.parameters.push(
    new ethereum.EventParam(
      "candidate",
      ethereum.Value.fromUnsignedBigInt(candidate)
    )
  )
  newCandidateEvent.parameters.push(
    new ethereum.EventParam("player", ethereum.Value.fromAddress(player))
  )

  return newCandidateEvent
}

export function createNewCompetitionEvent(
  id: BigInt,
  host: Address
): NewCompetition {
  let newCompetitionEvent = changetype<NewCompetition>(newMockEvent())

  newCompetitionEvent.parameters = new Array()

  newCompetitionEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromUnsignedBigInt(id))
  )
  newCompetitionEvent.parameters.push(
    new ethereum.EventParam("host", ethereum.Value.fromAddress(host))
  )

  return newCompetitionEvent
}

export function createPuttingLuckyPrizesEvent(
  id: BigInt,
  prizes: Array<BigInt>
): PuttingLuckyPrizes {
  let puttingLuckyPrizesEvent = changetype<PuttingLuckyPrizes>(newMockEvent())

  puttingLuckyPrizesEvent.parameters = new Array()

  puttingLuckyPrizesEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromUnsignedBigInt(id))
  )
  puttingLuckyPrizesEvent.parameters.push(
    new ethereum.EventParam(
      "prizes",
      ethereum.Value.fromUnsignedBigIntArray(prizes)
    )
  )

  return puttingLuckyPrizesEvent
}

export function createRoleAdminChangedEvent(
  role: Bytes,
  previousAdminRole: Bytes,
  newAdminRole: Bytes
): RoleAdminChanged {
  let roleAdminChangedEvent = changetype<RoleAdminChanged>(newMockEvent())

  roleAdminChangedEvent.parameters = new Array()

  roleAdminChangedEvent.parameters.push(
    new ethereum.EventParam("role", ethereum.Value.fromFixedBytes(role))
  )
  roleAdminChangedEvent.parameters.push(
    new ethereum.EventParam(
      "previousAdminRole",
      ethereum.Value.fromFixedBytes(previousAdminRole)
    )
  )
  roleAdminChangedEvent.parameters.push(
    new ethereum.EventParam(
      "newAdminRole",
      ethereum.Value.fromFixedBytes(newAdminRole)
    )
  )

  return roleAdminChangedEvent
}

export function createRoleGrantedEvent(
  role: Bytes,
  account: Address,
  sender: Address
): RoleGranted {
  let roleGrantedEvent = changetype<RoleGranted>(newMockEvent())

  roleGrantedEvent.parameters = new Array()

  roleGrantedEvent.parameters.push(
    new ethereum.EventParam("role", ethereum.Value.fromFixedBytes(role))
  )
  roleGrantedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  roleGrantedEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )

  return roleGrantedEvent
}

export function createRoleRevokedEvent(
  role: Bytes,
  account: Address,
  sender: Address
): RoleRevoked {
  let roleRevokedEvent = changetype<RoleRevoked>(newMockEvent())

  roleRevokedEvent.parameters = new Array()

  roleRevokedEvent.parameters.push(
    new ethereum.EventParam("role", ethereum.Value.fromFixedBytes(role))
  )
  roleRevokedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  roleRevokedEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )

  return roleRevokedEvent
}

export function createSendPrizeToLuckyVoterEvent(
  id: BigInt,
  voter: Address,
  prize: BigInt
): SendPrizeToLuckyVoter {
  let sendPrizeToLuckyVoterEvent = changetype<SendPrizeToLuckyVoter>(
    newMockEvent()
  )

  sendPrizeToLuckyVoterEvent.parameters = new Array()

  sendPrizeToLuckyVoterEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromUnsignedBigInt(id))
  )
  sendPrizeToLuckyVoterEvent.parameters.push(
    new ethereum.EventParam("voter", ethereum.Value.fromAddress(voter))
  )
  sendPrizeToLuckyVoterEvent.parameters.push(
    new ethereum.EventParam("prize", ethereum.Value.fromUnsignedBigInt(prize))
  )

  return sendPrizeToLuckyVoterEvent
}

export function createVoteEvent(
  id: BigInt,
  candidate: BigInt,
  voter: Address,
  tickets: BigInt
): Vote {
  let voteEvent = changetype<Vote>(newMockEvent())

  voteEvent.parameters = new Array()

  voteEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromUnsignedBigInt(id))
  )
  voteEvent.parameters.push(
    new ethereum.EventParam(
      "candidate",
      ethereum.Value.fromUnsignedBigInt(candidate)
    )
  )
  voteEvent.parameters.push(
    new ethereum.EventParam("voter", ethereum.Value.fromAddress(voter))
  )
  voteEvent.parameters.push(
    new ethereum.EventParam(
      "tickets",
      ethereum.Value.fromUnsignedBigInt(tickets)
    )
  )

  return voteEvent
}

export function createWithdrawByPlayerEvent(
  id: BigInt,
  candidate: BigInt,
  to: Address,
  rewards: BigInt,
  coins: BigInt
): WithdrawByPlayer {
  let withdrawByPlayerEvent = changetype<WithdrawByPlayer>(newMockEvent())

  withdrawByPlayerEvent.parameters = new Array()

  withdrawByPlayerEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromUnsignedBigInt(id))
  )
  withdrawByPlayerEvent.parameters.push(
    new ethereum.EventParam(
      "candidate",
      ethereum.Value.fromUnsignedBigInt(candidate)
    )
  )
  withdrawByPlayerEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )
  withdrawByPlayerEvent.parameters.push(
    new ethereum.EventParam(
      "rewards",
      ethereum.Value.fromUnsignedBigInt(rewards)
    )
  )
  withdrawByPlayerEvent.parameters.push(
    new ethereum.EventParam("coins", ethereum.Value.fromUnsignedBigInt(coins))
  )

  return withdrawByPlayerEvent
}

export function createWithdrawByVoterEvent(
  id: BigInt,
  candidate: BigInt,
  to: Address,
  rewards: BigInt,
  coins: BigInt
): WithdrawByVoter {
  let withdrawByVoterEvent = changetype<WithdrawByVoter>(newMockEvent())

  withdrawByVoterEvent.parameters = new Array()

  withdrawByVoterEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromUnsignedBigInt(id))
  )
  withdrawByVoterEvent.parameters.push(
    new ethereum.EventParam(
      "candidate",
      ethereum.Value.fromUnsignedBigInt(candidate)
    )
  )
  withdrawByVoterEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )
  withdrawByVoterEvent.parameters.push(
    new ethereum.EventParam(
      "rewards",
      ethereum.Value.fromUnsignedBigInt(rewards)
    )
  )
  withdrawByVoterEvent.parameters.push(
    new ethereum.EventParam("coins", ethereum.Value.fromUnsignedBigInt(coins))
  )

  return withdrawByVoterEvent
}
