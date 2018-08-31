/**
 * Created by zhangyi on 2017/10/31.
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import './index.less'

export default class PullToRefresh extends Component {
    static defaultProps = {
        prefixCls: 'yh-pull-refresh',
        className: '',
        style: null,
        height: '',
        distanceToRefresh: 100,
        distanceLoadMore: 50,
        onRefresh: ()=>{},
        onLoadMore: ()=>{},
        footer: null,
        loading: false,         //状态
        hosMore: true,
        refershing: false,
        refershControl: null
    }

    constructor(props) {
        super(props)

        this.state = {
            headerHeight: 30,
            beginPosY: null,
            endPosY: null
        }
    }

    componentDidMount() {
        console.log('-----')
        console.log(this.header.offsetHeight)
        this.setState({
            headerHeight: this.header.offsetHeight
        })
    }

    onScroll = (e) => {
        let element = e.target
        setTimeout(() => {
            const { distanceLoadMore, onLoadMore } = this.props
            let {
                offsetHeight, scrollTop, scrollHeight
            } = element

            if (scrollTop + offsetHeight + distanceLoadMore >= scrollHeight && onLoadMore) {
                onLoadMore()
            }
        }, 100)
    }

    onMoveStart = (e) => {
        this.onDrag = true
        let pos = this.getEventPos(e)

        this.setState({
            beginPosY: pos.y
        })
    }

    onMouseMove = (e) => {
        if(!this.onDrag) {return}
        let pos = this.getEventPos(e)

        this.setState({
            endPosY: pos.y
        })
    }

    onMouseEnd = (e) => {
        this.onDrag = false
        
        this.setState({
            beginPosY: null,
            endPosY: null
        })
    }

    getEventPos(e) {
        e.persist()

        let pos = {}

        if(e.targetTouches) {
            pos.x = e.targetTouches[0].clientX
            pos.y = e.targetTouches[0].clientY
        } else {
            pos.x = e.clientX
            pos.y = e.clientY
        }

        return pos
    }

    getPosY() {
        const {beginPosY, endPosY, headerHeight} = this.state
        const {refershing} = this.props
        console.log('---------')
        console.log(refershing)
        console.log(headerHeight)
        if(refershing) {return headerHeight}
        if(!beginPosY || !endPosY) {return 0}

        let posY = endPosY - beginPosY

        return posY < 0 ? 0 : posY > headerHeight ? headerHeight : posY
    }

    renderLoading() {
        const {
            refershing,
            prefixCls,
            refershControl,
        } = this.props

        const {headerHeight} = this.state

        let posY = this.getPosY()
 console.log(posY)
        if(true) {
            return <div 
                className={`${prefixCls}-loading`} 
                ref={(ref) => {this.header = ref}}
                style={{
                    top: -1 * headerHeight + posY
                }}
                >
                {!!refershControl ? refershControl : '加载中'}
            </div>
        }
    }

    renderFooter() {
        const {
            loading, hasMore, prefixCls
        } = this.props

        if (!hasMore) {
            return (
                <div className={`${prefixCls}-footer`}>
                    <span>没有更多了</span>
                </div>
            )
        }
        if (loading) {
            return (
                <div className={`${prefixCls}-footer`}>
                    <span>loading...</span>
                </div>
            )
        }
    }

    render() {
        const {
            prefixCls, className, children, style, height
        } = this.props

        const cls = classNames({
            [prefixCls]: true,
            [className]: className
        })

        const sty = {
            ...style,
            height
        }

        let posY = this.getPosY()

        return (
            <div
                className={cls}
                style={sty}
                onScroll={this.onScroll}
                onTouchStart={this.onMoveStart}
                onTouchMove={this.onMouseMove}
                onTouchEnd={this.onMouseEnd}
                onMouseDown={this.onMoveStart}
                onMouseMove={this.onMouseMove}
                onMouseUp={this.onMouseEnd}
                >
                {this.renderLoading()}
                <div className={`${prefixCls}-wrap`} ref="wrap">
                    <div className={`${prefixCls}-content`} style={{top: posY}}>
                        {children}
                    </div>
                    { this.renderFooter() }
                </div>
            </div>
        )
    }
}