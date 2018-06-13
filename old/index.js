import {combineReducers} from 'redux';
import Bountys from './getListedBountys'



const action = {
    return [
        {
            id: 1,
            test: 'hello'
        },
        {
            id: 2,
            test: 'hello2'
        },
        {
            id: 3,
            test: 'hello3'
        },
    ]
}



console.log('rootReducers1')
const rootReducers = combineReducers({
    contractProfiles:
    // add more reducers as neaded
});

console.log('rootReducers2')

export default rootReducers;
