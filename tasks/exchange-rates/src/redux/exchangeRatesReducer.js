import {CURRENCIES, INITIAL_STRING} from '../constants'
import {CHANGE_CURRENCY_ONE} from './types';

const initialState = {
    currencyOne: Object.keys(CURRENCIES)[0],
    currencyTwo: Object.keys(CURRENCIES)[1],
    valueOne: 0,
    valueTwo: 0,
    string: INITIAL_STRING
}

export const exchangeRatesReducer = (state = initialState, action) => {
    return state
    // switch (action.type){
    //     case CHANGE_CURRENCY_ONE:
    //         return {...state,
    //             currencyOne: action.payload.currencyOne,
    //             currencyTwo: action.payload.currencyTwo,
    //         }
    //     // case CHANGE_VALUE_ONE:
    //     // case CHANGE_CURRENCY_TWO:
    //     // case CHANGE_VALUE_TWO:
    //     default: return state
    // }
}
