const fs = require('fs');
const solc = require('solc');
const Web3 = require('web3');
const util = require('util')

//console.log(Object.keys(output.contracts[':BountyFactory'].bytecode))  //[ ':BountyFactory', ':bounty' ]
//console.log(util.inspect(output.contracts, false, null))
//helo

function findImports() {
    console.log('in find imports')
    console.log(fs.readFileSync("./src/contracts/Bounty.sol").toString())
    return {'contents': fs.readFileSync("./src/contracts/Bounty.sol").toString()}
}

const web3 = new Web3();
web3.setProvider(new Web3.providers.HttpProvider('http://159.65.232.230:57890'));
var fsTimeout
var match = new RegExp(/^(.+)(\.sol)$/);
var filename


const test = () => {

    fs.watch('./src/contracts', function (event, filename) {
        if (match.test(filename)) {
            filename = filename.match(match)
            if (!fsTimeout) {
                console.log(event);
                fsTimeout = true;

                console.log(`Deploying ${filename[0]}`);

                let input = {
                    'BountyFactory.sol' : fs.readFileSync(`./src/contracts/${filename[0]}`).toString(),
                }

                const output = solc.compile({sources: input}, 1, () => {return {'contents': fs.readFileSync("./src/contracts/Bounty.sol").toString()}}); //start working here
                if (output.errors !== undefined) {
                    console.log(`Errors:: ${output.errors}`)
                    return
                }
                // to get the name of the contract

                let regexContract = new RegExp(/contract (.+?) {/);
                console.log(input[filename[0]])


                let contractName = input[filename[0]].match(regexContract)
                console.log(contractName[1])


                const bytecode = output.contracts[`${filename[0]}:${contractName[1]}`].bytecode;
                const abi = JSON.parse(output.contracts[`${filename[0]}:${contractName[1]}`].interface);
                //console.log(util.inspect(bytecode, false, null))

                // Contract object
                const contract = new web3.eth.Contract(abi);
                //console.log(util.inspect(abi, false, null))

                web3.eth.getAccounts().then(function(data) {
                    const address = data[0];
                    contract.deploy({
                        data: '0x' + bytecode,
                    })
                    .send({
                        from: address,
                        gas: 4000000,
                        gasPrice: '2000000',
                    })
                    .then((instance) => {
                        console.log(`Address: ${instance.options.address}`);
                        console.log(util.inspect(abi, false, null))
                        //let filelocation = `./contracts/${filename[0]}.js`
                        fs.writeFile(`./src/contracts/${filename[1]}Abi.js`, `
export let bountyContractAbi;
export let bountyContractAddress;
bountyContractAddress = "${instance.options.address}"
bountyContractAbi = ${util.inspect(abi, false, null)}
                        `, function(err) {
                        if(err) {
                            return console.log(err);
                        }
                        console.log("The file was saved!");
                        fsTimeout=null
                        //fsTimeout = setTimeout(function() { fsTimeout=null }, 500) // give 5 seconds for multiple events
                        });
                        });
                })

            }
        }
    });
}
test()
