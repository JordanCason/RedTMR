import {
    CALCULATE_CVSS_FULFILLED,
    ADD_CVSS_METRIC_FULFILLED } from '../redux_actions/action_calculateCVSS';



const initCVSS = {
        readyState: false,
        metrics: {
            AV: '',
            AC: '',
            PR: '',
            UI: '',
            S: '',
            C: '',
            I: '',
            A: '',
            E: 'X',
            RL: 'X',
            RC: 'X',
            CR: 'X',
            IR: 'X',
            AR: 'X',
            MAV: 'X',
            MAC: 'X',
            MPR: 'X',
            MUI: 'X',
            MS: 'X',
            MC: 'X',
            MI: 'X',
            MA: 'X',
        },
        base: {
            score: '',
            severity: 'Compleat Base Score to Calculate',
        },
        temporal: {
            score: '',
            severity: 'Compleat Base Score to Calculate',
        },
        environmental: {
            score: '',
            severity: 'Compleat Base Score to Calculate',
        },
        error: {
            error: false,
            msg: '',
        }
    }
export function calculateCVSSReducer( state = initCVSS, action) {
    const { type, payload } = action;
    switch (type) {
        case ADD_CVSS_METRIC_FULFILLED:
        return {
            ...state,
            readyState: payload.readyState,
            metrics: payload.metrics,
        };
        case CALCULATE_CVSS_FULFILLED:
        return{
            ...state,
            base: payload.base,
            temporal: payload.temporal,
            environmental: payload.environmental,
            error: payload.error,
        };
    default:
    return state;
    }
}
