import React, {Component} from 'react'
import styled from 'styled-components'
import {connect} from 'react-redux'
import 'purecss'
import { generateFormDataAction, submitBountyAction } from '../redux_actions/action_createBounty'
import { bountysListAction } from '../redux_actions/action_bountysList'
import { bountyCurrentAction, bountySubmissionCurrentIndexAction } from '../redux_actions/action_bountyCurrent'

class Home extends Component {
    forcePageUpdate () {
        this.props.bountysListAction()
    }

    createRandomBounty (e) {
        this.props.generateFormDataAction().then(() => {
            const formFields = this.props.createBounty.formFields
            const values = {
                comName: formFields.comName,
                website: formFields.website,
                comAbout: formFields.comAbout,
                secEmail: formFields.secEmail,
                maxEth: formFields.maxEth,
                minEth: formFields.minEth,
                uploadImg: formFields.uploadImg,
                Bountytextarea: formFields.Bountytextarea,
                deposit: 0.01
            }
            this.props.submitBountyAction(values, this.props.ethereumWallet).then(
                this.forcePageUpdate()
            )
        })
    }



    setCurrentBounty (address, data) {
        this.props.bountyCurrentAction(address, data, this.props.ethereumWallet.walletAddress)
    }

    render = () => {
        const test = this.props.createBounty.confirmation
        console.log(test)
        if (!this.state) {
            return (<HomeStyle>
                <div className="container-1">
                    <div className="row-1">
                        <span>Test Page</span>
                    </div>

                </div>
                <div className="container-2">
                    <div className="column-1"></div>
                    <div className="column-2">
                        <div className="container-3">
                            <div className="container-3_column-1 shadowborder">
                                <span>Bountys Listed in contract</span>
                                <table className='tableHead'>
                                    <thead>
                                        <tr>
                                            <th>Bounty Hash</th>
                                            <th>Name</th>
                                        </tr>
                                    </thead>

                                    { this.props.bountysList.bountysList ? Object.keys(this.props.bountysList.bountysList).map((key, index) => (
                                        <tbody key={index} onClick={() => { this.setCurrentBounty(key, this.props.bountysList.bountysList[key]) }}>
                                            <tr valign="middle">
                                                <td>{key}</td>
                                                <td>{this.props.bountysList.bountysList[key].comName}</td>
                                            </tr>
                                        </tbody>
                                    )) : <tbody></tbody>}
                                </table>
                                <input type='button' value='Force Update' onClick={(e) => { this.forcePageUpdate() }}/>
                                <input type='button' value='CreateRandomBounty' onClick={(e) => { this.createRandomBounty(e) }}/><br/><br/>
                                { this.props.bountyCurrent.bountyCurrent
                                    ? <div>
                                        <span>Current Bounty Slected</span><br/>
                                        <table className='tableHead'>
                                            <thead>
                                                <tr>
                                                    <th>Owner</th>
                                                    <th>Bounty Address</th>
                                                    <th>Owner Address</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr valign="middle">
                                                    <td>{this.props.bountyCurrent.walletIsBountyOwner.toString()}</td>
                                                    <td>{this.props.bountyCurrent.bountyCurrent.address}</td>
                                                    <td>{this.props.bountyCurrent.bountyCurrent.owner}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <input type='button' value='CurrentBounty' onClick={(e) => { console.log(this.props.bountyCurrent) }}/>
                                        <input type='button' value='Submit Random Bounty' onClick={(e) => { console.log(this.props.bountyCurrent) }}/><br/><br/>
                                    </div>
                                    : console.log('No')}
                                {this.props.bountyCurrent.walletIsBountyOwner // check if current wallet is the owner of the bounty
                                    ? this.props.bountyCurrent.bountySubmissionState // if wallet is the owner see if anyone has submitted a vulnerablity
                                        ? <div test={console.log('Bounty has been submitted')}>
                                            <span>Vulnerablitys Submitted To This Contract</span>
                                            <table className='tableHead'>
                                                <thead>
                                                    <tr>
                                                        <th>Submitter</th>
                                                        <th>LastAction By</th>
                                                        <th>Stage</th>
                                                        <th>Score</th>
                                                    </tr>
                                                </thead>
                                                {Object.keys(this.props.bountyCurrent.bountySubmissionState).map((key, index) => (/* list of all bountys submited to this contract */
                                                    <tbody key={index} onClick={() => { console.log(this.props.bountySubmissionCurrentIndexAction(key)) }}>{ /* onClick set a vulnerablity from the list to preform actions on */ }
                                                        <tr valign="middle">
                                                            <td>{this.props.bountyCurrent.bountySubmissionState[key].submitter}</td>
                                                            <td>{this.props.bountyCurrent.bountySubmissionState[key].lastActionBy}</td>
                                                            <td>{this.props.bountyCurrent.bountySubmissionState[key].stage}</td>
                                                            <td>{this.props.bountyCurrent.bountySubmissionState[key].CVSSData.temporal.score}</td>
                                                        </tr>
                                                    </tbody>
                                                ))}
                                            </table>
                                            <br/><br/>
                                            { this.props.bountyCurrent.bountySubmissionCurrentIndex
                                                ? <div>
                                                    <span>Current Vulnerablity Slected</span><br/>
                                                    <table className='tableHead'>
                                                        <thead>
                                                            <tr>
                                                                <th>Owner</th>
                                                                <th>Bounty Address</th>
                                                                <th>Owner Address</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr valign="middle">
                                                                <td>{this.props.bountyCurrent.walletIsBountyOwner.toString()}</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                    <input type='button' value='Accept Vulnerablity' onClick={(e) => { console.log(this.props.bountyCurrent) }}/>
                                                    <input type='button' value='Deny Vulnerablity' onClick={(e) => { console.log(this.props.bountyCurrent) }}/><br/><br/>
                                                </div>
                                                : console.log('No')}






                                        </div>
                                        : console.log('No bountys Submitted')
                                    : this.props.bountyCurrent.hackerSubmissionState // if wallet is not the owner check if current address has submited a vulnerablity
                                        ? <div test={ console.log('hacker Was Here') }>
                                            <span>Hacker Submitted Vulnerablitys</span>
                                            <table className='tableHead'>
                                                <thead>
                                                    <tr>
                                                        <th>Submitter</th>
                                                        <th>LastAction By</th>
                                                        <th>Stage</th>
                                                        <th>Score</th>
                                                    </tr>
                                                </thead>
                                                <tbody onClick={() => { console.log(this.props.bountyCurrent.hackerSubmissionState) }}>
                                                    <tr valign="middle">
                                                        <td>{this.props.bountyCurrent.hackerSubmissionState.submitter}</td>
                                                        <td>{this.props.bountyCurrent.hackerSubmissionState.lastActionBy}</td>
                                                        <td>{this.props.bountyCurrent.hackerSubmissionState.stage}</td>
                                                        <td>{this.props.bountyCurrent.hackerSubmissionState.CVSSData.temporal.score}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <input type='button' value='Accept Vulnerablity' onClick={(e) => { console.log(this.props.bountyCurrent) }}/>
                                            <input type='button' value='Deny Vulnerablity' onClick={(e) => { console.log(this.props.bountyCurrent) }}/>
                                            <br/><br/>
                                        </div>
                                        : console.log('No Hackers Here')
                                }
                            </div>
                        </div>
                    </div>
                    <div className="column-3"></div>
                </div>
            </HomeStyle>)
        }
    }
}

const mapStateToProps = state => ({
    ethereumWallet: state.ethereumWallet,
    bountysList: state.bountysList,
    createBounty: state.createBounty,
    bountyCurrent: state.bountyCurrent,
    bountySubmissionCurrentIndex: state.bountySubmissionCurrentIndex
})

const mapActionsToProps = {
    generateFormDataAction,
    submitBountyAction,
    bountysListAction,
    bountyCurrentAction,
    bountySubmissionCurrentIndexAction
}

export default connect(mapStateToProps, mapActionsToProps)(Home)

const HomeStyle = styled.div`
height: auto;

table {
    width: 100%;
}
.tableHead{
    border-bottom: 1px solid black;
}
td {
    white-space: nowrap;
    cursor: pointer;
}

table, th, td {
    border: 1px solid black;

    border-collapse: collapse;
}



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
        }
        .row-2 {
            display: flex;
            padding:10px;
            box-shadow: 0 0px 0px 0 rgba(0,0,0,0.2), 0 4px 10px 0 rgba(0,0,0,0.19);
            background-color: white;
            font-size: 17px;
            border-bottom: 1px solid #e5e5e5;
            align-items: center;
            justify-content: center;
        }

        #search{
            font-size: 30px
            padding-right: 10px;

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
            font-family: monospace;
            flex-basis: 100%;
            padding:10px;
            min-height: 900px;
            background-color: white;
        }

    .shadowborder{
        flux: 0;
        box-shadow: 0 4px 10px 0 rgba(0,0,0,0.2), 0 4px 20px 0 rgba(0,0,0,0.19);
    }

    .pure-u-23-24 {
        max-width: 200px;
        background-color: white;
    }

    #Bountytextarea{
        min-width: 100%;
        min-height: 400px
    }

    #profileImg{
        text-align: left;
    }

    #bodyHeader {
     margin-top: 20px;
    }

.table * {
    color: black;

}

.table {
    width: 100%;
    font-family: Arial, Helvetica, sans-serif;

}

.table thead tr th{
    vertical-align:middle;
    padding-right:5px;
    padding-left:5px;
    border-bottom: 1px solid #e5e5e5;
}

.table tbody tr td {
    text-align:center;
    vertical-align:middle;
    border-bottom: 1px solid #e5e5e5;
}

.tableRow {
    width:75%;
    height:40px;
}

.table tbody tr td {
    max-width: 1px; /* max-width must be set for ellipsis of text to work */

}

.table tbody tr td img {
    padding: 5px;
    margin-left: 5px;
    width: 50px;
    float: left;
    border-radius:20%;

}

.table tbody tr td div {
    padding-top: 5px;
    padding-left:15;

}
.table tbody tr td div p{
    text-align: left;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    padding-top: 1px;
    padding-bottom: 3px;
}

.table tbody tr td div p:last-child{
    color: #828282;
}

.ownerTable tr {
background-color: #a02020;

}



.sethover:hover {
    background-color:#f6f5f5;
}

.directoryFooter{
    height: 4px;
    background-color: #e5e5e5;
}

.pure-u-23-24 {
    max-width: 350px;
    background-color: white;
}

`
