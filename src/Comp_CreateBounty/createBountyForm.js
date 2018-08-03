import { Form, Input, Select, Row, Col, Button, InputNumber } from 'antd';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Markdown from '../Comp_Markdown/Markdown';
import faker from 'faker';
import {profilePictureErrAction, profilePictureAction, setPictureLoadedTrueAction} from '../redux_actions/action_profilePicture.js'
import ReactMarkdown from 'react-markdown';
import {ipfsHashToast, depositEthToast, transactionReceiptToast, transactionHashToast} from '../Comp_toast/Toast'
import {upload, loadimg, ipfs, ipfsHost} from '../Comp_IPFS/Ipfs';
import {myContract, web3, bountyabi} from '../Comp_web3/abi.js';

const FormItem = Form.Item;
const Option = Select.Option;

const submitBounty = (values, wallet) => {
    console.log(values)
        const { walletAddresses, walletAddress, addressValue, walletLoaded } = wallet

        // Need to addin a check to make sure values are enterd """Was getting an errer when no imag was upladed"""
        ipfs.addJSON({  // push data to ipfs
            uploadImg: values.uploadImg,
            comName: values.comName,
            comAbout: values.comAbout,
            secEmail: values.secEmail,
            maxEth: values.maxEth,
            minEth: values.minEth,
            Bountytextarea: values.Bountytextarea
        }, (err, result) => {
            ipfsHashToast(result) // display IPFS hash in toast
            console.log(values.deposit)
            const deposit = web3.utils.toWei(values.deposit.toString(), 'ether')
            myContract.methods.createBounty(result).send({from: walletAddress, gas: 3000000, value: deposit}) // save ipfs hash and create contract
            .on('transactionHash', function(hash){
            transactionHashToast(hash)
            })
             .on('receipt', (receipt) => {
                 transactionReceiptToast(receipt, deposit)
                let bountyContractAddress = receipt.events.returnBounty.returnValues[0];
                let bountyContract = new web3.eth.Contract(bountyabi, bountyContractAddress)
                bountyContract.methods.ownerInfo().call().then(function(result) {
                    console.log(`contract info: `, result)
                });
                //need to setup a listner to get contract address and display toast
            });
        });
     };


     const markdownInitCreateBounty = `
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



     `;




class CreateBountyForm extends Component {
  state = {
    confirmDirty: false,
  };

  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }

  onChange = (value) => {
  console.log('changed', value);
    }
    generateFormData = () => {
        this.props.setPictureLoadedTrueAction(faker.image.avatar())
        this.props.form.setFields({
              comName: {value: faker.company.companyName()},
              website: {value: faker.internet.domainName()},
              comAbout: {value: faker.company.catchPhrase()},
              secEmail: {value: faker.internet.email()},
              maxEth: {value: faker.random.number({min:4, max:13})},
              minEth: {value: faker.random.number({min:1, max:3})},
            });
        };
//uploadImg: uploadImg, comName: comName, comAbout: comAbout, secEmail: secEmail, maxEth: maxEth, minEth: minEth, Bountytextarea: Bountytextarea
    handleSubmit = (e) => {

        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            console.log(this.props.profilePicture.loaded)
                if (!this.props.profilePicture.loaded){
                    if (!err) {
                        err = {}
                    }
                    err.picture = {errors: [{message: 'No profile picture uploaded', field: "profilePicture"}]}
                    this.props.profilePictureErrAction(err.picture)
                }
            if (!err) {
                const test = ReactMarkdown({
                    source: this.props.markdown.createBounty,
                    rawSourcePos: true
                })
                values.uploadImg = this.props.profilePicture.picture

                console.log(this.props.profilePicture.picture)
                values.Bountytextarea = this.props.markdown.createBounty
                // console.log(this.props.profilePicture)
                // console.log('Received values of form: ', values);
                submitBounty(values, this.props.ethereumWallet)
                //submit data to ipfs and ethereum



            }
        });

    }

  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 0,
        },
      },
    };


    return (
      <Form onSubmit={this.handleSubmit}>

        <FormItem {...formItemLayout} label='Company Name'>
            {getFieldDecorator('comName', {rules: [{ required: true, message: 'Please input your orginizations name!', whitespace: true }],})(<Input />)}
        </FormItem>

        <FormItem {...formItemLayout} label='Website'>
            {getFieldDecorator('website', {rules: [{ required: true, message: 'Please input your website!', whitespace: true }],})(<Input />)}
        </FormItem>

        <FormItem {...formItemLayout} label='About'>
            {getFieldDecorator('comAbout', {rules: [{ required: true, message: 'What does your orginization do?', whitespace: true }],})(<Input />)}
        </FormItem>

        <FormItem {...formItemLayout} label="E-mail">
            {getFieldDecorator('secEmail', {rules: [{type: 'email', message: 'The input is not valid E-mail!',},
            {required: true, message: 'Please input your E-mail!',}],})(<Input />)}
        </FormItem>

        <FormItem {...formItemLayout} label="Deposit">
            {getFieldDecorator('deposit', { initialValue: 0.01})(<InputNumber disabled id='Max' style={{ width: '100%' }} />)}
        </FormItem>

        <FormItem {...formItemLayout} label="Max Ether">
            {getFieldDecorator('maxEth', { rules: [{ required: true, message: 'Maximum payout required'}], initialValue: 0.00000000})(<InputNumber id='Max' min={0.00000001} step={0.00000001} onChange={this.onChange} style={{ width: '100%' }} />)}
        </FormItem>

        <FormItem {...formItemLayout} label="Min Ether">
            {getFieldDecorator('minEth', { rules: [{ required: true, message: 'Minimum payout required'}], initialValue: 0.00000000})(<InputNumber id='Min' min={0.00000001} step={0.00000001} onChange={this.onChange} style={{ width: '100%' }} />)}
        </FormItem>
        <a id='textboxlable'>Details/scope</a>
        <Markdown reduxStoreValue="createBounty" data={markdownInitCreateBounty}/>

        <FormItem {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">Submit</Button>
            <Button onClick={() => this.generateFormData()} type="normal" htmlType="button">Generate Random</Button>
        </FormItem>


      </Form>
    );
  }
}
//Function([fieldNames: string[]], options: object, callback: Function(errors, values))
//onClick={() => this.props.form.validateFields({ force: true },(errors, values) => {console.log(values); console.log(errors)} )}


const mapStateToProps = state => ({
    profilePicture: state.profilePicture,
    markdown: state.markdown,
    ethereumWallet: state.ethereumWallet

});

const mapActionsToProps = {
    profilePictureAction,
    profilePictureErrAction,
    setPictureLoadedTrueAction,

};

const WrappedRegistrationForm = Form.create()(CreateBountyForm);
export default connect(mapStateToProps, mapActionsToProps)(WrappedRegistrationForm);
