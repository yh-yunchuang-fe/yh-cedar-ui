import React, { Component } from 'react'
import { Tag } from '../../components'

export default class TagDemo extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div style={{padding: '0 10px'}}>
                <div style={{flexDirection: 'row', padding: '10px 0'}}>
                    <div style={{fontSize: 20, color: '#333', margin: '10px 0'}}>不可点击:</div>
                    <Tag color="#FD7622" style={{marginRight: '10px'}} fill>Hello</Tag>
                    <Tag color="#589C3E" className={'class'} fill>World</Tag>
                </div>

                <div style={{flexDirection: 'row', padding: '10px 0', display: 'flex', justifyContent: 'space-between'}}>
                    <Tag color="#24A8E8">外卖</Tag>
                    <Tag color="#FD7622">堂食</Tag>
                    <Tag color="#24A8E8" fill>配送</Tag>
                </div>
                <div style={{padding: '5px 0'}}>
                    <Tag
                        fill
                        color="#FFF3EC"
                        textColor="#FD7622"
                    >
                        请更换电池
                    </Tag>
                </div>
                <div style={{padding: '5px 0'}}>
                    <Tag
                        fill
                        color="#E7F7FF"
                        textColor="#24A8E8"
                    >
                        已报障，等待维修
                    </Tag>
                </div>


                <div style={{flexDirection: 'row', padding: '10px 0'}}>
                <div style={{fontSize: 20, color: '#333', margin: '10px 0'}}>可点击:</div>
                    <Tag
                        color="#666"
                        activeColor="#24A8E8"
                        size={14}
                        readonly={false}
                    >
                        今天处理
                    </Tag>
                </div>
                <div style={{flexDirection: 'row', display: 'flex', justifyContent: 'space-between'}}>
                    <Tag
                        color="#666"
                        activeColor="#24A8E8"
                        size={12}
                        readonly={false}
                        style={{
                            paddingHorizontal: 24,
                            paddingVertical: 8,
                        }}
                    >
                        模版一
                    </Tag>
                    <Tag
                        color="#666"
                        activeColor="#24A8E8"
                        size={12}
                        readonly={false}
                        style={{
                            paddingHorizontal: 24,
                            paddingVertical: 8,
                        }}
                    >
                        模版二
                    </Tag>
                    <Tag
                        color="#666"
                        activeColor="#24A8E8"
                        size={12}
                        readonly={false}
                        style={{
                            paddingHorizontal: 24,
                            paddingVertical: 8,
                        }}
                    >
                        模版三
                    </Tag>
                </div>

                <div style={{padding: '10px 0'}}>
                    <Tag
                        color="#666"
                        activeColor="#24A8E8"
                        textStyle={{fontSize: 16}}
                        readonly={false}
                    >
                        16px字体
                    </Tag>
                </div>
            </div>
        )
    }
}
