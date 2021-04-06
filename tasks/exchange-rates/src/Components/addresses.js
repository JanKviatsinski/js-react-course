import React from 'react'
import {
    Switch,
    Route,
} from 'react-router-dom'
import {ExchangeRates} from './ExchangeRates'
import {INITIAL_STRING} from '../constants'

export function Addresses (props) {
    const url = props.match.url
    return (
        <Switch>
            <Route path={url} exact component={()=>
                <ExchangeRates
                currencyOne='USD'
                currencyTwo='USD'
                valueOne='0'
                valueTwo='0'
                string={INITIAL_STRING}
                className='exchange-rates'
            />}/>

            <Route path={`${url}/:currencyOne/:currencyTwo/:valueOne/:valueTwo/:string`}
                   component={({match}) =>
                       <ExchangeRates
                           currencyOne={match.params.currencyOne}
                           currencyTwo={match.params.currencyTwo}
                           valueOne={match.params.valueOne}
                           valueTwo={match.params.valueTwo}
                           string={match.params.string}
                           className='exchange-rates'
                       />
                   }/>
        </Switch>
    )
}
