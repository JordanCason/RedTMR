import React, { Component } from 'react'
import styled from 'styled-components'
import AddressDropdown from './Address_dropdown_comp/dropdown'
import { NavLink } from 'react-router-dom'

class Navigation extends Component {
    render () {
        return (
            <MainNav>
                <NavLink exact activeClassName="active" className="NavLink" to="/">Directory</NavLink>
                <NavLink activeClassName="active" className="NavLink" to="/CreateBounty">Create Contract</NavLink>
                <NavLink activeClassName="active" className="NavLink" to="/Ethereum_test/">Voting Pool</NavLink>
                <NavLink activeClassName="active" className="NavLink" to="/testFunk">test contrract functions</NavLink>
                <AddressDropdown />
            </MainNav>
        )
    }
}

export default Navigation

const MainNav = styled.div`
display: flex;
.NavLink:active { /**remove border around clicked link **/
    border: none;
    -moz-outline-style: none
    outline: 0;
    border-top: 4px solid #494649;
    border-bottom: 4px solid #494649;
}
.NavLink {
    flex: 0;
    white-space: nowrap;
    flex-basis: 130px;
    justify-content: flex-start;
    background-color: #494649;
    border-bottom: 4px solid #494649;
    border-top: 4px solid #494649;
    text-align: center;
    color: #f2f2f2;
    padding: 16px 16px;
    text-decoration: none;
    font-size: 17px;
}
.NavLink:hover {
    border-bottom: 4px solid #a02020;
    color: black;
}
.active {
    border: none;
    -moz-outline-style: none
    outline: 0;
    border-top: 4px solid #494649;
    border-bottom: 4px solid #a02020;
    color: white;
}
`
