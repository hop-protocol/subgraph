import {
  TransferSentToL2
} from '../generated/HopL1Bridge/L1_Bridge'
import {
  TransferSentToL2  as TransferSentToL2Entity,
} from '../generated/schema'

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

