import React, {Component} from 'react'
import {MultipleLineText} from '../../components/'
import './index.less'

export default class MultipleLineTextDemo extends Component {
    render() {
        return <div className="container">
            <MultipleLineText
                
            >
                从商品中心调取组合码商品份数和组合码单位接口如果组合码没有配置单位，单位默认显示份。
                从商品中心调取组合码商品份数和组合码单位接口如果组合码没有配置单位，单位默认显示份。
            </MultipleLineText>
        </div>
    }
}