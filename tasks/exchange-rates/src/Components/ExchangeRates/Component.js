import React, {useState, useRef} from 'react'
import PropTypes from 'prop-types'
import {Controllers} from '../Controllers/Component.js'
import {CURRENCIES, INITIAL_STRING, URL_GET_RATES, ERROR_STRING} from '../../constants.js'
import './index.css'

function ExchangeRates(props) {
    let currencyOne = useRef(Object.keys(CURRENCIES)[0])
    let currencyTwo = useRef(Object.keys(CURRENCIES)[0])
    let valueOne = useRef(0)
    let valueTwo = useRef(0)
    const [string, setString] = useState(INITIAL_STRING)

    const onCurrencyOne = function (e) {
        currencyOne.current = e.target.value
        convertCurrency(valueOne.current)
    }

    const onValueOne = function (e) {
        valueOne.current = e.target.value
        convertCurrency(valueOne.current)
    }

    const onCurrencyTwo = function (e) {
        currencyTwo.current = e.target.value
        convertCurrency(valueTwo.current)
    }

    const onValueTwo = function (e) {
        valueTwo.current = e.target.value
        convertCurrency(valueTwo.current)
    }

    async function convertCurrency(value) {
        try {
            const responseGetRates = await fetch(URL_GET_RATES)
            const dataRates = await responseGetRates.json()

            if (dataRates.error) {
                throw new Error(dataRates.error)
            }

            const oneRates = dataRates.rates[currencyOne.current]
            const twoRates = dataRates.rates[currencyTwo.current]

            let result

            if (value === valueOne.current) {
                result = (+value * twoRates / oneRates).toFixed(2)
                valueTwo.current = result
                setString(`${valueOne.current} ${CURRENCIES[currencyOne.current]} = ${result} ${CURRENCIES[currencyTwo.current]}`)
            } else {
                result = (+value * oneRates / twoRates).toFixed(2)
                valueOne.current = result
                setString(`${valueTwo.current} ${CURRENCIES[currencyTwo.current]} = ${result} ${CURRENCIES[currencyOne.current]}`)
            }
        } catch (e) {
            console.error(e)
            setString(ERROR_STRING)
        }

    }

    return (
        <div className={props.className}>
            <p>
                {string}
            </p>

            <Controllers
                wrapClassName={`${props.className}__controllers`}

                valuesClassName={'controllers__values'}
                values={[
                    {
                        className: 'controllers__value-one',
                        type: 'number',
                        'on': onValueOne,
                        key: 'value-one',
                        value: valueOne.current

                    },
                    {
                        className: 'controllers__value-two',
                        type: 'number',
                        'on': onValueTwo,
                        key: 'value-two',
                        value: valueTwo.current
                    }
                ]}

                currenciesClassName={'controllers__currencies'}
                currencies={[
                    {
                        className: 'controllers__currency-one',
                        'on': onCurrencyOne,
                        key: 'currency-one',
                        currencies: CURRENCIES
                    },
                    {
                        className: 'controllers__currency-two',
                        'on': onCurrencyTwo,
                        key: 'currency-two',
                        currencies: CURRENCIES
                    },
                ]}
            />
        </div>
    )
}

ExchangeRates.propTypes = {
    className: PropTypes.string.isRequired,
}

export {ExchangeRates}
