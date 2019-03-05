/**
 * 模态状况基类
 * @date 2017-07-10-17
 */
import React, {Component} from 'react'
import { createPortal } from 'react-dom'
import PropTypes from 'prop-types'
import Animation from '../Animation'
import LazyRenderBox from './LazyRenderBox'
import './style/index.less'
import { fixedBody, looseBody } from "../../src/utils";

export default class Dialog extends Component {

    constructor(props) {
        super(props)
    }

    static propTypes = {
        prefixCls: PropTypes.string,
        // position: PropTypes.oneOf(['fixed', 'absolute']),
        // closable: PropTypes.bool,
        maskClosable: PropTypes.bool,
        // animated: PropTypes.bool,
        className: PropTypes.string,
        maskClassName: PropTypes.string,
        transitionName: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.object
        ]),
        animation: PropTypes.string,
        transitionTimeout: PropTypes.number,
        mask: PropTypes.bool,                   //是否显示蒙板
        maskAnimation: PropTypes.string,
        maskTransition: PropTypes.bool,
        maskTransitionName: PropTypes.string,
        maskTransitionTimeout: PropTypes.number,
        zIndex: PropTypes.number,
        maskStyle: PropTypes.object,
        children: PropTypes.any,
        visible: PropTypes.bool,
        // title: PropTypes.element,
        // footer: PropTypes.element,
        wrapClassName: PropTypes.string,
        wrapStyle: PropTypes.object,
        style: PropTypes.object,
        // onShow: PropTypes.func,
        onClose: PropTypes.func,
        // afterClose: PropTypes.func
    }

    static defaultProps = {
        prefixCls: 'yh-dialog',                //动画样式前缀 默认不需要传
        // position: 'fixed',      //为了解决fixed 弹窗中有文本框，光标位置异常问题 需把fixed改为absolute
        // closable: true,
        maskClosable: true,             //点击蒙板是否可关闭
        animated: true,
        className: 'yh-dialog',
        maskClassName: 'yh-dialog-mask',
        transitionName: '',             //自定义动画名 默认不使用
        animation: 'zoom',              //动画名简写
        transitionTimeout: 500,
        mask: true,                     //是否显示蒙板
        maskAnimation: 'fade',          //蒙板动画名简写
        maskTransition: true,           //蒙板是否有动画
        maskTransitionName: 'yh-fade',  //默认蒙板动画名
        maskTransitionTimeout: 500,
        zIndex: undefined,
        maskStyle: null,
        visible: false,
        // title: null,
        // footer: null,
        wrapClassName: '',
        wrapStyle: {},
        style: {},
        // onShow: noop,
        onClose: () => {},
        usePortal: true
        // afterClose: noop
    }

    componentDidUpdate() {
        const props = this.props
        if (props.visible) {
            fixedBody()
            this.openTime = Date.now()
        }
    }

    getMaskElement() {
        let maskElement = null
        const {
            prefixCls,
            mask,
            visible,
            maskTransition,
            maskClassName,
            maskTransitionTimeout
        } = this.props
        if (mask && visible) {
            maskElement = (
                <LazyRenderBox key='mask'
                               style={this.getMaskStyle()}
                               className={`${prefixCls}-mask ${maskClassName || ''}`}/>
            )
            fixedBody()
        }
        if (maskTransition) {
            const maskTransitionName = this.getMaskTransitionName()
            maskElement = (
                <Animation key="mask"
                    transitionName={maskTransitionName}
                    transitionEnterTimeout={maskTransitionTimeout}
                    transitionAppearTimeout={maskTransitionTimeout}
                    transitionLeaveTimeout={maskTransitionTimeout}>
                    {maskElement}
                </Animation>
            )
            looseBody()
        }

        return maskElement
    }

    getDialogElement() {
        const {
            prefixCls,
            visible,
            maskClosable,
            style,
            wrapClassName,
            className,
            children
        } = this.props
        const wrapStyle = this.getWrapStyle()

        let dialogElement = null
        if (visible) {
            dialogElement = (
                <div role="dialog"
                     className={`${prefixCls}-wrap ${wrapClassName || ''}`}
                     style={wrapStyle}
                     onClick={maskClosable ? this.onMaskClick.bind(this) : undefined}
                >
                    <LazyRenderBox key="dialog-element" role="document" ref="dialog"
                                   style={style}
                                   className={`${prefixCls} ${className || ''}`}>
                        {children}
                    </LazyRenderBox>

                </div>
            )
        }

        return dialogElement
    }

    //获取蒙板动画
    getMaskTransitionName() {
        const props = this.props
        let maskTransitionName = props.maskTransitionName
        const { prefixCls, maskAnimation } = props
        if (!maskTransitionName && maskAnimation) {
            maskTransitionName = `${prefixCls}-${maskAnimation}`
        }
        return maskTransitionName
    }

    //获取content动画
    getTransitionName() {
        const props = this.props
        let transitionName = props.transitionName
        const { animation } = props
        if (!transitionName && animation) {
            transitionName = `yh-${animation}`
        }
        return transitionName;
    }

    getZIndexStyle() {
        const style = {}
        const props = this.props
        if (props.zIndex !== undefined) {
            style.zIndex = props.zIndex
        }
        return style
    }

    getMaskStyle() {
        return Object.assign({}, this.getZIndexStyle(), this.props.maskStyle)
    }

    getWrapStyle() {
        return Object.assign({}, this.getZIndexStyle(), this.props.wrapStyle)
    }

    onMaskClick(e) {
        if (Date.now() - this.openTime < 300) {
            return;
        }
        if (e.target === e.currentTarget) {
            this.close(e)
        }
    }

    close(e) {
        this.props.onClose(e)
    }

    render() {
        const props = this.props
        const transitionName = this.getTransitionName()
        const modalRoot = document.getElementById('modal-root')

        const node = (
            <div ref="dialog-wrapper">
                {this.getMaskElement()}
                <Animation
                    ref="dialog-animation"
                    key="dialog-animation"
                    transitionName={transitionName}
                    transitionEnterTimeout={props.transitionTimeout}
                    transitionAppearTimeout={props.transitionTimeout}
                    transitionLeaveTimeout={props.transitionTimeout}>
                    {this.getDialogElement()}
                </Animation>
            </div>
        )

        if (props.usePortal) {
            return createPortal(
                node,
                modalRoot
            );
        } else {
            return node
        }

    }
}
