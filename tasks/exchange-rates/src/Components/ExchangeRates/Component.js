import React from 'react'
import PropTypes from 'prop-types'
import {Controllers} from '../Controllers/Component.js'
import {CURRENCIES, URL_GET_RATES, ERROR_STRING} from '../../constants.js'
import './index.css'
import {useHistory} from 'react-router-dom'

function ExchangeRates(props) {
    const history = useHistory()
    const {currencyOne, currencyTwo, valueOne, valueTwo, string} = props

    const showAtAddress = function ({currencyOne, currencyTwo, valueOne, valueTwo, string}) {
        history.push(`/widget/${currencyOne}/${currencyTwo}/${valueOne}/${valueTwo}/${string}`)
    }

    const onChangeCurrencyOne = function (e) {
        const newCurrencyOne = e.target.value

        convertCurrency(valueOne, newCurrencyOne, currencyTwo).then((res) => {
            const newStr = `${valueOne} ${CURRENCIES[newCurrencyOne]} = ${res} ${CURRENCIES[currencyTwo]}`

            showAtAddress({
                currencyOne: newCurrencyOne,
                currencyTwo,
                valueOne,
                valueTwo: res,
                string: newStr
            })
        })
    }

    const onChangeValueOne = function (e) {
        const newValueOne = e.target.value

        convertCurrency(newValueOne, currencyOne, currencyTwo).then((res) => {
            const newStr = `${newValueOne} ${CURRENCIES[currencyOne]} = ${res} ${CURRENCIES[currencyTwo]}`

            showAtAddress({
                currencyOne,
                currencyTwo,
                valueOne: newValueOne,
                valueTwo: res,
                string: newStr
            })
        })
    }

    const onChangeCurrencyTwo = function (e) {
        const newCurrencyTwo = e.target.value

        convertCurrency(valueTwo, newCurrencyTwo, currencyOne).then((res) => {
            const newStr = `${valueTwo} ${CURRENCIES[newCurrencyTwo]} = ${res} ${CURRENCIES[currencyOne]}`

            showAtAddress({
                currencyOne,
                currencyTwo: newCurrencyTwo,
                valueOne: res,
                valueTwo,
                string: newStr
            })
        })
    }

    const onChangeValueTwo = function (e) {
        const newValueTwo = e.target.value

        convertCurrency(e.target.value, currencyTwo, currencyOne).then((res) => {
            const newStr = `${newValueTwo} ${CURRENCIES[currencyTwo]} = ${res} ${CURRENCIES[currencyOne]}`

            showAtAddress({
                currencyOne,
                currencyTwo,
                valueOne: res,
                valueTwo: newValueTwo,
                string: newStr
            })
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
            alert(ERROR_STRING)
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
                        currencies: CURRENCIES,
                        selected: currencyOne
                    },
                    {
                        className: 'controllers__currency-two',
                        onChange: onChangeCurrencyTwo,
                        key: 'currency-two',
                        currencies: CURRENCIES,
                        selected: currencyTwo
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
