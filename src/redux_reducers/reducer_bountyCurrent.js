
import { CURRENT_BOUNTY_FULFILLED,
    CHECK_OWNER_FULFILLED,
    CHECK_BOUNTY_HACKER_STATE_FULFILLED,
    CURRENT_BOUNTY_PENDING,
    CURRENT_BOUNTY_CLEANUP,
    ACCEPT_VULN_FULFILLED,
    CHECK_BOUNTY_OWNER_STATE_FULFILLED,
    BOUNTY_OWNER_STATE_SELECT} from '../redux_actions/action_bountyCurrent.js'
console.log('initstate')
const initialState = {
    bountyCurrent: {},
    hackerSubmissionState: {
        vulnerabilitySubmitted: false
    },
    bountySubmissionState: {},
    bountyOwnerStateSelect: null,
    bountyLoaded: false,
    ownerStateLoaded: false,
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
            hackerSubmissionState: payload,
            bountySubmission: payload.bountySubmission

        }
    case CHECK_BOUNTY_OWNER_STATE_FULFILLED:
        return {
            ...state,
            bountySubmissionOwnerState: payload,
            ownerStateLoaded: true
        }
    case BOUNTY_OWNER_STATE_SELECT:
        return {
            ...state,
            bountyOwnerStateSelect: payload
        }
    case ACCEPT_VULN_FULFILLED:
        return {
            ...state,
            hackerSubmissionState: {
                ...state.hackerSubmissionState,
                stage: payload
            }
        }
    case CURRENT_BOUNTY_CLEANUP: return (initialState)
    default:
        return state
    }
}
