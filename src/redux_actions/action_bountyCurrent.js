import {web3, bountyabi} from '../Comp_web3/abi.js'
import { store } from '../index.js'
import {ipfs} from '../Comp_IPFS/Ipfs'

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
                store.dispatch(checkOwnerAction(bountyInfo.owner, this.ethereumWallet.walletAddress)).then(result => {
                    console.log(result)
                    if (!result.value) {
                        store.dispatch(checkBountyStateHackerAction(this.ethereumWallet.walletAddress, bountyAddress))
                        resolve(bountyInfo)
                    } else if (result.value) {
                        console.log('owner Check')
                        store.dispatch(checkBountyOwnerStateAction(bountyAddress))
                        resolve(bountyInfo)
                    } else {
                        resolve(bountyInfo)
                    }
                })
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
            let payload
            console.log(`%c ${cureWalletAddress} = ${bountyCurrent}`, `color:blue`)
            if (bountyCurrent === cureWalletAddress) {
                payload = true
            } else {
                payload = false
            }
            resolve(payload)
        })
    }
}


export const CHECK_BOUNTY_HACKER_STATE = 'CHECK_BOUNTY_HACKER_STATE'
export const CHECK_BOUNTY_HACKER_STATE_FULFILLED = 'CHECK_BOUNTY_HACKER_STATE_FULFILLED'

export const checkBountyStateHackerAction = (walletAddress, bountyAddress) => {
    return {
        type: CHECK_BOUNTY_HACKER_STATE,
        payload: new Promise((resolve, reject) => {
            const bountyContract = new web3.eth.Contract(bountyabi, bountyAddress)
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

export const CHECK_BOUNTY_OWNER_STATE = 'CHECK_BOUNTY_OWNER_STATE'
export const CHECK_BOUNTY_OWNER_STATE_FULFILLED = 'CHECK_BOUNTY_OWNER_STATE_FULFILLED'

export const checkBountyOwnerStateAction = (bountyAddress) => {
    return {
        type: CHECK_BOUNTY_OWNER_STATE,
        payload: new Promise((resolve, reject) => {
            const bountyContract = new web3.eth.Contract(bountyabi, bountyAddress)
            let ownerSubmissionsArray = {}
            // @dev arraylength is the amount of submited vulnerablitys in the contract
            bountyContract.methods.arraylength().call().then(result => {
                for (let i = 1; i < parseInt(result, 10) + 1; i++) {
                    // @dev submissionArray holds the address to each submited vulnerablity
                    bountyContract.methods.SubmissionArray(i).call().then(address => {
                        // @dev get the ipfs link and remaning contract information
                        bountyContract.methods.mappingAddressToStruct(address).call().then(result => {
                            let submission = {}
                            submission.ipfsSubmission = web3.utils.hexToUtf8(result.ipfsSubmission)
                            submission.lastActionBy = result.lastActionBy
                            submission.stage = result.stage
                            submission.submitter = result.submitter
                            ipfs.catJSON(submission.ipfsSubmission, (err, ipfsresult) => {
                                console.log('here')
                                submission = {
                                    ...submission,
                                    ...ipfsresult
                                }
                                console.log(submission)
                                ownerSubmissionsArray[i] = submission
                            })
                        })
                    })
                }
            })
            resolve(ownerSubmissionsArray)
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



export const ACCEPT_VULN = 'ACCEPT_VULN'
export const ACCEPT_VULN_FULFILLED = 'ACCEPT_VULN_FULFILLED'

export const acceptVulnAction = (bountyAddress) => {
    console.log(bountyAddress)
    return {
        type: ACCEPT_VULN,
        payload: new Promise((resolve, reject) => {
            console.log('vulnerablity')
            const bountyContract = new web3.eth.Contract(bountyabi, bountyAddress)
            bountyContract.methods.acceptVuln().call().then(result => {
                console.log(result)
                resolve(result)
            })
        })
    }
}









































































// working space
