import React, { Component } from 'react'
import { Indicator } from '../../components/'

export default class IndicatorDemo extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return <div>
            <Indicator 
                text={'正在加载'}
            />
        </div>
    }
}