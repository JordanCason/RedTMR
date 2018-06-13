import React, { Component } from 'react';
//import {myContract, web3, bountyabi} from '../Comp_web3/abi.js';
import styled from 'styled-components';
//import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
//import {upload, loadimg, ipfs, ipfsHost} from '../Comp_IPFS/Ipfs';
import { bountysListAction } from '../redux_actions/action_bountysList';
import { bountyCurrent } from '../redux_actions/action_bountyCurrent'
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import 'purecss';


class Home extends Component {

    constructor(props) {
        super(props)
        this.props.filterTable.then((result) => {
            this.setState({
                filterTable: Object.keys(result.value) // only load the keys and we can match them against the redux store bountysList
            })
        })
        this.onSearchInput = this.onSearchInput.bind(this);
    }


    onSearchInput(e) {
        const { bountysList } = this.props.bountysList
    const createNewState = []
        Object.keys(bountysList).forEach((item, i) => {
            console.log('here')
            let test = `${bountysList[item].comName}${bountysList[item].comAbout}`
            console.log(test)
            if (test.toLowerCase().includes(e.target.value.toLowerCase())) { // may want you use a fuzzy search
                createNewState.push(item)
            }
            this.setState({filterTable: createNewState})
        });
    }


    render = () => {
        console.log('render')
        if (!this.state) {
            return(<div>render</div>)
        } else {
            const { bountysList } = this.props.bountysList
            return (
                <HomeStyle>
                    <div className="container-1">
                        <div className="row-1">
                    		<span>Directory</span>
                    	</div>
                    	<div className="row-2 pure-form pure-form-stacked">
                    		<span value="Search" id="search"></span>
                            <input className='pure-u-23-24' id='' onKeyUp={this.onSearchInput} placeholder="Search.." title="Type in a name" />
                    	</div>
                    </div>
                    <div className="container-2">
                        <div className="column-1"></div>
                        <div className="column-2">
                            <div className="container-3">
                                <div className="container-3_column-1 shadowborder">
                        			<div className='directoryHeader'>
                        				<span>Directory Header</span>
                        			</div>
                        			<div className='subDirectoryHeader'>
                        				<span>Sub Header</span>

                        			</div>
                        				<table className="table">
                        					<thead>
                        						<tr>
                        							<th className="tableRow" />
                        							<th>Min</th>
                        							<th>Max</th>
                        							<th>balance</th>
                        						</tr>
                        					</thead>
                        				</table>

                                        {this.state.filterTable.map((key, index) => (  // count links to the correct
                                        <NavLink style={{ textDecoration: 'none' }} className="tableLink" to={`/Bounty/${key}`} key={key} >
                                            <table className={"table"} id="bountyRow" >
                                                <tbody className={"sethover"} >
                                                    <tr>
                                                        <td className={"tableRow"} id={console.log(bountysList[key])}>
                                                            <img src={bountysList[key].uploadImg} alt='' />
                                                            <div>
                                                            <p>{bountysList[key].comName}</p>
                                                            <p>{bountysList[key].comAbout}</p>
                                                            </div>
                                                        </td>
                                                        <td>{bountysList[key].minEth}</td>
                                                        <td>{bountysList[key].maxEth}</td>
                                                        <td>{bountysList[key].balance}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </NavLink>))}

                                    <div className="directoryFooter"></div>

                                </div>
                            </div>
                        </div>
                        <div className="column-3"></div>
                    </div>
                </HomeStyle>
            );
        }
    }
}



const mapStateToProps = state => ({
    bountysList: state.bountysList,
});

const mapActionsToProps = {
    bountysListAction,
};

export default connect(mapStateToProps, mapActionsToProps)(Home);


const HomeStyle = styled.div`
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
            flex-basis: 100%;
            padding:10px;
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

`;
