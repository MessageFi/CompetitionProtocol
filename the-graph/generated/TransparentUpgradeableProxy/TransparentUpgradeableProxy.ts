// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt
} from "@graphprotocol/graph-ts";

export class DistributePrizes extends ethereum.Event {
  get params(): DistributePrizes__Params {
    return new DistributePrizes__Params(this);
  }
}

export class DistributePrizes__Params {
  _event: DistributePrizes;

  constructor(event: DistributePrizes) {
    this._event = event;
  }

  get id(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get rewards(): Array<BigInt> {
    return this._event.parameters[1].value.toBigIntArray();
  }

  get winners(): Array<BigInt> {
    return this._event.parameters[2].value.toBigIntArray();
  }
}

export class Initialized extends ethereum.Event {
  get params(): Initialized__Params {
    return new Initialized__Params(this);
  }
}

export class Initialized__Params {
  _event: Initialized;

  constructor(event: Initialized) {
    this._event = event;
  }

  get version(): i32 {
    return this._event.parameters[0].value.toI32();
  }
}

export class NewCandidate extends ethereum.Event {
  get params(): NewCandidate__Params {
    return new NewCandidate__Params(this);
  }
}

export class NewCandidate__Params {
  _event: NewCandidate;

  constructor(event: NewCandidate) {
    this._event = event;
  }

  get id(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get candidate(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }

  get player(): Address {
    return this._event.parameters[2].value.toAddress();
  }
}

export class NewCompetition extends ethereum.Event {
  get params(): NewCompetition__Params {
    return new NewCompetition__Params(this);
  }
}

export class NewCompetition__Params {
  _event: NewCompetition;

  constructor(event: NewCompetition) {
    this._event = event;
  }

  get id(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get host(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class PuttingLuckyPrizes extends ethereum.Event {
  get params(): PuttingLuckyPrizes__Params {
    return new PuttingLuckyPrizes__Params(this);
  }
}

export class PuttingLuckyPrizes__Params {
  _event: PuttingLuckyPrizes;

  constructor(event: PuttingLuckyPrizes) {
    this._event = event;
  }

  get id(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get prizes(): Array<BigInt> {
    return this._event.parameters[1].value.toBigIntArray();
  }
}

export class RoleAdminChanged extends ethereum.Event {
  get params(): RoleAdminChanged__Params {
    return new RoleAdminChanged__Params(this);
  }
}

export class RoleAdminChanged__Params {
  _event: RoleAdminChanged;

  constructor(event: RoleAdminChanged) {
    this._event = event;
  }

  get role(): Bytes {
    return this._event.parameters[0].value.toBytes();
  }

  get previousAdminRole(): Bytes {
    return this._event.parameters[1].value.toBytes();
  }

  get newAdminRole(): Bytes {
    return this._event.parameters[2].value.toBytes();
  }
}

export class RoleGranted extends ethereum.Event {
  get params(): RoleGranted__Params {
    return new RoleGranted__Params(this);
  }
}

export class RoleGranted__Params {
  _event: RoleGranted;

  constructor(event: RoleGranted) {
    this._event = event;
  }

  get role(): Bytes {
    return this._event.parameters[0].value.toBytes();
  }

  get account(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get sender(): Address {
    return this._event.parameters[2].value.toAddress();
  }
}

export class RoleRevoked extends ethereum.Event {
  get params(): RoleRevoked__Params {
    return new RoleRevoked__Params(this);
  }
}

export class RoleRevoked__Params {
  _event: RoleRevoked;

  constructor(event: RoleRevoked) {
    this._event = event;
  }

  get role(): Bytes {
    return this._event.parameters[0].value.toBytes();
  }

  get account(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get sender(): Address {
    return this._event.parameters[2].value.toAddress();
  }
}

export class SendPrizeToLuckyVoter extends ethereum.Event {
  get params(): SendPrizeToLuckyVoter__Params {
    return new SendPrizeToLuckyVoter__Params(this);
  }
}

export class SendPrizeToLuckyVoter__Params {
  _event: SendPrizeToLuckyVoter;

  constructor(event: SendPrizeToLuckyVoter) {
    this._event = event;
  }

  get id(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get voter(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get prize(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class Vote extends ethereum.Event {
  get params(): Vote__Params {
    return new Vote__Params(this);
  }
}

export class Vote__Params {
  _event: Vote;

  constructor(event: Vote) {
    this._event = event;
  }

  get id(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get candidate(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }

  get voter(): Address {
    return this._event.parameters[2].value.toAddress();
  }

  get tickets(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }
}

export class WithdrawByPlayer extends ethereum.Event {
  get params(): WithdrawByPlayer__Params {
    return new WithdrawByPlayer__Params(this);
  }
}

export class WithdrawByPlayer__Params {
  _event: WithdrawByPlayer;

  constructor(event: WithdrawByPlayer) {
    this._event = event;
  }

  get id(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get candidate(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }

  get to(): Address {
    return this._event.parameters[2].value.toAddress();
  }

  get rewards(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }

  get coins(): BigInt {
    return this._event.parameters[4].value.toBigInt();
  }
}

export class WithdrawByVoter extends ethereum.Event {
  get params(): WithdrawByVoter__Params {
    return new WithdrawByVoter__Params(this);
  }
}

export class WithdrawByVoter__Params {
  _event: WithdrawByVoter;

  constructor(event: WithdrawByVoter) {
    this._event = event;
  }

  get id(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get candidate(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }

  get to(): Address {
    return this._event.parameters[2].value.toAddress();
  }

  get rewards(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }

  get coins(): BigInt {
    return this._event.parameters[4].value.toBigInt();
  }
}

export class TransparentUpgradeableProxy__candidateMappingResult {
  value0: BigInt;
  value1: Address;

  constructor(value0: BigInt, value1: Address) {
    this.value0 = value0;
    this.value1 = value1;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromUnsignedBigInt(this.value0));
    map.set("value1", ethereum.Value.fromAddress(this.value1));
    return map;
  }

  getTickets(): BigInt {
    return this.value0;
  }

  getPlayer(): Address {
    return this.value1;
  }
}

export class TransparentUpgradeableProxy__checkUpkeepResult {
  value0: boolean;
  value1: Bytes;

  constructor(value0: boolean, value1: Bytes) {
    this.value0 = value0;
    this.value1 = value1;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromBoolean(this.value0));
    map.set("value1", ethereum.Value.fromBytes(this.value1));
    return map;
  }

  getUpkeepNeeded(): boolean {
    return this.value0;
  }

  getPerformData(): Bytes {
    return this.value1;
  }
}

export class TransparentUpgradeableProxy__competitionMappingResult {
  value0: Address;
  value1: Address;
  value2: Address;
  value3: BigInt;
  value4: BigInt;
  value5: BigInt;

  constructor(
    value0: Address,
    value1: Address,
    value2: Address,
    value3: BigInt,
    value4: BigInt,
    value5: BigInt
  ) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
    this.value3 = value3;
    this.value4 = value4;
    this.value5 = value5;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromAddress(this.value0));
    map.set("value1", ethereum.Value.fromAddress(this.value1));
    map.set("value2", ethereum.Value.fromAddress(this.value2));
    map.set("value3", ethereum.Value.fromUnsignedBigInt(this.value3));
    map.set("value4", ethereum.Value.fromUnsignedBigInt(this.value4));
    map.set("value5", ethereum.Value.fromUnsignedBigInt(this.value5));
    return map;
  }

  getHost(): Address {
    return this.value0;
  }

  getRewardCoin(): Address {
    return this.value1;
  }

  getTicketCoin(): Address {
    return this.value2;
  }

  getTotalCandidates(): BigInt {
    return this.value3;
  }

  getStartTime(): BigInt {
    return this.value4;
  }

  getEndTime(): BigInt {
    return this.value5;
  }
}

export class TransparentUpgradeableProxy__detailsResult {
  value0: Address;
  value1: Array<BigInt>;
  value2: Array<BigInt>;
  value3: Address;
  value4: Address;
  value5: BigInt;
  value6: BigInt;
  value7: BigInt;

  constructor(
    value0: Address,
    value1: Array<BigInt>,
    value2: Array<BigInt>,
    value3: Address,
    value4: Address,
    value5: BigInt,
    value6: BigInt,
    value7: BigInt
  ) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
    this.value3 = value3;
    this.value4 = value4;
    this.value5 = value5;
    this.value6 = value6;
    this.value7 = value7;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromAddress(this.value0));
    map.set("value1", ethereum.Value.fromUnsignedBigIntArray(this.value1));
    map.set("value2", ethereum.Value.fromUnsignedBigIntArray(this.value2));
    map.set("value3", ethereum.Value.fromAddress(this.value3));
    map.set("value4", ethereum.Value.fromAddress(this.value4));
    map.set("value5", ethereum.Value.fromUnsignedBigInt(this.value5));
    map.set("value6", ethereum.Value.fromUnsignedBigInt(this.value6));
    map.set("value7", ethereum.Value.fromUnsignedBigInt(this.value7));
    return map;
  }

  getHost(): Address {
    return this.value0;
  }

  getRewards(): Array<BigInt> {
    return this.value1;
  }

  getWinners(): Array<BigInt> {
    return this.value2;
  }

  getRewardCoin(): Address {
    return this.value3;
  }

  getTicketCoin(): Address {
    return this.value4;
  }

  getTotalCandidates(): BigInt {
    return this.value5;
  }

  getStartTime(): BigInt {
    return this.value6;
  }

  getEndTime(): BigInt {
    return this.value7;
  }
}

export class TransparentUpgradeableProxy extends ethereum.SmartContract {
  static bind(address: Address): TransparentUpgradeableProxy {
    return new TransparentUpgradeableProxy(
      "TransparentUpgradeableProxy",
      address
    );
  }

  DEFAULT_ADMIN_ROLE(): Bytes {
    let result = super.call(
      "DEFAULT_ADMIN_ROLE",
      "DEFAULT_ADMIN_ROLE():(bytes32)",
      []
    );

    return result[0].toBytes();
  }

  try_DEFAULT_ADMIN_ROLE(): ethereum.CallResult<Bytes> {
    let result = super.tryCall(
      "DEFAULT_ADMIN_ROLE",
      "DEFAULT_ADMIN_ROLE():(bytes32)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBytes());
  }

  calculatorMapping(param0: BigInt): Address {
    let result = super.call(
      "calculatorMapping",
      "calculatorMapping(uint256):(address)",
      [ethereum.Value.fromUnsignedBigInt(param0)]
    );

    return result[0].toAddress();
  }

  try_calculatorMapping(param0: BigInt): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "calculatorMapping",
      "calculatorMapping(uint256):(address)",
      [ethereum.Value.fromUnsignedBigInt(param0)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  candidateMapping(
    param0: BigInt,
    param1: BigInt
  ): TransparentUpgradeableProxy__candidateMappingResult {
    let result = super.call(
      "candidateMapping",
      "candidateMapping(uint256,uint256):(uint256,address)",
      [
        ethereum.Value.fromUnsignedBigInt(param0),
        ethereum.Value.fromUnsignedBigInt(param1)
      ]
    );

    return new TransparentUpgradeableProxy__candidateMappingResult(
      result[0].toBigInt(),
      result[1].toAddress()
    );
  }

  try_candidateMapping(
    param0: BigInt,
    param1: BigInt
  ): ethereum.CallResult<TransparentUpgradeableProxy__candidateMappingResult> {
    let result = super.tryCall(
      "candidateMapping",
      "candidateMapping(uint256,uint256):(uint256,address)",
      [
        ethereum.Value.fromUnsignedBigInt(param0),
        ethereum.Value.fromUnsignedBigInt(param1)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new TransparentUpgradeableProxy__candidateMappingResult(
        value[0].toBigInt(),
        value[1].toAddress()
      )
    );
  }

  checkUpkeep(param0: Bytes): TransparentUpgradeableProxy__checkUpkeepResult {
    let result = super.call("checkUpkeep", "checkUpkeep(bytes):(bool,bytes)", [
      ethereum.Value.fromBytes(param0)
    ]);

    return new TransparentUpgradeableProxy__checkUpkeepResult(
      result[0].toBoolean(),
      result[1].toBytes()
    );
  }

  try_checkUpkeep(
    param0: Bytes
  ): ethereum.CallResult<TransparentUpgradeableProxy__checkUpkeepResult> {
    let result = super.tryCall(
      "checkUpkeep",
      "checkUpkeep(bytes):(bool,bytes)",
      [ethereum.Value.fromBytes(param0)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new TransparentUpgradeableProxy__checkUpkeepResult(
        value[0].toBoolean(),
        value[1].toBytes()
      )
    );
  }

  competitionMapping(
    param0: BigInt
  ): TransparentUpgradeableProxy__competitionMappingResult {
    let result = super.call(
      "competitionMapping",
      "competitionMapping(uint256):(address,address,address,uint256,uint64,uint64)",
      [ethereum.Value.fromUnsignedBigInt(param0)]
    );

    return new TransparentUpgradeableProxy__competitionMappingResult(
      result[0].toAddress(),
      result[1].toAddress(),
      result[2].toAddress(),
      result[3].toBigInt(),
      result[4].toBigInt(),
      result[5].toBigInt()
    );
  }

  try_competitionMapping(
    param0: BigInt
  ): ethereum.CallResult<
    TransparentUpgradeableProxy__competitionMappingResult
  > {
    let result = super.tryCall(
      "competitionMapping",
      "competitionMapping(uint256):(address,address,address,uint256,uint64,uint64)",
      [ethereum.Value.fromUnsignedBigInt(param0)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new TransparentUpgradeableProxy__competitionMappingResult(
        value[0].toAddress(),
        value[1].toAddress(),
        value[2].toAddress(),
        value[3].toBigInt(),
        value[4].toBigInt(),
        value[5].toBigInt()
      )
    );
  }

  create(
    ticketCoin: Address,
    rewardCoin: Address,
    rewards: Array<BigInt>,
    startTime: BigInt,
    endTime: BigInt
  ): BigInt {
    let result = super.call(
      "create",
      "create(address,address,uint256[],uint64,uint64):(uint256)",
      [
        ethereum.Value.fromAddress(ticketCoin),
        ethereum.Value.fromAddress(rewardCoin),
        ethereum.Value.fromUnsignedBigIntArray(rewards),
        ethereum.Value.fromUnsignedBigInt(startTime),
        ethereum.Value.fromUnsignedBigInt(endTime)
      ]
    );

    return result[0].toBigInt();
  }

  try_create(
    ticketCoin: Address,
    rewardCoin: Address,
    rewards: Array<BigInt>,
    startTime: BigInt,
    endTime: BigInt
  ): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "create",
      "create(address,address,uint256[],uint64,uint64):(uint256)",
      [
        ethereum.Value.fromAddress(ticketCoin),
        ethereum.Value.fromAddress(rewardCoin),
        ethereum.Value.fromUnsignedBigIntArray(rewards),
        ethereum.Value.fromUnsignedBigInt(startTime),
        ethereum.Value.fromUnsignedBigInt(endTime)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  details(id: BigInt): TransparentUpgradeableProxy__detailsResult {
    let result = super.call(
      "details",
      "details(uint256):(address,uint256[],uint256[],address,address,uint256,uint64,uint64)",
      [ethereum.Value.fromUnsignedBigInt(id)]
    );

    return new TransparentUpgradeableProxy__detailsResult(
      result[0].toAddress(),
      result[1].toBigIntArray(),
      result[2].toBigIntArray(),
      result[3].toAddress(),
      result[4].toAddress(),
      result[5].toBigInt(),
      result[6].toBigInt(),
      result[7].toBigInt()
    );
  }

  try_details(
    id: BigInt
  ): ethereum.CallResult<TransparentUpgradeableProxy__detailsResult> {
    let result = super.tryCall(
      "details",
      "details(uint256):(address,uint256[],uint256[],address,address,uint256,uint64,uint64)",
      [ethereum.Value.fromUnsignedBigInt(id)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new TransparentUpgradeableProxy__detailsResult(
        value[0].toAddress(),
        value[1].toBigIntArray(),
        value[2].toBigIntArray(),
        value[3].toAddress(),
        value[4].toAddress(),
        value[5].toBigInt(),
        value[6].toBigInt(),
        value[7].toBigInt()
      )
    );
  }

  getRoleAdmin(role: Bytes): Bytes {
    let result = super.call("getRoleAdmin", "getRoleAdmin(bytes32):(bytes32)", [
      ethereum.Value.fromFixedBytes(role)
    ]);

    return result[0].toBytes();
  }

  try_getRoleAdmin(role: Bytes): ethereum.CallResult<Bytes> {
    let result = super.tryCall(
      "getRoleAdmin",
      "getRoleAdmin(bytes32):(bytes32)",
      [ethereum.Value.fromFixedBytes(role)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBytes());
  }

  hasRole(role: Bytes, account: Address): boolean {
    let result = super.call("hasRole", "hasRole(bytes32,address):(bool)", [
      ethereum.Value.fromFixedBytes(role),
      ethereum.Value.fromAddress(account)
    ]);

    return result[0].toBoolean();
  }

  try_hasRole(role: Bytes, account: Address): ethereum.CallResult<boolean> {
    let result = super.tryCall("hasRole", "hasRole(bytes32,address):(bool)", [
      ethereum.Value.fromFixedBytes(role),
      ethereum.Value.fromAddress(account)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  luckyPrizes(param0: BigInt, param1: BigInt): BigInt {
    let result = super.call(
      "luckyPrizes",
      "luckyPrizes(uint256,uint256):(uint256)",
      [
        ethereum.Value.fromUnsignedBigInt(param0),
        ethereum.Value.fromUnsignedBigInt(param1)
      ]
    );

    return result[0].toBigInt();
  }

  try_luckyPrizes(param0: BigInt, param1: BigInt): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "luckyPrizes",
      "luckyPrizes(uint256,uint256):(uint256)",
      [
        ethereum.Value.fromUnsignedBigInt(param0),
        ethereum.Value.fromUnsignedBigInt(param1)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  realTickets(id: BigInt, coins: BigInt): BigInt {
    let result = super.call(
      "realTickets",
      "realTickets(uint256,uint256):(uint256)",
      [
        ethereum.Value.fromUnsignedBigInt(id),
        ethereum.Value.fromUnsignedBigInt(coins)
      ]
    );

    return result[0].toBigInt();
  }

  try_realTickets(id: BigInt, coins: BigInt): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "realTickets",
      "realTickets(uint256,uint256):(uint256)",
      [
        ethereum.Value.fromUnsignedBigInt(id),
        ethereum.Value.fromUnsignedBigInt(coins)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  registerCandidate(id: BigInt, player: Address): BigInt {
    let result = super.call(
      "registerCandidate",
      "registerCandidate(uint256,address):(uint256)",
      [
        ethereum.Value.fromUnsignedBigInt(id),
        ethereum.Value.fromAddress(player)
      ]
    );

    return result[0].toBigInt();
  }

  try_registerCandidate(
    id: BigInt,
    player: Address
  ): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "registerCandidate",
      "registerCandidate(uint256,address):(uint256)",
      [
        ethereum.Value.fromUnsignedBigInt(id),
        ethereum.Value.fromAddress(player)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  rewardIsWithdraw(param0: BigInt, param1: BigInt): boolean {
    let result = super.call(
      "rewardIsWithdraw",
      "rewardIsWithdraw(uint256,uint256):(bool)",
      [
        ethereum.Value.fromUnsignedBigInt(param0),
        ethereum.Value.fromUnsignedBigInt(param1)
      ]
    );

    return result[0].toBoolean();
  }

  try_rewardIsWithdraw(
    param0: BigInt,
    param1: BigInt
  ): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "rewardIsWithdraw",
      "rewardIsWithdraw(uint256,uint256):(bool)",
      [
        ethereum.Value.fromUnsignedBigInt(param0),
        ethereum.Value.fromUnsignedBigInt(param1)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  supportsInterface(interfaceId: Bytes): boolean {
    let result = super.call(
      "supportsInterface",
      "supportsInterface(bytes4):(bool)",
      [ethereum.Value.fromFixedBytes(interfaceId)]
    );

    return result[0].toBoolean();
  }

  try_supportsInterface(interfaceId: Bytes): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "supportsInterface",
      "supportsInterface(bytes4):(bool)",
      [ethereum.Value.fromFixedBytes(interfaceId)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  totalCompetitions(): BigInt {
    let result = super.call(
      "totalCompetitions",
      "totalCompetitions():(uint256)",
      []
    );

    return result[0].toBigInt();
  }

  try_totalCompetitions(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "totalCompetitions",
      "totalCompetitions():(uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }
}

export class CreateCall extends ethereum.Call {
  get inputs(): CreateCall__Inputs {
    return new CreateCall__Inputs(this);
  }

  get outputs(): CreateCall__Outputs {
    return new CreateCall__Outputs(this);
  }
}

export class CreateCall__Inputs {
  _call: CreateCall;

  constructor(call: CreateCall) {
    this._call = call;
  }

  get ticketCoin(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get rewardCoin(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get rewards(): Array<BigInt> {
    return this._call.inputValues[2].value.toBigIntArray();
  }

  get startTime(): BigInt {
    return this._call.inputValues[3].value.toBigInt();
  }

  get endTime(): BigInt {
    return this._call.inputValues[4].value.toBigInt();
  }
}

export class CreateCall__Outputs {
  _call: CreateCall;

  constructor(call: CreateCall) {
    this._call = call;
  }

  get id(): BigInt {
    return this._call.outputValues[0].value.toBigInt();
  }
}

export class GrantRoleCall extends ethereum.Call {
  get inputs(): GrantRoleCall__Inputs {
    return new GrantRoleCall__Inputs(this);
  }

  get outputs(): GrantRoleCall__Outputs {
    return new GrantRoleCall__Outputs(this);
  }
}

export class GrantRoleCall__Inputs {
  _call: GrantRoleCall;

  constructor(call: GrantRoleCall) {
    this._call = call;
  }

  get role(): Bytes {
    return this._call.inputValues[0].value.toBytes();
  }

  get account(): Address {
    return this._call.inputValues[1].value.toAddress();
  }
}

export class GrantRoleCall__Outputs {
  _call: GrantRoleCall;

  constructor(call: GrantRoleCall) {
    this._call = call;
  }
}

export class InitializeCall extends ethereum.Call {
  get inputs(): InitializeCall__Inputs {
    return new InitializeCall__Inputs(this);
  }

  get outputs(): InitializeCall__Outputs {
    return new InitializeCall__Outputs(this);
  }
}

export class InitializeCall__Inputs {
  _call: InitializeCall;

  constructor(call: InitializeCall) {
    this._call = call;
  }

  get _subscriptionId(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get _vrfCoordinator(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get _keyHash(): Bytes {
    return this._call.inputValues[2].value.toBytes();
  }
}

export class InitializeCall__Outputs {
  _call: InitializeCall;

  constructor(call: InitializeCall) {
    this._call = call;
  }
}

export class PerformUpkeepCall extends ethereum.Call {
  get inputs(): PerformUpkeepCall__Inputs {
    return new PerformUpkeepCall__Inputs(this);
  }

  get outputs(): PerformUpkeepCall__Outputs {
    return new PerformUpkeepCall__Outputs(this);
  }
}

export class PerformUpkeepCall__Inputs {
  _call: PerformUpkeepCall;

  constructor(call: PerformUpkeepCall) {
    this._call = call;
  }

  get performData(): Bytes {
    return this._call.inputValues[0].value.toBytes();
  }
}

export class PerformUpkeepCall__Outputs {
  _call: PerformUpkeepCall;

  constructor(call: PerformUpkeepCall) {
    this._call = call;
  }
}

export class PutLuckyPrizesCall extends ethereum.Call {
  get inputs(): PutLuckyPrizesCall__Inputs {
    return new PutLuckyPrizesCall__Inputs(this);
  }

  get outputs(): PutLuckyPrizesCall__Outputs {
    return new PutLuckyPrizesCall__Outputs(this);
  }
}

export class PutLuckyPrizesCall__Inputs {
  _call: PutLuckyPrizesCall;

  constructor(call: PutLuckyPrizesCall) {
    this._call = call;
  }

  get id(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get prizes(): Array<BigInt> {
    return this._call.inputValues[1].value.toBigIntArray();
  }
}

export class PutLuckyPrizesCall__Outputs {
  _call: PutLuckyPrizesCall;

  constructor(call: PutLuckyPrizesCall) {
    this._call = call;
  }
}

export class RawFulfillRandomWordsCall extends ethereum.Call {
  get inputs(): RawFulfillRandomWordsCall__Inputs {
    return new RawFulfillRandomWordsCall__Inputs(this);
  }

  get outputs(): RawFulfillRandomWordsCall__Outputs {
    return new RawFulfillRandomWordsCall__Outputs(this);
  }
}

export class RawFulfillRandomWordsCall__Inputs {
  _call: RawFulfillRandomWordsCall;

  constructor(call: RawFulfillRandomWordsCall) {
    this._call = call;
  }

  get requestId(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get randomWords(): Array<BigInt> {
    return this._call.inputValues[1].value.toBigIntArray();
  }
}

export class RawFulfillRandomWordsCall__Outputs {
  _call: RawFulfillRandomWordsCall;

  constructor(call: RawFulfillRandomWordsCall) {
    this._call = call;
  }
}

export class RegisterCandidateCall extends ethereum.Call {
  get inputs(): RegisterCandidateCall__Inputs {
    return new RegisterCandidateCall__Inputs(this);
  }

  get outputs(): RegisterCandidateCall__Outputs {
    return new RegisterCandidateCall__Outputs(this);
  }
}

export class RegisterCandidateCall__Inputs {
  _call: RegisterCandidateCall;

  constructor(call: RegisterCandidateCall) {
    this._call = call;
  }

  get id(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get player(): Address {
    return this._call.inputValues[1].value.toAddress();
  }
}

export class RegisterCandidateCall__Outputs {
  _call: RegisterCandidateCall;

  constructor(call: RegisterCandidateCall) {
    this._call = call;
  }

  get candidateId(): BigInt {
    return this._call.outputValues[0].value.toBigInt();
  }
}

export class RenounceRoleCall extends ethereum.Call {
  get inputs(): RenounceRoleCall__Inputs {
    return new RenounceRoleCall__Inputs(this);
  }

  get outputs(): RenounceRoleCall__Outputs {
    return new RenounceRoleCall__Outputs(this);
  }
}

export class RenounceRoleCall__Inputs {
  _call: RenounceRoleCall;

  constructor(call: RenounceRoleCall) {
    this._call = call;
  }

  get role(): Bytes {
    return this._call.inputValues[0].value.toBytes();
  }

  get account(): Address {
    return this._call.inputValues[1].value.toAddress();
  }
}

export class RenounceRoleCall__Outputs {
  _call: RenounceRoleCall;

  constructor(call: RenounceRoleCall) {
    this._call = call;
  }
}

export class RevokeRoleCall extends ethereum.Call {
  get inputs(): RevokeRoleCall__Inputs {
    return new RevokeRoleCall__Inputs(this);
  }

  get outputs(): RevokeRoleCall__Outputs {
    return new RevokeRoleCall__Outputs(this);
  }
}

export class RevokeRoleCall__Inputs {
  _call: RevokeRoleCall;

  constructor(call: RevokeRoleCall) {
    this._call = call;
  }

  get role(): Bytes {
    return this._call.inputValues[0].value.toBytes();
  }

  get account(): Address {
    return this._call.inputValues[1].value.toAddress();
  }
}

export class RevokeRoleCall__Outputs {
  _call: RevokeRoleCall;

  constructor(call: RevokeRoleCall) {
    this._call = call;
  }
}

export class SetTicketCalculatorCall extends ethereum.Call {
  get inputs(): SetTicketCalculatorCall__Inputs {
    return new SetTicketCalculatorCall__Inputs(this);
  }

  get outputs(): SetTicketCalculatorCall__Outputs {
    return new SetTicketCalculatorCall__Outputs(this);
  }
}

export class SetTicketCalculatorCall__Inputs {
  _call: SetTicketCalculatorCall;

  constructor(call: SetTicketCalculatorCall) {
    this._call = call;
  }

  get id(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get calculator(): Address {
    return this._call.inputValues[1].value.toAddress();
  }
}

export class SetTicketCalculatorCall__Outputs {
  _call: SetTicketCalculatorCall;

  constructor(call: SetTicketCalculatorCall) {
    this._call = call;
  }
}

export class VoteCall extends ethereum.Call {
  get inputs(): VoteCall__Inputs {
    return new VoteCall__Inputs(this);
  }

  get outputs(): VoteCall__Outputs {
    return new VoteCall__Outputs(this);
  }
}

export class VoteCall__Inputs {
  _call: VoteCall;

  constructor(call: VoteCall) {
    this._call = call;
  }

  get id(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get candidate(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }

  get tickets(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }
}

export class VoteCall__Outputs {
  _call: VoteCall;

  constructor(call: VoteCall) {
    this._call = call;
  }
}

export class WithdrawByPlayerCall extends ethereum.Call {
  get inputs(): WithdrawByPlayerCall__Inputs {
    return new WithdrawByPlayerCall__Inputs(this);
  }

  get outputs(): WithdrawByPlayerCall__Outputs {
    return new WithdrawByPlayerCall__Outputs(this);
  }
}

export class WithdrawByPlayerCall__Inputs {
  _call: WithdrawByPlayerCall;

  constructor(call: WithdrawByPlayerCall) {
    this._call = call;
  }

  get id(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get candidate(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }

  get to(): Address {
    return this._call.inputValues[2].value.toAddress();
  }
}

export class WithdrawByPlayerCall__Outputs {
  _call: WithdrawByPlayerCall;

  constructor(call: WithdrawByPlayerCall) {
    this._call = call;
  }
}

export class WithdrawByVoterCall extends ethereum.Call {
  get inputs(): WithdrawByVoterCall__Inputs {
    return new WithdrawByVoterCall__Inputs(this);
  }

  get outputs(): WithdrawByVoterCall__Outputs {
    return new WithdrawByVoterCall__Outputs(this);
  }
}

export class WithdrawByVoterCall__Inputs {
  _call: WithdrawByVoterCall;

  constructor(call: WithdrawByVoterCall) {
    this._call = call;
  }

  get id(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get candidate(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }

  get to(): Address {
    return this._call.inputValues[2].value.toAddress();
  }
}

export class WithdrawByVoterCall__Outputs {
  _call: WithdrawByVoterCall;

  constructor(call: WithdrawByVoterCall) {
    this._call = call;
  }
}
