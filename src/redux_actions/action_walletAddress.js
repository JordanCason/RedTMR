import {web3} from '../Comp_web3/abi.js'
// import { checkOwnerAction } from './action_contractTransactions.js'
export const UPDATE_WALLET_ADDRESS = 'UPDATE_WALLET_ADDRESS'
// https://www.youtube.com/watch?v=h892pHdLQtM&index=10&list=PL55RiY5tL51rrC3sh8qLiYHqUV3twEYU_
// using redux-promise-middleware
// !!!!!!!!!!!!!!!!!!!!!!!!!!

// export function walletAddressesAction() {
//     // return function(dispatch) {
//     return {
//         type: 'UPDATE_WALLET_ADDRESSES2',
//         payload: new Promise((resolve, reject) => {
//             const payload = {}
//             web3.eth.getAccounts().then(function(addresses) {
//                 payload.addresses = addresses
//                 web3.eth.getBalance(addresses[0]).then(balance => {
//                     balance = web3.utils.fromWei(balance, 'ether')
//                     if (balance.match(/\./g) == null) {
//                         payload.addressValue = `${balance} ETH`
//                     } else {
//                         payload.addressValue = `${balance.match(/\d*?\.\d{1,8}/g)[0]} ETH`
//                     };
//                     resolve(payload)
//                 })
//             })
//         })
//     }
// }

export function walletAddressAction(address) {
    let payload = {}
    payload.address = web3.utils.toChecksumAddress(address)
    return {
        type: UPDATE_WALLET_ADDRESS,
        payload: payload
    }
}

// export function walletAddressAction(newaddress) {
//     return {
//         type: UPDATE_WALLET_ADDRESS,
//         payload: new Promise((resolve, reject) => {
//             console.log(this)
//             const payload = {}
//             payload.walletAddress = newaddress
//             web3.eth.getBalance(newaddress).then(balance => {
//                 balance = web3.utils.fromWei(balance, 'ether')
//                 if (balance.match(/\./g) == null) {
//                     payload.addressValue = `${balance} ETH`
//                 } else {
//                     payload.addressValue = `${balance.match(/\d*?\.\d{1,8}/g)[0]} ETH`
//                 };
//                 resolve(payload)
//             })
//         })
//     }
// }
