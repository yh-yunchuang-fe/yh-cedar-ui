/**
 * Created by zhangyi on 2017/10/30.
 */
import React, { Component } from 'react'
import { TabBar } from '../../components'

export default class TabBarDemo extends Component {
    constructor(props) {
        super(props)
    }

    render () {
        return (
            <div style={{marginTop: 20}}>
                <TabBar items={['first tab', 'second tab', 'third tab']} style={{marginBottom: 20}}/>
                <TabBar items={['first tab', 'second tab', 'third tab']} defaultActiveIndex={1} style={{marginBottom: 20}}/>
                <TabBar items={['first tab', 'second tab', 'third tab']} barTintColor="#ddd" tintColor="red"/>
            </div>
        )
    }
}
