// react
import React, {Component} from 'react'
import styled from 'styled-components'
import {connect} from 'react-redux'

// ethereum
import {web3} from '../../Comp_web3/abi.js'

// actions
import {walletAddressAction} from '../../redux_actions/action_walletAddress'

class AddressDropdown extends Component {
    constructor(props) {
        super(props)
        // @DEV initial address from provider
        web3.eth.getAccounts().then((initAddress) => {
            console.log(`init ${initAddress[0]}`)
            this.props.walletAddressAction(initAddress[0])
        })
    }

    componentDidMount() {
        // @dev lissen for address to switch in MetaMask
        web3.currentProvider.publicConfigStore.on('update', (update) => {
            if (this.props.ethereumWallet.walletAddress !== web3.utils.toChecksumAddress(update.selectedAddress)) {
                console.log(`update ${update.selectedAddress}`)
                this.props.walletAddressAction(update.selectedAddress)
            }
        })
    }

    render() {
        const {walletAddress, addressValue} = this.props.ethereumWallet
        return (
            <Dropdown>
                <span id='addressValue'>{addressValue}</span>
                <div className="dropdown">
                    <div className="select">
                        <span id="dropdownValue">{walletAddress}</span>
                    </div>
                    <ul id='addressDropdown' className="addressDropdown"></ul>
                </div>
            </Dropdown>
        )
    }
}

const mapStateToProps = state => ({
    // bountysList: state.bountysList,
    ethereumWallet: state.ethereumWallet
})

const mapActionsToProps = {
    walletAddressAction
    // bountysListAction,
}

export default connect(mapStateToProps, mapActionsToProps)(AddressDropdown)

const Dropdown = styled.div`
/*Styling Dropdown menue*/
display inline-flex;
flex-grow: 1;
justify-content: flex-end;
background-color: #494649;
align-items: center;
white-space:nowrap;
padding-right: 7px;

#addressValue {
    padding: 0px 10px;
    color: #f2f2f2;
}

.dropdown {

font-family: monospace;
  width: 380px;
  height: 30px;
  display: inline-block;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 0 2px rgb(204, 204, 204);
  transition: all .5s ease;
  position: relative;
  font-size: 14px;
  color: #474747;

  text-align: left;
}
.dropdown .select {
    cursor: pointer;
    display: block;
    padding: 6px
}
.dropdown .select > i {
    font-size: 13px;
    color: #888;
    cursor: pointer;
    transition: all .3s ease-in-out;
    float: right;
    line-height: 20px
}
.dropdown:hover {
    box-shadow: 0 0 4px rgb(204, 204, 204)
}
.dropdown:active {
    background-color: #f8f8f8
}
.dropdown.active:hover,
.dropdown.active {
    box-shadow: 0 0 4px rgb(204, 204, 204);
    border-radius: 5px 5px 0 0;
    background-color: #f8f8f8
    color: #474747;

}
.dropdown.active .select > i {
    transform: rotate(-90deg)
}
.dropdown .addressDropdown {
    position: absolute;
    background-color: #fff;
    width: 100%;
    left: 0;
    margin-top: 1px;
    box-shadow: 0 1px 2px rgb(204, 204, 204);
    border-radius: 0 1px 5px 5px;
    overflow: hidden;
    display: none;
    max-height: 500px;
    overflow-y: auto;
    color: #888;
}
.dropdown .addressDropdown li {
    padding: 10px;
    transition: all .2s ease-in-out;
    cursor: pointer
}
.dropdown .addressDropdown {
    padding: 0;
    list-style: none
}
.dropdown .addressDropdown li:hover {
    background-color: #f2f2f2
}
.dropdown .addressDropdown li:active {
    background-color: #e2e2e2
}
`
