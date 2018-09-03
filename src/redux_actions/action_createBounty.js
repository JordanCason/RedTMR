import { myContract, web3, bountyabi } from '../Comp_web3/abi.js'
import { store } from '../index.js'
import { upload, loadimg, ipfs, ipfsHost } from '../Comp_IPFS/Ipfs'
import faker from 'faker'
import { markdownInitCreateBounty } from '../Comp_CreateBounty/sampleVDP'
import { ipfsHashToast, transactionReceiptToast, transactionHashToast } from '../Comp_toast/Toast'
export const PROFILE_PICTURE = 'PROFILE_PICTURE'
export const PROFILE_PICTURE_PENDING = 'PROFILE_PICTURE_PENDING'
export const PROFILE_PICTURE_FULFILLED = 'PROFILE_PICTURE_FULFILLED'

const imgIpfs = (img, callback) => {
    upload(img).then(function (data) {
        loadimg(`http://${ipfsHost}/ipfs/${data}`).then(data => callback(data))
    })
}

// check file beforeUpload
const beforeUpload = (file) => {
    const message = {}
    console.log(file.type.includes('image/'))
    if (!file.type.includes('image/')) { message.error = 'You can only upload img files!' }
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
        message.error = 'Image must smaller than 2MB!'
    }
    return (message)
}

export function profilePictureAction(e) {
    return {
        type: PROFILE_PICTURE,
        payload: new Promise((resolve, reject) => {
            console.log(e)
            if (e.target.files[0]) {
                console.log(e.target.files[0].type.includes('image/'))
                // console.log(e.target.files[0])
                const check = beforeUpload(e.target.files[0])

                if (!check.error) {
                    imgIpfs(e.target.files[0], imageUrl => resolve(imageUrl))
                } else {
                    console.log(check.error)
                }
            }
        })
    }
}

export const PROFILE_PICTURE_ERR = 'PROFILE_PICTURE_ERR'
export function profilePictureErrAction(err) {
    return {
        type: PROFILE_PICTURE_ERR,
        payload: err
    }
}

export const GENERATE_PICTURE_FULFILLED = 'GENERATE_PICTURE_FULFILLED'
export const GENERATE_PICTURE = 'GENERATE_PICTURE'
export function setPictureLoadedTrueAction(picture) {
    return {
        type: GENERATE_PICTURE,
        payload: new Promise((resolve, reject) => {
            console.log('generate picture')
            const payload = {}
            payload.picture = picture
            payload.loaded = true
            resolve(payload)
        })
    }
}

export const GENERATE_FORM_DATA_FULFILLED = 'GENERATE_FORM_DATA_FULFILLED'
export const GENERATE_FORM_DATA = 'GENERATE_FORM_DATA'
export function generateFormDataAction() {
    return {
        type: GENERATE_FORM_DATA,
        payload: new Promise((resolve, reject) => {
            console.log('generateFormDataAction')
            const formFields = {
                comName: faker.company.companyName(),
                website: faker.internet.domainName(),
                comAbout: faker.company.catchPhrase(),
                secEmail: faker.internet.email(),
                maxEth: faker.random.number({min: 4, max: 13}),
                minEth: faker.random.number({min: 1, max: 3}),
                Bountytextarea: markdownInitCreateBounty
            }
            store.dispatch(setPictureLoadedTrueAction(faker.image.avatar())).then((result) => {
                formFields.uploadImg = result.value.picture
                formFields.loaded = result.value.loaded
                console.log(formFields)
                resolve(formFields)
            })
        })
    }
}


export const SUBMIT_BOUNTY_FULFILLED = 'SUBMIT_BOUNTY_FULFILLED'
export const SUBMIT_BOUNTY = 'SUBMIT_BOUNTY'
export function submitBountyAction(values, wallet) {
    return {
        type: SUBMIT_BOUNTY,
        payload: new Promise((resolve, reject) => {
            const { walletAddress } = wallet
            // Need to addin a check to make sure values are enterd """Was getting an errer when no imag was upladed"""
            ipfs.addJSON({ // push data to ipfs
                uploadImg: values.uploadImg,
                comName: values.comName,
                comAbout: values.comAbout,
                secEmail: values.secEmail,
                maxEth: values.maxEth,
                minEth: values.minEth,
                Bountytextarea: values.Bountytextarea
            }, (err, result) => {
                ipfs.base58ToHex(result).then((result) => {
                    ipfsHashToast(result) // display IPFS hash in toast
                    // console.log(values.deposit)
                    const deposit = web3.utils.toWei(values.deposit.toString(), 'ether')
                    // neet to use a try catch incase ipfs is down and send to error page
                    myContract.methods.createBounty(result).send({from: walletAddress, gas: 3000000, value: deposit}) // save ipfs hash and create contract
                        // neet to use a try catch incase ipfs is down and send to error page
                        .on('transactionHash', function(hash) {
                            transactionHashToast(hash)
                        })
                        .on('receipt', (receipt) => {
                            transactionReceiptToast(receipt, deposit)
                            // let bountyContractAddress = receipt.events.returnBounty.returnValues[0]
                            // let bountyContract = new web3.eth.Contract(bountyabi, bountyContractAddress)
                            // bountyContract.methods.ownerInfo().call().then(function(result) {
                            //     // console.log(`contract info: `, result)
                            //     resolve()
                            // })
                            // need to setup a listner to get contract address and display toast
                        })
                        .on('confirmation', (result) => {
                            resolve(true)
                        })
                })
            })
        })
    }
}


export const submitRandomVulnerablityAction = (walletAddress, bountyAddress) => {
    return {
        type: SUBMIT_BOUNTY,
        payload: new Promise((resolve, reject) => {
            const precision = 10 // 1 decimals
            const randomnum = Math.floor(Math.random() * (10 * precision - 1 * precision) + 1 * precision) / (1 * precision)
            console.log(randomnum)
            const vulnData = {
                attackSurface: {reduxTableName: 'Attack', key: '5', weakness: 'Command Injection - Generic', CWE: 'CWE-77'},
                weakness: {reduxTableName: 'Weakness', key: '5', weakness: 'Command Injection - Generic', CWE: 'CWE-77'},
                ReportDetails: `↵![Add an img](https://oracletimes.com/wp-content/uploads/2018/03/Ethereum-Cover.png "ETH")↵↵# Disclosure Policy↵↵No technology is perfect, and N/A believes that working with skilled security researchers across the globe is crucial in identifying weaknesses in any technology. If you believe you've found a security issue in our product or service, we encourage you to notify us. We welcome working with you to resolve the issue promptly.↵↵* Let us know as soon as possible   upon discovery of a potential security issue, and we'll make every effort to quickly resolve the issue.↵* Provide us a reasonable amount of time to resolve the issue before any disclosure to the public or a third-party.↵* Make a good faith effort to avoid privacy violations, destruction of data, and interruption or degradation of our service. Only interact with accounts you own or with explicit permission of the account holder.↵↵↵↵↵# Exclusions↵While researching, we'd like to ask you to refrain from:↵* Denial of service↵* Spamming↵* Social engineering (including phishing) of N/A staff or contractors↵* Any physical attempts against N/A property or data centers↵↵Thank you for helping keep N/A and our users safe!↵↵## Code block↵\`\`\`js↵var React = require('react');↵var Markdown = require('');↵↵React.render(↵  <Markdown source="# " />,↵  document.getElementById('content')↵);↵\`\`\`↵↵## Table↵↵| min/Max | Critical (CVSS 9.0 - 10.0) | High (CVSS 7.0 - 8.9) | Medium (CVSS 4.0 - 6.9) | Low (CVSS 0.0 - 3.9) |↵| ------- | -------------------------- | --------------------- | ----------------------- |--------------------- |↵| Minimum |10 ETH                      |5 ETH                  |2 ETH                    |0.1 ETH               |↵| Maximum |15 ETH                      |8 ETH                  |5 ETH                    |2 ETH                 |↵↵↵↵this is a link to [google][]↵↵[google]: http://www.google.com↵↵↵`,
                CVSSData: {
                    base: {score: '6.8', severity: 'medium'},
                    environmental: {score: '6.8', severity: 'medium'},
                    error: {error: false},
                    metrics: 'tostring',
                    readyState: true,
                    temporal: {score: '6.8', severity: 'medium'}
                }
            }
            const transaction = {
                from: walletAddress,
                gas: 4000000
            }
            // @DEV (submit Vulnerability) add data to ipfs and push cve score and ipfs hash to blockchain
            ipfs.addJSON(vulnData, (err, result) => {
                ipfs.base58ToHex(result).then((result) => {
                    ipfsHashToast(result)
                    const bountycontract = new web3.eth.Contract(bountyabi, bountyAddress)
                    bountycontract.methods.submitVuln(vulnData.CVSSData.environmental.score.hexEncode(), result).send(transaction)
                        .on('transactionHash', function (hash) {
                            console.log(hash)
                        })
                        .on('receipt', function (receipt) {
                            console.log(receipt)
                        })
                })
            })
            resolve(true)
        })
    }
}
