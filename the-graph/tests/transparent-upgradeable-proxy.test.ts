import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { BigInt, Address, Bytes } from "@graphprotocol/graph-ts"
import { DistributePrizes } from "../generated/schema"
import { DistributePrizes as DistributePrizesEvent } from "../generated/TransparentUpgradeableProxy/TransparentUpgradeableProxy"
import { handleDistributePrizes } from "../src/transparent-upgradeable-proxy"
import { createDistributePrizesEvent } from "./transparent-upgradeable-proxy-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let id = BigInt.fromI32(234)
    let rewards = [BigInt.fromI32(234)]
    let winners = [BigInt.fromI32(234)]
    let newDistributePrizesEvent = createDistributePrizesEvent(
      id,
      rewards,
      winners
    )
    handleDistributePrizes(newDistributePrizesEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("DistributePrizes created and stored", () => {
    assert.entityCount("DistributePrizes", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "DistributePrizes",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "rewards",
      "[234]"
    )
    assert.fieldEquals(
      "DistributePrizes",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "winners",
      "[234]"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
