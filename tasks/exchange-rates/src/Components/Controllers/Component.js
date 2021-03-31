import React from 'react'
import PropTypes from 'prop-types'
import { TagSelect } from '../TagSelect/Component.js'
import { Input } from '../Input/Component.js'
import './index.css'

function Controllers(props) {
    return (
        <div className={props.wrapClassName}>
            <div className={props.valuesClassName}>
            {props.values.map((curr) => (
                    <Input
                        className={curr.className}
                        type={curr.type}
                        on={curr.on}
                        key={curr.key}
                        value={curr.value}
                    />
                ))}
            </div>

            <div className={props.currenciesClassName}>
            {props.currencies.map((curr) => (
                <TagSelect
                    className={curr.className}
                    currencies={curr.currencies}
                    on={curr.on}
                    key={curr.key}
                />
            ))}
        </div>
        </div>
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
