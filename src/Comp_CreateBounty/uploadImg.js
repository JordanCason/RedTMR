
import styled from 'styled-components';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { profilePictureAction, profilePictureErrAction } from '../redux_actions/action_createBounty'

class UploadImg extends Component {


    handleChange = (e) => {
        this.props.profilePictureAction(e)
    }

  render() {
      let imageClass = 'image'
      let errerClass = 'noerror'
      if (this.props.createBounty.err) {
          imageClass = 'image_error'
          errerClass = 'text_error'
      }


    return (
    <UploadImgStyle>
        <div className="container">
        <img className={imageClass} src={this.props.createBounty.picture} alt="" />
        <input className='overlay' type='file' onChange={this.handleChange} name='photo' />
        <span className={errerClass}>{'error message'}</span>
        </div>

     </UploadImgStyle>
    );
  }
}

const mapStateToProps = state => ({
    createBounty: state.createBounty,
});

const mapActionsToProps = {
    profilePictureAction,
    profilePictureErrAction
};

export default connect(mapStateToProps, mapActionsToProps)(UploadImg);



const UploadImgStyle = styled.div`

.container {
position: relative;
max-width: 300px;
max-height: 300px;

margin-left: auto;
margin-right: auto;
margin-top: 5px;
margin-bottom: 20px;
}

.overlay {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100%;
  width: 100%;
  opacity: 0;
  cursor:pointer;
}

.image {
    max-width: 300px;
    max-height: 300px;
  display: block;
  width: 100%;
  height: auto;
}
.image_error {
    max-width: 300px;
    max-height: 300px;
  display: block;
  width: 100%;
  height: auto;
  border-style: dashed;
  border-width: 1px;
  border-color: red;
}

.text_error {
    color: red;

}

.noerror {
    display: none;
}

`
