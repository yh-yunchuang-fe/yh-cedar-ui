/**
 * Created by beilunyang on 2018/8/31
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Animation from '../Animation';
import Indicator from '../Indicator';
import Icon from '../Icon';
import './index.less';

const TRANSITION_DURATION = 200;

export default class Toast extends Component {
    static defaultProps = {
        duration: 2000,
        animationEnd: () => {},
        onClose: () => {},
        position: 'center',
        mask: false,
        zIndex: 1000
    };

    static propTypes = {
        type: PropTypes.oneOf(['loading', 'success', 'fail', 'warn']),
        duration: PropTypes.number,
        animationEnd: PropTypes.func,
        onClose: PropTypes.func,
        position: PropTypes.oneOf(['top', 'center', 'bottom']),
        className: PropTypes.string,
        mask: PropTypes.bool,
        zIndex: PropTypes.number
    };

    ownIcon = false;

    componentDidMount() {
        const {
            type,
            duration,
            animationEnd,
        } = this.props;
        if (duration < 0) {
            console.warn('duration can not less than or equal to 0');
            return;
        }

        if (duration > 0 && type !== 'loading') {
            setTimeout(() => {
                this.onClose(animationEnd);
            }, TRANSITION_DURATION + duration);
        }
    }

    onClose = (cb) => {
        // TODO: toast去除DOM操作
        const toast = document.querySelector('.yh-toast-inner-container');
        toast.classList.add('yh-zoom-leave', 'yh-zoom-leave-active');
        setTimeout(() => {
            this.props.onClose();
            cb();
        }, TRANSITION_DURATION);
    };

    renderIcon = () => {
        const {
            type,
            icon,
        } = this.props;

        if (type === 'loading') {
            return (
                <div className="yh-toast-icon-container">
                    <Indicator
                        size="xl"
                        color="white"
                    />
                </div>
            );
        }

        let iconName = '';
        switch (type) {
            case 'success':
                iconName = 'unchecked';
                break;
            case 'fail':
                iconName = 'close-circle-o';
                break;
            case 'warn':
                iconName = 'alert';
                break;
        }

        if (iconName) {
            this.ownIcon = true;
            return (
                <div className="yh-toast-icon-container">
                    <Icon
                        name={iconName}
                        color="#fff"
                        size={32}
                    />
                </div>
            );
        }

        if (React.isValidElement(icon)) {
            this.ownIcon = true;
            return (
                <div className="yh-toast-icon-container">{icon}</div>
            );
        }

        if (typeof icon === 'function') {
            const elements = icon();
            if (React.isValidElement(elements)) {
               this.ownIcon = true;
               return (
                   <div className="yh-toast-icon-container">{elements}</div>
               );
            }
            console.warn('icon must be a function that can render reactElements');
            return null;
        }
        return null;
    };

    renderContent = () => {
        const { content } = this.props;
        if (typeof content === 'string') {
            const cls = classNames('yh-toast-text-container', 'yh-toast-content-text',
                this.ownIcon ? 'yh-toast-own-icon' : null);
            return (
                <div className={cls}>{content}</div>
            );
        }

        if (React.isValidElement(content)) {
            return (
                <div className="yh-toast-text-container">{content}</div>
            );
        }

        return null;
    };

    render() {
        const {
            duration,
            animationEnd,
            mask,
            position,
            className,
            zIndex,
            ...restProps
        } = this.props;
        let innerCls = null;
        switch (position) {
            case 'top':
                innerCls = 'yh-toast-top';
                break;
            case 'bottom':
                innerCls = 'yh-toast-bottom';
                break;
        }
        innerCls = classNames('yh-toast-inner-container', innerCls, className);
        const cls = classNames(
            'yh-toast-container',
            position === 'center' ? 'yh-toast-center' : null,
            mask ? 'yh-toast-mask' : null,
        );
        return (
            <div className={cls} style={{zIndex}}>
                <Animation
                    key="toast"
                    component="div"
                    className="yh-toast-animation-div"
                >
                    <div className={innerCls} {...restProps}>
                        {this.renderIcon()}
                        {this.renderContent()}
                    </div>
                </Animation>
            </div>
        );
    }
}
