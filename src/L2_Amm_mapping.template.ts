import {
  BigInt,
} from "@graphprotocol/graph-ts";
import {
  TokenSwap
} from '../generated/HopL2Amm/L2_Amm'
import {
  TokenSwap as TokenSwapEntity,
  AmmFees as AmmFeesEntity,
} from '../generated/schema'

const TOKEN_SYMBOL = '{{token}}'
const BASIS_POINTS = '4000000' // 4bps
const FEE_DENOMINATOR = '10000000000' // 10**10

export function handleTokenSwap(event: TokenSwap): void {
  let id = event.params._event.transaction.hash.toHexString()
  let entity = TokenSwapEntity.load(id)
  if (entity == null) {
    entity = new TokenSwapEntity(id)
  }

  entity.buyer = event.params.buyer.toHexString()
  entity.tokensSold = event.params.tokensSold
  entity.tokensBought = event.params.tokensBought
  entity.soldId = event.params.soldId
  entity.boughtId = event.params.boughtId

  entity.transactionHash = event.params._event.transaction.hash.toHexString()
  entity.transactionIndex = event.params._event.transaction.index
  entity.timestamp = event.params._event.block.timestamp
  entity.blockNumber = event.params._event.block.number
  entity.contractAddress = event.params._event.address.toHexString()
  entity.token = TOKEN_SYMBOL

  entity.save()

  const ammFeesId = "ammFees:{{token}}"
  let ammFeesEntity = AmmFeesEntity.load(ammFeesId)
  if (ammFeesEntity == null) {
    ammFeesEntity = new AmmFeesEntity(ammFeesId)
    ammFeesEntity.amount = BigInt.fromString('0')
  }

  ammFeesEntity.amount = ammFeesEntity.amount.plus(event.params.tokensSold.times(BigInt.fromString(BASIS_POINTS)).div(BigInt.fromString(FEE_DENOMINATOR)))
  ammFeesEntity.token = TOKEN_SYMBOL
  ammFeesEntity.save()
}
