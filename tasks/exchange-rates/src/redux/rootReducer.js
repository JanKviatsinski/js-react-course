import {combineReducers} from 'redux';
import {exchangeRatesReducer} from './exchangeRatesReducer';

export const rootReducer = combineReducers({
    exchangeRates: exchangeRatesReducer
})
