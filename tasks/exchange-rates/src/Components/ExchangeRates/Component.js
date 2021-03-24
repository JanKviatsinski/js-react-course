import React,{ useState } from 'react'

export function ExchangeRates (props){
    const [value, setValue] = useState(props.value)
    return (
        <>
            {value}
        </>
    )
}
