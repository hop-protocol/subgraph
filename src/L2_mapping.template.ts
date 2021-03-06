import {
  Address,
  BigInt
} from "@graphprotocol/graph-ts";
import {
  BonderAdded,
  BonderRemoved,
  MultipleWithdrawalsSettled,
  Stake,
  TransferFromL1Completed,
  TransferRootSet,
  TransferSent,
  TransfersCommitted,
  Unstake,
  WithdrawalBondSettled,
  WithdrawalBonded,
  Withdrew,
} from '../generated/HopL2Bridge/L2_Bridge'
import {
  BonderAdded as BonderAddedEntity,
  BonderRemoved as BonderRemovedEntity,
  MultipleWithdrawalsSettled as MultipleWithdrawalsSettledEntity,
  Stake as StakeEntity,
  TransferFromL1Completed as TransferFromL1CompletedEntity,
  TransferRootSet as TransferRootSetEntity,
  TransferSent as TransferSentEntity,
  TransfersCommitted as TransfersCommittedEntity,
  Unstake as UnstakeEntity,
  WithdrawalBondSettled as WithdrawalBondSettledEntity,
  WithdrawalBonded as WithdrawalBondedEntity,
  Withdrew as WithdrewEntity,
  Volume as VolumeEntity,
  DailyVolume as DailyVolumeEntity,
  BonderFee as BonderFeeEntity,
  Token as TokenEntity,
} from '../generated/schema'
import {
  createBlockEntityIfNotExists,
  createTransactionEntityIfNotExists,
  createTokenEntityIfNotExists
} from './shared'

const TOKEN_ADDRESS = '{{address}}'
const TOKEN_NAME = '{{tokenName}}'
const TOKEN_SYMBOL = '{{token}}'
const TOKEN_DECIMALS = {{tokenDecimals}}

export function handleBonderAdded(event: BonderAdded): void {
  let id = event.transaction.hash.toHexString().concat(event.transactionLogIndex.toString())
  let entity = BonderAddedEntity.load(id)
  if (entity == null) {
    entity = new BonderAddedEntity(id)
  }

  entity.newBonder = event.params.newBonder.toHexString()

  createBlockEntityIfNotExists(event.params._event)
  createTransactionEntityIfNotExists(event.params._event)
  createTokenEntityIfNotExists(TOKEN_ADDRESS, TOKEN_NAME, TOKEN_SYMBOL, TOKEN_DECIMALS)
  entity.block = event.params._event.block.hash.toHexString()
  entity.transaction = event.params._event.transaction.hash.toHexString()
  entity.tokenEntity = TOKEN_ADDRESS

  // legacy
  entity.transactionHash = event.params._event.transaction.hash.toHexString()
  entity.transactionIndex = event.params._event.transaction.index
  entity.timestamp = event.params._event.block.timestamp
  entity.blockNumber = event.params._event.block.number
  entity.contractAddress = event.params._event.address.toHexString()
  entity.from = event.params._event.transaction.from.toHexString()
  entity.token = TOKEN_SYMBOL

  entity.save()
}

export function handleBonderRemoved(event: BonderRemoved): void {
  let id = event.transaction.hash.toHexString().concat(event.transactionLogIndex.toString())
  let entity = BonderRemovedEntity.load(id)
  if (entity == null) {
    entity = new BonderRemovedEntity(id)
  }

  entity.previousBonder = event.params.previousBonder.toHexString()

  createBlockEntityIfNotExists(event.params._event)
  createTransactionEntityIfNotExists(event.params._event)
  createTokenEntityIfNotExists(TOKEN_ADDRESS, TOKEN_NAME, TOKEN_SYMBOL, TOKEN_DECIMALS)
  entity.block = event.params._event.block.hash.toHexString()
  entity.transaction = event.params._event.transaction.hash.toHexString()
  entity.tokenEntity = TOKEN_ADDRESS

  // legacy
  entity.transactionHash = event.params._event.transaction.hash.toHexString()
  entity.transactionIndex = event.params._event.transaction.index
  entity.timestamp = event.params._event.block.timestamp
  entity.blockNumber = event.params._event.block.number
  entity.contractAddress = event.params._event.address.toHexString()
  entity.from = event.params._event.transaction.from.toHexString()
  entity.token = TOKEN_SYMBOL

  entity.save()
}

export function handleMultipleWithdrawalsSettled(event: MultipleWithdrawalsSettled): void {
  let id = event.transaction.hash.toHexString().concat(event.transactionLogIndex.toString())
  let entity = MultipleWithdrawalsSettledEntity.load(id)
  if (entity == null) {
    entity = new MultipleWithdrawalsSettledEntity(id)
  }

  entity.bonder = event.params.bonder.toHexString()
  entity.rootHash = event.params.rootHash
  entity.totalBondsSettled = event.params.totalBondsSettled

  createBlockEntityIfNotExists(event.params._event)
  createTransactionEntityIfNotExists(event.params._event)
  createTokenEntityIfNotExists(TOKEN_ADDRESS, TOKEN_NAME, TOKEN_SYMBOL, TOKEN_DECIMALS)
  entity.block = event.params._event.block.hash.toHexString()
  entity.transaction = event.params._event.transaction.hash.toHexString()
  entity.tokenEntity = TOKEN_ADDRESS

  // legacy
  entity.transactionHash = event.params._event.transaction.hash.toHexString()
  entity.transactionIndex = event.params._event.transaction.index
  entity.timestamp = event.params._event.block.timestamp
  entity.blockNumber = event.params._event.block.number
  entity.contractAddress = event.params._event.address.toHexString()
  entity.from = event.params._event.transaction.from.toHexString()
  entity.token = TOKEN_SYMBOL

  entity.save()
}

export function handleStake(event: Stake): void {
  let id = event.transaction.hash.toHexString().concat(event.transactionLogIndex.toString())
  let entity = StakeEntity.load(id)
  if (entity == null) {
    entity = new StakeEntity(id)
  }

  entity.account = event.params.account.toHexString()
  entity.amount = event.params.amount

  createBlockEntityIfNotExists(event.params._event)
  createTransactionEntityIfNotExists(event.params._event)
  createTokenEntityIfNotExists(TOKEN_ADDRESS, TOKEN_NAME, TOKEN_SYMBOL, TOKEN_DECIMALS)
  entity.block = event.params._event.block.hash.toHexString()
  entity.transaction = event.params._event.transaction.hash.toHexString()
  entity.tokenEntity = TOKEN_ADDRESS

  // legacy
  entity.transactionHash = event.params._event.transaction.hash.toHexString()
  entity.transactionIndex = event.params._event.transaction.index
  entity.timestamp = event.params._event.block.timestamp
  entity.blockNumber = event.params._event.block.number
  entity.contractAddress = event.params._event.address.toHexString()
  entity.from = event.params._event.transaction.from.toHexString()
  entity.token = TOKEN_SYMBOL

  entity.save()
}

export function handleTransferFromL1Completed(event: TransferFromL1Completed): void {
  let id = event.transaction.hash.toHexString().concat(event.transactionLogIndex.toString())
  let entity = TransferFromL1CompletedEntity.load(id)
  if (entity == null) {
    entity = new TransferFromL1CompletedEntity(id)
  }

  entity.recipient = event.params.recipient.toHexString()
  entity.amount = event.params.amount
  entity.amountOutMin = event.params.amountOutMin
  entity.deadline = event.params.deadline
  entity.relayer = event.params.relayer.toHexString()
  entity.relayerFee = event.params.relayerFee

  createBlockEntityIfNotExists(event.params._event)
  createTransactionEntityIfNotExists(event.params._event)
  createTokenEntityIfNotExists(TOKEN_ADDRESS, TOKEN_NAME, TOKEN_SYMBOL, TOKEN_DECIMALS)
  entity.block = event.params._event.block.hash.toHexString()
  entity.transaction = event.params._event.transaction.hash.toHexString()
  entity.tokenEntity = TOKEN_ADDRESS

  // legacy
  entity.transactionHash = event.params._event.transaction.hash.toHexString()
  entity.transactionIndex = event.params._event.transaction.index
  entity.timestamp = event.params._event.block.timestamp
  entity.blockNumber = event.params._event.block.number
  entity.contractAddress = event.params._event.address.toHexString()
  entity.from = event.params._event.transaction.from.toHexString()
  entity.token = TOKEN_SYMBOL

  entity.save()
}

export function handleTransferRootSet(event: TransferRootSet): void {
  let id = event.transaction.hash.toHexString().concat(event.transactionLogIndex.toString())
  let entity = TransferRootSetEntity.load(id)
  if (entity == null) {
    entity = new TransferRootSetEntity(id)
  }

  entity.rootHash = event.params.rootHash
  entity.totalAmount = event.params.totalAmount

  createBlockEntityIfNotExists(event.params._event)
  createTransactionEntityIfNotExists(event.params._event)
  createTokenEntityIfNotExists(TOKEN_ADDRESS, TOKEN_NAME, TOKEN_SYMBOL, TOKEN_DECIMALS)
  entity.block = event.params._event.block.hash.toHexString()
  entity.transaction = event.params._event.transaction.hash.toHexString()
  entity.tokenEntity = TOKEN_ADDRESS

  // legacy
  entity.transactionHash = event.params._event.transaction.hash.toHexString()
  entity.transactionIndex = event.params._event.transaction.index
  entity.timestamp = event.params._event.block.timestamp
  entity.blockNumber = event.params._event.block.number
  entity.contractAddress = event.params._event.address.toHexString()
  entity.from = event.params._event.transaction.from.toHexString()
  entity.token = TOKEN_SYMBOL

  entity.save()
}

export function handleTransferSent(event: TransferSent): void {
  let id = event.transaction.hash.toHexString().concat(event.transactionLogIndex.toString())
  let entity = TransferSentEntity.load(id)
  if (entity == null) {
    entity = new TransferSentEntity(id)
  }

  entity.transferId = event.params.transferId
  entity.destinationChainId = event.params.chainId
  entity.recipient = event.params.recipient.toHexString()
  entity.amount = event.params.amount
  entity.transferNonce = event.params.transferNonce
  entity.bonderFee = event.params.bonderFee
  entity.index = event.params.index
  entity.amountOutMin = event.params.amountOutMin
  entity.deadline = event.params.deadline

  createBlockEntityIfNotExists(event.params._event)
  createTransactionEntityIfNotExists(event.params._event)
  createTokenEntityIfNotExists(TOKEN_ADDRESS, TOKEN_NAME, TOKEN_SYMBOL, TOKEN_DECIMALS)
  entity.block = event.params._event.block.hash.toHexString()
  entity.transaction = event.params._event.transaction.hash.toHexString()
  entity.tokenEntity = TOKEN_ADDRESS

  // legacy
  entity.transactionHash = event.params._event.transaction.hash.toHexString()
  entity.transactionIndex = event.params._event.transaction.index
  entity.timestamp = event.params._event.block.timestamp
  entity.blockNumber = event.params._event.block.number
  entity.contractAddress = event.params._event.address.toHexString()
  entity.from = event.params._event.transaction.from.toHexString()
  entity.token = TOKEN_SYMBOL

  entity.save()

  // Cumulative volume
  const volumeId = "volume:{{token}}"
  let volumeEntity = VolumeEntity.load(volumeId)
  if (volumeEntity == null) {
    volumeEntity = new VolumeEntity(volumeId)
    volumeEntity.amount = BigInt.fromString('0')
  }
  volumeEntity.amount = volumeEntity.amount.plus(event.params.amount)
  volumeEntity.token = TOKEN_SYMBOL
  volumeEntity.save()

  // Daily volume
  // NOTE: TheGraph doesn't support date parsing because webassembly date support is primitive:
  // https://github.com/graphprotocol/support/issues/26
  // date logic borrowed from uniswap subgraphs:
  // https://github.com/graphprotocol/uniswap-subgraph/blob/ed19523cd80d29a6b403591f4f1b24746ab05023/src/mappings/exchange.ts#L190
  // Nov 2 2018 is 1541116800 for dayStartTimestamp and 17837 for dayID
  // Nov 3 2018 would be 1541116800 + 86400 and 17838, and so on.
  let blockTimestamp = event.params._event.block.timestamp.toI32()
  let dayID = blockTimestamp / 86400
  let dayStartTimestamp = dayID * 86400
  let dailyVolumeId = "volume:{{token}}:" + dayID.toString()
  let dailyVolumEntity = DailyVolumeEntity.load(dailyVolumeId)
  if (dailyVolumEntity == null) {
    dailyVolumEntity = new DailyVolumeEntity(dailyVolumeId)
    dailyVolumEntity.amount = BigInt.fromString('0')
  }
  dailyVolumEntity.amount = dailyVolumEntity.amount.plus(event.params.amount)
  dailyVolumEntity.token = TOKEN_SYMBOL
  dailyVolumEntity.date = dayStartTimestamp
  dailyVolumEntity.save()

  const bonderFeeId = "bonderFee:{{token}}"
  let bonderFeeEntity = BonderFeeEntity.load(bonderFeeId)
  if (bonderFeeEntity == null) {
    bonderFeeEntity = new BonderFeeEntity(bonderFeeId)
    bonderFeeEntity.amount = BigInt.fromString('0')
  }
  bonderFeeEntity.amount = bonderFeeEntity.amount.plus(event.params.bonderFee)
  bonderFeeEntity.token = TOKEN_SYMBOL
  bonderFeeEntity.save()
}

export function handleTransfersCommitted(event: TransfersCommitted): void {
  let id = event.transaction.hash.toHexString().concat(event.transactionLogIndex.toString())
  let entity = TransfersCommittedEntity.load(id)
  if (entity == null) {
    entity = new TransfersCommittedEntity(id)
  }

  entity.destinationChainId = event.params.destinationChainId
  entity.rootHash = event.params.rootHash
  entity.totalAmount = event.params.totalAmount
  entity.rootCommittedAt = event.params.rootCommittedAt

  createBlockEntityIfNotExists(event.params._event)
  createTransactionEntityIfNotExists(event.params._event)
  createTokenEntityIfNotExists(TOKEN_ADDRESS, TOKEN_NAME, TOKEN_SYMBOL, TOKEN_DECIMALS)
  entity.block = event.params._event.block.hash.toHexString()
  entity.transaction = event.params._event.transaction.hash.toHexString()
  entity.tokenEntity = TOKEN_ADDRESS

  // legacy
  entity.transactionHash = event.params._event.transaction.hash.toHexString()
  entity.transactionIndex = event.params._event.transaction.index
  entity.timestamp = event.params._event.block.timestamp
  entity.blockNumber = event.params._event.block.number
  entity.contractAddress = event.params._event.address.toHexString()
  entity.from = event.params._event.transaction.from.toHexString()
  entity.token = TOKEN_SYMBOL

  entity.save()
}

export function handleUnstake(event: Unstake): void {
  let id = event.transaction.hash.toHexString().concat(event.transactionLogIndex.toString())
  let entity = UnstakeEntity.load(id)
  if (entity == null) {
    entity = new UnstakeEntity(id)
  }

  entity.account = event.params.account.toHexString()
  entity.amount = event.params.amount

  createBlockEntityIfNotExists(event.params._event)
  createTransactionEntityIfNotExists(event.params._event)
  createTokenEntityIfNotExists(TOKEN_ADDRESS, TOKEN_NAME, TOKEN_SYMBOL, TOKEN_DECIMALS)
  entity.block = event.params._event.block.hash.toHexString()
  entity.transaction = event.params._event.transaction.hash.toHexString()
  entity.tokenEntity = TOKEN_ADDRESS

  // legacy
  entity.transactionHash = event.params._event.transaction.hash.toHexString()
  entity.transactionIndex = event.params._event.transaction.index
  entity.timestamp = event.params._event.block.timestamp
  entity.blockNumber = event.params._event.block.number
  entity.contractAddress = event.params._event.address.toHexString()
  entity.from = event.params._event.transaction.from.toHexString()
  entity.token = TOKEN_SYMBOL

  entity.save()
}

export function handleWithdrawalBondSettled(event: WithdrawalBondSettled): void {
  let id = event.transaction.hash.toHexString().concat(event.transactionLogIndex.toString())
  let entity = WithdrawalBondSettledEntity.load(id)
  if (entity == null) {
    entity = new WithdrawalBondSettledEntity(id)
  }

  entity.bonder = event.params.bonder.toHexString()
  entity.transferId = event.params.transferId
  entity.rootHash = event.params.rootHash

  createBlockEntityIfNotExists(event.params._event)
  createTransactionEntityIfNotExists(event.params._event)
  createTokenEntityIfNotExists(TOKEN_ADDRESS, TOKEN_NAME, TOKEN_SYMBOL, TOKEN_DECIMALS)
  entity.block = event.params._event.block.hash.toHexString()
  entity.transaction = event.params._event.transaction.hash.toHexString()
  entity.tokenEntity = TOKEN_ADDRESS

  // legacy
  entity.transactionHash = event.params._event.transaction.hash.toHexString()
  entity.transactionIndex = event.params._event.transaction.index
  entity.timestamp = event.params._event.block.timestamp
  entity.blockNumber = event.params._event.block.number
  entity.contractAddress = event.params._event.address.toHexString()
  entity.from = event.params._event.transaction.from.toHexString()
  entity.token = TOKEN_SYMBOL

  entity.save()
}

export function handleWithdrawalBonded(event: WithdrawalBonded): void {
  let id = event.transaction.hash.toHexString().concat(event.transactionLogIndex.toString())
  let entity = WithdrawalBondedEntity.load(id)
  if (entity == null) {
    entity = new WithdrawalBondedEntity(id)
  }

  entity.transferId = event.params.transferId
  entity.amount = event.params.amount

  createBlockEntityIfNotExists(event.params._event)
  createTransactionEntityIfNotExists(event.params._event)
  createTokenEntityIfNotExists(TOKEN_ADDRESS, TOKEN_NAME, TOKEN_SYMBOL, TOKEN_DECIMALS)
  entity.block = event.params._event.block.hash.toHexString()
  entity.transaction = event.params._event.transaction.hash.toHexString()
  entity.tokenEntity = TOKEN_ADDRESS

  // legacy
  entity.transactionHash = event.params._event.transaction.hash.toHexString()
  entity.transactionIndex = event.params._event.transaction.index
  entity.timestamp = event.params._event.block.timestamp
  entity.blockNumber = event.params._event.block.number
  entity.contractAddress = event.params._event.address.toHexString()
  entity.from = event.params._event.transaction.from.toHexString()
  entity.token = TOKEN_SYMBOL

  entity.save()
}

export function handleWithdrew(event: Withdrew): void {
  let id = event.transaction.hash.toHexString().concat(event.transactionLogIndex.toString())
  let entity = WithdrewEntity.load(id)
  if (entity == null) {
    entity = new WithdrewEntity(id)
  }

  entity.transferId = event.params.transferId
  entity.recipient = event.params.recipient.toHexString()
  entity.amount = event.params.amount
  entity.transferNonce = event.params.transferNonce

  createBlockEntityIfNotExists(event.params._event)
  createTransactionEntityIfNotExists(event.params._event)
  createTokenEntityIfNotExists(TOKEN_ADDRESS, TOKEN_NAME, TOKEN_SYMBOL, TOKEN_DECIMALS)
  entity.block = event.params._event.block.hash.toHexString()
  entity.transaction = event.params._event.transaction.hash.toHexString()
  entity.tokenEntity = TOKEN_ADDRESS

  // legacy
  entity.transactionHash = event.params._event.transaction.hash.toHexString()
  entity.transactionIndex = event.params._event.transaction.index
  entity.timestamp = event.params._event.block.timestamp
  entity.blockNumber = event.params._event.block.number
  entity.contractAddress = event.params._event.address.toHexString()
  entity.from = event.params._event.transaction.from.toHexString()
  entity.token = TOKEN_SYMBOL

  entity.save()
}
