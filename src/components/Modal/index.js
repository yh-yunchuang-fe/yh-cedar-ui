/**
 * Created by zhangyi on 2017/10/23.
 */
import React, { Component } from 'react'
import omit from 'omit.js'
import Dialog from '../Dialog'
import './style/index.less'

export default class Modal extends Component {
    constructor(props){
        super(props)
    }

    static defaultProps = {
        prefixCls: 'yh-modal',
        closable: 'false',
        title: '',
        footer: [],
        style: null,
        className: '',
        maskClassName: ''
    }

    renderHeader() {
        const { prefixCls, title } = this.props
        return (
            <div className={`${prefixCls}-header`}>
                <div className={`${prefixCls}-title`}>{title}</div>
            </div>
        )
    }

    renderFooterButton(button, prefixCls, index) {
        const onClickFn = function(e) {
            e.preventDefault();
            if (button.onPress) {
                button.onPress()
            }
        }

        return (
            <a key={index} href="javascript:;" className={`${prefixCls}-button`} role="button" onClick={onClickFn}>
                {button.text || 'Button'}
            </a>
        )
    }

    renderFooter() {
        const { prefixCls, footer = [] } = this.props
        const btnGroupClass = `${prefixCls}-button-group-h`;
        const footerDom = footer.length ? <div className={btnGroupClass}>
            {footer.map((button, index) => this.renderFooterButton(button, prefixCls, index))}
        </div> : null;

        return (
            <div className={`${prefixCls}-footer`}>
                {footerDom}
            </div>
        )
    }



    render() {
        const {
            prefixCls,
            style,
            children,
            className,
            maskClassName
        } = this.props

        const rootStyle = {
            width: '7rem',
            height: 'auto',
            ...style,
        }

        const resetProps = omit(this.props, [
            'style', 'className', 'maskClassName'
        ])

        return (
            <Dialog
                style={rootStyle}
                className={className}
                maskClassName={maskClassName}
                {...resetProps}>
                <div className={`${prefixCls}-content`}>
                    { this.renderHeader() }
                    <div className={`${prefixCls}-body`}>
                        { children }
                    </div>
                    { this.renderFooter() }
                </div>
            </Dialog>
        )
    }
}
