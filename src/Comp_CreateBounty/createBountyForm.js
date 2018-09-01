import { Form, Input, Button, InputNumber } from 'antd'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Markdown from '../Comp_Markdown/Markdown'
import { markdownInitCreateBounty } from './sampleVDP.js'
import {generateFormDataAction, profilePictureErrAction, profilePictureAction, setPictureLoadedTrueAction, submitBountyAction} from '../redux_actions/action_createBounty'
const FormItem = Form.Item


class CreateBountyForm extends Component {
    state = {
        confirmDirty: false
    }

    handleConfirmBlur = (e) => {
        const value = e.target.value
        this.setState({ confirmDirty: this.state.confirmDirty || !!value })
    }

    onChange = (value) => {
        console.log('changed', value)
    }

    generateFormData = () => {
        this.props.generateFormDataAction().then(() => {
            const values = this.props.createBounty.formFields
            const formFields = {
                comName: {value: values.comName},
                website: {value: values.website},
                comAbout: {value: values.comAbout},
                secEmail: {value: values.secEmail},
                maxEth: {value: values.maxEth},
                minEth: {value: values.minEth}
            }
            this.props.form.setFields(formFields)
        })
    }

    handleSubmit = (e) => {
        // when i remove this form need to restructure redux action
        e.preventDefault()
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!this.props.createBounty.loaded) {
                if (!err) {
                    err = {}
                }
                err.picture = {errors: [{message: 'No profile picture uploaded', field: 'profilePicture'}]}
                this.props.profilePictureErrAction(err.picture)
            }
            if (!err) {
                values.uploadImg = this.props.createBounty.picture
                values.Bountytextarea = this.props.markdown.createBounty
                console.log(values.Bountytextarea)
                this.props.submitBountyAction(values, this.props.ethereumWallet)
            }
        })
    }

    render() {
        const { getFieldDecorator } = this.props.form

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 5 }
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 8 }
            }
        }

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
            <Form onSubmit={this.handleSubmit}>

                <FormItem {...formItemLayout} label='Company Name'>
                    {getFieldDecorator('comName', {rules: [{ required: true, message: 'Please input your orginizations name!', whitespace: true }]})(<Input />)}
                </FormItem>

                <FormItem {...formItemLayout} label='Website'>
                    {getFieldDecorator('website', {rules: [{ required: true, message: 'Please input your website!', whitespace: true }]})(<Input />)}
                </FormItem>

                <FormItem {...formItemLayout} label='About'>
                    {getFieldDecorator('comAbout', {rules: [{ required: true, message: 'What does your orginization do?', whitespace: true }]})(<Input />)}
                </FormItem>

                <FormItem {...formItemLayout} label="E-mail">
                    {getFieldDecorator('secEmail', {rules: [{type: 'email', message: 'The input is not valid E-mail!'},
                        {required: true, message: 'Please input your E-mail!'}]})(<Input />)}
                </FormItem>

                <FormItem {...formItemLayout} label="Deposit">
                    {getFieldDecorator('deposit', { initialValue: 0.01 })(<InputNumber disabled id='Max' style={{ width: '100%' }} />)}
                </FormItem>

                <FormItem {...formItemLayout} label="Max Ether">
                    {getFieldDecorator('maxEth', { rules: [{ required: true, message: 'Maximum payout required' }], initialValue: 0.00000000 })(<InputNumber id='Max' min={0.00000001} step={0.00000001} onChange={this.onChange} style={{ width: '100%' }} />)}
                </FormItem>

                <FormItem {...formItemLayout} label="Min Ether">
                    {getFieldDecorator('minEth', { rules: [{ required: true, message: 'Minimum payout required' }], initialValue: 0.00000000 })(<InputNumber id='Min' min={0.00000001} step={0.00000001} onChange={this.onChange} style={{ width: '100%' }} />)}
                </FormItem>
                <a id='textboxlable'>Details/scope</a>
                <Markdown reduxStoreValue="createBounty" data={markdownInitCreateBounty}/>

                <FormItem {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">Submit</Button>
                    <Button onClick={() => this.generateFormData()} type="normal" htmlType="button">Generate Random</Button>
                </FormItem>


            </Form>
        )
    }
}


const mapStateToProps = state => ({
    profilePicture: state.profilePicture,
    markdown: state.markdown,
    ethereumWallet: state.ethereumWallet,
    createBounty: state.createBounty

})

const mapActionsToProps = {
    profilePictureAction,
    profilePictureErrAction,
    setPictureLoadedTrueAction,
    generateFormDataAction,
    submitBountyAction

}

const WrappedRegistrationForm = Form.create()(CreateBountyForm)
export default connect(mapStateToProps, mapActionsToProps)(WrappedRegistrationForm)
