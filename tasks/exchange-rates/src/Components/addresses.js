import React from 'react'
import {
    Switch,
    Route,
} from 'react-router-dom'
import {ExchangeRates} from './ExchangeRates'

export function Addresses (props) {
    const url = props.match.url
    return (
        <Switch>
            <Route path={url} exact component={()=>
                <ExchangeRates
                // currencyOne={Object.keys(CURRENCIES)[0]}
                // currencyTwo={Object.keys(CURRENCIES)[0]}
            />}/>

            <Route path={`${url}/:currencyOne/:currencyTwo`}
                   component={({match}) =>
                       <ExchangeRates
                           currencyOne={match.params.currencyOne}
                           currencyTwo={match.params.currencyTwo}
                       />
                   }/>
        </Switch>
    )
}
