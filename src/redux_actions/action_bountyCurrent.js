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
            bountyInfo.address = bountyAddress
            web3.eth.getBalance(bountyAddress).then(balance => {
                balance = web3.utils.fromWei(balance, 'ether')
                bountyInfo.balance = balance
                store.dispatch(checkOwnerAction(bountyInfo.owner, this.ethereumWallet.walletAddress)).then(result => {
                    if (!result.action.payload) {
                        store.dispatch(checkBountyStateHackerAction(this.ethereumWallet.walletAddress, bountyAddress))
                        resolve(bountyInfo)
                    } else if (result.action.payload) {
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
                result = parseInt(result, 10)
                let count = 0
                for (let i = 1; i < result + 1; i++) {
                    // @dev submissionArray holds the address to each submited vulnerablity
                    bountyContract.methods.SubmissionArray(i).call().then(address => {
                        // @dev get the ipfs link and remaning contract information
                        bountyContract.methods.mappingAddressToStruct(address).call().then(data => {
                            let submission = {}
                            submission.ipfsSubmission = web3.utils.hexToUtf8(data.ipfsSubmission)
                            submission.lastActionBy = data.lastActionBy
                            submission.stage = data.stage
                            submission.submitter = data.submitter
                            ipfs.catJSON(submission.ipfsSubmission, (err, ipfsresult) => {
                                count += 1
                                submission = {
                                    ...submission,
                                    ...ipfsresult
                                }
                                console.log(submission)
                                ownerSubmissionsArray[i] = submission
                                if (count === result) {
                                    resolve(ownerSubmissionsArray)
                                }
                            })
                        })
                    })
                }
            })
        })
    }
}


export const BOUNTY_OWNER_STATE_SELECT = 'BOUNTY_OWNER_STATE_SELECT'
export const BOUNTY_OWNER_STATE_SELECT_FULFILLED = 'BOUNTY_OWNER_STATE_SELECT_FULFILLED'

export const bountyOwnerStateSelectAction = (index) => {
    return {
        type: BOUNTY_OWNER_STATE_SELECT,
        payload: index
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

export const acceptVulnAction = (walletAddress, bountyAddress, bountySubmitter) => {
    console.log(`walletAddress = ${walletAddress}| bountyAddress = ${bountyAddress}| bountySubmitter = ${bountySubmitter}`)
    return {
        type: ACCEPT_VULN,
        payload: new Promise((resolve, reject) => {
            console.log('vulnerablity')
            const bountyContract = new web3.eth.Contract(bountyabi, bountyAddress)
            const transaction = {
                from: walletAddress,
                gas: 3000000
            }
            bountyContract.methods.acceptVuln(bountySubmitter).send(transaction).then((result, err) => {
                console.log(result)
                console.log(err)
                resolve(result)
            })
        })
    }
}









































































// working space
