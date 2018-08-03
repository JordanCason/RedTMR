import {TABLE_CLICK_FULFILLED} from '../redux_actions/action_tableClick.js';



const init = {}
export function tableClickReducer( state = init, action) {
    const { type, payload } = action;
    switch (type) {
        case TABLE_CLICK_FULFILLED:
        return {
            ...state,
            [payload.reduxTableName]: payload.key,
        };
    default:
    return state;
    }
}
