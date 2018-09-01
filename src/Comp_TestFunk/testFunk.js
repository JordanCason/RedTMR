import React, {Component} from 'react'
import {myContract, web3, bountyabi} from '../Comp_web3/abi.js'
import styled from 'styled-components'
import {ipfs} from '../Comp_IPFS/Ipfs'
import {connect} from 'react-redux'
import 'purecss'

class Home extends Component {
    funkOne (e) {
    }
    render = () => {
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
    ethereumWallet: state.ethereumWallet
})

const mapActionsToProps = {
}

export default connect(mapStateToProps, mapActionsToProps)(Home)

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
