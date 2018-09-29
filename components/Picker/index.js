/**
 * Created by zhangyi on 2017/11/1.
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import PickerColumn from './PickerColumn'
import Dialog from '../Dialog'
import './index.less'

function noop () {}

export default class Picker extends Component {
    constructor(props) {
        super(props)
        this.value = []
    }

    static defaultProps = {
        prefixCls: 'yh-picker',
        visible: false,
        onClose: noop,
        className: '',
        style: null,
        options: [],    // 支持一维数组和多维数组 {label, value}
        value: [],
        onChange: noop,
        onOk: noop,
        onDismiss: noop,
        title: '',
        okText: '确定',
        dismissText: '取消'
    }

    static propTypes = {
        prefixCls: PropTypes.string,
        visible: PropTypes.bool,
        onClose: PropTypes.func,
        className: PropTypes.string,
        style: PropTypes.object,
        options: PropTypes.array,
        value: PropTypes.array,
        onChange: PropTypes.func,
        onOk: PropTypes.func,
        onDismiss: PropTypes.func,
        title: PropTypes.string,
        okText: PropTypes.string,
        dismissText: PropTypes.string
    }

    onOK = () => {
        if (this.props.onOk) {
            this.props.onOk(this.value)
        }
        this.props.onClose()
    }

    onDismiss = () => {
        if (this.props.onDismiss) {
            this.props.onDismiss()
        }
        this.props.onClose()
    }

    renderHeader() {
        const {
            prefixCls, okText, dismissText, title
        } = this.props

        return (
            <div className={`${prefixCls}-header`}>
                {
                    dismissText ?
                        <div
                            className={`${prefixCls}-header-item ${prefixCls}-header-left`} onClick={this.onDismiss}>
                            {dismissText}
                        </div> : null
                }
                <div className={`${prefixCls}-header-item ${prefixCls}-header-title`}>
                    { title }
                </div>
                <div className={`${prefixCls}-header-item ${prefixCls}-header-right`} onClick={this.onOK}>
                    { okText }
                </div>
            </div>
        )
    }

    renderColumn () {
        let {
            prefixCls, options, value, onChange
        } = this.props

        value = value || []
        let colNodes = null
        if (!Array.isArray(options[0])) {
            colNodes = (
                <PickerColumn
                    prefixCls={prefixCls}
                    key="0"
                    options={options}
                    value={value}
                    onChange={(selected) => {
                        this.value = selected
                        onChange(selected)
                    }}/>
            )
        } else {
            colNodes = options.map((cur, index) => {
                return (
                    <PickerColumn
                        prefixCls={prefixCls}
                        key={index}
                        options={cur}
                        value={value[index]}
                        onChange={(selected) => {
                            value[index] = selected
                            this.value = value
                            onChange(value)
                        }}/>
                )
            })
        }

        return colNodes
    }

    render() {
        const {
            prefixCls, className, style, options, visible, onClose
        } = this.props

        if(visible) {
            document.body.style.overflow = 'hidden'
        }else{
            document.body.style.overflow = 'auto'
        }

        if (!options || options.length === 0) {
            return null
        }

        const wrapCls = classNames({
            [prefixCls]: true,
            [className]: className
        })

        return (
            <Dialog
                visible={visible}
                title="yh-picker"
                maskClosable={true}
                animation="slide-up"
                maskAnimation="fade"
                onClose={onClose}
                style={{
                    left: 0,
                    bottom: 0,
                    position: 'fixed',
                    width: '100%',
                    backgroundColor: '#fff'
                }}
            >
                <div className={wrapCls} style={style}>
                    { this.renderHeader() }
                    <div className={`${prefixCls}-wrapper`}>
                        { this.renderColumn() }
                    </div>
                </div>
            </Dialog>
        )
    }
}
