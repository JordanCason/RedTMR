// react
/* eslint handle-callback-err: "off" */
// eslint-disable-next-line
import React, { Component } from 'react';
import { connect } from 'react-redux'
// import { Input  } from 'antd';

// ethereum
import {web3, bountyabi} from '../Comp_web3/abi.js'

// Ipfs
import {ipfs} from '../Comp_IPFS/Ipfs'
import {ipfsHashToast} from '../Comp_toast/Toast'

// antd
import { Form, Button } from 'antd'

// other
import styled from 'styled-components'
import CVSSScore from '../Comp_CVSS/CVSSScore'
import Markdown from '../Comp_Markdown/Markdown'
import SearchTable from './Comp_searchTable2/SearchTable'
import '../func/hex.js'

const FormItem = Form.Item

const weaknessValues = {
    reduxTableName: 'Weakness',
    header: 'Weakness',
    placeholder: 'Search...',
    width: '600px',
    height: '300px'
}

const attackValues = {
    reduxTableName: 'Attack',
    header: 'Attack surface',
    placeholder: 'Search...',
    width: '700px',
    height: '400px'
}

const weaknessData = [
    {key: '1', weakness: 'ClearText Storage of Sensitive Information', CWE: 'CWE-312'},
    {key: '2', weakness: 'Command Injection - Generic', CWE: 'CWE-77'},
    {key: '3', weakness: 'Cross-site Scripting (XSS) - Generic', CWE: 'CWE-79'},
    {key: '4', weakness: 'ClearText Storage of Sensitive Information', CWE: 'CWE-312'},
    {key: '5', weakness: 'Command Injection - Generic', CWE: 'CWE-77'},
    {key: '6', weakness: 'Cross-site Scripting (XSS) - Generic', CWE: 'CWE-79'},
    {key: '7', weakness: 'ClearText Storage of Sensitive Information', CWE: 'CWE-312'},
    {key: '8', weakness: 'Command Injection - Generic', CWE: 'CWE-77'},
    {key: '9', weakness: 'Cross-site Scripting (XSS) - Generic', CWE: 'CWE-79'},
    {key: '10', weakness: 'ClearText Storage of Sensitive Information', CWE: 'CWE-312'},
    {key: '11', weakness: 'Command Injection - Generic', CWE: 'CWE-77'},
    {key: '12', weakness: 'Cross-site Scripting (XSS) - Generic', CWE: 'CWE-79'},
    {key: '13', weakness: 'ClearText Storage of Sensitive Information', CWE: 'CWE-312'},
    {key: '14', weakness: 'Command Injection - Generic', CWE: 'CWE-77'},
    {key: '15', weakness: 'Cross-site Scripting (XSS) - Generic', CWE: 'CWE-79'},
    {key: '16', weakness: 'ClearText Storage of Sensitive Information', CWE: 'CWE-312'},
    {key: '17', weakness: 'Command Injection - Generic', CWE: 'CWE-77'},
    {key: '18', weakness: 'Cross-site Scripting (XSS) - Generic', CWE: 'CWE-79'}
]

const markdownInitSubmitVuln = `
![Add an img](https://oracletimes.com/wp-content/uploads/2018/03/Ethereum-Cover.png "ETH")

# Disclosure Policy

No technology is perfect, and N/A believes that working with skilled security researchers across the globe is crucial in identifying weaknesses in any technology. If you believe you've found a security issue in our product or service, we encourage you to notify us. We welcome working with you to resolve the issue promptly.

* Let us know as soon as possible upon discovery of a potential security issue, and we'll make every effort to quickly resolve the issue.
* Provide us a reasonable amount of time to resolve the issue before any disclosure to the public or a third-party.
* Make a good faith effort to avoid privacy violations, destruction of data, and interruption or degradation of our service. Only interact with accounts you own or with explicit permission of the account holder.




# Exclusions
While researching, we'd like to ask you to refrain from:
* Denial of service
* Spamming
* Social engineering (including phishing) of N/A staff or contractors
* Any physical attempts against N/A property or data centers

Thank you for helping keep N/A and our users safe!

## Code block
\`\`\`js
var React = require('react');
var Markdown = require('');

React.render(
  <Markdown source="# " />,
  document.getElementById('content')
);
\`\`\`

## Table

| min/Max | Critical (CVSS 9.0 - 10.0) | High (CVSS 7.0 - 8.9) | Medium (CVSS 4.0 - 6.9) | Low (CVSS 0.0 - 3.9) |
| ------- | -------------------------- | --------------------- | ----------------------- |--------------------- |
| Minimum |10 ETH                      |5 ETH                  |2 ETH                    |0.1 ETH               |
| Maximum |15 ETH                      |8 ETH                  |5 ETH                    |2 ETH                 |



this is a link to [google][]

[google]: http://www.google.com


`

class SubmitVuln extends Component {
    handleSubmit = (e) => {
        const vulnData = {
            attackSurface: this.props.tableClick.Attack,
            weakness: this.props.tableClick.Weakness,
            ReportDetails: this.props.markdown.submitVuln,
            CVSSData: this.props.CVSSData
        }
        const transaction = {
            from: this.props.ethereumWallet.walletAddress,
            gas: 4000000
        }
        // @DEV (submit Vulnerability) add data to ipfs and push cve score and ipfs hash to blockchain
        ipfs.addJSON(vulnData, (err, result) => {
            ipfs.base58ToHex(result).then((result) => {
                ipfsHashToast(result)
                const bountycontract = new web3.eth.Contract(bountyabi, this.props.bountyCurrent.bountyCurrent.address)
                bountycontract.methods.submitVuln(vulnData.CVSSData.environmental.score.hexEncode(), result).send(transaction)
                    .on('transactionHash', function (hash) {
                        console.log(hash)
                    })
                    .on('receipt', function (receipt) {
                        console.log(receipt)
                    })
                // ipfs.catJSON(result, (err, ipfsresult) => {
                //     console.log(ipfsresult)
                // })
            })
        })
    }
    // @DEVEND

    render = () => {
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0
                },
                sm: {
                    span: 16,
                    offset: 0
                }
            }
        }

        return (
            <SubmitVulnStyle>
                <div className="container-2">
                    <div className="column-1"></div>
                    <div className="column-2">
                        <div className="container-3">
                            <div className="container-3_column-1 shadowborder">
                                <div className='directoryHeader'>
                                    <span><h1 id="mainTitle">Submit Vulnerability Report</h1></span>
                                </div>
                                <div className='subDirectoryHeader'>
                                    <span>All data below will be enceripted with the bounty owners publick Etherum address.
                                        A copy will also be saved and encrypted with the submiters publick Etherum address.</span>
                                </div>

                                <div>
                                    <br/><br/>
                                    <p>Select The attack surface of the Vulnerability</p>
                                    <SearchTable Values={attackValues} data={weaknessData}/>
                                </div>

                                <div>

                                    <p>Select a Weakness, One the you think best describes the vulnerability.</p>
                                    <SearchTable Values={weaknessValues} data={weaknessData}/>

                                </div>

                                <div id="test">
                                    <p>Report details</p>
                                    <Markdown reduxStoreValue="submitVuln" data={markdownInitSubmitVuln}/>
                                </div>
                                <br/><br/><br/><br/>
                                <div>
                                    <h1 id="mainTitle">Calculate Common Vulnerability Score</h1>
                                    <CVSSScore/>
                                </div>
                                <Form>
                                    <FormItem {...tailFormItemLayout}>
                                        <Button onClick={this.handleSubmit} type="primary" htmlType="button">Submit</Button>
                                    </FormItem>
                                </Form>

                                <div className="directoryFooter"></div>

                            </div>
                        </div>
                    </div>
                    <div className="column-3"></div>
                </div>
            </SubmitVulnStyle>
        )
    }
}

const mapStateToProps = state => ({
    tableClick: state.tableClick,
    markdown: state.markdown,
    CVSSData: state.CVSSData,
    bountyCurrent: state.bountyCurrent,
    ethereumWallet: state.ethereumWallet
})

const mapActionsToProps = {

}

export default connect(mapStateToProps, mapActionsToProps)(SubmitVuln)

const SubmitVulnStyle = styled.div`
height: auto;

#test {
    width: 100%;
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



#cvssReference {
  font-size: 100%;
}

fieldset {
    position: relative;
    background-color: #f2f2f2;
    margin-top: 50px;
    border:0;
    padding: 1em 0;
}

fieldset legend {
    background-color: #666666;
    color: #ffffff;
    margin: 0;
    width: 100%;
    padding: 0.5em 0px;
    text-indent: 1em;
}
fieldset div.metric {
    padding: 0;
    margin: 0.5em 0;
}

@media only screen and (min-width:768px) {
    fieldset div.column {
        width: 45%;
        margin: 0 0 0 1em;
    }
    fieldset div.column-left {
        float: left;
        height: auto;
    }
    fieldset div.column-right {
        float: right; height: auto;
    }
}

fieldset h3 {
    font-size: 1em;
    margin: 0;
    padding-left: 0.1em;
    }

fieldset input {
    display: none;
    width:auto;
    }

fieldset label {
    background: #cccccc;
    display: inline-block;
    margin: 3px;
    padding: 2px 5px;
    border: 0;
    cursor: pointer;
    font-size: 90%;
    border-radius: 5px;
    color: #666666;
    border: 1px solid #999999;
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select:
    -moz-none;
    -ms-user-select: none;
    user-select: none;
}

fieldset label:hover {
    background: #666666;
    color: #ffffff;
    border: 1px solid #666666
}

fieldset input:checked + label {
    background: #a02020;
    border: 1px solid #a02020;
    color: #ffffff;
}

#vector {
    margin: 0 1em;
    padding:0;
}

#vectorString {
    display: none;
    border: 0;
    padding: 0;
    margin: 0;
    background-color: #a02020; /*#090;*/
    color: #ffffff;
    font-weight: bold;
    font-size:0.8em;
    width:50em;
    max-width:100%;
    }

.scoreRating {
    position: absolute;
    top:-36px;
    right:0;
    padding: 0 0.4em;
    margin: 0 15px;
    border: 2px solid #666666;
    background: #dddddd;
    font-size:11px;
    border-radius: 10px;
    width: 100px;
    height: auto;
    line-height: 150%;
    text-align: center;
    }

    .scoreRating.none, .scoreRating.low, .scoreRating.medium, .scoreRating.high, .scoreRating.critical {
        color:#ffffff;
    }

    .scoreRating.none     { background:#53aa33; border:2px solid #53aa33; }
    .scoreRating.low      { background:#ffcb0d; border:2px solid #ffcb0d; }
    .scoreRating.medium   { background:#f9a009; border:2px solid #f9a009; }
    .scoreRating.high     { background:#df3d03; border:2px solid #df3d03; }
    .scoreRating.critical { background:#cc0500; border:2px solid #cc0500; }
    .scoreRating span     { font-size: 150%; font-weight: bold; width: 100%; }
    .needBaseMetrics      { text-align:center; line-height:100%; padding-top:5px; font-size:15px; }

    #baseMetricScore,
    #temporalMetricScore,
    #environmentalMetricScore { display: block; font-size: 32px; line-height: 32px; font-weight: normal; margin-top: 4px; }

    #baseSeverity,
    #temporalSeverity,
    #environmentalSeverity { font-size: 16px; font-weight: normal; margin-bottom: 5px; display: block; }

    div#scriptWarning { border: solid red 2px; background: #f5dddd; padding: 1em 1em 1em 1em; margin: 0.4em 0; }

`
