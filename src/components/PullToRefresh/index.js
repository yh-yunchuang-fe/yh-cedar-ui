import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import './index.less'
import { CSSTransition, Transition } from 'react-transition-group'
import Indicator from '../Indicator'

export default class PullToRefresh extends Component {
    static defaultProps = {
        prefixCls: 'yh-pull-refresh',
        className: '',
        style: null,
        height: '',
        // distanceToRefresh: 100,
        distanceLoadMore: 0.5,
        onRefresh: ()=>{},
        onLoadMore: ()=>{},
        footer: null,
        loading: false,
        hasMore: true,
        refreshing: false,
        refershControl: null,
        pullRate: 0.5,
        duration: 800
    }

    constructor(props) {
        super(props)

        this.state = {
            propRefreshing: false,
            refreshing: false,
            headerHeight: 30,
            beginPosY: 0,
            endPosY: 0,
            pullingUp: false
        }

        this.count = 0
    }

    static getDerivedStateFromProps(props, state) {
        let pullingUp = state.endPosY != 0 && !state.endPosY ? true : false

        if(props.refreshing != state.propRefreshing) {
            if(!props.refreshing) {
                return {
                    ...state, 
                    propRefreshing: props.refreshing, 
                    refreshing: props.refreshing,
                    beginPosY: null,
                    endPosY: null,
                    pullingUp: true
                }
            }
            
            return {...state, propRefreshing: props.refreshing, refreshing: props.refreshing, pullingUp}
        } else {
            return {...state, pullingUp}
        }
    }

    componentDidMount() {
        this.setState({
            headerHeight: this.header.offsetHeight
        })
    }

    onScroll = (e) => {
        let element = e.target
        const { onLoadMore, loading, distanceLoadMore} = this.props
        const {refreshing} = this.state

        if(loading || refreshing) {return}

        let {
            offsetHeight, scrollTop, scrollHeight
        } = element

        if (scrollTop + offsetHeight >= scrollHeight * distanceLoadMore) {
            onLoadMore && onLoadMore()
        }
    }

    onMoveStart = (e) => {
        const {refreshing} = this.state

        if(refreshing || !!this.refs.container.scrollTop) {return}

        this.onDrag = true
        let pos = this.getEventPos(e)

        this.setState({
            beginPosY: pos.y
        })
    }

    onMouseMove = (e) => {
        if(!this.onDrag || !!this.refs.container.scrollTop) {return}

        const {beginPosY, headerHeight, refreshing} = this.state
        const {onRefresh, pullRate} = this.props

        if(refreshing) {return}

        let pos = this.getEventPos(e)

        let distance = pos.y - beginPosY

        if(distance <= 0) {return}

        this.setState({
            endPosY: pos.y
        })

        if(pullRate * distance >= headerHeight) {
            onRefresh && onRefresh()
            this.setState({refreshing: true})
        }
    }

    onMouseEnd = (e) => {
        if(!!this.refs.container.scrollTop) {return}

        this.onDrag = false
        const {beginPosY, endPosY, headerHeight, refreshing} = this.state
        const {pullRate} = this.props

        let distance = endPosY - beginPosY

        if(refreshing) {return}

        if(distance * pullRate >= headerHeight) {
            return
        }
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
        const {beginPosY, endPosY, headerHeight, refreshing} = this.state
        const {pullRate} = this.props

        if(refreshing) {return headerHeight}
        if(!beginPosY || !endPosY) {return 0}

        let posY = (endPosY - beginPosY) * pullRate
        posY = posY < 0 ? 0 : posY > headerHeight ? headerHeight : posY
        
        return posY
    }

    renderLoading() {
        const {
            prefixCls,
            refershControl,
            duration
        } = this.props

        const {headerHeight, refreshing, pullingUp} = this.state

        let posY = this.getPosY()

        const transitionStyles = {
            entering: { transition: `0ms cubic-bezier(0.1, 0.57, 0.1, 1)` },
            entered:  { transition: `0ms cubic-bezier(0.1, 0.57, 0.1, 1)` },
            exiting: { transition: `${duration}ms cubic-bezier(0.1, 0.57, 0.1, 1)` },
            exited: { transition: `${duration}ms cubic-bezier(0.1, 0.57, 0.1, 1)` }
        }

        if(true) {
            return <Transition
                in={!pullingUp}
                timeout={0}
            >
                {state => <div 
                    className={`${prefixCls}-loading`} 
                    ref={(ref) => {this.header = ref}}
                    style={{
                        ...transitionStyles[state],
                        transform: 'translateY(' + (-1 * headerHeight + posY) + 'px' + ')'
                    }}
                    >
                    {!!refershControl ? refershControl : <Indicator text='正在加载' />}
                </div>}
            
            </Transition>
        }
    }

    renderFooter() {
        const {
            loading, hasMore, prefixCls, footer
        } = this.props

        if (!hasMore) {
            return (
                <div className={`${prefixCls}-footer`}>
                    {!!footer ? footer : <span>没有更多了</span>}
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
            prefixCls, className, children, style, height, duration
        } = this.props

        const {pullingUp} = this.state

        const cls = classNames({
            [prefixCls]: true,
            [className]: className
        })

        const sty = {
            ...style,
            height
        }

        const transitionStyles = {
            entering: { transition: `0ms cubic-bezier(0.1, 0.57, 0.1, 1)` },
            entered:  { transition: `0ms cubic-bezier(0.1, 0.57, 0.1, 1)` },
            exiting: { transition: `${duration}ms cubic-bezier(0.1, 0.57, 0.1, 1)` },
            exited: { transition: `${duration}ms cubic-bezier(0.1, 0.57, 0.1, 1)` }
        }

        let posY = this.getPosY()

        return (
            <div
                ref="container"
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
                    <Transition
                        in={!pullingUp}
                        timeout={0}
                    >
                        {state => <div 
                            className={`${prefixCls}-content`} 
                            style={{
                                ...transitionStyles[state],
                                transform: 'translateY(' + posY + 'px' +')'
                            }}
                        >
                            {children}
                        </div>}
                        
                    </Transition>
                    
                    { this.renderFooter() }
                </div>
            </div>
        )
    }
}