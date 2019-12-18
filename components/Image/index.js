/**
 * Created by beilunyang on 2018/9/3
 */
import React from 'react';
import blueLoading from'./loading-blue.png'
import whiteLoading from './loading-white.png'

const imgMap = {
    'loading-blue': blueLoading,
    'loading-white': whiteLoading,
};

const Image = ({ name, ...restProps }) => {
    const keys = Object.keys(imgMap);
    if (keys.indexOf(name) === -1) {
        console.warn(`the img name ${name} is not existed`);
        return null;
    }

    return (
        <img
            src={imgMap[name]}
            {...restProps}
        />
    );
};

export default Image;

