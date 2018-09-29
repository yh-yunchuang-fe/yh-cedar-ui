/**
 * Created by zhangyi on 2017/10/19.
 */
import React, { Component } from 'react'
import { Modal, alert, Button } from '../../components'
import './index.less'

export default class ModalDemo extends Component {
    constructor (props) {
        super(props)
        this.state = {
            visible: false
        }
    }

    componentDidMount() {

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

    openAlert = () => {
        alert('提示', '你确定吗？', [
            { text: 'Cancel', onPress: () => console.log('cancel') },
            { text: 'Ok', onPress: () => console.log('ok') },
        ])
    }

    render () {
        return (
            <div className="modal-container">
                <Button type="primary" inline onClick={this.show}>打开Modal</Button>
                <Button type="primary" inline onClick={this.openAlert}>打开Alert</Button>
                <Modal
                    visible={this.state.visible}
                    maskCloseable={false}
                    onClose={this.hide}
                    title="Title"
                    footer={[{text: '确定', onPress: ()=>{
                        console.log('onPress ')
                        this.hide()
                    }}]}
                >
                    <div>
                        <h1>zhangyisdkkkk</h1>
                    </div>
                </Modal>

            </div>
        )
    }
}

