import {
  MultipleWithdrawalsSettled,
  TransferRootSet,
  TransferSent,
  TransfersCommitted,
  WithdrawalBondSettled,
  WithdrawalBonded
} from '../generated/HopL2Bridge/L2_Bridge'
import {
  MultipleWithdrawalsSettled as MultipleWithdrawalsSettledEntity,
  TransferRootSet as TransferRootSetEntity,
  TransferSent as TransferSentEntity,
  TransfersCommitted as TransfersCommittedEntity,
  WithdrawalBondSettled as WithdrawalBondSettledEntity,
  WithdrawalBonded as WithdrawalBondedEntity
} from '../generated/schema'

export function handleMultipleWithdrawalsSettled(event: MultipleWithdrawalsSettled): void {
  let id = event.params.rootHash.toHex()
  let entity = MultipleWithdrawalsSettledEntity.load(id)
  if (entity == null) {
    entity = new MultipleWithdrawalsSettledEntity(id)
  }

  entity.bonder = event.params.bonder.toHexString()
  entity.rootHash = event.params.rootHash
  entity.totalBondsSettled = event.params.totalBondsSettled

  entity.save()
}

export function handleTransferRootSet(event: TransferRootSet): void {
  let id = event.params.rootHash.toHex()
  let entity = TransferRootSetEntity.load(id)
  if (entity == null) {
    entity = new TransferRootSetEntity(id)
  }

  entity.rootHash = event.params.rootHash
  entity.totalAmount = event.params.totalAmount

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

  entity.save()
}

export function handleTransfersCommitted(event: TransfersCommitted): void {
  let id = event.params.rootHash.toHex()
  let entity = TransfersCommittedEntity.load(id)
  if (entity == null) {
    entity = new TransfersCommittedEntity(id)
  }

  entity.destinationChainId = event.params.destinationChainId
  entity.rootHash = event.params.rootHash
  entity.totalAmount = event.params.totalAmount
  entity.rootCommittedAt = event.params.rootCommittedAt

  entity.save()
}

export function handleWithdrawalBondSettled(event: WithdrawalBondSettled): void {
  let id = event.params.rootHash.toHex()
  let entity = WithdrawalBondSettledEntity.load(id)
  if (entity == null) {
    entity = new WithdrawalBondSettledEntity(id)
  }

  entity.bonder = event.params.bonder.toHexString()
  entity.transferId = event.params.transferId
  entity.rootHash = event.params.rootHash

  entity.save()
}

export function handleWithdrawalBonded(event: WithdrawalBonded): void {
  let id = event.params.transferId.toHex()
  let entity = WithdrawalBondedEntity.load(id)
  if (entity == null) {
    entity = new WithdrawalBondedEntity(id)
  }

  entity.transferId = event.params.transferId
  entity.amount = event.params.amount

  entity.save()
}
