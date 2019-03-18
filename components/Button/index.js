/**
 * Created by zhangyi on 2017/10/24.
 */
import React, { Component, PureComponent } from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import './index.less'

export default class Button extends Component {
    constructor(props) {
        super(props)
    }

    static defaultProps = {
        prefixCls: 'yh-button',
        size: 'large',
        inline: false,
        disabled: false,
        type: 'default',
        className: '',
        // activeClassName: '',
        style: {},
        // activeStyle: {},
        onClick: () => {}
    }

    static propTypes = {
        prefixCls: PropTypes.string,
        size: PropTypes.string,
        inline: PropTypes.bool,
        disabled: PropTypes.bool,
        type: PropTypes.string,
        className: PropTypes.string,
        // activeClassName: PropTypes.string,
        style: PropTypes.object,
        // activeStyle: PropTypes.object,
        onClick: PropTypes.func
    }

    render () {
        const {
            children, prefixCls, className, type, size, inline,
            disabled, onClick, style, ...restProps
        } = this.props

        const wrapCls = {
            [className]: className,
            [prefixCls]: true,
            [`${prefixCls}-primary`]: type === 'primary',
            [`${prefixCls}-ghost`]: type === 'ghost',
            [`${prefixCls}-warning`]: type === 'warning',
            [`${prefixCls}-small`]: size === 'small',
            [`${prefixCls}-inline`]: inline,
            [`${prefixCls}-disabled`]: disabled,
        }
        if (!!style.height) {
            style.lineHeight = style.height + 'px'
        }

        //需要加上 ontouchstart 事件，否则在iOS下css :active伪类不会被触发
        return (
            <a
                onTouchStart={()=>{}}
                role="button"
                className={classNames(wrapCls)}
                onClick={disabled ? undefined : onClick}
                aria-disabled={disabled}
                style={style}
                {...restProps}
            >   
                <div className='wrap'>
                    <span>
                        { children }
                    </span>
                </div>
            </a>
        )
    }
}
