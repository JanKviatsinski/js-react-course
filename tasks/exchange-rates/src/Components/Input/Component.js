import React from 'react'
import PropTypes from 'prop-types'
import {InputStyled} from './Styled'

function Input (props){
    return (
        <InputStyled
                     defaultValue={props.value}
                     onChange={props.onChange} />
    )
}

Input.propTypes = {
    className: PropTypes.string,
    type: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func
}

export {Input}
