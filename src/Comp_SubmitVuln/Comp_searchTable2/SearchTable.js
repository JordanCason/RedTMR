import React, { Component } from 'react';
import { connect } from 'react-redux';

//import "antd/dist/antd.less";
import styled from 'styled-components';

import {tableClickAction} from '../../redux_actions/action_tableClick';
import {tableClickReducer} from '../../redux_reducers/reducer_tableClick';

class SearchTable extends Component {
    constructor(props) {
        super(props)
        this.onSearchInput = this.onSearchInput.bind(this);
        this.state = {
            data: this.props.data,
        }
    }

    onSearchInput(e) {
    const createNewState = []
        this.props.data.forEach((item, i) => {
            if (item.weakness.toLowerCase().includes(e.target.value.toLowerCase())) {
                createNewState.push(item)
            }
            this.setState({data: createNewState})
        });
    }

    render = () => {
        return (
            <SearchTableStyle style={{width: this.props.Values.width}}>
                <div className="searchBox">
                    <input type="text" className="searchInput" onKeyUp={(e) => this.onSearchInput(e)} placeholder={this.props.Values.placeholder}/>
                </div>
                <div className="tableWrapper" style={{width: this.props.Values.width}}>
                    <div className="head1">{this.props.Values.header}</div>
                        <div className="columnWrapper" style={{height: this.props.Values.height}}>
                            <table className="myTable">
                                <tbody>
                                {this.state.data.map((key, index) => (
                                <tr onClick={(e) => this.props.tableClickAction(key.key, this.props.Values.reduxTableName, key.weakness, key.CWE )} className={this.props.tableClick[this.props.Values.reduxTableName].key === key.key ? 'active': null} key={key.key}>
                                    <td>{key.weakness} </td>
                                    <td>{key.CWE}</td>
                                </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                </div>
            </SearchTableStyle>
        );
    }
}
const mapStateToProps = state => ({
    tableClick: state.tableClick,

});
const mapActionsToProps = {
    tableClickAction,

};
export default connect(mapStateToProps, mapActionsToProps)(SearchTable);

const SearchTableStyle = styled.div`
    .searchBox{
        width: 100%;
        padding: 0px 0px 10px 0px ;
    }
    .searchInput {
      width: 100%;
      font-size: 16px;
      padding: 12px 5px 12px 8px;
      background-color: white;
      border: 1px solid #c8ccd0;
    }
    .head1 {
        width: 100%;
        border-bottom: 1px solid #c8ccd0;
        background-color: #e5e5e5;
        font-size: 22px;
        padding-left: 8px
    }
    .tableWrapper {
        border: 1px solid #c8ccd0;
    }
    .tableWrapper div tr:hover {
        background-color: #f1f1f1;
    }
    .tableWrapper div tr.active {
        background-color: #a02020;
    }
    .columnWrapper {
        width:100%;
        overflow-y: scroll;
        background-color: white;
        margin-left: 6px;
        padding-right: 2px;
    }
    table {
        width:100%;
    }
    table tbody tr td {
        padding: 8px 0px 8px 2px;
    }
    table tbody tr {
        border-bottom: 1px solid #ddd;
    }
    input {
        border: none;
        /* textarea, select, input, button { outline: none; } */
    }
    .myTable.scrollbar::-webkit-scrollbar {
    width: 5px;
    background-color: #F5F5F5;
    }
    .myTable.scrollbar::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: linear-gradient(left, #96A6BF, #63738C);
    box-shadow: inset  0 0 1px 1px #96A6BF;
    }
    .myTable.scrollbar::-webkit-scrollbar-track {
    border-radius: 10px;
    background: #eee;
    box-shadow: 0 0 1px 1px #bbb, inset 0 0 7px rgba(0,0,0,0.3)
    }
    .myTable.scrollbar::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(left, #8391A6, #536175);
    }
`
