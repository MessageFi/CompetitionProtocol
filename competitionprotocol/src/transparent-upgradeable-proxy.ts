import {
  DistributePrizes as DistributePrizesEvent,
  Initialized as InitializedEvent,
  NewCandidate as NewCandidateEvent,
  NewCompetition as NewCompetitionEvent,
  PuttingLuckyPrizes as PuttingLuckyPrizesEvent,
  RoleAdminChanged as RoleAdminChangedEvent,
  RoleGranted as RoleGrantedEvent,
  RoleRevoked as RoleRevokedEvent,
  SendPrizeToLuckyVoter as SendPrizeToLuckyVoterEvent,
  Vote as VoteEvent,
  WithdrawByPlayer as WithdrawByPlayerEvent,
  WithdrawByVoter as WithdrawByVoterEvent
} from "../generated/TransparentUpgradeableProxy/TransparentUpgradeableProxy"
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
} from "../generated/schema"

export function handleDistributePrizes(event: DistributePrizesEvent): void {
  let entity = new DistributePrizes(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.TransparentUpgradeableProxy_id = event.params.id
  entity.rewards = event.params.rewards
  entity.winners = event.params.winners

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleInitialized(event: InitializedEvent): void {
  let entity = new Initialized(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.version = event.params.version

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleNewCandidate(event: NewCandidateEvent): void {
  let entity = new NewCandidate(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.TransparentUpgradeableProxy_id = event.params.id
  entity.candidate = event.params.candidate
  entity.player = event.params.player

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleNewCompetition(event: NewCompetitionEvent): void {
  let entity = new NewCompetition(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.TransparentUpgradeableProxy_id = event.params.id
  entity.host = event.params.host

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handlePuttingLuckyPrizes(event: PuttingLuckyPrizesEvent): void {
  let entity = new PuttingLuckyPrizes(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.TransparentUpgradeableProxy_id = event.params.id
  entity.prizes = event.params.prizes

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRoleAdminChanged(event: RoleAdminChangedEvent): void {
  let entity = new RoleAdminChanged(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.role = event.params.role
  entity.previousAdminRole = event.params.previousAdminRole
  entity.newAdminRole = event.params.newAdminRole

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRoleGranted(event: RoleGrantedEvent): void {
  let entity = new RoleGranted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.role = event.params.role
  entity.account = event.params.account
  entity.sender = event.params.sender

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRoleRevoked(event: RoleRevokedEvent): void {
  let entity = new RoleRevoked(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.role = event.params.role
  entity.account = event.params.account
  entity.sender = event.params.sender

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleSendPrizeToLuckyVoter(
  event: SendPrizeToLuckyVoterEvent
): void {
  let entity = new SendPrizeToLuckyVoter(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.TransparentUpgradeableProxy_id = event.params.id
  entity.voter = event.params.voter
  entity.prize = event.params.prize

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleVote(event: VoteEvent): void {
  let entity = new Vote(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.TransparentUpgradeableProxy_id = event.params.id
  entity.candidate = event.params.candidate
  entity.voter = event.params.voter
  entity.tickets = event.params.tickets

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleWithdrawByPlayer(event: WithdrawByPlayerEvent): void {
  let entity = new WithdrawByPlayer(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.TransparentUpgradeableProxy_id = event.params.id
  entity.candidate = event.params.candidate
  entity.to = event.params.to
  entity.rewards = event.params.rewards
  entity.coins = event.params.coins

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleWithdrawByVoter(event: WithdrawByVoterEvent): void {
  let entity = new WithdrawByVoter(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.TransparentUpgradeableProxy_id = event.params.id
  entity.candidate = event.params.candidate
  entity.to = event.params.to
  entity.rewards = event.params.rewards
  entity.coins = event.params.coins

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
