import React, {useState, useRef} from 'react'
import {Controllers} from '../Controllers/Component.js'
import {USD, EUR, BYN, USD_ABBR, EUR_ABBR, BYN_ABBR, URL_GET_RATES} from '../../constants.js'
import './index.css'

export function ExchangeRates(props) {
    let currencyFrom = useRef(USD)
    let currencyTo = useRef(USD)
    let valueFrom = useRef(0)
    let valueTo = useRef(0)
    const [string, setString] = useState('0')

    const onChangeCurrencyFrom = function (e) {
        currencyFrom.current = e.target.value
        convertCurrency(false, valueFrom.current)
    }

    const onChangeValueFrom = function (e) {
        valueFrom.current = e.target.value
        convertCurrency(false, valueFrom.current)
    }

    const onChangeCurrencyTo = function (e) {
        currencyTo.current = e.target.value
        convertCurrency(true, valueTo.current)
    }

    const onChangeValueTo = function (e) {
        valueTo.current = e.target.value
        convertCurrency(true, valueTo.current)
    }

    async function convertCurrency(reverse, value) {
        // const responseGetRates = await fetch(URL_GET_RATES)
        // const dataRates = await responseGetRates.json()
        const x = {
            USD: 2,
            EUR: 1,
            BYN: 3
        }
        // const fromRates = dataRates.rates[from]
        // const toRates = dataRates.rates[to]
        const fromRates = x[currencyFrom.current]
        const toRates = x[currencyTo.current]
        let result

        if (reverse) {
            result = (+value * fromRates / toRates).toFixed(2)
            valueFrom.current = result
            setString(`${valueTo.current} ${currencyTo.current} = ${result} ${currencyFrom.current}`)
        } else {
            result = (+value * toRates / fromRates).toFixed(2)
            valueTo.current = result
            setString(`${valueFrom.current} ${currencyFrom.current} = ${result} ${currencyTo.current}`)
        }
    }

    return (
        <div className={props.className}>
            <p>
                {string}
            </p>

            <Controllers
                wrapClassName={`${props.className}__controllers`}
                сurrencySelectionClassName={'controllers__currencies'}
                сurrencySelection={[
                    {
                        className: 'controllers__currency-from',
                        'on': onChangeCurrencyFrom,
                        key: 'currency-from',
                        options: [
                            [USD, USD_ABBR],
                            [EUR, EUR_ABBR],
                            [BYN, BYN_ABBR]
                        ]
                    },
                    {
                        className: 'controllers__currency-to',
                        'on': onChangeCurrencyTo,
                        key: 'currency-to',
                        options: [
                            [USD, USD_ABBR],
                            [EUR, EUR_ABBR],
                            [BYN, BYN_ABBR]
                        ]
                    },
                ]}
                currencyValueClassName={'controllers__values'}
                currencyValue={[
                    {
                        className: 'controllers__value-from',
                        type: 'number',
                        'on': onChangeValueFrom,
                        key: 'value-from',
                        value: valueFrom.current

                    },
                    {
                        className: 'controllers__value-to',
                        type: 'number',
                        'on': onChangeValueTo,
                        key: 'value-to',
                        value: valueTo.current
                    }
                ]}
            />
        </div>
    )
}
