import React from 'react'

export function TagSelect(props) {
    return (
        <select className={props.className} onChange={props.onChange}>
            {props.options.map((curr) => {
                const [optionAbbreviation, optionText] = curr

                return <option key={optionAbbreviation} value={optionAbbreviation}>
                    {optionText}
                </option>
            }
            )}
        </select>
    )
}
