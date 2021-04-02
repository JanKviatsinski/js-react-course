import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import {Controllers} from '../Controllers/Component.js'
import {CURRENCIES, INITIAL_STRING, URL_GET_RATES, ERROR_STRING} from '../../constants.js'
import './index.css'
import {
  useHistory
} from 'react-router-dom'

function ExchangeRates(props) {
    const history = useHistory()
    const [currencyOne, setCurrencyOne] = useState(props.currencyOne)
    const [currencyTwo, setCurrencyTwo] = useState(props.currencyTwo)
    const [valueOne, setValueOne] = useState(props.valueOne)
    const [valueTwo, setValueTwo] = useState(props.valueTwo)
    const [string, setString] = useState(props.string)

    useEffect(() => {
        convertCurrency(valueOne, currencyOne, currencyTwo).then((res) => {
            setValueTwo(res)
            setString(`${valueOne} ${CURRENCIES[currencyOne]} = ${res} ${CURRENCIES[currencyTwo]}`)
        })
    })

    const router = function () {
        history.push(`/widget/${currencyOne}/${currencyTwo}/${valueOne}/${valueTwo}/${string}`)
    }

    const onChangeCurrencyOne = function (e) {
        setCurrencyOne(e.target.value)

        convertCurrency(valueOne, e.target.value, currencyTwo).then((res) => {
            setValueTwo(res)
            setString(`${valueOne} ${CURRENCIES[e.target.value]} = ${res} ${CURRENCIES[currencyTwo]}`)
        })
    }

    const onChangeValueOne = function (e) {
        setValueOne(e.target.value)
        convertCurrency(e.target.value, currencyOne, currencyTwo).then((res) => {
            router()

            setValueTwo(res)
            setString(`${e.target.value} ${CURRENCIES[currencyOne]} = ${res} ${CURRENCIES[currencyTwo]}`)
        })
    }

    const onChangeCurrencyTwo = function (e) {
        setCurrencyTwo(e.target.value)

        convertCurrency(valueTwo, e.target.value, currencyOne).then((res) => {
            setValueOne(res)
            setString(`${valueTwo} ${CURRENCIES[e.target.value]} = ${res} ${CURRENCIES[currencyOne]}`)
        })
    }

    const onChangeValueTwo = function (e) {
        setValueTwo(e.target.value)

        convertCurrency(e.target.value, currencyTwo, currencyOne).then((res) => {
            setValueOne(res)
            setString(`${e.target.value} ${CURRENCIES[currencyTwo]} = ${res} ${CURRENCIES[currencyOne]}`)
        })
    }

    async function convertCurrency(value, currencyFrom, currencyTo) {
        try {
            const responseGetRates = await fetch(URL_GET_RATES)
            const dataRates = await responseGetRates.json()

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
                        onChange: onChangeValueOne,
                        key: 'value-one',
                        value: valueOne
                    },
                    {
                        className: 'controllers__value-two',
                        type: 'number',
                        onChange: onChangeValueTwo,
                        key: 'value-two',
                        value: valueTwo
                    }
                ]}

                currenciesClassName={'controllers__currencies'}
                currencies={[
                    {
                        className: 'controllers__currency-one',
                        onChange: onChangeCurrencyOne,
                        key: 'currency-one',
                        currencies: CURRENCIES
                    },
                    {
                        className: 'controllers__currency-two',
                        onChange: onChangeCurrencyTwo,
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
