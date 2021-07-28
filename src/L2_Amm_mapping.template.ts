import {
  TokenSwap
} from '../generated/HopL2Amm/L2_Amm'
import {
  TokenSwap as TokenSwapEntity
} from '../generated/schema'

const TOKEN_SYMBOL = '{{token}}'

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
}
