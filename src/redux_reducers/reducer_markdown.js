import {
    UPDATE_MARK_DOWN,
    INIT_MARK_DOWN ,
    } from '../redux_actions/action_markdown';

const initState = {}

export function markdownReducer( state = initState, action) {
    const { type, payload } = action;
    switch (type) {
        case UPDATE_MARK_DOWN:
        return {
            ...state,
            [payload.name]: payload.value,
        };
        case INIT_MARK_DOWN:
        return{
            ...state,
            [payload.name]: payload.data
        }
    default:
    return state;
    }
}
