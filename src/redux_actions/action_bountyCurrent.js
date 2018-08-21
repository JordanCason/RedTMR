import {web3, bountyabi} from '../Comp_web3/abi.js'
import { store } from '../index.js'

export const CURRENT_BOUNTY = 'CURRENT_BOUNTY'
export const CURRENT_BOUNTY_PENDING = 'CURRENT_BOUNTY_PENDING'
export const CURRENT_BOUNTY_FULFILLED = 'CURRENT_BOUNTY_FULFILLED'
// by the time this action is called we should already have a list of all bountys within the system
// bountyInfo is a single entry in that list that has been passed to this action
// bounty address is the address of the bounty we want to set into "this.props.bountyCurrent"
export function bountyCurrentAction(bountyAddress, bountyInfo) {
    return {
        type: CURRENT_BOUNTY,
        payload: new Promise((resolve, reject) => {
            // console.log(bountyInfo)
            bountyInfo.address = bountyAddress
            web3.eth.getBalance(bountyAddress).then(balance => {
                balance = web3.utils.fromWei(balance, 'ether')
                bountyInfo.balance = balance
                if (bountyInfo.owner === this.ethereumWallet.walletAddress) {
                    bountyInfo.isOwner = true
                } else {
                    bountyInfo.isOwner = false
                }
                store.dispatch(checkBountyStateAction(this.ethereumWallet.walletAddress, bountyAddress))
                resolve(bountyInfo)
            })
        })
    }
}

export const CHECK_OWNER = 'CHECK_OWNER'
export const CHECK_OWNER_FULFILLED = 'CHECK_OWNER_FULFILLED'

export const checkOwnerAction = (cureWalletAddress, bountyCurrent) => {
    return {
        type: CHECK_OWNER,
        payload: new Promise((resolve, reject) => {
            if (bountyCurrent.owner === cureWalletAddress) {
                resolve(true)
            } else {
                resolve(false)
            }
        })
    }
}

export const CHECK_BOUNTY_STATE = 'CHECK_BOUNTY_STATE'
export const CHECK_BOUNTY_STATE_FULFILLED = 'CHECK_BOUNTY_STATE_FULFILLED'

export const checkBountyStateAction = (walletAddress, bountyAddress) => {
    return {
        type: CHECK_BOUNTY_STATE,
        payload: new Promise((resolve, reject) => {
            const bountyContract = new web3.eth.Contract(bountyabi, bountyAddress)
            console.log(bountyContract.methods)
            bountyContract.methods.mappingAddressToStruct(walletAddress).call().then(result => {
                let payload = {}
                payload.CCVE = result.CCVE
                payload.ipfsSubmission = result.ipfsSubmission
                payload.lastActionBy = result.lastActionBy
                payload.stage = result.stage
                payload.submitter = result.submitter
                payload.bountySubmission = result.submitter !== '0x0000000000000000000000000000000000000000'
                resolve(payload)
            })
        })
    }
}

export const CURRENT_BOUNTY_CLEANUP = 'CURRENT_BOUNTY_CLEANUP'

export function currentBountCleanupAction(name, value) {
    return {
        type: CURRENT_BOUNTY_CLEANUP,
        payload: ''
    }
}
