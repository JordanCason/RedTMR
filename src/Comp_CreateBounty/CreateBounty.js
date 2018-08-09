import React, { Component } from 'react';
import {myContract, web3, bountyabi} from '../Comp_web3/abi.js';
import styled from 'styled-components';
import {upload, loadimg, ipfs, ipfsHost} from '../Comp_IPFS/Ipfs';
import { connect } from 'react-redux';
import 'purecss';
import default_pic from '../img/default.png';
import faker from 'faker';
import {sampleVDP} from "./sampleVDP";
import {ipfsHashToast, depositEthToast} from '../Comp_toast/Toast'
import UploadImg from './uploadImg.js'

import CreateBountyForm from './createBountyForm'


// actions
import { walletAddressesAction } from '../redux_actions/action_walletAddress';
import { walletAddressAction } from '../redux_actions/action_walletAddress';

class CreateBounty extends Component {
    constructor(props) {
        super(props)
        this.submitBounty = this.submitBounty.bind(this);

    }

    submitBounty() {
            const { walletAddresses, walletAddress, addressValue, walletLoaded } = this.props.ethereumWallet
            // Need to addin a check to make sure values are enterd """Was getting an errer when no imag was upladed"""
            let uploadImg = document.querySelector('#profileImg').src;
            let comName = document.querySelector('#comName').value;
            let secEmail = document.querySelector('#secEmail').value;
            let initDeposit = document.querySelector('#initDeposit').value;
            let maxEth = document.querySelector('#maxEth').value;
            let minEth = document.querySelector('#minEth').value;
            let Bountytextarea = document.querySelector('#Bountytextarea').value;
            let comAbout = document.querySelector('#comAbout').value;
            console.log(initDeposit)
            console.log(web3.utils.toWei(initDeposit, 'ether'))

            ipfs.addJSON({ uploadImg: uploadImg, comName: comName, comAbout: comAbout, secEmail: secEmail, maxEth: maxEth, minEth: minEth, Bountytextarea: Bountytextarea }, (err, result) => {
                ipfsHashToast(result)
                //@dev upload IPFS address to smart contract
                //console.log(`submitted form data pushed to IPFS at http://159.65.232.230/ipfs/${result}`)
                myContract.methods.createBounty(result).send({from: walletAddress, gas: 3000000, value: web3.utils.toWei(initDeposit, 'ether')})
                .on('transactionHash', function(hash){
                    depositEthToast(hash)
                })
                 .on('receipt', (receipt) => {
                    let bountyContractAddress = receipt.events.returnBounty.returnValues[0];
                    let bountyContract = new web3.eth.Contract(bountyabi, bountyContractAddress)
                    bountyContract.methods.ownerInfo().call().then(function(result) {
                        console.log(`contract info: `, result)
                    });

                    //need to setup a listner to get contract address and display toast


                    // ipfs.catJSON(result, (err, result) => {
                    //     console.log(`The Retreved IPFS object: `,result);
                    // });
                });
            });
        };


    render = () => {
        return (
            <CreateBountyStyle>
                <div className="container-1">
                    <div className="row-1">
                		<h2>Create Bounty</h2>
                	</div>
                </div>
                <div className="container-2">
                <div className="column-1"></div>
                <div className="column-2">
                    <div className="container-3">
                        <div className="container-3_column-1 shadowborder">
                            <div>
            				    <legend>Upload photo</legend>
                            <UploadImg/>
                            </div>
                            <div id="tempPprofilePicturearagraph">
            					Every company should have a way to receive and
            					resolve security vulnerability reports submitted
            					by external third parties.
            				</div>

                        </div>
                        <div className="container-3_column-2 shadowborder">
                            <div id='bodyHeader'>
            					<a>SmartContract Bounty Creation Form</a>
            				</div>

                                <CreateBountyForm/>
                        </div>
                    </div>
                </div>
                <div className="column-3"></div>
                </div>
                <div className='footer'></div>
            </CreateBountyStyle>
        );
      }
    }

    const mapStateToProps = state => ({
        //bountysList: state.bountysList,
        ethereumWallet: state.ethereumWallet,
    });

    const mapActionsToProps = {
        walletAddressesAction,
        walletAddressAction,
        //bountysListAction,
    };
export default connect(mapStateToProps, mapActionsToProps)(CreateBounty);

//####### Jquery #######




//####### CSS #######

const CreateBountyStyle = styled.div`
height: auto;

    .container-1 {
        display: flex;
        flex-direction: column;
    }
        .row-1 {
            flex: 1;
            padding:10px;
            font-size: 24px;
            background-color: white;
            border-bottom: 1px solid #e5e5e5;
            box-shadow: 0 0px 0px 0 rgba(0,0,0,0.2), 0 4px 10px 0 rgba(0,0,0,0.19);
        }

    .container-2 {
        display: flex;
        flex-direction: row;
        height: auto;
        }
        .column-1 {
            flux: 1;
            flex-grow: 1;
        }
        .column-2 {
            flux: 1;
            flex-basis: 80%;
        }
        .column-3 {
            flux: 1;
            flex-grow: 1;
        }

    .container-3 {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin-top: 40px;

        }
        .container-3_column-1 {
            flux: 0;
            flex-basis: 25%;
            padding:10px;
            background-color: white;

        }
        .container-3_column-2 {
            flux: 1;
            flex-basis: 67%;
            padding:10px;
            background-color: white;

        }

    .shadowborder{
        flux: 0;
        box-shadow: 0 4px 10px 0 rgba(0,0,0,0.2), 0 4px 20px 0 rgba(0,0,0,0.19);
    }

    .changeLater {
        max-width: 350px;
        background-color: white;
    }



    #Bountytextarea{
        min-width: 100%;
        min-height: 400px
    }

    .profileImg{
        width: 300px
        hight: 600px
        margin-left: auto;
	    margin-right: auto;
	    display: block;
        margin-top: 5px;
        margin-bottom: 20px;

    }

    #tempParagraph{
        margin-top: 10px;
    }

    #bodyHeader {
     margin-top: 20px;
    }

    .footer{
        content: "\00a0";
        height: 150px;

    }

`;
