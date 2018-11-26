import React, {Component} from 'react'
import {Rate} from '../../components/'

export default class RateDemo extends Component {
    onChange(rate) {
        console.log(rate)
    }

    onCChange(rate) {
        console.log(rate)
    }

    render() {
        return <div>
            <Rate count={5} onChange={this.onChange.bind(this)} />
            <Rate count={5} allowClear onChange={this.onCChange.bind(this)}  />
            <Rate count={5} value={3} />
            <Rate count={5} value={1} disabled />
        </div>
    }
}