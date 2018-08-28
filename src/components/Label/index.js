import React, { PureComponent } from 'react'
import classNames from 'classnames'
import './index.less'

export default class Label extends PureComponent {
    constructor(props) {
        super(props)
    }

    static defaultProps = {
        prefixCls: 'yh-label',
        className: '',
        left: '',
        leftColor: '',
        right: '',
        rightColor: ''
    }

    render() {
        const { prefixCls, className, left, leftColor, right, rightColor } = this.props

        const cls = classNames({
            [prefixCls]: true,
            [className]: className
        })



        return (
            <div className={cls}>
                <span
                    className={`${prefixCls}-left`}
                    style={{color: leftColor}}>
                    {left}</span>
                <span
                    className={`${prefixCls}-right`}
                    style={{color: rightColor}}>
                    {right}</span>
            </div>
        )
    }
}