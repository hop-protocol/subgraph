import {
  ChallengeResolved,
  MultipleWithdrawalsSettled,
  TransferBondChallenged,
  TransferRootBonded,
  TransferRootConfirmed,
  TransferRootSet,
  TransferSentToL2,
  WithdrawalBondSettled,
  WithdrawalBonded
} from '../generated/HopL1Bridge/L1_Bridge'
import {
  ChallengeResolved as ChallengeResolvedEntity,
  MultipleWithdrawalsSettled as MultipleWithdrawalsSettledEntity,
  TransferBondChallenged as TransferBondChallengedEntity,
  TransferRootBonded as TransferRootBondedEntity,
  TransferRootConfirmed as TransferRootConfirmedEntity,
  TransferRootSet as TransferRootSetEntity,
  TransferSentToL2 as TransferSentToL2Entity,
  WithdrawalBondSettled as WithdrawalBondSettledEntity,
  WithdrawalBonded as WithdrawalBondedEntity
} from '../generated/schema'

export function handleChallengeResolved(event: ChallengeResolved): void {
  let id = event.params.rootHash.toHex()
  let entity = ChallengeResolvedEntity.load(id)
  if (entity == null) {
    entity = new ChallengeResolvedEntity(id)
  }

  entity.transferRootId = event.params.transferRootId
  entity.rootHash = event.params.rootHash
  entity.originalAmount = event.params.originalAmount

  entity.save()
}

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

export function handleTransferBondChallenged(event: TransferBondChallenged): void {
  let id = event.params.transferRootId.toHex()
  let entity = TransferBondChallengedEntity.load(id)
  if (entity == null) {
    entity = new TransferBondChallengedEntity(id)
  }

  entity.transferRootId = event.params.transferRootId
  entity.rootHash = event.params.rootHash
  entity.originalAmount = event.params.originalAmount

  entity.save()
}

export function handleTransferRootBonded(event: TransferRootBonded): void {
  let id = event.params.root.toHex()
  let entity = TransferRootBondedEntity.load(id)
  if (entity == null) {
    entity = new TransferRootBondedEntity(id)
  }

  entity.root = event.params.root
  entity.amount = event.params.amount

  entity.save()
}

export function handleTransferRootConfirmed(event: TransferRootConfirmed): void {
  let id = event.params.rootHash.toHex()
  let entity = TransferRootConfirmedEntity.load(id)
  if (entity == null) {
    entity = new TransferRootConfirmedEntity(id)
  }

  entity.originChainId = event.params.originChainId
  entity.destinationChainId = event.params.destinationChainId
  entity.rootHash = event.params.rootHash
  entity.totalAmount = event.params.totalAmount

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

export function handleTransferSentToL2(event: TransferSentToL2): void {
  let id = event.params._event.transaction.hash.toHexString()
  let entity = TransferSentToL2Entity.load(id)
  if (entity == null) {
    entity = new TransferSentToL2Entity(id)
  }

  entity.destinationChainId = event.params.chainId
  entity.recipient = event.params.recipient.toHexString()
  entity.amount = event.params.amount
  entity.amountOutMin = event.params.amountOutMin
  entity.deadline = event.params.deadline
  entity.relayer = event.params.relayer.toHexString()
  entity.relayerFee = event.params.relayerFee

  entity.save()
}


export function handleWithdrawalBondSettled(event: WithdrawalBondSettled): void {
  let id = event.params.transferId.toHex()
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
