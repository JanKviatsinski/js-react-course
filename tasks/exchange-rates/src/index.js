import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter as Router} from 'react-router-dom'
import {ExchangeRates} from './Components/ExchangeRates/Component.js'
import './index.css'

ReactDOM.render(
    <Router>
        <ExchangeRates
            className='exchange-rates'
        />
    </Router>,
document.getElementById('root')
)
