/**
 * Created by zhangyi on 2017/11/2.
 */
import React, { Component } from 'react'
import { isObject } from "../../src/utils";
import './index.less'


function getGesturePointFromEvent (evt) {
    let point = {};

    if(evt.targetTouches && evt.targetTouches.length > 0) {
        // Prefer Touch Events
        point.x = evt.targetTouches[0].clientX;
        point.y = evt.targetTouches[0].clientY;
    } else {
        // Either Mouse event or Pointer Event
        point.x = evt.clientX;
        point.y = evt.clientY;
    }

    return point;
}

export default class PickerColumn extends Component {
    constructor(props) {
        super(props)
        this.state = {
            init: true,
            isMoving: false,
            translateY: 0,
            startTranslateY: 0,
            startTouchY: 0,
            maxTranslateY: 0,
            minTranslateY: 0
        }
    }

    static defaultProps = {
        prefixCls: 'yh-picker',
        options: [],
        value: [],
        onChange: ()=>{}
    }

    componentDidMount () {
        const { prefixCls } = this.props

        this.columnHeight = this.column.getBoundingClientRect().height
        this.itemHeight = document.querySelector(`.${prefixCls}-col-item`).getBoundingClientRect().height

        this.computeTranslate(this.props)
    }

    componentWillReceiveProps (nextProps) {
        if (this.state.isMoving) {
            return;
        }
        this.computeTranslate(nextProps)
    }

    // 每个月的日期数不同，需要重新触发render
    // shouldComponentUpdate (nextProps, nextState) {
    //     const state = this.state
    //     /* &&
    //      state.startTouchY === nextState.startTouchY*/
    //     if (state.isMoving === nextState.isMoving &&
    //         state.translateY === nextState.translateY) {
    //         return false
    //     }
    //     return true
    // }

    // 计算初始的translate
    computeTranslate = (props) => {
        const { options, value } = props
        const { columnHeight, itemHeight } = this

        // 找到默认选中项
        let selectedIndex = -1
        options.some((cur, index) => {
            let curValue = isObject(cur) ? cur.value : cur
            if (curValue === value) {
                selectedIndex = index
                return true
            }
        })

        if (selectedIndex < 0) {
            this.onSelected(options[0])
            selectedIndex = 0
        }

        this.setState({
            translateY: columnHeight / 2 - itemHeight / 2 - selectedIndex * itemHeight,
            maxTranslateY: columnHeight / 2 - itemHeight / 2,
            minTranslateY: columnHeight / 2 - itemHeight * options.length + itemHeight / 2
        })
    }

    onTouchStart = (e) => {
        this.setState({
            init: false,
            startTouchY: e.targetTouches[0].pageY,
            startTranslateY: this.state.translateY  //缓存拖拽前的Y轴 新的Y值在这个基础加上move距离
        })
    }

    onTouchMove = (e) => {
        // 判断默认行为是否可以被禁用
        if (e.cancelable) {
            // 判断默认行为是否已经被禁用
            if (!e.defaultPrevented) {
                e.preventDefault();
            }
        }
        const touchY = e.targetTouches[0].pageY

        this.setState(({isMoving, startTranslateY, startTouchY, maxTranslateY, minTranslateY}) => {
            // 第一次触发move 设置isMoving为true
            if (!isMoving) {
                return {
                    isMoving: true
                }
            }

            let nextTranslate = startTranslateY + touchY - startTouchY

            if (nextTranslate < minTranslateY) {
                // nextTranslate = minTranslateY
                // 加滚动弹回效果
                nextTranslate = minTranslateY - Math.pow(minTranslateY - nextTranslate, 0.8);
            } else if (nextTranslate > maxTranslateY) {
                // nextTranslate = maxTranslateY
                nextTranslate = maxTranslateY + Math.pow(nextTranslate - maxTranslateY, 0.8);
            }

            return {
                translateY: nextTranslate
            }
        })
    }

    onTouchEnd = (e) => {
        if (!this.state.isMoving) {
            return;
        }

        this.setState({
            isMoving: false,
            startTouchY: 0,
            startTranslateY: 0
        })

        setTimeout(() => {
            const { options } = this.props
            const { translateY, minTranslateY, maxTranslateY } = this.state

            // 计算选中的option
            let activeIndex;
            if (translateY > maxTranslateY) {
                activeIndex = 0;
            } else if (translateY < minTranslateY) {
                activeIndex = options.length - 1;
            } else {
                activeIndex = - Math.round((translateY - maxTranslateY) / this.itemHeight);
            }
            this.onSelected(options[activeIndex])
        }, 0)
    }

    onTouchCancel = (e) => {
        if (!this.state.isMoving) {
            return;
        }
        this.setState(({ startTranslateY }) => {
            return {
                isMoving: false,
                startTouchY: 0,
                translateY: startTranslateY,
                startTranslateY: 0,
            }
        })
    }

    onSelected = (option) => {
        if (this.props.onChange) {
            let value = isObject(option) ? option.value : option
            this.props.onChange(value)
        }
    }


    renderItems() {
        const { prefixCls, options, value } = this.props

        return options.map((option, index) => {
            let curValue = ''
            let label = ''
            if (isObject(option)) {
                curValue = option.value
                label = option.label
            } else {
                curValue = option
                label = option
            }

            let className = `${prefixCls}-col-item`;
            if (curValue === value) {
                className = className + ` ${prefixCls}-col-item-selected`
            }
            return (
                <div
                    key={index}
                    className={className}
                    value={curValue}>
                    { label }
                </div>
            )
        })
    }

    render () {
        const {
            prefixCls
        } = this.props

        let style = {
            transform: `translate3d(0, ${this.state.translateY}px, 0)`,
        }
        // 初始化时不要有延迟
        if (!this.state.init) {
            style.transition = 'cubic-bezier(0,0,0.2,1.15) .3s'
        }

        return (
            <div className={`${prefixCls}-col`} ref={(ref)=>{this.column = ref}}
                 onTouchStart={this.onTouchStart}
                 onTouchMove={this.onTouchMove}
                 onTouchEnd={this.onTouchEnd}
                 onTouchCancel={this.onTouchCancel}>

                <div className={`${prefixCls}-mask`}/>
                <div className={`${prefixCls}-indicator`}/>
                <div
                    style={style}
                    className={`${prefixCls}-col-scroller`}
                    ref="scrollRef"
                    >
                    { this.renderItems() }
                </div>
            </div>
        )
    }
}
