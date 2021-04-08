import React, {useState} from 'react';
import {connect} from 'react-redux'
// import PropTypes from 'prop-types'
import {Controllers} from '../Controllers/Component.js'
import {CURRENCIES, URL_GET_RATES, ERROR_STRING} from '../../constants.js'

export function ExchangeRates(props) {
    console.log(props)
    const [currencyOne, setCurrencyOne] = useState(props.currencyOne)
    const [currencyTwo, setCurrencyTwo] = useState(props.currencyTwo)
    const [valueOne, setValueOne] = useState(0)
    const [valueTwo, setValueTwo] = useState(0)
    const [string, setString] = useState(props.string)

    const onChangeCurrencyOne = function (value) {
        setCurrencyOne(value)

        convertCurrency(valueOne, value, currencyTwo).then((res) => {
            setValueTwo(res)
            setString(`${valueOne} ${CURRENCIES[value]} = ${res} ${CURRENCIES[currencyTwo]}`)
        })
    }

    const onChangeValueOne = function (value) {
        setValueOne(value)

        convertCurrency(value, currencyOne, currencyTwo).then((res) => {
            setValueTwo(res)
            setString(`${value} ${CURRENCIES[currencyOne]} = ${res} ${CURRENCIES[currencyTwo]}`)
        })
    }

    const onChangeCurrencyTwo = function (value) {
        setCurrencyTwo(value)

        convertCurrency(valueTwo, value, currencyOne).then((res) => {
            setValueOne(res)
            setString(`${valueTwo} ${CURRENCIES[value]} = ${res} ${CURRENCIES[currencyOne]}`)
        })
    }

    const onChangeValueTwo = function (value) {
        setValueTwo(value)

        convertCurrency(value, currencyTwo, currencyOne).then((res) => {
            setValueOne(res)
            setString(`${value} ${CURRENCIES[currencyTwo]} = ${res} ${CURRENCIES[currencyOne]}`)
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
            return Number((value * toRates / fromRates).toFixed(2))
        } catch (e) {
            console.error(e)
            setString(ERROR_STRING)
        }
    }

    return (
        <div className={'exchange-rates'}>
            <p>
                {string}
            </p>

            <Controllers
                wrapClassName={`exchange-rates__controllers`}

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

const mapStateToProps = (state) => {
    console.log(0)

    return {
        currencyOne: state.exchangeRates.currencyOne,
        currencyTwo: state.exchangeRates.currencyTwo,
        string: state.exchangeRates.string
    }
}

export default connect(mapStateToProps)(ExchangeRates)
