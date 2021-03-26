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
    const [result, setResult] = useState(0.00)

    const onChangeCurrencyFrom = function (e) {
        currencyFrom.current = e.target.value
        convertCurrency(value.current, currencyFrom.current, currencyTo.current).then((res)=>{
            // valueFrom = res
            setResult(res)
        })
    }

    const onChangeCurrencyTo = function (e) {
        currencyTo.current = e.target.value
        convertCurrency(value.current, currencyFrom.current, currencyTo.current).then((res)=>{
            // valueFrom = res
            setResult(res)
        })
    }

    const onChangeValueFrom = function (e){
        value.current = e.target.value
        valueFrom.current = e.target.value

        convertCurrency(value.current, currencyFrom.current, currencyTo.current).then((res)=>{
            valueTo.current = res
            setResult(res)
        })
        console.log(e.target.value)
    }

    const onChangeValueTo = function (e){
        value.current = e.target.value
        valueTo.current = e.target.value

        convertCurrency(value.current, currencyFrom.current, currencyTo.current).then((res)=>{
            valueFrom.current = res
            setResult(res)
        })
        console.log(e.target.value)
    }

    async function convertCurrency(value, from, to) {
        const responseGetRates = await fetch(URL_GET_RATES)
        const dataRates = await responseGetRates.json()
        const fromRates = dataRates.rates[from]
        const toRates = dataRates.rates[to]
        return (value * toRates / fromRates).toFixed(2)
    }

    return (
        <div className={props.className}>
            <p>
                {value.current} {currencyFrom.current} {result} {currencyTo.current}
            </p>

            <Controllers
                wrapClassName={`${props.className}__controllers`}
                сurrencySelectionClassName = {'controllers__currencies'}
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
                        value:valueFrom.current

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

// const onReset = () =>{
//     setSecond(0)
//     setMinut(0)
//     setHour(0)
// }
