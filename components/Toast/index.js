/**
 * Created by beilunyang on 2018/8/31
 */
import React from 'react';
import ReactDOM from 'react-dom';
import Toast from './Toast';

const TRANSITION_DURATION = 200;

const show = (content, options = {}) => {
    const {
        mask,
        icon,
        type,
        duration,
        position,
        onClose,
        style,
        zIndex
    } = options;
    const div = document.createElement('div');
    document.getElementById('modal-root').appendChild(div);
    const animationEnd = () => {
        ReactDOM.unmountComponentAtNode(div);
    };
    ReactDOM.render(
        <Toast
            mask={mask}
            icon={icon}
            type={type}
            style={style}
            content={content}
            duration={duration}
            position={position}
            onClose={onClose}
            animationEnd={animationEnd}
            zIndex={zIndex}
        />
    , div);
    return div;
};

export default {
    LONG: 3500,
    SHORT: 2000,
    success(content, options = {}) {
        const {
            duration,
            position,
            onClose,
            style,
            mask,
            zIndex
        } = options;
        return show(content, {
            type: 'success',
            duration,
            position,
            onClose,
            style,
            mask,
            zIndex
        });
    },
    fail(content, options = {}) {
        const {
            duration,
            position,
            onClose,
            style,
            mask,
            zIndex
        } = options;
        return show(content, {
            type: 'fail',
            duration,
            position,
            onClose,
            style,
            mask,
            zIndex
        });
    },
    warn(content, options = {}) {
        const {
            duration,
            position,
            onClose,
            style,
            mask,
            zIndex
        } = options;
        return show(content, {
            type: 'warn',
            duration,
            position,
            onClose,
            style,
            mask,
            zIndex
        });
    },
    loading(content, options = {}) {
        const {
            duration,
            position,
            onClose,
            style,
            mask,
            zIndex
        } = options;
        return show(content, {
            type: 'loading',
            duration,
            position,
            onClose,
            style,
            mask,
            zIndex
        });
    },
    hide(div) {
        // TODO: toast去除DOM操作
        const toast = div.querySelector('.yh-toast-inner-container');
        toast.classList.add('yh-zoom-leave', 'yh-zoom-leave-active');
        setTimeout(() => {
            ReactDOM.unmountComponentAtNode(div);
        }, TRANSITION_DURATION);
    },
    show,
};
