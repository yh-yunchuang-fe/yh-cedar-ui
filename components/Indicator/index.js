/**
 * Created by beilunyang on 2018/8/31
 */
import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Image from '../Image';
import './index.less';

const Indicator = (props) => {
    const {
        size = 'md',
        color = 'blue',
        text,
        className,
        textStyle,
        textClassName,
        ...restProps
    } = props;
    const spinnerImg = color === 'blue' ? 'loading-blue' : 'loading-white';
    const cls = classNames('yh-indicator', className);
    const imgCls = classNames(`yh-indicator-loading-${size}`, 'yh-indicator-loading');
    const textCls = classNames('yh-indicator-tip', textClassName);
    return (
        <div className={cls} {...restProps}>
            <Image name={spinnerImg} className={imgCls} />
            { text ? <span className={textCls} style={textStyle}>{text}</span> : null }
        </div>
    );
};

Indicator.propTypes = {
    size: PropTypes.oneOf(['xl', 'lg', 'md', 'sm']),
    color: PropTypes.oneOf(['blue', 'white']),
    className: PropTypes.string,
    textStyle: PropTypes.object,
    textClassName: PropTypes.string,
};

export default Indicator;
