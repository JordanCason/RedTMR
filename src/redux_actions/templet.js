import {myContract, web3, bountyabi} from '../Comp_web3/abi.js';
import {ipfs} from '../Comp_IPFS/Ipfs';

const DEPOSIT_ETHEREUM = "DEPOSIT_ETHEREUM"
const WITHDRAW_ETHEREUM = "WITHDRAW_ETHEREUM"
const CHECK_OWNER = "CHECK_OWNER"
export const DEPOSIT_ETHEREUM_FULFILLED = 'DEPOSIT_ETHEREUM_FULFILLED';
export const WITHDRAW_ETHEREUM_FULFILLED = 'WITHDRAW_ETHEREUM_FULFILLED';
export const CHECK_OWNER_FULFILLED = 'CHECK_OWNER_FULFILLED';



export const depositEthAction = () => {
    return {
        type: DEPOSIT_ETHEREUM,
        payload: new Promise((resolve, reject) => {
            resolve("")
        })
    }
}

export const withdrawEthAction = () => {
    return {
        type: WITHDRAW_ETHEREUM,
        payload: new Promise((resolve, reject) => {
            resolve("")
        })
    }
}

export const checkOwnerAction = () => {
    return {
        type: CHECK_OWNER,
        payload: new Promise((resolve, reject) => {
            resolve("")
        })
    }
}
