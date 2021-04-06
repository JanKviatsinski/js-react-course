import React from 'react'
import PropTypes from 'prop-types'
import {Select} from 'antd'
import 'antd/dist/antd.css'

function TagSelect(props) {
    const options = []
    const {Option} = Select

    for (let currency in props.currencies) {
        options.push(
            <Option key={currency} value={currency}>
                {props.currencies[currency]}
            </Option>
        )
    }

    return (
        <Select
            style={{width: 120}}
            onChange={props.onChange}
            defaultValue={props.selected}>
            {options}
        </Select>
    )
}

TagSelect.propTypes = {
    currencies: PropTypes.object,
    className: PropTypes.string,
    onChange: PropTypes.func
}

export {TagSelect}
