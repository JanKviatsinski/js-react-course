import React from 'react'
import PropTypes from 'prop-types'
import {TagSelect} from '../TagSelect/Component.js'
import {Input} from '../Input/Component.js'
import { ControllersWrap, ValuesWap, CurrenciesWap } from './Styled'

function Controllers(props) {
    return (
        <ControllersWrap className={props.wrapClassName}>
            <ValuesWap className={props.valuesClassName}>
                {props.values.map((curr) => (
                    <Input
                        className={curr.className}
                        type={curr.type}
                        onChange={curr.onChange}
                        key={curr.key}
                        value={curr.value}
                    />
                ))}
            </ValuesWap>

            <CurrenciesWap className={props.currenciesClassName}>
                {props.currencies.map((curr) => (
                    <TagSelect
                        className={curr.className}
                        currencies={curr.currencies}
                        onChange={curr.onChange}
                        key={curr.key}
                        selected={curr.selected}
                    />
                ))}
            </CurrenciesWap>
        </ControllersWrap>
    )
}

Controllers.propTypes = {
    wrapClassName: PropTypes.string.isRequired,
    valuesClassName: PropTypes.string.isRequired,
    values: PropTypes.arrayOf(PropTypes.object).isRequired,
    currenciesClassName: PropTypes.string.isRequired,
    currencies: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export {Controllers}
