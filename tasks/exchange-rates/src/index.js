import React from 'react'
import ReactDOM from 'react-dom'
import { ExchangeRates } from './Components/ExchangeRates/Component.js'
import './index.css'

ReactDOM.render(
    <React.StrictMode>
        <ExchangeRates
        className='exchange-rates'
        />
    </React.StrictMode>,
    document.getElementById('root')
)
