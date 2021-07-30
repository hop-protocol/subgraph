import {
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
  Withdrew
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
  BonderFee as BonderFeeEntity
} from '../generated/schema'

const TOKEN_SYMBOL = '{{token}}'

export function handleBonderAdded(event: BonderAdded): void {
  let id = event.params._event.transaction.hash.toHexString()
  let entity = BonderAddedEntity.load(id)
  if (entity == null) {
    entity = new BonderAddedEntity(id)
  }

  entity.newBonder = event.params.newBonder.toHexString()

  entity.transactionHash = event.params._event.transaction.hash.toHexString()
  entity.transactionIndex = event.params._event.transaction.index
  entity.timestamp = event.params._event.block.timestamp
  entity.blockNumber = event.params._event.block.number
  entity.contractAddress = event.params._event.address.toHexString()
  entity.token = TOKEN_SYMBOL

  entity.save()
}

export function handleBonderRemoved(event: BonderRemoved): void {
  let id = event.params._event.transaction.hash.toHexString()
  let entity = BonderRemovedEntity.load(id)
  if (entity == null) {
    entity = new BonderRemovedEntity(id)
  }

  entity.previousBonder = event.params.previousBonder.toHexString()

  entity.transactionHash = event.params._event.transaction.hash.toHexString()
  entity.transactionIndex = event.params._event.transaction.index
  entity.timestamp = event.params._event.block.timestamp
  entity.blockNumber = event.params._event.block.number
  entity.contractAddress = event.params._event.address.toHexString()
  entity.token = TOKEN_SYMBOL

  entity.save()
}

export function handleMultipleWithdrawalsSettled(event: MultipleWithdrawalsSettled): void {
  let id = event.params._event.transaction.hash.toHexString()
  let entity = MultipleWithdrawalsSettledEntity.load(id)
  if (entity == null) {
    entity = new MultipleWithdrawalsSettledEntity(id)
  }

  entity.bonder = event.params.bonder.toHexString()
  entity.rootHash = event.params.rootHash
  entity.totalBondsSettled = event.params.totalBondsSettled

  entity.transactionHash = event.params._event.transaction.hash.toHexString()
  entity.transactionIndex = event.params._event.transaction.index
  entity.timestamp = event.params._event.block.timestamp
  entity.blockNumber = event.params._event.block.number
  entity.contractAddress = event.params._event.address.toHexString()
  entity.token = TOKEN_SYMBOL

  entity.save()
}

export function handleStake(event: Stake): void {
  let id = event.params._event.transaction.hash.toHexString()
  let entity = StakeEntity.load(id)
  if (entity == null) {
    entity = new StakeEntity(id)
  }

  entity.account = event.params.account.toHexString()
  entity.amount = event.params.amount

  entity.transactionHash = event.params._event.transaction.hash.toHexString()
  entity.transactionIndex = event.params._event.transaction.index
  entity.timestamp = event.params._event.block.timestamp
  entity.blockNumber = event.params._event.block.number
  entity.contractAddress = event.params._event.address.toHexString()
  entity.token = TOKEN_SYMBOL

  entity.save()
}

export function handleTransferFromL1Completed(event: TransferFromL1Completed): void {
  let id = event.params._event.transaction.hash.toHexString()
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

  entity.transactionHash = event.params._event.transaction.hash.toHexString()
  entity.transactionIndex = event.params._event.transaction.index
  entity.timestamp = event.params._event.block.timestamp
  entity.blockNumber = event.params._event.block.number
  entity.contractAddress = event.params._event.address.toHexString()
  entity.token = TOKEN_SYMBOL

  entity.save()
}

export function handleTransferRootSet(event: TransferRootSet): void {
  let id = event.params._event.transaction.hash.toHexString()
  let entity = TransferRootSetEntity.load(id)
  if (entity == null) {
    entity = new TransferRootSetEntity(id)
  }

  entity.rootHash = event.params.rootHash
  entity.totalAmount = event.params.totalAmount

  entity.transactionHash = event.params._event.transaction.hash.toHexString()
  entity.transactionIndex = event.params._event.transaction.index
  entity.timestamp = event.params._event.block.timestamp
  entity.blockNumber = event.params._event.block.number
  entity.contractAddress = event.params._event.address.toHexString()
  entity.token = TOKEN_SYMBOL

  entity.save()
}

export function handleTransferSent(event: TransferSent): void {
  let id = event.params.transferId.toHex()
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

  entity.transactionHash = event.params._event.transaction.hash.toHexString()
  entity.transactionIndex = event.params._event.transaction.index
  entity.timestamp = event.params._event.block.timestamp
  entity.blockNumber = event.params._event.block.number
  entity.contractAddress = event.params._event.address.toHexString()
  entity.token = TOKEN_SYMBOL

  entity.save()

  const volumeId = "volume:{{token}}"
  let volumeEntity = VolumeEntity.load(volumeId)
  if (volumeEntity == null) {
    volumeEntity = new VolumeEntity(volumeId)
    volumeEntity.amount = BigInt.fromString('0')
  }
  volumeEntity.amount = volumeEntity.amount.plus(event.params.amount)
  volumeEntity.token = TOKEN_SYMBOL
  volumeEntity.save()

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
  let id = event.params._event.transaction.hash.toHexString()
  let entity = TransfersCommittedEntity.load(id)
  if (entity == null) {
    entity = new TransfersCommittedEntity(id)
  }

  entity.destinationChainId = event.params.destinationChainId
  entity.rootHash = event.params.rootHash
  entity.totalAmount = event.params.totalAmount
  entity.rootCommittedAt = event.params.rootCommittedAt

  entity.transactionHash = event.params._event.transaction.hash.toHexString()
  entity.transactionIndex = event.params._event.transaction.index
  entity.timestamp = event.params._event.block.timestamp
  entity.blockNumber = event.params._event.block.number
  entity.contractAddress = event.params._event.address.toHexString()
  entity.token = TOKEN_SYMBOL

  entity.save()
}

export function handleUnstake(event: Unstake): void {
  let id = event.params._event.transaction.hash.toHexString()
  let entity = UnstakeEntity.load(id)
  if (entity == null) {
    entity = new UnstakeEntity(id)
  }

  entity.account = event.params.account.toHexString()
  entity.amount = event.params.amount

  entity.transactionHash = event.params._event.transaction.hash.toHexString()
  entity.transactionIndex = event.params._event.transaction.index
  entity.timestamp = event.params._event.block.timestamp
  entity.blockNumber = event.params._event.block.number
  entity.contractAddress = event.params._event.address.toHexString()
  entity.token = TOKEN_SYMBOL

  entity.save()
}

export function handleWithdrawalBondSettled(event: WithdrawalBondSettled): void {
  let id = event.params._event.transaction.hash.toHexString()
  let entity = WithdrawalBondSettledEntity.load(id)
  if (entity == null) {
    entity = new WithdrawalBondSettledEntity(id)
  }

  entity.bonder = event.params.bonder.toHexString()
  entity.transferId = event.params.transferId
  entity.rootHash = event.params.rootHash

  entity.transactionHash = event.params._event.transaction.hash.toHexString()
  entity.transactionIndex = event.params._event.transaction.index
  entity.timestamp = event.params._event.block.timestamp
  entity.blockNumber = event.params._event.block.number
  entity.contractAddress = event.params._event.address.toHexString()
  entity.token = TOKEN_SYMBOL

  entity.save()
}

export function handleWithdrawalBonded(event: WithdrawalBonded): void {
  let id = event.params._event.transaction.hash.toHexString()
  let entity = WithdrawalBondedEntity.load(id)
  if (entity == null) {
    entity = new WithdrawalBondedEntity(id)
  }

  entity.transferId = event.params.transferId
  entity.amount = event.params.amount

  entity.transactionHash = event.params._event.transaction.hash.toHexString()
  entity.transactionIndex = event.params._event.transaction.index
  entity.timestamp = event.params._event.block.timestamp
  entity.blockNumber = event.params._event.block.number
  entity.contractAddress = event.params._event.address.toHexString()
  entity.token = TOKEN_SYMBOL

  entity.save()
}

export function handleWithdrew(event: Withdrew): void {
  let id = event.params._event.transaction.hash.toHexString()
  let entity = WithdrewEntity.load(id)
  if (entity == null) {
    entity = new WithdrewEntity(id)
  }

  entity.transferId = event.params.transferId
  entity.recipient = event.params.recipient.toHexString()
  entity.amount = event.params.amount
  entity.transferNonce = event.params.transferNonce

  entity.transactionHash = event.params._event.transaction.hash.toHexString()
  entity.transactionIndex = event.params._event.transaction.index
  entity.timestamp = event.params._event.block.timestamp
  entity.blockNumber = event.params._event.block.number
  entity.contractAddress = event.params._event.address.toHexString()
  entity.token = TOKEN_SYMBOL

  entity.save()
}
