import {
  BigInt,
  Address,
  ethereum
} from "@graphprotocol/graph-ts";
import {
  Transfer
} from '../generated/Token/Token'
import {
  Transfer as TransferEntity,
  Tvl as TvlEntity,
  Transaction as TransactionEntity,
  Block as BlockEntity,
} from '../generated/schema'
import {
  createBlockEntityIfNotExists,
  createTransactionEntityIfNotExists,
  createTokenEntityIfNotExists
} from './shared'

const TOKEN_SYMBOL = '{{token}}'
const BRIDGE_ADDRESS = '{{bridgeAddress}}'

export function handleTransfer(event: Transfer): void {
  if (
    !(event.params.to.equals(Address.fromHexString(BRIDGE_ADDRESS)) ||
    event.params.from.equals(Address.fromHexString(BRIDGE_ADDRESS)))
  ) {
    return
  }

  let id = event.params._event.transaction.hash.toHexString()
  let entity = TransferEntity.load(id)
  if (entity == null) {
    entity = new TransferEntity(id)
  }

  entity.from = event.params.from.toHexString()
  entity.to = event.params.to.toHexString()
  entity.value = event.params.value

  createBlockEntityIfNotExists(event.params._event)
  createTransactionEntityIfNotExists(event.params._event)
  entity.block = event.params._event.block.hash.toHexString()
  entity.transaction = event.params._event.transaction.hash.toHexString()

  // legacy
  entity.transactionHash = event.params._event.transaction.hash.toHexString()
  entity.transactionIndex = event.params._event.transaction.index
  entity.timestamp = event.params._event.block.timestamp
  entity.blockNumber = event.params._event.block.number
  entity.contractAddress = event.params._event.address.toHexString()
  entity.from = event.params._event.transaction.from.toHexString()
  entity.token = TOKEN_SYMBOL

  entity.save()

  const tvlId = "tvl:{{token}}"
  let tvlEntity = TvlEntity.load(tvlId)
  if (tvlEntity == null) {
    tvlEntity = new TvlEntity(tvlId)
    tvlEntity.amount = BigInt.fromString('0')
  }
  if (event.params.to.equals(Address.fromHexString(BRIDGE_ADDRESS))) {
    tvlEntity.amount = tvlEntity.amount.plus(event.params.value)
  }
  if (event.params.from.equals(Address.fromHexString(BRIDGE_ADDRESS))) {
    tvlEntity.amount = tvlEntity.amount.minus(event.params.value)
  }
  tvlEntity.token = TOKEN_SYMBOL
  tvlEntity.save()
}
