import {myContract, web3, bountyabi} from '../Comp_web3/abi.js';
import {ipfs} from '../Comp_IPFS/Ipfs';
import {depositEthToast, confirmSendToast, transactionReceiptToast} from '../Comp_toast/Toast'

const DEPOSIT_ETHEREUM = "DEPOSIT_ETHEREUM"
const WITHDRAW_ETHEREUM = "WITHDRAW_ETHEREUM"
const CHECK_OWNER = "CHECK_OWNER"
export const DEPOSIT_ETHEREUM_FULFILLED = 'DEPOSIT_ETHEREUM_FULFILLED';
export const WITHDRAW_ETHEREUM_FULFILLED = 'WITHDRAW_ETHEREUM_FULFILLED';
export const CHECK_OWNER_FULFILLED = 'CHECK_OWNER_FULFILLED';




export const depositEthAction = (walletAddress, bountyAddress, depositValue, comName) => {
    return {
        type: DEPOSIT_ETHEREUM,
        payload: new Promise((resolve, reject) => {
            confirmSendToast(bountyAddress, depositValue, comName).then((result) => {console.log(result)
                const payload = {}
                console.log("deposit eth")
                 const bountycontract = new web3.eth.Contract(bountyabi, bountyAddress);
                     const transaction = {
                         from: walletAddress,
                         to: bountyAddress,
                         value: web3.utils.toWei(depositValue, 'ether'),
                         }
                     bountycontract.methods.deposit().send(transaction)
                     .on('transactionHash', function(hash){
                         depositEthToast(hash)
                     })
                      .on('receipt', (receipt) => {
                          payload.receipt = receipt;
                          payload.value = depositValue;
                          console.log('receipt')
                          transactionReceiptToast(receipt, depositValue)

                          resolve(payload);
                      })
                     // .on('confirmation', function(confirmationNumber, receipt){
                     //     console.log(confirmationNumber)
                     //     console.log(receipt)
                     // })
                      .on('error', console.error);
                //
            })
        })
    }
}

export const withdrawEthAction = (walletAddress, bountyAddress, withdrawValue, comName) => {
    return {
        type: WITHDRAW_ETHEREUM,
        payload: new Promise((resolve, reject) => {
            confirmSendToast(bountyAddress, withdrawValue, comName).then((result) => {console.log(result)
                const payload = {}
                const bountycontract = new web3.eth.Contract(bountyabi, bountyAddress);
                const transaction = {
                    from: walletAddress,
                    to: bountyAddress
                    }
                    console.log(transaction)
                bountycontract.methods.withdraw(web3.utils.toWei(withdrawValue, 'ether')).send(transaction)
                 .on('transactionHash', function(hash){
                    depositEthToast(hash)
                })
                .on('receipt', function(receipt){
                    payload.receipt = receipt;
                    payload.value = withdrawValue;
                    transactionReceiptToast(receipt, withdrawValue)
                    resolve(payload);
                })
                // .on('confirmation', function(confirmationNumber, receipt){
                //     console.log(confirmationNumber)
                //     console.log(receipt)
                // })
                .on('error', (error) => {
                    console.log("are you the owner of the contract?")
                    console.log(error)
                });
            })
        })
    }
}



// const { walletAddresses, walletAddress, addressValue, walletLoaded } = this.props.ethereumWallet
//
// const deposit = (toAddress) => { // later i can use porps to set the address
//     const bountycontract = new web3.eth.Contract(bountyabi, toAddress);
//     const value = document.querySelector("#ethInput").value;
//     const transaction = {
//         from: account,
//         to: toAddress,
//         value: web3.utils.toWei(value, 'ether'),
//         }
//         console.log(bountycontract)
//     bountycontract.methods.deposit().send(transaction)
//     .on('transactionHash', function(hash){
//         console.log(hash)
//     })
//     .on('receipt', function(receipt){
//         console.log(receipt)
//     })
//     // .on('confirmation', function(confirmationNumber, receipt){
//     //     console.log(confirmationNumber)
//     //     console.log(receipt)
//     // })
//     .on('error', console.error);
//     }
//
//     const withdraw = (toAddress) => {
//         const bountycontract = new web3.eth.Contract(bountyabi, toAddress);
//         const value = document.querySelector("#withdraw").value;
//         const transaction = {
//             from: account,
//             to: toAddress,
//             }
//             console.log(bountycontract)
//         bountycontract.methods.withdraw(web3.utils.toWei(value, 'ether')).send(transaction)
//         .on('transactionHash', function(hash){
//             console.log(hash)
//         })
//         .on('receipt', function(receipt){
//             console.log(receipt)
//         })
//         // .on('confirmation', function(confirmationNumber, receipt){
//         //     console.log(confirmationNumber)
//         //     console.log(receipt)
//         // })
//         .on('error', console.error);
//         }
//
//     const checkOwner = (owner) => {
//         if (account === owner) {
//             return "you are the owner of this contract"
//         }
//         else {
//             return "would you like to submit a bounty"
//         }
//     }
