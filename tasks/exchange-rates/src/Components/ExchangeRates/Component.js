import React, {useState, useEffect} from 'react'
import {convertCurrency} from '../../Services/Convert-currency.js'
import {Controllers} from '../Controllers/Component.js'
import {USD, EUR, BYN, USD_ABBR, EUR_ABBR, BYN_ABBR, URL_GET_RATES} from '../../constants.js'
import './index.css'

export function ExchangeRates(props) {
    const [currencyFrom, setCurrencyFrom] = useState(USD)
    const [currencyTo, setCurrencyTo] = useState(USD)
    const [value, setValue] = useState(3)
    const [result, setResult] = useState(0.00)

    const onChangeCurrencyFrom = function (e) {
        setCurrencyFrom(e.target.value)
    }

    const onChangeCurrencyTo = function (e) {
        setCurrencyTo(e.target.value)
    }

    useEffect(()=>{
        convertCurrency(value, currencyFrom, currencyTo)
    },[currencyFrom,currencyTo])

    async function convertCurrency(value, from, to) {
        const responseGetRates = await fetch(URL_GET_RATES)
        const dataRates = await responseGetRates.json()
        const fromRates = dataRates.rates[from]
        const toRates = dataRates.rates[to]
        setResult(value * toRates / fromRates)
    }

    return (
        <div className={props.className}>
            <p>
                {value} { currencyFrom} {result.toFixed(2)} {currencyTo}
            </p>

            <Controllers
                className={`${props.className}__controllers`}
                selectionCurrency={[
                    {
                        className: 'controllers__exchange-from',
                        'on': onChangeCurrencyFrom,
                        key: 'exchange-from',
                        options: [
                            [USD, USD_ABBR],
                            [EUR, EUR_ABBR],
                            [BYN, BYN_ABBR]
                        ]
                    },
                    {
                        className: 'controllers__exchange-to',
                        'on': onChangeCurrencyTo,
                        key: 'exchange-to',
                        options: [
                            [USD, USD_ABBR],
                            [EUR, EUR_ABBR],
                            [BYN, BYN_ABBR]
                        ]
                    },
                ]}
            />
        </div>
    )
}
