/**
 * Created by zhangyi on 2017/10/25.
 */
import React, { Component } from 'react'
import { SwipeAction } from '../../components'
import './index.less'

export default class SwipeActionDemo extends Component {
    constructor(props) {
        super(props)
    }

    render () {
        return (
            <div className="swipe-container">
                <SwipeAction
                    onOpen={()=>{ console.log('onOpen') }}
                    onClose={()=>{ console.log('onClose') }}
                    right={[{
                        text: '删除',
                        style: {backgroundColor: 'red', color: '#fff'}
                    }]}>
                    <div className="item">打开右边</div>
                </SwipeAction>
                <SwipeAction
                    onOpen={()=>{ console.log('onOpen') }}
                    onClose={()=>{ console.log('onClose') }}
                    left={[{
                        text: '删除',
                        style: {backgroundColor: 'red', color: '#fff'}
                    }]}>
                    <div className="item">打开左边</div>
                </SwipeAction>
                <SwipeAction
                    autoClose={true}
                    left={[{
                        text: '关注'
                    }]}
                    right={[{
                        text: '取消',
                        style: {backgroundColor: '#333', color: '#fff'},
                        onPress: ()=>{ console.log('取消') }
                    },{
                        text: '删除',
                        style: {backgroundColor: 'red', color: '#fff'},
                        onPress: ()=>{ console.log('删除') }
                    }]}>
                    <div className="item">左右打开</div>
                </SwipeAction>
            </div>
        )
    }
}
