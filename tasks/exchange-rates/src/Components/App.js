import {ExchangeRates} from './ExchangeRates'
import { X } from  './x'
import {
    Switch,
    Route,
} from 'react-router-dom'
import React from 'react'
import '../index.css'

const routes = [
    {
        path: '/',
        isExact: true,
        component: () => <ExchangeRates
            currencyOne='USD'
            currencyTwo='USD'
            className='exchange-rates'
        />
    },
    {
        path: '/widget',
        isExact: false,
        component: X
        // component: () => <ExchangeRates
        //     currencyOne='USD'
        //     currencyTwo='EUR'
        //     className='exchange-rates'
        // />
    },
    {
        path: '/widget/USD/EUR',
        isExact: true,
        component: () => <ExchangeRates
            currencyOne='EUR'
            currencyTwo='USD'
            className='exchange-rates'
        />
    }
]

export function App() {
    return (
        <Switch>
            {routes.map(({ path, component, isExact}) => (
                <Route key={path} path={path} exact={isExact} component={component} />
            ))}

            <Route render={() => <div>NOT FOUND PAGE</div>} />
        </Switch>
    )
}
