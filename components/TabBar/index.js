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
        scroll: false,
        scrollWidth: 120,
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
        scroll: PropTypes.bool,
        scrollWidth: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]),
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
        const { onChange, scroll } = this.props
        if (onChange) {
            onChange(activeIndex, item)
        }
        if(scroll) {
            this.autoWidth(activeIndex)
        }
    }

    autoWidth = (activeIndex) => {
        const { scrollWidth } = this.props
        const parent = this.autoScroll.parentNode
        const children = parent.childNodes[activeIndex]

        // 1.总宽度的一半
        const width = parent.clientWidth
        // 2.点击的距离左边的宽度
        const leftWidth = scrollWidth * activeIndex / 2
        // 3.点击的宽度的一半
        const activeWidth = scrollWidth / 2
        // 4.滚动条滚动的距离
        const offsetLeft = children.offsetLeft

        const scrollLeft = offsetLeft + (leftWidth - width) + activeWidth
        this.scrollWrap.scrollLeft = scrollLeft
    }

    renderTabs () {
        const {
            prefixCls, items, tintColor, unselectedTintColor, scroll, scrollWidth
        } = this.props
        const activeIndex = this.state.activeIndex

        return items.map((item, index) => {
            const color = activeIndex === index ? tintColor : unselectedTintColor

            const cls = classNames({
                [`${prefixCls}-items`]: true,
                [`${prefixCls}-tab`]: !scroll,
                [`${prefixCls}-tab-active`]: activeIndex === index
            })

            const scrollSty = !scroll ? { color } : {
                ...color,
                minWidth: scrollWidth,
                left: 100
            }

            return (
                <div
                    ref={(ref) => {this.autoScroll = ref}}
                    className={cls}
                    style={scrollSty}
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
            items, tintColor, underline, scroll, scrollWidth
        } = this.props

        const {
            activeIndex
        } = this.state

        const wrapCls = classNames({
            [prefixCls]: true,
            [className]: className,
            [`${prefixCls}-wrap`]: !scroll ? false : true,
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

        const scrollSty = {
            width: `${scrollWidth}px`,
            left: `${scrollWidth * activeIndex}px`,
            borderColor: tintColor || ''
        }

        return (
            <div ref={(ref) => this.scrollWrap = ref} className={wrapCls} style={wrapSty}>
                { this.renderTabs() }
                {
                    underline && <div className={`${prefixCls}-underline`} ref="underline" style={!scroll ? underSty : scrollSty}/>
                }
            </div>
        )
    }
}
