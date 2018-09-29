/**
 * Created by beilunyang on 2018/8/31
 */
import React, { Component } from 'react';
import {
    Indicator,
} from '../../components';
import './index.less';

export default class IndicatorDemo extends Component {
    render() {
        return (
            <div className="indicator-demo">
                <Indicator
                    size="sm"
                />
                <Indicator />
                <Indicator
                    size="lg"
                />
                <Indicator
                    size="xl"
                />
                <Indicator
                    color="blue"
                />
                <Indicator
                    color="white"
                    text="white loading..."
                />
                <Indicator
                    text="loading..."
                />
                <Indicator
                    size="lg"
                    className="indicator-demo-item"
                    textClassName="indicator-demo-item-text"
                />
                <Indicator
                    size="lg"
                    color="white"
                    text="加载中"
                    style={{
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100px',
                        height: '100px',
                        backgroundColor: '#333',
                        borderRadius: '5px',
                    }}
                    textStyle={{
                        fontSize: '14px',
                        color: '#fff',
                        marginTop: '8px',
                        marginLeft: 0,
                    }}
                />
            </div>

        );
    }
};

