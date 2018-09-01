import {myContract, web3, bountyabi} from '../Comp_web3/abi.js'
import { store } from '../index.js'
import {upload, loadimg, ipfs, ipfsHost} from '../Comp_IPFS/Ipfs'
import faker from 'faker'
import {ipfsHashToast, transactionReceiptToast, transactionHashToast} from '../Comp_toast/Toast'
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

export const GENERATE_PICTURE = 'GENERATE_PICTURE'
export function setPictureLoadedTrueAction(picture) {
    console.log('generate picture')
    const payload = {}
    payload.picture = picture
    payload.loaded = true
    return {
        type: GENERATE_PICTURE,
        payload: payload
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
                comName: {value: faker.company.companyName()},
                website: {value: faker.internet.domainName()},
                comAbout: {value: faker.company.catchPhrase()},
                secEmail: {value: faker.internet.email()},
                maxEth: {value: faker.random.number({min: 4, max: 13})},
                minEth: {value: faker.random.number({min: 1, max: 3})}
            }
            store.dispatch(setPictureLoadedTrueAction(faker.image.avatar()))
            resolve(formFields)
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
                            let bountyContractAddress = receipt.events.returnBounty.returnValues[0]
                            let bountyContract = new web3.eth.Contract(bountyabi, bountyContractAddress)
                            bountyContract.methods.ownerInfo().call().then(function(result) {
                                // console.log(`contract info: `, result)
                                resolve()
                            })
                            // need to setup a listner to get contract address and display toast
                        })
                })
            })
        })
    }
}
