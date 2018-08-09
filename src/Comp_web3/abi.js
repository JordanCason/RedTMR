import {BountyFactoryAbi, BountyFactoryAddress} from '../contracts/abi/BountyFactoryAbi'
import {BountyAbi} from '../contracts/abi/BountyAbi'
console.log("booting")
console.log(window)
var Web3 = require('web3');

export var myContract;
export var bountyabi;
export var web3;

if (window.web3) {
    console.log("found Web3")
    //web3 = window.web3
    window.web3 = new Web3(window.web3.currentProvider);
    //web3 = new Web3(window.web3.currentProvider);
    web3 = window.web3
}

// If the browser has injected Web3.js

// if (typeof web3 !== 'undefined') {
//     console.log('using metamask')
//     web3 = new web3(web3.correntProvider);
// } else {
//     console.log('using web3 provider')
//     //web3 = new Web3(); web3.setProvider(new Web3.providers.HttpProvider('http://159.65.232.230:7545'));
//     //web3 = new Web3(); web3.setProvider(new Web3.providers.HttpProvider('http://127.0.0.1:7545'));
//     web3 = new Web3(); web3.setProvider(new Web3.providers.HttpProvider('http://159.65.232.230:57890'));
// }


myContract = new web3.eth.Contract(BountyFactoryAbi, BountyFactoryAddress);
bountyabi = BountyAbi;




// myContract = new web3.eth.Contract(BountyFactoryAbi, BountyFactoryAddress, { //@dev contract address
// from: web3.eth.defaultAccount, // default from address
// gasPrice: '20000000000' // default gas price in wei, 20 gwei in this case
// });


// [
// {
//     "constant": false,
//     "inputs": [
//         {
//             "name": "ipfs",
//             "type": "string"
//         }
//     ],
//     "name": "createBounty",
//     "outputs": [],
//     "payable": false,
//     "stateMutability": "nonpayable",
//     "type": "function"
// },
// {
//     "constant": true,
//     "inputs": [
//         {
//             "name": "",
//             "type": "uint256"
//         }
//     ],
//     "name": "bountyArray",
//     "outputs": [
//         {
//             "name": "",
//             "type": "address"
//         }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
// },
// {
//     "constant": true,
//     "inputs": [],
//     "name": "getContractCount",
//     "outputs": [
//         {
//             "name": "",
//             "type": "uint256"
//         }
//     ],
//     "payable": false,
//     "stateMutability": "view",
//     "type": "function"
// },
// {
//     "anonymous": false,
//     "inputs": [
//         {
//             "indexed": false,
//             "name": "",
//             "type": "address"
//         }
//     ],
//     "name": "returnBounty",
//     "type": "event"
// }
// ]
