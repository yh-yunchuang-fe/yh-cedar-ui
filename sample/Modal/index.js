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
            visible: false,
            titleVisible: false,
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

    openColor = () => {
        alert('', '张老板帅吗？', [
            { text: '帅', color: '#24A8E8', onPress: () => console.log('cancel') },
            { text: '非常帅', color: '#FD7622', onPress: () => console.log('ok') },
        ])
    }

    render () {
        return (
            <div className="modal-container">
                <Button type="primary" inline onClick={this.show}>打开Modal</Button>
                <Button type="primary" inline onClick={this.openAlert}>打开Alert</Button>
                <Button type="primary" inline onClick={this.openColor}>可修改按钮颜色</Button>
                <Button type="primary" inline onClick={()=>{
                    this.setState({
                        titleVisible: true
                    })
                }}>无标题Modal</Button>
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
                <Modal
                    visible={this.state.titleVisible}
                    maskCloseable={false}
                    onClose={this.hide}
                    footer={[
                        {text: 'cancel', color: 'red', onPress: ()=>{ this.setState({
                            titleVisible: false
                        })}}
                    ]}>
                    <div>
                        <h1>hello world</h1>
                    </div>
                </Modal>

            </div>
        )
    }
}

