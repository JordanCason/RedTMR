import {
    PROFILE_PICTURE_FULFILLED,
    PROFILE_PICTURE_PENDING,
    PROFILE_PICTURE_ERR,
    GENERATE_PICTURE,
    } from '../redux_actions/action_profilePicture';
import default_pic from '../img/default.png';

const init = {
    picture: default_pic,
    loaded: false,
    err: null,

}

export function profilePictureReducer( state = init, action) {
    const { type, payload } = action;
    switch (type) {
        case PROFILE_PICTURE_PENDING:
        return {
            ...state,
            loaded: false,
            err: null,
        };
        case PROFILE_PICTURE_FULFILLED:
        return {
            ...state,
            picture: payload,
            loaded: true,
        };
        case PROFILE_PICTURE_ERR:
        return {
            ...state,
            err: payload,
        };
        case GENERATE_PICTURE:
        return {
            ...state,
            picture: payload.picture,
            loaded: payload.loaded,
        };
    default:
    return state;
    }
}
