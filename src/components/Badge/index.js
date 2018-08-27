/**
 * Created by zhangyi on 2017/10/31.
 */
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import './index.less'

export default class Badge extends PureComponent {
    constructor(props) {
        super(props)
    }

    static defaultProps = {
        prefixCls: 'yh-badge',
        className: '',
        dot: false,
        text: '',
        corner: '',
        overflowCount: 99,
        size: 'small'
    }

    render() {
        let {
            prefixCls, className, dot, text, corner, size, overflowCount, children
        } = this.props

        text = typeof text === 'number' && text > overflowCount ? `${overflowCount}+` : text;

        if (dot) {
            text = ''
        }

        const badgeCls = classNames({
            [prefixCls]: true,
            [className]: className,
            [`${prefixCls}-not-a-wrapper`]: !children,
            [`${prefixCls}-corner-wrapper`]: corner,
            // [`${prefixCls}-hot`]: !!hot,
            [`${prefixCls}-corner-wrapper-large`]: corner && (size === 'large'),
        })

        const scrollNumberCls = classNames({
            [`${prefixCls}-dot`]: dot,
            [`${prefixCls}-dot-large`]: dot && (size === 'large'),
            [`${prefixCls}-text`]: !dot && !corner,
            [`${prefixCls}-corner`]: corner,
            [`${prefixCls}-corner-large`]: corner && (size === 'large'),
        });

        return (
            <span className={badgeCls}>
                {children}
                {(text || dot) && <sup className={scrollNumberCls}>{text}</sup>}
            </span>
        )
    }
}