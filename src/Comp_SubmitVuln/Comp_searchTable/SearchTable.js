import React, { Component } from 'react';
import { connect } from 'react-redux';
import "antd/dist/antd.less";
//import "./table/index.js"
import 'less'
//import "antd/dist/antd.less";
import { Table } from "antd";
import styled from 'styled-components';



//const Search = Input.Search;
const columns = [
{
  title: <input type="text" id="myInput" onKeyUp={this.onSearchInput} placeholder="Search for names.." title="Type in a name" />,
  dataIndex: 'weakness',
  width: 300,
}, {
  title: 'CWE',
  dataIndex: 'CWE',
  width: 150,
}];

const data = [
    {key: '1', weakness: 'ClearText Storage of Sensitive Information', CWE: 'CWE-312'},
    {key: '2', weakness: 'Command Injection - Generic', CWE: 'CWE-77'},
    {key: '333', weakness: 'Cross-site Scripting (XSS) - Generic', CWE: 'CWE-79'},
    {key: '4', weakness: 'ClearText Storage of Sensitive Information', CWE: 'CWE-312'},
    {key: '5', weakness: 'Command Injection - Generic', CWE: 'CWE-77'},
    {key: '6', weakness: 'Cross-site Scripting (XSS) - Generic', CWE: 'CWE-79'},
    {key: '7', weakness: 'ClearText Storage of Sensitive Information', CWE: 'CWE-312'},
    {key: '8', weakness: 'Command Injection - Generic', CWE: 'CWE-77'},
    {key: '9', weakness: 'Cross-site Scripting (XSS) - Generic', CWE: 'CWE-79'},
    {key: '10', weakness: 'ClearText Storage of Sensitive Information', CWE: 'CWE-312'},
    {key: '26', weakness: 'Command Injection - Generic', CWE: 'CWE-77'},
    {key: '3', weakness: 'Cross-site Scripting (XSS) - Generic', CWE: 'CWE-79'},
    {key: '15', weakness: 'ClearText Storage of Sensitive Information', CWE: 'CWE-312'},
    {key: '42', weakness: 'Command Injection - Generic', CWE: 'CWE-77'},
    {key: '377', weakness: 'Cross-site Scripting (XSS) - Generic', CWE: 'CWE-79'},
    {key: '165', weakness: 'ClearText Storage of Sensitive Information', CWE: 'CWE-312'},
    {key: '2456', weakness: 'Command Injection - Generic', CWE: 'CWE-77'},
    {key: '3456', weakness: 'Cross-site Scripting (XSS) - Generic', CWE: 'CWE-79'},
]

class SearchTable extends Component {
    constructor(props) {
        super(props)
        this.onSearchInput = this.onSearchInput.bind(this);
        this.state = {
            weakness: data,
            markdown: 'At w3schools.com you will learn how to make a website. We offer free tutorials in all web development technologies.'
        }
    }




    onSearchInput(e) {
        console.log(e.target.value)
    const createNewState = []
        data.forEach((item, i) => {
            if (item.weakness.toLowerCase().includes(e.target.value.toLowerCase())) {
                createNewState.push(item)
            }
            this.setState({weakness: createNewState})
        });

        
    console.log(this.state)
    }


    render = () => {
        const attacksurface = {}
        attacksurface.reduxType = "UPDATE_ATTACK_SURFACE"
        attacksurface.storeName = "attacksurface"

        const another = {}
        another.reduxType = "UPDATE_ATTACK_SURFACE"
        another.storeName = "attacksurface"
        return (
            <SearchTableStyle>
                <Table
                    size={"small"}
                    id="WeaknessSearchList"
                    pagination = {false}
                    scroll={{ y: 300 }}
                    columns={[
                    {
                      title: <input type="text" id="searchInput" onKeyUp={this.onSearchInput} placeholder="Search for names.." title="Type in a name" />,
                      dataIndex: 'weakness',
                      width: 300,
                    }, {
                      title: 'CWE',
                      dataIndex: 'CWE',
                      width: 150,
                    }]}
                    dataSource={this.state.weakness}
                    onRow={record => ({onClick: () => {}})}
                />
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
    height: 400px;


#searchInput {
    border: none;
    width: 400px
    textarea, select, input, button { outline: none; }
}
.ant-table-body {
    min-height: 300px;



    `;
