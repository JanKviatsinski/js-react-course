import React, {useState} from 'react'
import {
    Switch,
    Route,
} from  'react-router-dom'
import PropTypes from 'prop-types'
import {Controllers} from '../Controllers/Component.js'
import {CURRENCIES, INITIAL_STRING, URL_GET_RATES, ERROR_STRING} from '../../constants.js'
import './index.css'

function ExchangeRates(props) {
    const [currencyOne, setCurrencyOne] = useState(Object.keys(CURRENCIES)[0])
    const [currencyTwo, setCurrencyTwo] = useState(Object.keys(CURRENCIES)[0])
    const [valueOne, setValueOne] = useState(0)
    const [valueTwo, setValueTwo] = useState(0)
    const [string, setString] = useState(INITIAL_STRING)

    const onCurrencyOne = function (e) {
        setCurrencyOne(e.target.value)
        convertCurrency(valueOne, currencyOne, currencyTwo).then((res) => {
            setValueTwo(res)
            setString(`${valueOne} ${CURRENCIES[currencyOne]} = ${res} ${CURRENCIES[currencyTwo]}`)
        })
    }

    const onValueOne = function (e) {
        setValueOne(e.target.value)
        convertCurrency(valueOne, currencyOne, currencyTwo).then((res) => {
            setValueTwo(res)
            setString(`${valueOne} ${CURRENCIES[currencyOne]} = ${res} ${CURRENCIES[currencyTwo]}`)
        })
    }

    const onCurrencyTwo = function (e) {
        setCurrencyTwo(e.target.value)
        convertCurrency(valueTwo, currencyTwo, currencyOne).then((res) => {
            setValueOne(res)
            setString(`${valueTwo} ${CURRENCIES[currencyTwo]} = ${res} ${CURRENCIES[currencyOne]}`)
        })
    }
    let x = 1
    const onValueTwo = function (e) {
        setValueTwo(e.target.value)
        x = 2
        console.log(valueTwo, x)

        convertCurrency(valueTwo, currencyTwo, currencyOne).then((res) => {
            setValueOne(res)
            setString(`${valueTwo} ${CURRENCIES[currencyTwo]} = ${res} ${CURRENCIES[currencyOne]}`)
        })
    }

    async function convertCurrency(value, currencyFrom, currencyTo) {
        try {
            const responseGetRates = await fetch(URL_GET_RATES)
            const dataRates = await responseGetRates.json()
console.log(value, currencyFrom, currencyTo)
            if (dataRates.error) {
                throw new Error(dataRates.error)
            }

            const fromRates = dataRates.rates[currencyFrom]
            const toRates = dataRates.rates[currencyTo]

            return (+value * toRates / fromRates).toFixed(2)
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
                        value: valueOne
                    },
                    {
                        className: 'controllers__value-two',
                        type: 'number',
                        'on': onValueTwo,
                        key: 'value-two',
                        value: valueTwo
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
