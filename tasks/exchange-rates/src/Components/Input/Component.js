import React from 'react'
import PropTypes from 'prop-types'

export function Input (props){
    return (
        <input className={props.className} type={props.type} value={props.value} onChange={props.onChange}/>
    )
}

Input.propTypes = {
    className: PropTypes.string,
    type: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func
}
