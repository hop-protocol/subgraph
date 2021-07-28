import {
  Transfer
} from '../generated/Token/Token'
import {
  BigInt,
  Address
} from "@graphprotocol/graph-ts";
import {
  Transfer as TransferEntity,
  Tvl as TvlEntity
} from '../generated/schema'
import keccak256 from 'keccak256'

const TOKEN_SYMBOL = '{{token}}'
const AMM_ADDRESS = '{{address}}'

const ids = {
  USDC: '0xdefd5f1714e5f23dcbd59ed529318750e641b9a89ef2f40027d090cd7fc1ed9d', // hash(tvl:TOKEN_SYMBOL)
  USDT: '0x53cbedb611c96d507471ec3c6446ee802c223ad0bbcfd96a9a0079d23462ee0f'
}

export function handleTransfer(event: Transfer): void {
  let id = event.params._event.transaction.hash.toHexString()
  let entity = TransferEntity.load(id)
  if (entity == null) {
    entity = new TransferEntity(id)
  }

  entity.from = event.params.from.toHexString()
  entity.to = event.params.to.toHexString()
  entity.value = event.params.value

  entity.transactionHash = event.params._event.transaction.hash.toHexString()
  entity.transactionIndex = event.params._event.transaction.index
  entity.timestamp = event.params._event.block.timestamp
  entity.blockNumber = event.params._event.block.number
  entity.contractAddress = event.params._event.address.toHexString()
  entity.token = TOKEN_SYMBOL

  entity.save()

  const tvlId = ids[TOKEN_SYMBOL]
  let tvlEntity = TvlEntity.load(tvlId)
  if (tvlEntity == null) {
    tvlEntity = new TvlEntity(tvlId)
    tvlEntity.amount = BigInt.fromString('0')
  }
  if (event.params.to.equals(Address.fromHexString(AMM_ADDRESS))) {
    tvlEntity.amount = tvlEntity.amount.plus(event.params.value)
  }
  if (event.params.from.equals(Address.fromHexString(AMM_ADDRESS))) {
    tvlEntity.amount = tvlEntity.amount.minus(event.params.value)
  }
  tvlEntity.token = TOKEN_SYMBOL
  tvlEntity.save()
}
