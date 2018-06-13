import { UPDATE_WALLET_ADDRESSES_FULFILLED } from '../redux_actions/action_walletAddress';
import { UPDATE_WALLET_ADDRESS_FULFILLED } from '../redux_actions/action_walletAddress';


const initWalletState = {
    walletAddresses: [],
    walletLoaded: false,
    walletAddress: "0x00",
    addressValue: "0.00000000"

}
export function walletReducer( state = initWalletState, action) {
    const { type, payload } = action;
    switch (type) {
        case UPDATE_WALLET_ADDRESSES_FULFILLED:
        return {
            ...state,
            walletAddresses: payload.addresses,
            walletLoaded: true,
            walletAddress: payload.addresses[0],
            addressValue: payload.addressValue
        };
        case UPDATE_WALLET_ADDRESS_FULFILLED:
        return {
            ...state,
            walletAddress: payload.walletAddress,
            addressValue: payload.addressValue,
        };
    default:
    return state;
    }
}



// const initCurrentAddress = {
//     walletAddress: "0x00",
//     ,
// }
//
// export function AddressReducer( state = initCurrentAddress, action) {
//     const { type, payload } = action;
//     switch (type) {
//         case UPDATE_WALLET_ADDRESS_FULFILLED:
//         return {
//             ...state,
//             walletAddress: payload.walletAddress,
//             addressValue: payload.addressValue,
//         };
//     default:
//     return state;
//     }
// }
