import {lookupArchive} from '@subsquid/archive-registry'
import {
    BlockHeader,
    DataHandlerContext,
    EvmBatchProcessor,
    EvmBatchProcessorFields,
    Log as _Log,
    Transaction as _Transaction,
} from '@subsquid/evm-processor'
import * as Kwenta from './abi/Kwenta'

export const KWENTA_ADDRESS = "0x920Cf626a271321C151D027030D5d08aF699456b";

export const processor = new EvmBatchProcessor()
    .setDataSource({
        // Change the Archive endpoints for run the squid
        // against the other EVM networks
        // For a full list of supported networks and config options
        // see https://docs.subsquid.io/evm-indexing/
        archive: lookupArchive('optimism-mainnet'),

        // Must be set for RPC ingestion (https://docs.subsquid.io/evm-indexing/evm-processor/)
        // OR to enable contract state queries (https://docs.subsquid.io/evm-indexing/query-state/)
        chain: 'https://rpc.ankr.com/optimism',
    })
    .setFinalityConfirmation(75)
    .setBlockRange({
        from: 100_000_000,
    })
    .addLog({
        address: [KWENTA_ADDRESS],
        topic0: [Kwenta.events.Transfer.topic]
    })

export type Fields = EvmBatchProcessorFields<typeof processor>
export type Block = BlockHeader<Fields>
export type Log = _Log<Fields>
export type Transaction = _Transaction<Fields>
export type ProcessorContext<Store> = DataHandlerContext<Store, Fields>
