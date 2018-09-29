import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './iconfont/style.css';

const iconMap = [
    'chevron-down',
    'chevron-left',
    'chevron-right',
    'chevron-up',
    'back-home',
    'back',
    'camera',
    'close-circle',
    'eye-off',
    'more',
    'unchecked',
    'scan',
    'search',
    'checked',
    'radio-on',
    'radio-off',
    'eye',
    'alert',
    'flash-circle',
    'checkmark',
    'chevron-left-circle',
    'chevron-right-circle',
    'trashcan',
    'close',
    'chevron-down-circle',
    'edit',
    'arrow-down',
    'light-off',
    'light-on',
    'arrow-up',
    'minus',
    'order',
    'plus',
    'remark-active',
    'remark',
    'triangle-down',
    'triangle-up',
    'chevron-up-circle',
    'close-circle-o',
    'user-check',
    'edit-plus',
    'bell',
    'clock-circle-o'
];

const sizeMap = {
    'xxs': 12,
    'xs': 14,
    'sm': 16,
    'md': 18,
    'lg': 20,
};

const Icon = ({ name, style, className, size = 16, color = '#333' }) => {
    if (iconMap.indexOf(name) === -1) {
        return console.warn('the name is not supported');
    }

    let fontSize = typeof size === 'string' ? sizeMap[size] : size;
    fontSize = fontSize || 16;
    const sty = {
        fontSize: fontSize + 'px',
        color,
        ...style,
    };
    const cls = classNames(`icon-${name}`, className);
    return (
        <i className={cls} style={sty} />
    );
};

Icon.propTypes = {
    name: PropTypes.string.isRequired,
    color: PropTypes.string,
    size: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]),
    style: PropTypes.object,
    className: PropTypes.string,
};

export default Icon;
