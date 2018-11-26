import React, {Component} from 'react'
import {Rate} from '../../components/'

export default class RateDemo extends Component {
    render() {
        return <div>
            <Rate count={5} />
            <Rate count={5} allowClear/>
        </div>
    }
}