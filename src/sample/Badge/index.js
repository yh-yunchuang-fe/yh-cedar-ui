/**
 * Created by zhangyi on 2017/10/31.
 */
import React, { Component } from 'react'
import { Badge } from '../../components'

export default class BadgeDemo extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div style={{padding: '0 20px'}}>
                <Badge dot/>
                <br/>
                <br/>
                <br/>
                <Badge dot>
                    <span style={{ width: '26px', height: '26px', background: '#ddd', display: 'inline-block' }} />
                </Badge>

                <br/>
                <br/>
                <Badge text={30}>
                    <span style={{ width: '26px', height: '26px', background: '#ddd', display: 'inline-block' }} />
                </Badge>
            </div>
        )
    }
}
