import * as ethers from 'ethers'
import {LogEvent, Func, ContractBase} from './abi.support'
import {ABI_JSON} from './Kwenta.abi'

export const abi = new ethers.Interface(ABI_JSON);

export const events = {
    Approval: new LogEvent<([owner: string, spender: string, value: bigint] & {owner: string, spender: string, value: bigint})>(
        abi, '0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925'
    ),
    OwnerChanged: new LogEvent<([oldOwner: string, newOwner: string] & {oldOwner: string, newOwner: string})>(
        abi, '0xb532073b38c83145e3e5135377a08bf9aab55bc0fd7c1179cd4fb995d2a5159c'
    ),
    OwnerNominated: new LogEvent<([newOwner: string] & {newOwner: string})>(
        abi, '0x906a1c6bd7e3091ea86693dd029a831c19049ce77f1dce2ce0bab1cacbabce22'
    ),
    Transfer: new LogEvent<([from: string, to: string, value: bigint] & {from: string, to: string, value: bigint})>(
        abi, '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef'
    ),
}

export const functions = {
    acceptOwnership: new Func<[], {}, []>(
        abi, '0x79ba5097'
    ),
    allowance: new Func<[owner: string, spender: string], {owner: string, spender: string}, bigint>(
        abi, '0xdd62ed3e'
    ),
    approve: new Func<[spender: string, amount: bigint], {spender: string, amount: bigint}, boolean>(
        abi, '0x095ea7b3'
    ),
    balanceOf: new Func<[account: string], {account: string}, bigint>(
        abi, '0x70a08231'
    ),
    burn: new Func<[amount: bigint], {amount: bigint}, []>(
        abi, '0x42966c68'
    ),
    decimals: new Func<[], {}, number>(
        abi, '0x313ce567'
    ),
    decreaseAllowance: new Func<[spender: string, subtractedValue: bigint], {spender: string, subtractedValue: bigint}, boolean>(
        abi, '0xa457c2d7'
    ),
    increaseAllowance: new Func<[spender: string, addedValue: bigint], {spender: string, addedValue: bigint}, boolean>(
        abi, '0x39509351'
    ),
    mint: new Func<[account: string, amount: bigint], {account: string, amount: bigint}, []>(
        abi, '0x40c10f19'
    ),
    name: new Func<[], {}, string>(
        abi, '0x06fdde03'
    ),
    nominateNewOwner: new Func<[_owner: string], {_owner: string}, []>(
        abi, '0x1627540c'
    ),
    nominatedOwner: new Func<[], {}, string>(
        abi, '0x53a47bb7'
    ),
    owner: new Func<[], {}, string>(
        abi, '0x8da5cb5b'
    ),
    setSupplySchedule: new Func<[_supplySchedule: string], {_supplySchedule: string}, []>(
        abi, '0x332f3256'
    ),
    supplySchedule: new Func<[], {}, string>(
        abi, '0xc40dd66f'
    ),
    symbol: new Func<[], {}, string>(
        abi, '0x95d89b41'
    ),
    totalSupply: new Func<[], {}, bigint>(
        abi, '0x18160ddd'
    ),
    transfer: new Func<[recipient: string, amount: bigint], {recipient: string, amount: bigint}, boolean>(
        abi, '0xa9059cbb'
    ),
    transferFrom: new Func<[sender: string, recipient: string, amount: bigint], {sender: string, recipient: string, amount: bigint}, boolean>(
        abi, '0x23b872dd'
    ),
}

export class Contract extends ContractBase {

    allowance(owner: string, spender: string): Promise<bigint> {
        return this.eth_call(functions.allowance, [owner, spender])
    }

    balanceOf(account: string): Promise<bigint> {
        return this.eth_call(functions.balanceOf, [account])
    }

    decimals(): Promise<number> {
        return this.eth_call(functions.decimals, [])
    }

    name(): Promise<string> {
        return this.eth_call(functions.name, [])
    }

    nominatedOwner(): Promise<string> {
        return this.eth_call(functions.nominatedOwner, [])
    }

    owner(): Promise<string> {
        return this.eth_call(functions.owner, [])
    }

    supplySchedule(): Promise<string> {
        return this.eth_call(functions.supplySchedule, [])
    }

    symbol(): Promise<string> {
        return this.eth_call(functions.symbol, [])
    }

    totalSupply(): Promise<bigint> {
        return this.eth_call(functions.totalSupply, [])
    }
}
