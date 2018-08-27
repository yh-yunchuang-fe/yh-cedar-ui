/**
 * Created by zhangyi on 2017/10/19.
 */
import React, { Component } from 'react'
import { Dialog, Button } from '../../components'
import './index.less'

export default class DialogDemo extends Component {
    constructor (props) {
        super(props)
        this.state = {
            visible: false
        }
    }

    show = () => {
        this.setState({
            visible: true
        })
    }

    hide = () => {
        this.setState({
            visible: false
        })
    }

    render () {
        return (
            <div>
                <Button type="primary" inline onClick={this.show} style={{marginLeft: 20}}>打开Dialog</Button>
                <Dialog
                    visible={this.state.visible}
                    onClose={this.hide}
                    animation="zoom"
                    maskAnimation="zoom"
                >
                    <div className="modal-demo">
                        <h2>zhangyi model</h2>
                    </div>
                </Dialog>
            </div>
        )
    }
}

