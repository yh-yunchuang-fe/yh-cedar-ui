import React, {Component} from 'react'
import { InputNumber } from '../../components';
import './index.less'

export default class InputNumberDemo extends Component {
    constructor(props) {
        super(props)

        this.state = {
            num: 1
        }
    }

    onChange(val) {
        this.setState({num: val})
    }

    render() {
        const {num} = this.state
        return <div className="inputnumber-demo">
            <div className="item">
                <p>min：-10, max：6</p>
                <InputNumber min={-10} max={6} />
            </div>
            <div className="item">
                <p>min：-10, max：6，defaultValue: 1</p>
                <InputNumber defaultValue={1} min={-10} max={6} />
            </div>

            <div className="item">
                <p>精度precision: 3</p>
                <InputNumber precision={3} />
            </div>

            <div className="item">
                <p>autofocus: true</p>
                <InputNumber autoFocus min={1} defaultValue={1} />
            </div>

            <div className="item">
                <p>disabled: true</p>
                <InputNumber disabled />
            </div>

            <div className="item">
                <p>外部控制value: 10， max: 12</p>
                <InputNumber value={num} max={12} onChange={this.onChange.bind(this)}/>
            </div>

            <div className="item">
                <p>格式化数据</p>
                <InputNumber 
                    defaultValue={1} 
                    max={10}
                    formatter={(val) => `${val}%`}
                    parse={(val) => val.replace('%', '')}
                />
            </div>

            <div className="item">
                <p>自定义图标</p>
                <InputNumber 
                    defaultValue={1}
                    minusIcon={<span>减</span>}
                    plusIcon={<span>加</span>}
                />
            </div>
        </div>
    }
}