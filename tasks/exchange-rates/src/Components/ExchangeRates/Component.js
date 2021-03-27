import React, {useState, useRef} from 'react'
import {Controllers} from '../Controllers/Component.js'
import {USD, EUR, BYN, USD_ABBR, EUR_ABBR, BYN_ABBR, URL_GET_RATES} from '../../constants.js'
import './index.css'

export function ExchangeRates(props) {
    let currencyFrom = useRef(USD)
    let currencyTo = useRef(USD)
    let valueFrom = useRef(3)
    let valueTo = useRef(3)
    let value = useRef(3)
    let string = useRef('0')
    const [result, setResult] = useState(0.00)

    const onChangeCurrencyFrom = function (e) {
        currencyFrom.current = e.target.value

        convertCurrency(valueFrom.current, currencyFrom.current, currencyTo.current)
            .then((res) => {
                valueTo.current = res
                string.current = `${valueFrom.current} ${currencyFrom.current} = ${res} ${currencyTo.current}`
                setResult(res)
            })
    }

    const onChangeValueFrom = function (e) {
        value.current = e.target.value
        valueFrom.current = e.target.value

        convertCurrency(value.current, currencyFrom.current, currencyTo.current)
            .then((res) => {
                valueTo.current = res
                string.current = `${value.current} ${currencyFrom.current} = ${res} ${currencyTo.current}`
                setResult(res)
            })
    }

    const onChangeCurrencyTo = function (e) {
        currencyTo.current = e.target.value
// debugger
        convertCurrency(valueTo.current, currencyTo.current, currencyFrom.current)
            .then((res) => {
                valueFrom.current = res
                string.current = `${valueTo.current} ${currencyTo.current} = ${res} ${currencyFrom.current}`
                setResult(res)
            })
    }

    const onChangeValueTo = function (e) {
        value.current = e.target.value
        valueTo.current = e.target.value

        convertCurrency(value.current, currencyTo.current, currencyFrom.current)
            .then((res) => {
                valueFrom.current = res
                string.current = `${value.current} ${currencyTo.current} = ${res} ${currencyFrom.current}`
                setResult(res)
            })
    }

    async function convertCurrency(value, from, to) {
        // const responseGetRates = await fetch(URL_GET_RATES)
        // const dataRates = await responseGetRates.json()
        const x = {
            USD: 2,
            EUR: 1,
            BYN: 3
        }
        // const fromRates = dataRates.rates[from]
        // const toRates = dataRates.rates[to]
        const fromRates = x[from]
        const toRates = x[to]
        const as = (+value * toRates / fromRates).toFixed(2)
        console.log(+value, from, +as, to)
        return +as
    }

    return (
        <div className={props.className}>
            <p>
                {string.current}
                {/*{value.current} {currencyFrom.current} {result} {currencyTo.current}*/}
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
                        type: 'text',
                        'on': onChangeValueFrom,
                        key: 'value-from',
                        value: valueFrom.current

                    },
                    {
                        className: 'controllers__value-to',
                        type: 'text',
                        'on': onChangeValueTo,
                        key: 'value-to',
                        value: valueTo.current
                    }
                ]}
            />
        </div>
    )
}
