import {
    PROFILE_PICTURE_FULFILLED,
    PROFILE_PICTURE_PENDING,
    PROFILE_PICTURE_ERR,
    GENERATE_PICTURE,
    GENERATE_FORM_DATA_FULFILLED
} from '../redux_actions/action_createBounty'
import defaultPic from '../img/default.png'

const init = {
    formFields: {
        picture: defaultPic,
        loaded: false
    },
    picture: defaultPic,
    loaded: false,
    err: null
}

export function createBountyReducer(state = init, action) {
    const { type, payload } = action
    console.log(type)
    switch (type) {
    case PROFILE_PICTURE_PENDING:
        return {
            ...state,
            loaded: false,
            err: null
        }
    case PROFILE_PICTURE_FULFILLED:
        return {
            ...state,
            picture: payload,
            loaded: true
        }
    case PROFILE_PICTURE_ERR:
        return {
            ...state,
            err: payload
        }
    case GENERATE_PICTURE:
        return {
            ...state,
            picture: payload.picture,
            loaded: payload.loaded
        }

    case GENERATE_FORM_DATA_FULFILLED:
        return {
            ...state,
            formFields: payload
        }
    default:
        return state
    }
}
