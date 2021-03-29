import React from 'react'

export function Input (props){
    return (
        <input className={props.className} type={props.type} value={props.value} onChange={props.on}/>
    )
}
