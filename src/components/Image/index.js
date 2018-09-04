/**
 * Created by beilunyang on 2018/9/3
 */
import React from 'react';

const imgMap = {
    'loading-blue': require('./loading-blue.png'),
    'loading-white': require('./loading-white.png'),
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

