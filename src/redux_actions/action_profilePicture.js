import {upload, loadimg, ipfs, ipfsHost} from '../Comp_IPFS/Ipfs';
export const PROFILE_PICTURE = 'PROFILE_PICTURE';
export const PROFILE_PICTURE_PENDING = 'PROFILE_PICTURE_PENDING'
export const PROFILE_PICTURE_FULFILLED = 'PROFILE_PICTURE_FULFILLED'

const imgIpfs = (img, callback) => {
    upload(img).then(function (data) {
        loadimg(`http://${ipfsHost}/ipfs/${data}`).then(data => callback(data))
    })
}

// check file beforeUpload
const beforeUpload = (file) => {
    const message = {}
    console.log(file.type.includes('image/'))
  if (!file.type.includes('image/')) {message.error = 'You can only upload img files!'}
    const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error = 'Image must smaller than 2MB!';
  }
  return(message)
}

export function profilePictureAction(e) {
    return {
        type: PROFILE_PICTURE,
        payload: new Promise((resolve, reject) => {
            console.log(e)
            if (e.target.files[0]) {
                console.log(e.target.files[0].type.includes('image/'))
                //console.log(e.target.files[0])
              const check = beforeUpload(e.target.files[0])

              if (!check.error) {
              imgIpfs(e.target.files[0], imageUrl => resolve(imageUrl))
              } else {
              console.log(check.error)
              }
          }

        })
    }
}

export const PROFILE_PICTURE_ERR = 'PROFILE_PICTURE_ERR'
export function profilePictureErrAction(err) {
    return {
        type: PROFILE_PICTURE_ERR,
        payload: err
    }
}

export const GENERATE_PICTURE = 'GENERATE_PICTURE'
export function setPictureLoadedTrueAction(picture) {
    console.log('generate picture')
    const payload = {}
    payload.picture = picture
    payload.loaded = true
    return {
        type: GENERATE_PICTURE,
        payload: payload
    }
}
