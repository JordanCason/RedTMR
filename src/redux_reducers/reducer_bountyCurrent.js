
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
    walletIsBountyOwner: false,
    promisePending: false,
    bountyCurrent: null,
    hackerSubmissionState: null,
    bountySubmissionState: null,
    bountySubmissionCurrent: null
}

export function bountyCurrentReducer(state = initialState, action) {
    const { type, payload } = action
    switch (type) {
    case CURRENT_BOUNTY_PENDING:
        return {
            ...state,
            promisePending: true // dont think this is neaded anymore or should find a better way to manage
        }
    case CURRENT_BOUNTY_FULFILLED:
        return {
            ...state,
            promisePending: false,
            bountyCurrent: payload
        }
    case CHECK_OWNER_FULFILLED:
        return {
            ...state,
            walletIsBountyOwner: payload
        }
    case CHECK_BOUNTY_HACKER_STATE_FULFILLED:
        return {
            ...state,
            hackerSubmissionState: payload
        }
    case CHECK_BOUNTY_OWNER_STATE_FULFILLED:
        return {
            ...state,
            bountySubmissionState: payload
        }
    case BOUNTY_OWNER_STATE_SELECT:
        return {
            ...state,
            bountySubmissionCurrent: payload
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
