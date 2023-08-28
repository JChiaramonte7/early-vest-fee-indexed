import {TypeormDatabase} from '@subsquid/typeorm-store'
import {processor, KWENTA_ADDRESS} from './processor'
import * as Kwenta from './abi/Kwenta'
import { getAddress } from 'viem'
import { Transfer, EarlyVestedCumulative } from './model'

const TREASURY_ADDRESS = "0x82d2242257115351899894eF384f779b5ba8c695"
const REWARD_ESCROW_ADDRESS = "0x1066A8eB3d90Af0Ad3F89839b974658577e75BE2"

processor.run(new TypeormDatabase({supportHotBlocks: true}), async (ctx) => {
    const {store} = ctx
    const currentAmountSentToTreasury = (await store.get(EarlyVestedCumulative, TREASURY_ADDRESS))?.amountSentToTreasury ?? 0n
    let transfers: Transfer[] = []

    for (let block of ctx.blocks) {
        for (let log of block.logs) {
            if (getAddress(log.address) === KWENTA_ADDRESS && log.topics[0] === Kwenta.events.Transfer.topic) {
                let {from, to, value} = Kwenta.events.Transfer.decode(log)
                if (from === REWARD_ESCROW_ADDRESS && TREASURY_ADDRESS === to) {
                    //ctx.log.info(`Parsed a Transfer of ${value} tokens from ${from} to ${to}`)
                    transfers.push(new Transfer({
                        id: log.id,
                        from: from,
                        to: to,
                        value: value,
                        timestamp: new Date(block.header.timestamp)
                    }))
                }
            }
        }
    }

    const totalTransferInBatch = transfers.reduce((acc, transfer) => acc + transfer.value, 0n)
    const newEarlyVestedCumulative = new EarlyVestedCumulative({
        id: TREASURY_ADDRESS,
        amountSentToTreasury: currentAmountSentToTreasury + totalTransferInBatch
    })
    await store.insert(transfers)
    await store.upsert(newEarlyVestedCumulative)
})
