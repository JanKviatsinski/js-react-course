import React from 'react'
import { TagSelect } from '../TagSelect/Component.js';

export function Controllers(props) {
    return (
        <div>
            {props.selectionCurrency.map((curr) => (
                <TagSelect
                    className={curr.className}
                    options={curr.options}
                    onChange={curr.on}
                    key={curr.key}
                />
            ))}
        </div>
    )
}
