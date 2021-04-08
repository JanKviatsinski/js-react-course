import React from 'react'
import PropTypes from 'prop-types'
import {InputStyled} from './Styled'

function Input (props){
    return (
        <InputStyled
                     value={props.value}
                     onChange={props.onChange} />
    )
}

Input.propTypes = {
    className: PropTypes.string,
    type: PropTypes.string,
    value: PropTypes.number,
    onChange: PropTypes.func
}

export {Input}
