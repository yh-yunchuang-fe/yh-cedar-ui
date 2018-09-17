import React, {Component} from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import Icon from '../Icon'
import './index.less'
export default class InputNumber extends Component {
    constructor(props) {
        super(props)

        this.state = {
            num: this.accurateNum(this.props.value || this.props.defaultValue)
        }
    }

    static defaultProps = {
        prefixCls: 'yh-inputnumber',
        className: '',
        minusIcon: null,
        plusIcon: null,
        defaultValue: 0,
        value: null,
        min: -Infinity,
        max: Infinity,
        step: 1,
        precision: 0,
        onChange: () => {}
    }

    static PropTypes = {
        prefixCls: PropTypes.string,
        className: PropTypes.string,
        minusIcon: PropTypes.any,
        plusIcon: PropTypes.any,
        defaultValue: PropTypes.number,
        value: PropTypes.number,
        step: PropTypes.number,
        onChange: PropTypes.func
    }

    accurateNum(value) {
        let {precision} = this.props

        precision = Math.max(precision, 0)

        return value.toFixed(precision)
    }

    onReduce() {
        const {num} = this.state
        const {step, min, onChange} = this.props

        let newNum = num - step

        if(newNum < min) {
            return
        }
        this.setState({num: this.accurateNum(newNum)})

        onChange && onChange(newNum)
    }

    onAdd() {
        const {num} = this.state
        const {step, max, onChange} = this.props

        let newNum = num + step

        if(newNum > max) {
            return
        }
        this.setState({num: this.accurateNum(newNum)})

        onChange && onChange(newNum)
    }

    onInputChange(val) {

    }

    onChange() {

    }

    render() {
        const {prefixCls, className, minusIcon, plusIcon} = this.props
        const {num} = this.state

        const cls = classNames({
            [prefixCls]: true,
            [className]: className
        })

        return <div className={cls}>
            <a className={`${prefixCls}-btn`} onClick={this.onReduce.bind(this)} >
                {minusIcon ? minusIcon : <Icon name="minus" />}
            </a>
            <input className={`${prefixCls}-input`} value={num} onChange={this.onInputChange.bind(this)} />
            <a className={`${prefixCls}-btn`} onClick={this.onAdd.bind(this)} >
                {plusIcon ? plusIcon : <Icon name="plus" />}
            </a>
        </div>
    }
}