import React, {Component} from 'react'
import styled from 'styled-components'
import {connect} from 'react-redux'
import 'purecss'
import UploadImg from './uploadImg.js'

import CreateBountyForm from './createBountyForm'

// actions
import {walletAddressAction} from '../redux_actions/action_walletAddress'

class CreateBounty extends Component {
    render = () => {
        return (<CreateBountyStyle>
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
                                Every company should have a way to receive and resolve security vulnerability reports submitted by external third parties.
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
        </CreateBountyStyle>)
    }
}

const mapStateToProps = state => ({
    ethereumWallet: state.ethereumWallet
})

const mapActionsToProps = {
    walletAddressAction
}
export default connect(mapStateToProps, mapActionsToProps)(CreateBounty)

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

`
