const fs = require('fs');
const solc = require('solc');
const Web3 = require('web3');
const util = require('util');
var path = require('path');
//https://ethereum.stackexchange.com/questions/21206/how-to-include-solidity-file-into-another

//only compile thease contracts
// key is the source contract dict is all the imports
const web3 = new Web3(); web3.setProvider(new Web3.providers.HttpProvider('http://159.65.232.230:57890'));
web3.eth.accounts.privateKeyToAccount(fs.readFileSync('./testingkeys.js').toString())


const contractList = {
    "BountyFactory.sol": ["Bounty.sol", "Ownable.sol"],
    "future.sol": ["future2.sol", "future3.sol"]
}

var fsTimeout // timeout for fs.watch witch can fire more than once
const contractDir = './src/contracts/';

const test = () => {
    fs.watch(contractDir, function (event, file) {
        if (!fsTimeout){
            fsTimeout = true
            for (keyCount in Object.keys(contractList)) { // list all keys of the object
                dictKey = Object.keys(contractList)[keyCount]
                    if (file === dictKey) {
                        console.log("compile: " + dictKey)
                        deploy(dictKey, contractDir)
                    }
                 contractList[Object.keys(contractList)[keyCount]].map((contract) => {
                     if (file === contract ) {  // if file = contract pick first item in dict to compile imports will be added later
                         console.log("compile: " + dictKey)
                         deploy(dictKey, contractDir)
                     }
                 })
            }
        };
        fsTimeout = setTimeout(function() { fsTimeout=null }, 500)
    });
}


const deploy = (inputKey, contractDir) => {
    console.log(`Deploying ${inputKey}`);

    const input = {
         [inputKey] : fs.readFileSync(`${contractDir}${inputKey}`).toString(),
    }

    const output = solc.compile({sources: input}, 1, (path) => {
        console.log(`Found import ./${path}`)
        return {'contents': fs.readFileSync(`${contractDir}${path}`).toString()}
        if (output.errors !== undefined) {
            console.log(`Errors:: ${output.errors}`)
            return
        }
    });

    for (let outputKey in output.contracts) {
        const contractName = outputKey.match(/(.+?)(\.sol)/g).toString()
        const abi =  JSON.parse(output.contracts[outputKey].interface)
                        console.log("compile: " + dictKey)
        const bytecode = '0x' + output.contracts[outputKey].bytecode
        if (outputKey.includes(inputKey)) {
            const contract = new web3.eth.Contract(abi)
            web3.eth.getAccounts().then(function(data) {
                    const address = data[0];
                    console.log(address)
                    contract.deploy({
                        data: bytecode,
                    })
                    .send({
                        from: address,
                        gas: 4000000,
                        gasPrice: '2000000',
                    })
                    .then((instance) => {outputToJs(instance.options.address, abi, contractName, contractDir)});
                })
            }
            else {
                outputToJs('NULL', abi, contractName, contractDir);
            }

        }
    }


const outputToJs = (address, abi, contractName, contractDir) => {
    fs.writeFile(`${contractDir}abi/${contractName.replace('.sol',  'Abi.js')}`, `
export let ${contractName.replace('.sol',  'Address')};
export let ${contractName.replace('.sol',  'Abi')};
${contractName.replace('.sol',  'Address')} = "${address}"
${contractName.replace('.sol',  'Abi')} = ${util.inspect(abi, false, null)}
    `, function(err) {
    if(err) {
        return console.log(err);
    }
    console.log(`contract abi saved to: abi/${contractName.replace('.sol',  'Abi.js')}`);
    });
    }


test()

























        // contractName = contractName.match(contractNameRegex)
        // if (contractNameRegex.test(contractName[0])) {
        //     if (!fsTimeout) {
        //         fsTimeout = true
        //         switch (contractName[0]){
        //             case "Bounty.sol":
        //                 console.log(contractName[0])
        //                 deploy(contractName, contractDir);
        //                 break;
        //             case "BountyFactory.sol":
        //                 console.log(contractName[0])
        //                 deploy(contractName, contractDir);
        //                 //fsTimeout = setTimeout(function() { fsTimeout=null }, 1000)
        //                 //fsTimeout = null
        //                 break;
        //             default:
        //             console.log('No match for contract, add test case to switch statment in ContractDeployer')
        //             //fsTimeout = setTimeout(function() { fsTimeout=null }, 500)
        //         }
        //     }
        //         //switch
        // };





// console.log(contractkey)
//     console.log(output.contracts[contractkey].interface)
//     abi =  JSON.parse(output.contracts[contractkey].interface)
//     const contract = new web3.eth.Contract(abi)
//
//     if (contractkey === "BountyFactory.sol:BountyFactory") {
//         console.log('here in web3')
//     web3.eth.getAccounts().then(function(data) {
//             const address = data[0];
//             contract.deploy({
//                 data: '0x' + output.contracts[contractkey].bytecode,
//             })
//             .send({
//                 from: address,
//                 gas: 4000000,
//                 gasPrice: '2000000',
//             })
//             .then((instance) => {
//                 console.log(`Address: ${instance.options.address}`);
//                 console.log(util.inspect(abi, false, null))
//                 //let filelocation = `./contracts/${filename[0]}.js`
//                 fs.writeFile(`./src/contracts/BountyFactoryAbi.js`, `
//     export let bountyContractAbi;
//     export let bountyContractAddress;
//     bountyContractAddress = "${instance.options.address}"
//     bountyContractAbi = ${util.inspect(abi, false, null)}
//                 `, function(err) {
//                 if(err) {
//                     return console.log(err);
//                 }
//                 console.log("The file was saved!");
//                 fsTimeout=null
//                 //fsTimeout = setTimeout(function() { fsTimeout=null }, 500) // give 5 seconds for multiple events
//                 });
//                 });
//         })
//     }


    // for use with custom import
    // const input = getInput(contractName, contractDir)
    // const output = JSON.parse(solc.compileStandard(input, (path) => {
    //     console.log(`Found import ./${path}`)
    //     return {'contents': fs.readFileSync(`${contractDir}${path}`).toString()}
    // }))
    // console.log("##################")
    // //console.log(Object.keys(output.contracts))
    // console.log(util.inspect(output, false, null))
    //
    // console.log("##################")
    // //console.log(output.contracts['BountyFactory.sol'])


    // for (var x in output.contracts)
    // console.log(x + ': ' + output.contracts[x].deployedBytecode)



        // for (i=0; i < Object.keys(output.contracts).length ; i++){
        //     console.log(Object.keys(output.contracts)[i]);}
        //     const bytecode = output.contracts[Object.keys(output.contracts)[i]].bytecode;
        //     const abi = JSON.parse(output.contracts[Object.keys(output.contracts)[i]].interface);





        //for (i=0; i < Object.keys(output.contracts).length; i++)
            //console.log(Object.keys(output.contracts).split(","))

    //console.log(Object.keys(output.contracts))




//     web3.eth.getAccounts().then(function(data) {
//         const address = data[0];
//         contract.deploy({
//             data: '0x' + bytecode,
//         })
//         .send({
//             from: address,
//             gas: 4000000,
//             gasPrice: '2000000',
//         })
//         .then((instance) => {
//             console.log(`Address: ${instance.options.address}`);
//             console.log(util.inspect(abi, false, null))
//             //let filelocation = `./contracts/${filename[0]}.js`
//             fs.writeFile(`./src/contracts/${filename[1]}Abi.js`, `
// export let bountyContractAbi;
// export let bountyContractAddress;
// bountyContractAddress = "${instance.options.address}"
// bountyContractAbi = ${util.inspect(abi, false, null)}
//             `, function(err) {
//             if(err) {
//                 return console.log(err);
//             }
//             console.log("The file was saved!");
//             fsTimeout=null
//             //fsTimeout = setTimeout(function() { fsTimeout=null }, 500) // give 5 seconds for multiple events
//             });
//             });
//     })





//
//
//
// const returnAbi = () => {
//
// }
//
// test()
//
// //
//
//
// //
// // #####################for use with compileStatndard ##########################
// //
// //
// //
// // const output = solc.compileStandard(input, (path) => {
// //     console.log(`Found import ./${path}`)
// //     return {'contents': fs.readFileSync(`${contractDir}${path}`).toString()}
// //
// getInput = (contractName, contractDir) => {
//     console.log('###############')
// console.log(`${contractDir}${contractName[0]}`)
// input = JSON.stringify({
//   language: "Solidity",
//   sources:
//   {
//     "BountyFactory.sol":
//     {
//       "content": fs.readFileSync(`${contractDir}${contractName[0]}`).toString()
//     }
//   },
//   settings:
//   {
//     remappings: [ ":g/dir" ],
//     optimizer: {
//       enabled: false,
//       runs: 200
//     },
//     evmVersion: "byzantium",
//     metadata: {
//       useLiteralContent: true
//     },
//     libraries: {
//         "BountyFactory.sol": {
//             "Bounty.sol": ""
//         }
//     },
//     outputSelection: {
//       "*": {
//         "*": [ "evm.bytecode.object", "abi"  ]
//       }
//     }
//   }
// })
// return input
// }
// //  #############################################################
//
//
//
//
// // contractName = fs.readFileSync(`${contractDir}${path}`).toString()
// //     .match(new RegExp(/contract (.+?) {/))
// //console.log(contractName[1])
//
//
// // const deploy = (contractName, contractDir) => {
// //     console.log(`Deploying ${contractName[0]}`);
// //
//     const input = {
//          [contractName[0]] : fs.readFileSync(`${contractDir}${contractName[0]}`).toString(),
//     }
//
//     const output = solc.compile({sources: input}, 1, (path) => {
//         console.log(`Found import ./${path}`)
//         // contractName = fs.readFileSync(`${contractDir}${path}`).toString()
//         //     .match(new RegExp(/contract (.+?) {/))
//         //console.log(contractName[1])
//
//
//         //if (path === 'Bounty.sol')
//         return {'contents': fs.readFileSync(`${contractDir}${path}`).toString()}
//     });
//     console.log('here')
//     console.log(output)
//     //console.log(`input = ${JSON.stringify(util.inspect(input, false, null))}`)
//
// }
//
// const returnAbi = () => {
//
// }
//
// test()
//















//console.log(Object.keys(output.contracts[':BountyFactory'].bytecode))  //[ ':BountyFactory', ':bounty' ]
//console.log(util.inspect(output.contracts, false, null))
//helo
