import React, {Component} from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import Icon from '../Icon'
import './index.less'
export default class InputNumber extends Component {
    constructor(props) {
        super(props)

        this.state = {
            inputValue: props.value || props.defaultValue
        }
    }

    static defaultProps = {
        prefixCls: 'yh-inputnumber',
        className: '',
        autoFocus: false,
        disabled: false,
        minusIcon: null,
        plusIcon: null,
        defaultValue: 0,
        value: null,
        min: -Infinity,
        max: Infinity,
        step: 1,
        precision: null,
        onChange: null,
        formatter: null,
        parse: null,
        getInputRef: null
    }

    static propTypes = {
        prefixCls: PropTypes.string,
        className: PropTypes.string,
        autoFocus: PropTypes.bool,
        disabled: PropTypes.bool,
        minusIcon: PropTypes.any,
        plusIcon: PropTypes.any,
        defaultValue: PropTypes.number,
        value: PropTypes.number,
        min: PropTypes.number,
        max: PropTypes.number,
        step: PropTypes.number,
        precision: PropTypes.number,
        onChange: PropTypes.func,
        formatter: PropTypes.func,
        parse: PropTypes.func,
        getInputRef: PropTypes.func
    }

    componentDidMount() {
        const {value, defaultValue, formatter} = this.props
        let newValue

        if(value !== null) {
            newValue = this.accurateNum(value)
        } else {
            newValue = this.accurateNum(defaultValue)
        }

        if(isFunction(formatter)) {
            newValue = formatter(newValue)
        }

        this.input.value = newValue
    }

    accurateNum(value) {
        let {precision} = this.props

        if(!precision) {return Number(value)}

        precision = Math.max(precision, 0)

        return Number(value).toFixed(precision)
    }

    onReduce() {
        const {step, min, disabled, parse} = this.props
        const {inputValue} = this.state

        if(disabled || inputValue <= min) {return}

        let currentVal

        if(isFunction(parse)) {
            currentVal = Number(parse(this.input.value))
        } else {
            currentVal = Number(this.input.value)
        }

        let newValue = currentVal - step
        newValue = Math.max(min, newValue)

        this.onChange(newValue)
    }

    onAdd() {
        const {step, max, disabled, parse} = this.props
        const {inputValue} = this.state

        if(disabled || inputValue >= max) {return}

        let currentVal

        if(isFunction(parse)) {
            currentVal = Number(parse(this.input.value))
        } else {
            currentVal = Number(this.input.value)
        }
        let newValue = currentVal + step
        newValue = Math.min(newValue, max)

        this.onChange(newValue)
    }

    onInputChange(e) {
        let currentVal = e.target.value

        const {parse, formatter} = this.props

        if(isFunction(parse)) {
            currentVal = parse(currentVal)
        }

        if(isFunction(formatter)) {
            this.input.value = formatter(currentVal)
        }
    }

    onInputBlur(e) {
        let currentVal = e.target.value

        const {min, max, parse} = this.props
        const {inputValue} = this.state

        if(isFunction(parse)) {
            currentVal = parse(currentVal)
        }

        let reg = /^\-*(?:\d+|\d+\.\d+)$/
        let result = reg.test(currentVal)
        let newValue = !result ? inputValue : currentVal
        newValue = Math.min(max, Math.max(min, newValue))

        this.onChange(newValue)
    }

    onChange(newValue) {
        const {onChange, formatter ,value} = this.props
        let accurateValue = this.accurateNum(newValue)

        if(value === null) {
            if(isFunction(formatter)) {
                this.input.value = formatter(accurateValue)
            } else {
                this.input.value = accurateValue
            }    
        }
        
        this.setState({inputValue: accurateValue})
        onChange && onChange(accurateValue)
    }

    componentDidUpdate() {
        const {value} = this.props

        if(value !== null) {
            this.input.value = value
        }
    }

    getInputRef(ref) {
        const {getInputRef} = this.props

        this.input = ref

        getInputRef && getInputRef(ref)
    }

    render() {
        const {inputValue} = this.state
        const {prefixCls, className, minusIcon, plusIcon, autoFocus, disabled, max, min} = this.props

        const cls = classNames({
            [prefixCls]: true,
            [className]: className,
            disabled: disabled
        })

        return <div className={cls}>
            <a 
                ref={(ref) => {this.reduceBtn = ref}}
                className={`${prefixCls}-btn ${inputValue <= min ? 'disabled' : ''}`} 
                onClick={this.onReduce.bind(this)} 
            >
                {minusIcon ? minusIcon : <Icon name="minus" />}
            </a>
            <input 
                autoFocus={autoFocus}
                disabled={disabled}
                className={`${prefixCls}-input`} 
                ref={this.getInputRef.bind(this)}
                onBlur={this.onInputBlur.bind(this)}
                onChange={this.onInputChange.bind(this)}
            />
            <a 
                className={`${prefixCls}-btn ${inputValue >= max ? 'disabled' : ''}`} 
                onClick={this.onAdd.bind(this)} 
                ref={(ref) => this.addBtn = ref}
            >
                {plusIcon ? plusIcon : <Icon name="plus" />}
            </a>
        </div>
    }
}

function isFunction(param) {
    return Object.prototype.toString.apply(param) === '[object Function]'
}