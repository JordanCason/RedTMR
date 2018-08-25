import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

// actions
import { bountysListAction } from '../redux_actions/action_bountysList'
import { bountyCurrentAction, checkOwnerAction, currentBountCleanupAction } from '../redux_actions/action_bountyCurrent'
import { depositEthAction, withdrawEthAction } from '../redux_actions/action_contractTransactions'
import { walletAddressAction } from '../redux_actions/action_walletAddress'

class SubNav extends Component {
    componentDidMount() { // called directly every time we navagate to the component
        const { bountysList, bountysLoaded } = this.props.bountysList
        const { bountyCurrent } = this.props.bountyCurrent
        const bountyAddress = this.props.match.params.id // @dev navigation address pram from react router
        if (bountysLoaded && bountyCurrent.address !== bountyAddress) { // @dev If the list of bountys has loaded and the curent bounty informatoin loaded\
            // @dev does not equal the navigation address pram then load the new bounty information
            this.props.bountyCurrentAction(bountyAddress, bountysList[bountyAddress])
        }
    }

    componentDidUpdate(prevProps) {
        const prevWalletAddress = prevProps.ethereumWallet.walletAddress
        const cureWalletAddress = this.props.ethereumWallet.walletAddress

        const { bountysList, bountysLoaded } = this.props.bountysList
        const { bountyLoaded } = this.props.bountyCurrent
        const bountyAddress = this.props.match.params.id
        // @dev I think i can now replace theas two if statments with just one.
        if (!bountyLoaded && bountysLoaded && this.props.bountyCurrent.promisePending !== true) { // @dev should only be true if a refresh or direct navigation to the displayBounty.js component
            // @dev otherwise preporations for rendering are handled in componentDidMount
            this.props.bountyCurrentAction(bountyAddress, bountysList[bountyAddress])
        }
        if (bountyLoaded && prevWalletAddress !== cureWalletAddress) { // @dev if wallet address changes check if owner again
            // this.props.checkOwnerAction(cureWalletAddress, bountyCurrent.owner)
            // this.props.checkBountyStateAction(cureWalletAddress, bountyCurrent.address)
            this.props.bountyCurrentAction(bountyAddress, bountysList[bountyAddress])
        }
    }

    componentWillUnmount() {
        this.props.currentBountCleanupAction()
    }

    render() {
        // @dev was getting flicker when trying to load the proper subnav tabs and if else statmens were the only way i was able to fix.
        if (!this.props.bountyCurrent.isOwner && !this.props.bountyCurrent.bountySubmission) {
            return (
                <SubNavStyle>
                    <NavLink exact activeClassName="active" className="NavLink" to={`/Bounty/${this.props.match.params.id}`}>Bounty Contract</NavLink>
                    <div className="box"></div>
                    <NavLink activeClassName="active" className='NavLink' to={`/Bounty/${this.props.match.params.id}/submit`}>Submit Vulnerability</NavLink>
                </SubNavStyle>
            )
        } else if (this.props.bountyCurrent.isOwner) {
            return (
                <SubNavStyle>
                    <NavLink exact activeClassName="active" className="NavLink" to={`/Bounty/${this.props.match.params.id}`}>Bounty Contract</NavLink>
                    <div className="box"></div>
                    <NavLink activeClassName="active" className='NavLink' to={`/Bounty/${this.props.match.params.id}/ownerWorkflow`}>Owner Workflow</NavLink>
                </SubNavStyle>
            )
        } else if (this.props.bountyCurrent.bountySubmission) {
            return (
                <SubNavStyle>
                    <NavLink exact activeClassName="active" className="NavLink" to={`/Bounty/${this.props.match.params.id}`}>Bounty Contract</NavLink>
                    <div className="box"></div>
                    <NavLink activeClassName="active" className='NavLink' to={`/Bounty/${this.props.match.params.id}/hackerWorkflow`}>Hacker Workflow</NavLink>
                </SubNavStyle>
            )
        } else {
            return (
                <SubNavStyle>
                    <NavLink exact activeClassName="active" className="NavLink" to={`/Bounty/${this.props.match.params.id}`}>Bounty Contract</NavLink>
                </SubNavStyle>
            )
        }
    }
}

const mapStateToProps = state => ({
    bountyCurrent: state.bountyCurrent,
    bountysList: state.bountysList,
    ethereumWallet: state.ethereumWallet,
    contractTransactions: state.contractTransactions

})

const mapActionsToProps = {
    bountysListAction,
    bountyCurrentAction,
    depositEthAction,
    withdrawEthAction,
    checkOwnerAction,
    walletAddressAction,
    currentBountCleanupAction
}

export default connect(mapStateToProps, mapActionsToProps)(SubNav)

const SubNavStyle = styled.div`
display: flex;

align-items: center;
justify-content: flex-start;
list-style-type: none;
background-color: white;
border-bottom: 1px solid #e5e5e5;
box-shadow: 0 0px 0px 0 rgba(0,0,0,0.2), 0 4px 10px 0 rgba(0,0,0,0.19);

.NavLink:active { /**remove border around clicked link **/
    flex: 0;
    border: none;
    -moz-outline-style: none
}

.NavLink {
    flex: 0;
    padding: 10px 10px 10px 10px
    font-size: 16px;
    background-color: white;
    justify-content: flex-start;
    white-space: nowrap;
    list-style-type: none;
    text-decoration: none;
    color: black;
}

.box {
  background-image: linear-gradient(#494649, #494649);
  background-repeat: no-repeat;
  background-size: 2px 70%;
  background-position: center, 2px 0;
  height: 20px;
  width: 1px;
}

.NavLink:hover {
    background-color: #e5e5e5;
}

.active {
    background-color: #e5e5e5;
}

.hidden {
    display: none;
}

.rightbox {
    flex-grow: 1;

}

.workflow {

}

`
