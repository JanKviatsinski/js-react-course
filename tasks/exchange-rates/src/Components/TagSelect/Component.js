import React from 'react'
import PropTypes from 'prop-types'

function TagSelect(props) {
    const options = []

    for (let currency in props.currencies) {
        options.push(
            <option key={currency} value={currency} >
                {props.currencies[currency]}
            </option>
        )
    }

    return (
        <select className={props.className} onChange={props.onChange} value={props.selected}>
            {options}
        </select>
    )
}

TagSelect.propTypes = {
    currencies: PropTypes.object,
    className: PropTypes.string,
    onChange: PropTypes.func
}

export {TagSelect}
