import React, { Component } from 'react'
import classNames from 'classnames'
import './index.less'
import Dialog from '../Dialog'

export default class Popup extends Component {
    constructor(props) {
        super(props)
    }

    static defaultProps = {
        prefixCls: 'yh-popup',
        position: 'fixed',

    }

    render() {
        let { prefixCls, position, maskStyle, wrapStyle, children, style, className, ...restProps } = this.props

        style = Object.assign({}, style, {position: position})
        maskStyle = Object.assign({}, maskStyle, {position: position})
        wrapStyle = Object.assign({}, wrapStyle, {position: position})

        const cls = classNames({
            [prefixCls]: true,
            [className]: className
        })

        return (
            <Dialog
                animation="slide-up"
                maskAnimation="fade"
                maskStyle={maskStyle}
                wrapStyle={wrapStyle}
                className={cls}
                style={style}
                {...restProps}
                >
                { children }
            </Dialog>
        )
    }
}