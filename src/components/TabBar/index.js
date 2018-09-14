/**
 * @author zhangyi
 * @date 2018/9/5
 */
import React, { Component } from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import './index.less'

export default class TabBar extends Component {
    constructor(props){
        super(props)
        this.state = {
            activeIndex: props.defaultActiveIndex || 0
        }
    }


    componentWillReceiveProps(nextProps){
        if(!!nextProps.defaultActiveIndex || nextProps.defaultActiveIndex == 0) {
            this.setState({
                activeIndex: nextProps.defaultActiveIndex
            })
        }
    }

    static defaultProps = {
        prefixCls: 'yh-tab-bar',
        tabBarPosition: 'top',
        className: '',
        style: null,
        items: [],
        barTintColor: '',   //tabbar 背景色
        tintColor: '',      //选中的字体颜色
        unselectedTintColor: '',    //未选中的字体颜色
        defaultActiveIndex: 0,       //默认选中第几个
        underline: true,
        onChange: ()=>{}
    }

    static propTypes = {
        prefixCls: PropTypes.string,
        tabBarPosition: PropTypes.string,
        className: PropTypes.string,
        style: PropTypes.object,
        items: PropTypes.array,
        barTintColor: PropTypes.string,   //tabbar 背景色
        tintColor: PropTypes.string,      //选中的字体颜色
        unselectedTintColor: PropTypes.string,    //未选中的字体颜色
        defaultActiveIndex: PropTypes.number,       //默认选中第几个
        underline: PropTypes.bool,                  // 是否有上下边线和指示器
        onChange: PropTypes.func
    }


    onTabClick = (activeIndex, item) => {
        if (activeIndex === this.state.activeIndex) {
            return;
        }

        this.setState({
            activeIndex
        })
        if (this.props.onChange) {
            this.props.onChange(activeIndex, item)
        }
    }


    renderTabs () {
        const {
            prefixCls, items, tintColor, unselectedTintColor
        } = this.props

        const activeIndex = this.state.activeIndex

        return items.map((item, index) => {
            const color = activeIndex === index ? tintColor : unselectedTintColor
            const cls = classNames({
                [`${prefixCls}-tab`]: true,
                [`${prefixCls}-tab-active`]: activeIndex === index
            })
            return (
                <div
                    className={cls}
                    style={{color}}
                    key={index}
                    onClick={this.onTabClick.bind(this, index, item)}>
                    <span>{item}</span>
                </div>
            )
        })
    }

    render() {
        const {
            prefixCls, tabBarPosition, className, style, barTintColor,
            items, tintColor, underline
        } = this.props

        const {
            activeIndex
        } = this.state

        const wrapCls = classNames({
            [prefixCls]: true,
            [className]: className,
            [`${prefixCls}-top`]: tabBarPosition === 'top',
            [`${prefixCls}-bottom`]: tabBarPosition === 'bottom',
            [`${prefixCls}-line`]: underline
        })

        const wrapSty = {
            ...style,
            backgroundColor: barTintColor,
        }

        const len = items.length
        const width = 100 / len
        const underSty = {
            width: `${width}%`,
            left: `${width * activeIndex}%`,
            borderColor: tintColor || ''
        }

        return (
            <div className={wrapCls} style={wrapSty}>
                { this.renderTabs() }
                {
                    underline && <div className={`${prefixCls}-underline`} ref="underline" style={underSty}/>
                }
            </div>
        )
    }
}
