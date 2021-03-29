import React from 'react'

export function TagSelect(props) {
    const options = []

    for (let currency in props.currencies) {
        options.push(
            <option key={currency} value={currency}>
                {props.currencies[currency]}
            </option>
        )
    }

    return (
        <select className={props.className} onChange={props.onChange}>
            {options}
        </select>
    )
}
