
import { CURRENT_BOUNTY_FULFILLED, CHECK_OWNER_FULFILLED, } from '../redux_actions/action_bountyCurrent.js';

const initialState = {
    bountyCurrent: {},
    bountyLoaded: false,
    isOwner: false,
}

export function bountyCurrentReducer( state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case CURRENT_BOUNTY_FULFILLED:
        return {
            ...state,
            bountyCurrent: payload,
            bountyLoaded: true,
            isOwner: payload.isOwner
        };
        case CHECK_OWNER_FULFILLED:
        return {
            ...state,
            isOwner: payload,
        };
    default:
    return state;
    }
}
