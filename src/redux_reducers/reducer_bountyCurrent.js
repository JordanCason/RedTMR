
import { CURRENT_BOUNTY_FULFILLED,
    CHECK_OWNER_FULFILLED,
    CHECK_BOUNTY_HACKER_STATE_FULFILLED,
    CURRENT_BOUNTY_PENDING,
    CURRENT_BOUNTY_CLEANUP,
    ACCEPT_VULN_FULFILLED,
    CHECK_BOUNTY_OWNER_STATE_FULFILLED} from '../redux_actions/action_bountyCurrent.js'

const initialState = {
    bountyCurrent: {},
    bountySubmissionState: {},
    bountySubmissionOwnerState: {},
    bountyLoaded: false,
    isOwner: false,
    bountySubmission: false,
    promisePending: false
}

export function bountyCurrentReducer(state = initialState, action) {
    const { type, payload } = action
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
            bountyLoaded: true
        }
    case CHECK_OWNER_FULFILLED:
        return {
            ...state,
            isOwner: payload
        }
    case CHECK_BOUNTY_HACKER_STATE_FULFILLED:
        return {
            ...state,
            bountySubmissionState: payload,
            bountySubmission: payload.bountySubmission

        }
    case CHECK_BOUNTY_OWNER_STATE_FULFILLED:
        return {
            ...state,
            bountySubmissionOwnerState: payload
        }
    case ACCEPT_VULN_FULFILLED:
        return {
            ...state,
            bountySubmissionState: {
                ...state.bountySubmissionState,
                stage: payload
            }
        }
    case CURRENT_BOUNTY_CLEANUP: return (initialState)
    default:
        return state
    }
}
