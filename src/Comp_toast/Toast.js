import { notification, Modal } from 'antd';
import ethicon from '../img/Ethereum_logo.svg'
import ipfsicon from '../img/ipfs.png'
import React from 'react';
import './index.css'

export const depositEthToast = (hash) => {
  notification['info']({
    message: 'Transaction Sent',
    description: `Receipt: ${hash}`,
    placement: "bottom",
    duration: 5,
    icon: <img src={ethicon} onClick={()=> console.log("some acton in toast.js")} align="left" height="52" width="52"/>,
    style: {
      width: 650,
      marginLeft: -250,
      paddingLeft: 1,
      textIndent: 0,
    },
  });
};

export const ipfsHashToast = (hash) => {
  notification['info']({
    message: 'IPFS Data Stored',
    description: `    Hash: ${hash}`,
    placement: "bottom",
    duration: 5,
    icon: <img src={ipfsicon} onClick={()=> console.log("some acton in toast.js")} align="left" height="52" width="52"/>,
    textIndent: 7,
    style: {
      width: 550,
      marginLeft: -150,
      paddingLeft: 1,
      textIndent: 0,
    },
  });
};


export const transactionReceiptToast = (receipt, depositValue) => {
  notification['info']({
    message: 'Transaction Hash',
    description: `
        Hash: ${receipt.transactionHash}
        To: ${receipt.to}
        ETH: ${depositValue}
        `,
    placement: "bottom",
    duration: 5,
    icon: <img src={ethicon} onClick={()=> console.log("some acton in toast.js")} align="left" height="52" width="52"/>,
    style: {
      width: 650,
      marginLeft: -250,
      paddingLeft: 1,
      textIndent: 0,
    },
  });
};

export const transactionHashToast = (hash) => {
  notification['info']({
    message: 'Transaction Sent',
    description: `Tx Hash: ${hash}`,
    placement: "bottom",
    duration: 5,
    icon: <img src={ethicon} onClick={()=> console.log("some acton in toast.js")} align="left" height="52" width="52"/>,
    style: {
      width: 650,
      marginLeft: -250,
      paddingLeft: 1,
      textIndent: 0,
    },
  });
};



export const confirmSendToast = (bountyAddress, depositValue, comName) =>  {
    return( new Promise((resolve, reject) => {
        Modal.confirm({
            title: 'Confirm Transaction',
            content: `
                Contract:   ${comName}
                Address:    ${bountyAddress}
                Amount:    ${depositValue} ETH
                `,
            okText: 'Send',
            cancelText: 'Cansel',
            width: 600,
            style: {
                display: '',
            },
            onOk() {
              console.log('Send');
              resolve(true)

            },
            onCancel() {
              console.log('Cancel');
              reject(false)
            },
        });
    }));
}


export const confirmContractCreationToast = (FactoryAddress, depositValue) =>  {
    return( new Promise((resolve, reject) => {
        Modal.confirm({
            title: 'Confirm Contract Creation',
            content: `
                Contract Factory:   ${FactoryAddress}
                Deposit:    ${depositValue} ETH
                `,
            okText: 'Create',
            cancelText: 'Cansel',
            width: 600,
            style: {
                display: '',
            },
            onOk() {
              console.log('Send');
              resolve(true)

            },
            onCancel() {
              console.log('Cancel');
              reject('rejected')
            },
        });
    }));
}
