import { TransferSent } from '../generated/Hop/L2_Bridge'
import { TransferSent as TransferSentEntity } from '../generated/schema'

export function handleTransferSent(event: TransferSent): void {
  let id = event.params.transferId.toHex()
  let transferSent = TransferSentEntity.load(id)
  if (transferSent == null) {
    transferSent = new TransferSentEntity(id)
  }

  transferSent.transferId = event.params.transferId
  transferSent.destinationChainId = event.params.chainId
  transferSent.recipient = event.params.recipient.toHexString()
  transferSent.amount = event.params.amount
  transferSent.transferNonce = event.params.transferNonce
  transferSent.bonderFee = event.params.bonderFee
  transferSent.index = event.params.index
  transferSent.amountOutMin = event.params.amountOutMin
  transferSent.deadline = event.params.deadline

  transferSent.save()
}
