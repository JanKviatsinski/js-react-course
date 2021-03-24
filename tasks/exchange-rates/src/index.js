import React from 'react'
import ReactDOM from 'react-dom'
import { ExchangeRates } from './Components/ExchangeRates/Component.js'
import './index.css'

ReactDOM.render(
    <React.StrictMode>
        <ExchangeRates
            value = 'jkjl'
        />
    </React.StrictMode>,
    document.getElementById('root')
)
