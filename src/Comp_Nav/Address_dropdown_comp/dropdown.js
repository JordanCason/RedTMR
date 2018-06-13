// react
import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

// ethereum
import {web3} from '../../Comp_web3/abi.js';

// actions
import { walletAddressesAction } from '../../redux_actions/action_walletAddress';
import { walletAddressAction } from '../../redux_actions/action_walletAddress';

// other
import $ from "jquery";
export var account;

class AddressDropdown extends Component {

    componentDidMount() {
        this.props.walletAddressesAction()
        $('.dropdown').click(function () {
            $(this).attr('tabindex', 1); //.focus()
            $(this).toggleClass('active');
            $(this).find('.addressDropdown').slideToggle(300);
        });
        $('.dropdown').focusout(function () { // if click outside of dropdown remove the active class and slide back up
            $(this).removeClass('active');
            $(this).find('.addressDropdown').slideUp(300);
        });
    }

    render() {
        const { walletAddresses, walletAddress, addressValue, walletLoaded } = this.props.ethereumWallet
        let count = 0
        return(
            <Dropdown>
    			<span id='addressValue'>{addressValue}</span>
                <div className="dropdown">
    				<div className="select">
                        <span id="dropdownValue">{walletAddress}</span>
    				</div>
    					<input type="hidden" />
                        <ul id='addressDropdown' className="addressDropdown">
                        {walletAddresses.map((address, key) =>(
                            <li onClick={() => {this.props.walletAddressAction(address)}} key={key}>{address}</li>
                        ))}
                        </ul>
    			</div>
            </Dropdown>
        )
    }
}


const mapStateToProps = state => ({
    //bountysList: state.bountysList,
    ethereumWallet: state.ethereumWallet
});

const mapActionsToProps = {
    walletAddressesAction,
    walletAddressAction,
    //bountysListAction,
};

export default connect(mapStateToProps, mapActionsToProps)(AddressDropdown);

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
`;



// console.log("javascript")
// //@dev init default ETH account
//
// function changeAddress(data) {
//     //console.log(`Current address: ${data}`);
//     account = data;
//     web3.eth.getBlockNumber().then(function(blockNum) {
//         web3.eth.getBalance(account).then(function (wei) {
//             let ether = web3.utils.fromWei(wei, 'ether');
//             if (ether.match(/\./g) == null) {
//                 // console.log('match');
//                 // console.log(`${ether} ETH`)
//                 document.querySelector('#addressValue').innerHTML = `${ether} ETH`
//
//             } else {
//                 // console.log('else');
//                 // console.log(ether)
//                 // console.log(`${ether.match(/\d*?\.\d{1,8}/g)[0]} ETH`);
//                 document.querySelector('#addressValue').innerHTML = `${ether.match(/\d*?\.\d{1,8}/g)[0]} ETH`
//
//             };
//             // console.log(web3.utils.fromWei(wei, 'ether')
//             // document.querySelector('#addressValue').innerHTML = "hello"
//         });
//     });
// };
//
// // //1. shouldComponentUpdate - DO use for render controle DONT cause a re-render
// // //2. componentWillUpdate
// // //3. rendere - DO simple statments i.e just render the components DONT cause side effects like changes that cause a re-rinder
// // //4. send props to childern
// // //5. componentDidUpdate - DO make changes that cause re-render i.e changes to state if you want a re-render
//
// class AddressDropdown extends Component {
//     shouldComponentUpdate() {
//         console.log("shouldComponentUpdate")
//         return true
//     }
//     componentWillUpdate() {
//         console.log("componentWillUpdate")
//     }
//     componentDidMount() {
//         console.log(this)
//             this.props.walletAddressAction()
//         console.log("componentDidMount")
//
//         // web3.eth.getAccounts().then(function(data) {
//         //     document.querySelector('#dropdownValue').innerHTML = data[0];
//             //changeAddress(this.props.addressCurrent.addressCurrent[0]);
//             // for(let i=0; i < data.length; i++) {
//             //     document.querySelector('#addressDropdown').insertAdjacentHTML('beforeend', `<li id="${i}">${data[i]}</li>`)
//             // }
//             //@dev dropdown menu in top right
//             $('.dropdown').click(function () {
//                     $(this).attr('tabindex', 1); //.focus()
//                     $(this).toggleClass('active');
//                     $(this).find('.addressDropdown').slideToggle(300);
//                 });
//                 $('.dropdown').focusout(function () {
//                     $(this).removeClass('active');
//                     $(this).find('.addressDropdown').slideUp(300);
//                 });
//                 $('.dropdown .addressDropdown li').click(function () {
//                     $(this).parents('.dropdown').find('span').text($(this).text());
//
//                     changeAddress(document.querySelector('#dropdownValue').innerHTML);
//                 });
//             //@dev when dropdown entry changes change current address to the one slected
//             // function changeAddress() {
//             //     web3.eth.defaultAccount = document.querySelector('#dropdownValue').innerHTML //@dev result is new default acount from dropdown list
//             //     console.log(`${web3.eth.defaultAccount} is new default account`);
//             // };
//         //})
//         console.log(this)
//     }
//
//     componentDidUpdate(){
//         console.log("componentDidUpdate")
//     }
//
//     render() {
//         console.log("render")
//         let count = 0
//         console.log(this.props.addressCurrent.addressCurrent)
//         return(
//             <Dropdown>
//                 <button id="c" onClick={() => {console.log(this.props)}}>props</button>
//     			<span id='addressValue'>Address</span>
//                 <div className="dropdown">
//     				<div className="select">
//                         <span id="dropdownValue">{this.props.addressCurrent.addressCurrent[0]}</span>
//     				</div>
//     					<input type="hidden" />
//                            <ul id='addressDropdown' className="addressDropdown">
//                            {this.props.addressCurrent.addressCurrent.map((address) =>(
//                                <li id={count++}>{address}</li>
//                            ))}
//                            </ul>
//     			</div>
//             </Dropdown>
//         )
//     }
// }
