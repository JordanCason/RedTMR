import {GET_BOUNTYS_PENDING, GET_BOUNTYS_FULFILLED} from '../redux_actions/action_bountysList'

const initialState = {
    bountysList: {},
    bountysLoaded: false
}

export function bountysListReducer(state = initialState, action) {
    const {type, payload} = action
    switch (type) {
    case GET_BOUNTYS_PENDING:
        return {
            ...state,
            bountysList: payload,
            bountysLoaded: false
        }
    case GET_BOUNTYS_FULFILLED:
        return {
            ...state,
            bountysList: payload,
            bountysLoaded: true
        }
    default:
        return state
    }
}
