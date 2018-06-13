import {myContract, web3, bountyabi} from '../Comp_web3/abi.js';
import {ipfs} from '../Comp_IPFS/Ipfs';

export const CURRENT_BOUNTY = 'CURRENT_BOUNTY';
export const CURRENT_BOUNTY_FULFILLED = 'CURRENT_BOUNTY_FULFILLED'


// by the time this action is called we should already have a list of all bountys within the system
// bountyInfo is a single entry in that list that has been passed to this action
// bounty address is the address of the bounty we want to set into "this.props.bountyCurrent"
export function bountyCurrentAction(bountyAddress, bountyInfo) {
    return {
        type: CURRENT_BOUNTY,
        payload: new Promise((resolve, reject) => {
            //console.log(bountyInfo)
            bountyInfo.address = bountyAddress
            web3.eth.getBalance(bountyAddress).then(balance => {
                balance = web3.utils.fromWei(balance, 'ether')
                bountyInfo.balance = balance
                if (bountyInfo.owner === this.ethereumWallet.walletAddress) {
                    bountyInfo.isOwner = true;
                } else {
                    bountyInfo.isOwner = false;
                }
                resolve(bountyInfo)
            })
        })
    }
}

export const CHECK_OWNER = "CHECK_OWNER"
export const CHECK_OWNER_FULFILLED = 'CHECK_OWNER_FULFILLED';

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
