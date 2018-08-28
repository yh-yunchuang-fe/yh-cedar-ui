/**
 * 开关
 * @author zhangyi
 * @date 2017-12-25 圣诞快乐
 */
import React, { PureComponent } from 'react'
import PropType from 'prop-types'
import classNames from 'classnames'
import './index.less'

export default class Switch extends PureComponent {
    constructor(props) {
        super(props)
    }

    static defaultProps = {
        prefixCls: 'yh-switch',
        className: '',
        checked: false,
        disabled: false,
        color: '',                  //开关打开后的背景颜色
        onChange: ()=>{},
        onClick: ()=>{}
    }

    static propTypes = {
        prefixCls: PropType.string,
        className: PropType.string,
        checked: PropType.bool,
        disabled: PropType.bool,
        color: PropType.string,
        onChange: PropType.func,
        onClick: PropType.func
    }

    onChange = (e) => {
        const checked = e.target.checked
        if (this.props.onChange) {
            this.props.onChange(checked)
        }
    }

    onClick = (e) => {
        const { onClick, checked } = this.props
        if (onClick) {
            let val;
            if (e && e.target && e.target.checked !== undefined) {
                val = e.target.checked;
            } else {
                val = checked;
            }
            onClick(val)
        }
    }

    render() {
        const {
            prefixCls, className, checked, disabled, color
        } = this.props

        const wrapCls = classNames({
            [prefixCls]: true,
            [className]: className
        })

        const switchCls = classNames({
            'switch': true,
            'switch-disabled': disabled
        })

        return (
            <label
                className={wrapCls}
            >
                <input
                    type="checkbox"
                    className={`${prefixCls}-checkbox`}
                    disabled={disabled}
                    checked={checked}
                    onChange={this.onChange}
                    value={checked ? 'on' : 'off'}
                    {...(!disabled ? { onClick: this.onClick } : {})}
                />
                <div
                    className={switchCls}>
                    <div className="switch-tag"/>
                </div>
            </label>
        )
    }
}