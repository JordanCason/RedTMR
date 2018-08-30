import {myContract, web3, bountyabi} from '../Comp_web3/abi.js'
import {ipfs} from '../Comp_IPFS/Ipfs'

export const GET_BOUNTYS = 'GET_BOUNTYS'
export const GET_BOUNTYS_PENDING = 'GET_BOUNTYS_PENDING'
export const GET_BOUNTYS_FULFILLED = 'GET_BOUNTYS_FULFILLED'
// https://www.youtube.com/watch?v=h892pHdLQtM&index=10&list=PL55RiY5tL51rrC3sh8qLiYHqUV3twEYU_
// using redux-promise-middleware
// !!!!!!!!!!!!!!!!!!!!!!!!!!

export function bountysListAction() {
    // return function(dispatch) {
    return {
        type: GET_BOUNTYS,
        payload: new Promise((resolve, reject) => {
            myContract.methods.getContractCount().call().then(function(contracts) {
                contracts = parseInt(contracts, 10) // the radix is 10 (decimal)
                // console.log('bountyList')
                // console.log(contracts)
                var contractDict = {}
                for (let i = 0; i < contracts; i++) {
                    myContract.methods.bountyArray(i).call().then(bountyContractAddress => {
                        let bountyContract = new web3.eth.Contract(bountyabi, bountyContractAddress)
                        bountyContract.methods.ownerInfo().call().then(result => {
                            ipfs.hexToBase58(result[2]).then((encodedResult) => {
                                ipfs.catJSON(encodedResult, (err, ipfsresult) => {
                                    ipfsresult.owner = result[1]
                                    // console.log("action")
                                    // console.log(result)
                                    // console.log(ipfsresult)
                                    web3.eth.getBalance(bountyContractAddress).then(balance => {
                                        ipfsresult.balance = web3.utils.fromWei(balance, 'ether')
                                        contractDict[bountyContractAddress] = ipfsresult
                                        if (Object.keys(contractDict).length === contracts) {
                                            resolve(contractDict)
                                        }
                                    })
                                })
                            })
                        })
                    })
                }
            })
        })
    }
}

// export function getBountyList() {
//     return function(dispatch) {
//             myContract.methods.getContractCount().call().then(function(contracts) {
//                 contracts = parseInt(contracts, 10);  the radix is 10 (decimal)
//                 var contractDict = {};
//                 for (let i = 0; i < contracts; i++) {
//                     myContract.methods.bountyArray(i).call().then(bountyContractAddress => {
//                         let bountyContract = new web3.eth.Contract(bountyabi, bountyContractAddress)
//                         bountyContract.methods.ownerInfo().call().then(result => {
//                             ipfs.catJSON(result[2], (err, ipfsresult) => {
//                                 contractDict[bountyContractAddress] = ipfsresult;
//                                  contractArray.splice([result[0]], 0, ipfsresult)
//                                 if (Object.keys(contractDict).length === contracts) {
//                                     return dispatch({
//                                         type: GET_BOUNTYS,
//                                         payload: contractDict,
//                                     });
//                                 };
//                             });
//                         });
//                     });
//                 }
//             });
//     }
// }
