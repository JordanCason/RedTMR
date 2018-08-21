
import { CURRENT_BOUNTY_FULFILLED, CHECK_OWNER_FULFILLED, CHECK_BOUNTY_STATE_FULFILLED, CURRENT_BOUNTY_PENDING, CURRENT_BOUNTY_CLEANUP } from '../redux_actions/action_bountyCurrent.js'

const initialState = {
    bountyCurrent: {},
    bountySubmissionState: {},
    bountyLoaded: false,
    isOwner: false,
    bountySubmission: false,
    promisePending: false
}

export function bountyCurrentReducer(state = initialState, action) {
    const { type, payload } = action
    console.log(`${type} ${payload}`)
    switch (type) {
    case CURRENT_BOUNTY_PENDING:
        return {
            ...state,
            promisePending: true
        }
    case CURRENT_BOUNTY_FULFILLED:
        return {
            ...state,
            promisePending: false,
            bountyCurrent: payload,
            bountyLoaded: true,
            isOwner: payload.isOwner
        }
    case CHECK_OWNER_FULFILLED:
        return {
            ...state,
            isOwner: payload
        }
    case CHECK_BOUNTY_STATE_FULFILLED:
        return {
            ...state,
            bountySubmissionState: payload,
            bountySubmission: payload.bountySubmission
        }
    case CURRENT_BOUNTY_CLEANUP: return (initialState)
    default:
        return state
    }
}
