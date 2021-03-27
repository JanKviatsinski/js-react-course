import React, {useState, useRef} from 'react'
import {Controllers} from '../Controllers/Component.js'
import {USD, EUR, BYN, USD_ABBR, EUR_ABBR, BYN_ABBR, URL_GET_RATES} from '../../constants.js'
import './index.css'

export function ExchangeRates(props) {
    let currencyOne = useRef(USD)
    let currencyTwo = useRef(USD)
    let valueOne = useRef(0)
    let valueTwo = useRef(0)
    const [string, setString] = useState('0')

    const onCurrencyOne = function (e) {
        currencyOne.current = e.target.value
        convertCurrency(false, valueOne.current)
    }

    const onValueOne = function (e) {
        valueOne.current = e.target.value
        convertCurrency(false, valueOne.current)
    }

    const onCurrencyTwo = function (e) {
        currencyTwo.current = e.target.value
        convertCurrency(true, valueTwo.current)
    }

    const onValueTwo = function (e) {
        valueTwo.current = e.target.value
        convertCurrency(true, valueTwo.current)
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
        const oneRates = x[currencyOne.current]
        const twoRates = x[currencyTwo.current]
        let result

        if (reverse) {
            result = (+value * oneRates / twoRates).toFixed(2)
            valueOne.current = result
            setString(`${valueTwo.current} ${currencyTwo.current} = ${result} ${currencyOne.current}`)
        } else {
            result = (+value * twoRates / oneRates).toFixed(2)
            valueTwo.current = result
            setString(`${valueOne.current} ${currencyOne.current} = ${result} ${currencyTwo.current}`)
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
                //добавить дивы
                //изменить классы
                сurrencySelection={[
                    {
                        className: 'controllers__currency-from',
                        'on': onCurrencyOne,
                        key: 'currency-from',
                        options: [
                            [USD, USD_ABBR],
                            [EUR, EUR_ABBR],
                            [BYN, BYN_ABBR]
                        ]
                    },
                    {
                        className: 'controllers__currency-to',
                        'on': onCurrencyTwo,
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
                        'on': onValueOne,
                        key: 'value-from',
                        value: valueOne.current

                    },
                    {
                        className: 'controllers__value-to',
                        type: 'number',
                        'on': onValueTwo,
                        key: 'value-to',
                        value: valueTwo.current
                    }
                ]}
            />
        </div>
    )
}
