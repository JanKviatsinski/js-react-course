import {ExchangeRates} from './ExchangeRates'
// import {
//     Switch,
//     Route,
// } from 'react-router-dom'
import React from 'react'
import '../index.css'

// const routes = [
//     {
//         path: '/',
//         isExact: true,
//         component: () => <ExchangeRates
//             className='exchange-rates'
//         />
//     },
//     {
//         path: '/widget',
//         isExact: true,
//         component: () => <ExchangeRates
//             className='exchange-rates'
//         />
//     },
//     {
//         path: '/widget/USD/EUR',
//         isExact: true,
//         component: () => <ExchangeRates
//             className='exchange-rates'
//         />
//     }
// ]

export function App() {
    return (
        <ExchangeRates
            className='exchange-rates'
        />
    )
}
