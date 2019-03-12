import React, { Component } from 'react'
import { Button } from '../../components'

export default class ButtonDemo extends Component {
    constructor(props) {
        super(props)
    }

    render () {
        return (
            <div>
                <div style={{padding: '0 20px'}}>
                    <Button type="default" style={{marginBottom: 20}}>default</Button>
                    <Button type="default" disabled style={{marginBottom: 20}}>default</Button>
                    <Button type="primary" style={{marginBottom: 20}}>primary</Button>
                    <Button type="primary" disabled style={{marginBottom: 20}}>primary</Button>
                    <Button type="warning" style={{marginBottom: 20}}>warning</Button>
                    <Button type="warning" disabled style={{marginBottom: 20}}>warning</Button>
                    <Button type="ghost" style={{marginBottom: 20}}>ghost</Button>

                    <Button type="ghost" inline style={{margin: 20}}>ghost</Button>
                </div>
                <div>

                    <Button type="ghost" inline  size="small" style={{margin: 20}}>
                        ghost
                    </Button>
                    <Button type="ghost" disabled inline style={{ margin: 20 }}>ghost</Button>
                    <Button type="primary"  style={{ margin: 20, height: 200, width: 400 }}>设置高度垂直居中</Button>
                </div>
            </div>
        )
    }
}
