import React, {Component} from 'react'
import {connect} from 'react-redux'
import styled from 'styled-components'

// redux
import { acceptVulnAction } from '../../redux_actions/action_bountyCurrent.js'

class DisplayBounty extends Component {
    handleSubmit = (e) => {}
    // @DEVEND

    render = () => {
        return (<DisplayBountyStyle>
            <div className="container-2">
                <div className="column-1"></div>
                <div className="column-2">
                    <div className="container-3">
                        <div className="container-3_column-1 shadowborder">
                            <div>
                                <legend>Upload photo</legend>
                                {/* <img src={bountyCurrent.uploadImg} alt=''/> */}
                            </div>
                            <div>
                                <div className='body'>
                                    <div className="timeline">
                                        <div className="container active">
                                            <div>
                                                <h2>18/12/18 12:45PM</h2>
                                                <p>Bounty Has been submited</p>
                                            </div>
                                        </div>
                                        <div className="container">
                                            <div>
                                                <h2>2016</h2>
                                                <p>Lorem ipsum dolor sit amet, quo ei simul congue exerci, </p>
                                            </div>
                                        </div>
                                        <div className="container">
                                            <div>
                                                <h2>2015</h2>
                                                <p>Lorem ipsum dolor sit amet, quo ei simul congue exerci, ad nec admodum perfecto mnesarchum, vim ea mazim fierent detracto. Ea quis iuvaret expetendis his, te elit voluptua dignissim per, habeo iusto primis ea eam.</p>
                                            </div>
                                        </div>
                                        <div className="container">
                                            <div>
                                                <h2>2012</h2>
                                                <p>Lorem ipsum dolor sit amet, quo ei simul congue exerci, ad nec admodum perfecto mnesarchum, vim ea mazim fierent detracto. Ea quis iuvaret expetendis his, te elit voluptua dignissim per, habeo iusto primis ea eam.</p>
                                            </div>
                                        </div>
                                        <div className="container">
                                            <div>
                                                <h2>2011</h2>
                                                <p>Lorem ipsum dolor sit amet, quo ei simul congue exerci, ad nec admodum perfecto mnesarchum, vim ea mazim fierent detracto. Ea quis iuvaret expetendis his, te elit voluptua dignissim per, habeo iusto primis ea eam.</p>
                                            </div>
                                        </div>
                                        <div className="container">
                                            <div>
                                                <h2>2007</h2>
                                                <p>Lorem ipsum dolor sit amet, quo ei simul congue exerci, ad nec admodum perfecto mnesarchum, vim ea mazim fierent detracto. Ea quis iuvaret expetendis his, te elit voluptua dignissim per, habeo iusto primis ea eam.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <br/><br/><br/>
                                <br/><br/>
                            </div>
                        </div>
                        <div className="container-3_column-2 shadowborder">
                            <div>
                                {console.log(this.props.bountyCurrent)}
                                OwnerAddress: {this.props.bountyCurrent.bountyCurrent.owner}<br/>
                                Submmiter: {this.props.bountyCurrent.bountySubmissionState.submitter}<br/>
                                BountyStage: {this.props.bountyCurrent.bountySubmissionState.stage}<br/>
                                LastActionBy: {this.props.bountyCurrent.bountySubmissionState.lastActionBy}<br/>
                            </div>
                            <button type="button" onClick={() => { this.props.acceptVulnAction(this.props.bountyCurrent.bountyCurrent.address) }}>accept Vulnerablity</button>
                        </div>
                    </div>
                </div>
                <div className="column-3"></div>
            </div>
            <div className='footer'></div>
        </DisplayBountyStyle>)
    }
}

const mapStateToProps = state => ({
    bountyCurrent: state.bountyCurrent
})

const mapActionsToProps = {
    acceptVulnAction
}

export default connect(mapStateToProps, mapActionsToProps)(DisplayBounty)

const DisplayBountyStyle = styled.div`
height: auto;




.body {
    background-color: white;
    font-family: Helvetica, sans-serif;
}

/* The actual timeline (the vertical ruler) */
.timeline {
    position: relative;
    max-width: 1200px;
    margin: 0 auto;
}

/* The actual timeline (the vertical ruler) */
.timeline::after {
    content: '';
    position: absolute;
    width: 6px;
    background-color: #494649;
    top: 0;
    bottom: 0;
    left: 15px;
    margin-left: -3px;
}

/* Container around content */
.container {
    padding: 10px 40px;
    position: relative;
    background-color: inherit;
    left: 19px;

}

/* The circles on the timeline */
.container::after {
    content: '';
    position: absolute;
    width: 25px;
    height: 25px;
    right: -17px;
    background-color: white;
    border: 4px solid #494649;
    top: 15px;
    border-radius: 50%;
    z-index: 1;
    left: 15px;
    left: -16px;
}


/* Add arrows to the right container (pointing left) */
.container::before {
    content: " ";
    height: 0;
    position: absolute;
    top: 18px;
    width: 0;
    z-index: 1;
    left: 30px;
    border: medium solid #494649;
    border-width: 10px 10px 10px 0;
    border-color: transparent #494649 transparent transparent;
}

/* The actual content */
.container > div {
    padding: 20px 30px;
    background-color: white;
    position: relative;
    border: 1px solid #494649;
    border-radius: 6px;
}

.active > div {
    border: 3px solid #a02020;
}

.active::after {
    border: 4px solid #a02020;
    background-color: #a02020;
}

.active::before {
    border-color: transparent #a02020 transparent transparent;
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
            flex-basis: 25%;
            padding:10px;
            background-color: white;

        }
        .container-3_column-2 {
            flux: 1;
            flex-basis: 67%;
            padding:10px;
            background-color: white;

        }

    .shadowborder{
        flux: 0;
        box-shadow: 0 4px 10px 0 rgba(0,0,0,0.2), 0 4px 20px 0 rgba(0,0,0,0.19);
    }

    .changeLater {
        max-width: 350px;
        background-color: white;
    }



    #Bountytextarea{
        min-width: 100%;
        min-height: 400px
    }

    .profileImg{
        width: 300px
        hight: 600px
        margin-left: auto;
        margin-right: auto;
        display: block;
        margin-top: 5px;
        margin-bottom: 20px;

    }

    #tempParagraph{
        margin-top: 10px;
    }

    #bodyHeader {
     margin-top: 20px;
    }

    .footer{
        content: "\00a0";
        height: 150px;

    }


.md-preview {
     padding: 10px;
     font-family: Georgia, Palatino, 'Palatino Linotype', Times, 'Times New Roman', serif;
}
     .md-preview p, .md-preview blockquote, .md-preview ol , .md-preview dl, .md-preview table, .md-preview pre {
         margin-top: 0;
         margin-bottom: 16px;
    }
     .md-preview h1, .md-preview h2, .md-preview h3 {
         margin-top: 24px;
         margin-bottom: 16px;
         font-weight: 600;
         line-height: 1.25;
         padding-bottom: 0.3em;
    }
     .md-preview h1 {
         font-size: 1.6em;
    }
     .md-preview h2 {
         font-size: 1.4em;
    }
     .md-preview h3 {
         font-size: 1.2em;
    }
     .md-preview ul, .md-preview ol {
         padding-left: 2em;
    }
     .md-preview blockquote {
         margin-left: 0;
         padding: 0 1em;
         color: #777;
         border-left: 0.25em solid #ddd;
    }
     .md-preview blockquote > :first-child {
         margin-top: 0;
    }
     .md-preview blockquote > :last-child {
         margin-bottom: 0;
    }
     .md-preview code {
         padding: 0.2em 0 0.2em 0;
         margin: 0;
         font-size: 16px;
         background-color: rgba(0, 0, 0, 0.04);
         border-radius: 3px;
    }
     .md-preview code::before, .md-preview code::after {
         letter-spacing: -0.2em;
         content: "\00a0";
    }
     .md-preview pre {
         display: inline-block
         padding: 16px;
         overflow: auto;

         line-height: 1.45;
         background-color: #f8f8f8;
         border: 1px solid #ccc;
         font-family: monospace;
         border-radius: 3px;
         width: auto;
    }
     .md-preview pre code {
         display: inline;
         padding: 0;
         margin: 0;
         line-height: inherit;
         word-wrap: normal;
         border: 0;
    }
     .md-preview pre code::before, .md-preview pre code::after {
         content: none;
    }
     .md-preview pre > code {
         padding: 0;
         margin: 0;
         font-size: 100%;
         word-break: normal;
         white-space: pre;
         background: transparent;
         border: 0;
    }
     .md-preview a {
         text-decoration: none;
         color: #4078c0;
    }
     .md-preview a:hover {
         text-decoration: underline;
    }
     .md-preview > *:first-child {
         margin-top: 0 !important;
    }
     .md-preview > *:last-child {
         margin-bottom: 0 !important;
    }
     .md-preview::after {
         display: table;
         clear: both;
         content: "";
    }
     .md-preview table {
         display: block;
         width: 100%;
         border-spacing: 0;
         border-collapse: collapse;
    }
     .md-preview table thead th {
         font-weight: bold;
    }
     .md-preview table th, .md-preview table td {
         padding: 6px 13px;
         border: 1px solid #c8ccd0;
    }
    .md-preview table tr:nth-child(2n) {
      background: #f6f8fa;
    }
    .md-preview tr {
        border-top: 1px solid #c6cbd1;
        background: #fff;
    }
    .md-preview li {
        list-style: disc;
        margin: 0 0 2px;
        padding: 0 0 0 15px;
    }
    .md-preview ol {
        list-style: circle;
        margin: 0 0 2px;
        padding: 0 0 0 15px;
    }

`
