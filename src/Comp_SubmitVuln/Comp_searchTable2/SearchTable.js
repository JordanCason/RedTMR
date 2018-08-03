import React, { Component } from 'react';
import { connect } from 'react-redux';

//import "antd/dist/antd.less";
import styled from 'styled-components';


class SearchTable extends Component {
    constructor(props) {
        super(props)
        this.onSearchInput = this.onSearchInput.bind(this);
        this.state = {
            data: this.props.data,
            activekey: null,
        }
    }

    onSearchInput(e) {
        this.setState({ activekey:  null});
    const createNewState = []
        this.props.data.forEach((item, i) => {
            if (item.weakness.toLowerCase().includes(e.target.value.toLowerCase())) {
                createNewState.push(item)
            }
            this.setState({data: createNewState})
            this.setState({activekey: this.state.activekey});
        });
    }

    toggleClass(e) {
        console.log(e)
        this.setState({ activekey:  e});
    };


    render = () => {
        return (
            <SearchTableStyle>
                <div className="searchBox">
                    <input type="text" className="searchInput" onKeyUp={(e) => this.onSearchInput(e)} placeholder={this.props.Values.placeholder}/>
                </div>
                <div className="tableWrapper">
                    <div className="head1">{this.props.Values.header}</div>
                        <div className="columnWrapper">
                            <table id="myTable">
                                <tbody>
                                {this.state.data.map((key, index) => (
                                <tr onClick={() => this.toggleClass(key.key)} className={this.state.activekey === key.key ? 'active': null} key={key.key}>
                                    <td key={key.key}>{key.weakness}</td>
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

});

const mapActionsToProps = {

};



export default connect(mapStateToProps, mapActionsToProps)(SearchTable);


const SearchTableStyle = styled.div`
    width: 600px;


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
        width: 600px;
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
        height: 300px;
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


    .columnWrapper.scrollbar::-webkit-scrollbar {
    width: 5px;
    background-color: #F5F5F5;
    }

    .columnWrapper.scrollbar::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: linear-gradient(left, #96A6BF, #63738C);
    box-shadow: inset  0 0 1px 1px #96A6BF;
    }

    .columnWrapper.scrollbar::-webkit-scrollbar-track {
    border-radius: 10px;
    background: #eee;
    box-shadow: 0 0 1px 1px #bbb, inset 0 0 7px rgba(0,0,0,0.3)
    }

    .columnWrapper.scrollbar::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(left, #8391A6, #536175);
    }






`
