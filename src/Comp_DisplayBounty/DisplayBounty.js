// react
import React, {Component} from 'react'
// import {Redirect, withRouter} from "react-router-dom"
import {connect} from 'react-redux'
// import {NavLink} from 'react-router-dom'

// other
import 'purecss'
import styled from 'styled-components'
// import SubNav from '../Comp_Nav/SubNav.js'
// import {depositEthToast, confirmSendToast} from '../Comp_toast/Toast'
import ReactMarkdown from 'react-markdown'

// actions
import {bountysListAction} from '../redux_actions/action_bountysList'
import {bountyCurrentAction, checkOwnerAction} from '../redux_actions/action_bountyCurrent'
import {depositEthAction, withdrawEthAction} from '../redux_actions/action_contractTransactions'
import {walletAddressAction} from '../redux_actions/action_walletAddress'

class DisplayBounty extends Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
        this.deposit = this.deposit.bind(this)
        this.withdraw = this.withdraw.bind(this)
        this.state = {
            depositValue: '',
            withdrawValue: ''
        }
    }

    withdraw() {
        this.props.withdrawEthAction(this.props.ethereumWallet.walletAddress, this.props.bountyCurrent.bountyCurrent.address, this.state.withdrawValue, this.props.bountyCurrent.bountyCurrent.comName).then((result) => {
            this.props.walletAddressAction( // @dev update eth address value in dropdown
                this.props.ethereumWallet.walletAddress)
            this.props.bountyCurrentAction( // @dev update Contract Balance
                this.props.bountyCurrent.bountyCurrent.address,
                this.props.bountyCurrent.bountyCurrent,
                this.props.ethereumWallet.walletAddress
            )
        })
        this.setState({withdrawValue: ''})
    }

    deposit(e) {
        this.props.depositEthAction(this.props.ethereumWallet.walletAddress, this.props.bountyCurrent.bountyCurrent.address, this.state.depositValue, this.props.bountyCurrent.bountyCurrent.comName).then((result) => {
            this.props.walletAddressAction( // @dev update eth address value in dropdown
                this.props.ethereumWallet.walletAddress)
            this.props.bountyCurrentAction( // @dev update Contract Balance
                this.props.bountyCurrent.bountyCurrent.address,
                this.props.bountyCurrent.bountyCurrent,
                this.props.ethereumWallet.walletAddress
            )
        })
        this.setState({depositValue: ''})
    }

    handleChange(evt) {
        this.setState({
            [evt.target.name]: evt.target.value
        })
    }

    componentDidMount() { // called directly every time we navagate to the component

    }

    componentDidUpdate(prevProps) {}

    render = () => {
        const {bountyCurrent, bountyLoaded} = this.props.bountyCurrent
        const bountyAddress = this.props.match.params.id // @dev
        if (bountyLoaded && bountyCurrent.address === bountyAddress) {
            return (<DisplayBountyStyle>

                <div className="container-2">
                    <div className="column-1"></div>
                    <div className="column-2">
                        <div className="container-3">
                            <div className="container-3_column-1 shadowborder">
                                <div>
                                    <legend>Upload photo</legend>
                                    <img src={bountyCurrent.uploadImg} alt=''/>
                                </div>
                                <div>
                                    <h2>{`Contract Address: ${bountyAddress}`}</h2>
                                    <h2>{`Contract Balance: ${bountyCurrent.balance}`}</h2>
                                    <h2>{`Company Name: ${bountyCurrent.comName}`}</h2>
                                    <h2>{`Email: ${bountyCurrent.secEmail}`}</h2>
                                    <h2>{`Mim Payout: ${bountyCurrent.minEth}`}</h2>
                                    <h2>{`Max Payout: ${bountyCurrent.maxEth}`}</h2>
                                    <br/><br/>

                                    <button name="depositValue" onClick={this.deposit}>Fund Contract</button>
                                    <input name="depositValue" value={this.state.depositValue} onChange={this.handleChange}/>

                                    <br/><br/>

                                    <button name="withdrawValue" onClick={this.withdraw}>withdraw</button>
                                    <input name="withdrawValue" value={this.state.withdrawValue} onChange={this.handleChange}/><br/><br/><br/> {/* <button onClick={() => confirmSendToast()}>test toast</button>
                                    <button onClick={() => console.log(this)}>this</button> */
                                    }

                                    <br/><br/>

                                </div>

                            </div>
                            <div className="container-3_column-2 shadowborder">
                                <ReactMarkdown className='md-preview' source={bountyCurrent.Bountytextarea} escapeHtml={false}/>

                            </div>
                        </div>
                    </div>
                    <div className="column-3"></div>
                </div>
                <div className='footer'></div>
            </DisplayBountyStyle>)
        } else {
            return (<DisplayBountyStyle>

                <div className="container-1">
                    <div className="row-1">
                        <span>Bounty Information</span>
                    </div>
                </div>
            </DisplayBountyStyle>)
        }
    }
}

const mapStateToProps = state => ({
    bountysList: state.bountysList,
    bountyCurrent: state.bountyCurrent,
    ethereumWallet: state.ethereumWallet,
    contractTransactions: state.contractTransactions
})

const mapActionsToProps = {
    bountysListAction,
    bountyCurrentAction,
    depositEthAction,
    withdrawEthAction,
    checkOwnerAction,
    walletAddressAction
}

export default connect(mapStateToProps, mapActionsToProps)(DisplayBounty)

const DisplayBountyStyle = styled.div`
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


.md-preview {
     padding: 10px;
     font-family: Georgia, Palatino, 'Palatino Linotype', Times, 'Times New Roman', serif;
}
     .md-preview p, .md-preview blockquote, .md-preview ol , .md-preview dl, .md-preview table, .md-preview pre {
         margin-top: 0;
         margin-bottom: 16px;
    }
     .md-preview h1, .md-preview h2, .md-preview h3 {
         margin-top: 24px;
         margin-bottom: 16px;
         font-weight: 600;
         line-height: 1.25;
         padding-bottom: 0.3em;
    }
     .md-preview h1 {
         font-size: 1.6em;
    }
     .md-preview h2 {
         font-size: 1.4em;
    }
     .md-preview h3 {
         font-size: 1.2em;
    }
     .md-preview ul, .md-preview ol {
         padding-left: 2em;
    }
     .md-preview blockquote {
         margin-left: 0;
         padding: 0 1em;
         color: #777;
         border-left: 0.25em solid #ddd;
    }
     .md-preview blockquote > :first-child {
         margin-top: 0;
    }
     .md-preview blockquote > :last-child {
         margin-bottom: 0;
    }
     .md-preview code {
         padding: 0.2em 0 0.2em 0;
         margin: 0;
         font-size: 16px;
         background-color: rgba(0, 0, 0, 0.04);
         border-radius: 3px;
    }
     .md-preview code::before, .md-preview code::after {
         letter-spacing: -0.2em;
         content: "\00a0";
    }
     .md-preview pre {
         display: inline-block
         padding: 16px;
         overflow: auto;

         line-height: 1.45;
         background-color: #f8f8f8;
         border: 1px solid #ccc;
         font-family: monospace;
         border-radius: 3px;
         width: auto;
    }
     .md-preview pre code {
         display: inline;
         padding: 0;
         margin: 0;
         line-height: inherit;
         word-wrap: normal;
         border: 0;
    }
     .md-preview pre code::before, .md-preview pre code::after {
         content: none;
    }
     .md-preview pre > code {
         padding: 0;
         margin: 0;
         font-size: 100%;
         word-break: normal;
         white-space: pre;
         background: transparent;
         border: 0;
    }
     .md-preview a {
         text-decoration: none;
         color: #4078c0;
    }
     .md-preview a:hover {
         text-decoration: underline;
    }
     .md-preview > *:first-child {
         margin-top: 0 !important;
    }
     .md-preview > *:last-child {
         margin-bottom: 0 !important;
    }
     .md-preview::after {
         display: table;
         clear: both;
         content: "";
    }
     .md-preview table {
         display: block;
         width: 100%;
         border-spacing: 0;
         border-collapse: collapse;
    }
     .md-preview table thead th {
         font-weight: bold;
    }
     .md-preview table th, .md-preview table td {
         padding: 6px 13px;
         border: 1px solid #c8ccd0;
    }
    .md-preview table tr:nth-child(2n) {
      background: #f6f8fa;
    }
    .md-preview tr {
        border-top: 1px solid #c6cbd1;
        background: #fff;
    }
    .md-preview li {
        list-style: disc;
        margin: 0 0 2px;
        padding: 0 0 0 15px;
    }
    .md-preview ol {
        list-style: circle;
        margin: 0 0 2px;
        padding: 0 0 0 15px;
    }

`
