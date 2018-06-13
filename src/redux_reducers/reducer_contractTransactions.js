import {
    DEPOSIT_ETHEREUM_FULFILLED,
    WITHDRAW_ETHEREUM_FULFILLED,
    } from '../redux_actions/action_contractTransactions.js';



const initWalletState = {
    deposit: {},
    withdraw: "",

}
export function contractTransactionsReducer( state = initWalletState, action) {
    const { type, payload } = action;
    switch (type) {
        case DEPOSIT_ETHEREUM_FULFILLED:
        return {
            ...state,
            deposit: payload,
        };
        case WITHDRAW_ETHEREUM_FULFILLED:
        return {
            ...state,
            withdraw: payload,
        };
    default:
    return state;
    }
}
