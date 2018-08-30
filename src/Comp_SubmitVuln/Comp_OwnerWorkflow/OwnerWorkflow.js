import React, {Component} from 'react'
import {connect} from 'react-redux'
import styled from 'styled-components'

// redux
import { acceptVulnAction, bountyOwnerStateSelectAction, denyVulnAction, testAction2 } from '../../redux_actions/action_bountyCurrent.js'

class DisplayBounty extends Component {
    // @DEVEND

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.bountyCurrent.ownerStateLoaded) {
            return (true)
        } else {
            return (false)
        }
    }

    handleclick() {
        // web3.bzz.upload('test file').then(function(hash) {
        //     console.log(hash)
        // })
        //
    }

    render = () => {
        const ipfsmessage = 'this is a test ipfs message'
        let index = this.props.bountyCurrent.bountyOwnerStateSelect
        return (<DisplayOwnerStyle>
            <div className="container-2">
                <div className="column-1"></div>
                <div className="column-2">
                    <div className="container-3">
                        <div className="container-3_column-1 shadowborder">
                            <div className='tableContainer'>
                                <p></p>
                                <table className='tableHead'>
                                    <thead>
                                        <tr>
                                            <th>CVE Score</th>
                                            <th></th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                </table>
                                {
                                    Object.keys(this.props.bountyCurrent.bountySubmissionOwnerState).map((key, index) => ( // count links to the correct
                                        <div key={key} onClick={() => { this.props.bountyOwnerStateSelectAction(key) }}>
                                            <table className='CVETable'>
                                                <tbody>
                                                    <tr valign="middle">
                                                        <td className={`${'CVEScore'} ${'scoreRating'} ${this.props.bountyCurrent.bountySubmissionOwnerState[key].CVSSData.environmental.severity}`}
                                                            rowSpan="3">{this.props.bountyCurrent.bountySubmissionOwnerState[key].CVSSData.environmental.score}</td>
                                                        <td className='trTitle'><b>Stage: </b></td>
                                                        <td>{this.props.bountyCurrent.bountySubmissionOwnerState[key].stage}</td>
                                                    </tr>
                                                    <tr>
                                                        <td className='trTitle'><b>weakness: </b></td>
                                                        <td>{this.props.bountyCurrent.bountySubmissionOwnerState[key].weakness.weakness}</td>
                                                    </tr>
                                                    <tr>
                                                        <td className='trTitle'><b>Attack: </b></td>
                                                        <td>{this.props.bountyCurrent.bountySubmissionOwnerState[key].attackSurface.weakness}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <div className='spaceing'></div>
                                        </div>
                                    ))
                                }
                            </div>

                        </div>
                        <div className="container-3_column-2 shadowborder">
                            <div>{index ? <div><table className='CVETable'>
                                <tbody>
                                    <tr valign="middle">
                                        <td className={`${'CVEScore'} ${'scoreRating'} ${this.props.bountyCurrent.bountySubmissionOwnerState[index].CVSSData.environmental.severity}`}
                                            rowSpan="3">{this.props.bountyCurrent.bountySubmissionOwnerState[index].CVSSData.environmental.score}</td>
                                        <td className='trTitle'><b>Stage: </b></td>
                                        <td>{this.props.bountyCurrent.bountySubmissionOwnerState[index].stage}</td>
                                    </tr>
                                    <tr>
                                        <td className='trTitle'><b>weakness: </b></td>
                                        <td>{this.props.bountyCurrent.bountySubmissionOwnerState[index].weakness.weakness}</td>
                                    </tr>
                                    <tr>
                                        <td className='trTitle'><b>Attack: </b></td>
                                        <td>{this.props.bountyCurrent.bountySubmissionOwnerState[index].attackSurface.weakness}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <button type="button" onClick={() => { acceptVulnAction(this.props.ethereumWallet.walletAddress, this.props.bountyCurrent.bountyCurrent.address, this.props.bountyCurrent.bountySubmissionOwnerState[index].submitter) }}>accept Vulnerablity</button>
                            <button type="button" onClick={() => { this.props.denyVulnAction(this.props.ethereumWallet.walletAddress, this.props.bountyCurrent.bountyCurrent.address, this.props.bountyCurrent.bountySubmissionOwnerState[index].submitter, ipfsmessage) }}>deny Vulnerablity</button>
                            <button type="button" onClick={() => { this.props.testAction2() }}>test</button>
                            <button type="button" onClick={() => { console.log(this.props.bountyCurrent) }}>console.log</button>
                            <button type="button" onClick={() => { this.handleclick() }}>bzz</button>
                            </div>
                                : <p>hello2</p>}</div>


                        </div>
                    </div>
                </div>
                <div className="column-3"></div>
            </div>
            <div className='footer'></div>
        </DisplayOwnerStyle>)
    }
}

const mapStateToProps = state => ({
    bountyCurrent: state.bountyCurrent,
    ethereumWallet: state.ethereumWallet
})

const mapActionsToProps = {
    acceptVulnAction,
    bountyOwnerStateSelectAction,
    denyVulnAction,
    testAction2
}

export default connect(mapStateToProps, mapActionsToProps)(DisplayBounty)

const DisplayOwnerStyle = styled.div`
height: auto;

.tableContainer{

    display: flex;
    flex-direction: column;

}
table {
    width: 100%;
}
.tableHead{
    border-bottom: 2px solid #e5e5e5;
}

.CVETable:hover {
    background-color:#f6f5f5;
    cursor: pointer;
}

.trTitle {
    padding-left: 5px;
    width: 85px;
}

.CVEScore {
    width: 63px;
    vertical-align : middle;
    text-align:center;
    font-weight: bold;
    font-size: 200%;

}

td {
    white-space: nowrap;
}

.spaceing {
    content: "\00a0";
    height: 2px;
    background-color: #e5e5e5;
}

.scoreRating.none     { background:#53aa33;  }
.scoreRating.low      { background:#ffcb0d;  }
.scoreRating.medium   { background:#f9a009;  }
.scoreRating.high     { background:#df3d03;  }
.scoreRating.critical { background:#cc0500;  }







.body {
    background-color: white;
    font-family: Helvetica, sans-serif;
}

/* The actual timeline (the vertical ruler) */
.timeline {
    position: relative;
    max-width: 1200px;
    margin: 0 auto;
}

/* The actual timeline (the vertical ruler) */
.timeline::after {
    content: '';
    position: absolute;
    width: 6px;
    background-color: #494649;
    top: 0;
    bottom: 0;
    left: 15px;
    margin-left: -3px;
}

/* Container around content */
.container {
    padding: 10px 40px;
    position: relative;
    background-color: inherit;
    left: 19px;

}

/* The circles on the timeline */
.container::after {
    content: '';
    position: absolute;
    width: 25px;
    height: 25px;
    right: -17px;
    background-color: white;
    border: 4px solid #494649;
    top: 15px;
    border-radius: 50%;
    z-index: 1;
    left: 15px;
    left: -16px;
}


/* Add arrows to the right container (pointing left) */
.container::before {
    content: " ";
    height: 0;
    position: absolute;
    top: 18px;
    width: 0;
    z-index: 1;
    left: 30px;
    border: medium solid #494649;
    border-width: 10px 10px 10px 0;
    border-color: transparent #494649 transparent transparent;
}

/* The actual content */
.container > div {
    padding: 20px 30px;
    background-color: white;
    position: relative;
    border: 1px solid #494649;
    border-radius: 6px;
}

.active > div {
    border: 3px solid #a02020;
}

.active::after {
    border: 4px solid #a02020;
    background-color: #a02020;
}

.active::before {
    border-color: transparent #a02020 transparent transparent;
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
            min-height: 800px;

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




    .profileImg{
        width: 300px
        hight: 600px
        margin-left: auto;
        margin-right: auto;
        display: block;
        margin-top: 5px;
        margin-bottom: 20px;

    }

    .footer{
        content: "\00a0";
        height: 150px;

    }


`
