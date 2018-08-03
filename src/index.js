// other
import './index.css';
import App from './App';

// react
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import registerServiceWorker from './registerServiceWorker';

// redux
import { createStore, applyMiddleware } from 'redux';
import { combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension'
import { logger } from 'redux-logger'
import thunk from 'redux-thunk'
import promise from "redux-promise-middleware"

// reducers
import { bountysListReducer as bountysList } from './redux_reducers/reducer_bountysList'
import { bountyCurrentReducer as bountyCurrent } from './redux_reducers/reducer_bountyCurrent'
import { walletReducer as ethereumWallet } from './redux_reducers/reducer_walletAddress'
import { contractTransactionsReducer as contractTransactions } from './redux_reducers/reducer_contractTransactions'
import { calculateCVSSReducer as CVSSData} from './redux_reducers/reducer_calculateCVSS'
import { markdownReducer as markdown} from './redux_reducers/reducer_markdown'
import { profilePictureReducer as profilePicture } from './redux_reducers/reducer_profilePicture'
import { tableClickReducer as tableClick } from './redux_reducers/reducer_tableClick'
//import { AddressReducer as ethereumAddress } from './redux_reducers/reducer_walletAddress'


//const middleware = [logger, thunk, promise()]; //[logger, thunk]
const middleware = [thunk, promise()];


const rootReducers = combineReducers({
    bountysList,
    bountyCurrent,
    ethereumWallet,
    contractTransactions,
    CVSSData,
    markdown,
    profilePicture,
    tableClick
});

const store = createStore(
    rootReducers,
    {},
    composeWithDevTools(applyMiddleware( ...middleware)),
);


ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
document.getElementById('root'));
registerServiceWorker();









//import rootReducers from './reducers';

// store.subscribe(() => {
//     console.log('store changed', store.getState())
// })
// const enhancers = compose( // the questionmark is a turnerary operater
//     window.devToolsExtension ? window.devToolsExtension() : f => f // not sure why we are using f = f
// )
