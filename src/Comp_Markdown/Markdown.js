//import * as React from "react";
import React, { Component } from 'react';
import ReactMde, {ReactMdeTypes} from "react-mde";
import ReactMarkdown from 'react-markdown';


//redux
import { connect } from 'react-redux';
import {markdownAction} from '../redux_actions/action_markdown'

// other
import styled from 'styled-components';
import * as Showdown from "showdown";






//https://github.com/showdownjs/showdown/wiki/Showdown's-Markdown-syntax

class MarkDown extends Component {
    constructor(props) {
        super(props);
        this.state = {
          code: "markdown-textbox-active",
          preview: "markdown-textbox-none",
        };
      }

      handleTabSwitch = e => {
        this.setState(
          e.target.name === "code"
            ? { code: "markdown-textbox-active", preview: "markdown-textbox-none" }
            : { code: "markdown-textbox-none", preview: "markdown-textbox-active md-preview" }
        );
      };

      handleInput = e => {
        this.props.markdownAction(e.target.name, e.target.value)
      };

  render() {
    return (
        <MarkDownStyle>
            <div className="markdown-body">
          <div className="markdown-header">
            <div className="markdown-tabs">
              <button
                type='button'
                onClick={this.handleTabSwitch}
                name="code"
                className="markdown-button markdown-button-left"
              >Code</button>
              <button
                  type='button'
                onClick={this.handleTabSwitch}
                name="preview"
                className="markdown-button markdown-button-right"
              >Preview</button>
            </div>
          </div>
          <textarea
            className={`${this.state.code} ${'scrollbar'}`}
            name={this.props.reduxStoreValue}
            value={this.props.markdown[this.props.reduxStoreValue]}
            onChange={this.handleInput}
          />
          <div>
            <ReactMarkdown
                className={`${this.state.preview} ${'scrollbar'}`}
                source={this.props.markdown[this.props.reduxStoreValue]}
                escapeHtml={false}
             />
          </div>
        </div>
      </MarkDownStyle>
    );
  }
}

const mapStateToProps = state => ({
    markdown: state.markdown,

});

const mapActionsToProps = {
    markdownAction
};

export default connect(mapStateToProps, mapActionsToProps)(MarkDown);

const MarkDownStyle = styled.div `



    input:focus,
    select:focus,
    textarea:focus,
    button:focus {
      outline: none;
    }

    .markdown-body {
      border: none;
      padding: 10px;
    }

    .markdown-textbox-active{
        vertical-align: top
        width: 100%;
        padding: 10px;
        min-height: 500px;
        /* border-radius: 1px; */
        border: 1px solid #c8ccd0;
        resize: none;
    }
    .markdown-textbox-none {
        display: none;
    }

    .markdown-header {
      height: 40px;
      width: 100%;
      border: 1px solid #c8ccd0;
      background-color: #e5e5e5;
      ${'' /* border-style: solid;
      border-width: 1px; */}
      border-bottom: none;
      /* border-bottom: 1px solid #c8ccd0; */
    }
    .markdown-tabs {
      display: flex;
      justify-content: flex-end;
      padding: 10px 10px 0 10px;
    }
    .markdown-button {
      text-align: center;
      margin-left: 7px;
      height: 31px;
      border-style: solid;
      border-width: 1px;
      border-color: #c8ccd0 #c8ccd0 white #c8ccd0;
      /* border-radius: 1px 1px 2px 2px; */
      background: white;
      z-index: 1;
    }


    .scrollbar::-webkit-scrollbar {
	width: 5px;
	background-color: #F5F5F5;
}

    .scrollbar::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background: linear-gradient(left, #96A6BF, #63738C);
  box-shadow: inset  0 0 1px 1px #96A6BF;
    }

    .scrollbar::-webkit-scrollbar-track {
  border-radius: 10px;
  background: #eee;
  box-shadow: 0 0 1px 1px #bbb, inset 0 0 7px rgba(0,0,0,0.3)
    }

    .scrollbar::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(left, #8391A6, #536175);
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
        list-style: circle;;
        margin: 0 0 2px;
        padding: 0 0 0 15px;
    }
`;
