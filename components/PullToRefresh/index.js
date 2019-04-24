import React, { Component } from 'react'
import classNames from 'classnames'
import './index.less'
import { Transition } from 'react-transition-group'
import Indicator from '../Indicator'

export default class PullToRefresh extends Component {
    static defaultProps = {
        prefixCls: 'yh-pull-refresh',
        className: '',
        style: null,
        height: '',
        distanceLoadMore: 0.5,
        onRefresh: ()=>{},
        onLoadMore: ()=>{},
        getComponentRef: ()=>{},
        footer: null,
        footerLoading: null,
        loading: false,
        hasMore: true,
        refreshing: false,
        downRefreshText: '下拉刷新',
        refershText: '加载中',
        upRefreshText: '释放更新',
        refershControl: null,
        pullRate: 0.4,
        duration: 800
    }

    constructor(props) {
        super(props)

        this.state = {
            propRefreshing: false, //记录传过来的刷新值
            refreshing: false, //是否在刷新
            headerHeight: 59, //组件头部loading高度, 超过这个高度并且释放手指才会触发刷新
            beginPosY: 0,
            endPosY: 0,
            distance: 0,
            pullingUp: false, //判断是否是手指释放后上拉
            propsLoading: false,
            isLoading: false
        }

        this.scrollNegativeTop = false
    }

    static getDerivedStateFromProps(props, state) {
        let pullingUp = state.endPosY != 0 && !state.endPosY ? true : false

        if(props.refreshing != state.propRefreshing) { //外部组件主动出发刷新状态变更
            if(!props.refreshing) {
                return {
                    ...state, 
                    propRefreshing: props.refreshing, 
                    refreshing: props.refreshing,
                    beginPosY: null,
                    endPosY: null,
                    distance: 0,
                    pullingUp: true
                }
            }
            return {...state, distance: state.headerHeight, propRefreshing: props.refreshing, refreshing: props.refreshing, pullingUp}
        } else {
            if(props.loading != state.propsLoading) {
                return {
                    ...state,
                    propsLoading: props.loading,
                    isLoading: props.loading
                }
            }
            return {...state, pullingUp}
        }

        
    }

    componentDidMount() {
        const {refreshing} = this.props

        this.setState({
            headerHeight: this.header.offsetHeight, //拿到实际的loading高度
            distance: refreshing ? this.header.offsetHeight : 0
        })
    }

    onScroll = (e) => {
        
        let element = e.target
        const { onLoadMore, loading, hasMore, distanceLoadMore} = this.props
        const {refreshing, isLoading} = this.state
        
        if(this.container.scrollTop < 0) {
            if(!this.scrollNegativeTop) {
                this.container.style.setProperty('-webkit-overflow-scrolling', 'auto')
                this.scrollNegativeTop = true
            }
        } else {
            if(this.scrollNegativeTop) {
                this.container.style.setProperty('-webkit-overflow-scrolling', 'touch')
                this.scrollNegativeTop = false
            }
        }
        //在刷新、加载更多、外部明确告知无更多消息时，不触发onloadmore
        if(isLoading || loading || refreshing || !hasMore) {return}
        
        let {
            offsetHeight, scrollTop, scrollHeight
        } = element


        if (scrollTop >= (scrollHeight - offsetHeight) * distanceLoadMore) {
            this.setState({isLoading: true})
            
            onLoadMore && onLoadMore()
            
        }
    }

    onMoveStart = (e) => {
        const {refreshing} = this.state

        if(refreshing || !!this.container.scrollTop) {return}

        this.onDrag = true
        let pos = this.getEventPos(e)

        this.setState({
            beginPosY: pos.y
        })
    }

    onMouseMove = (e) => {
        //不在首页，不触发
        if(!this.onDrag || this.container.scrollTop > 0) {return}

        const {beginPosY, refreshing} = this.state
        const {pullRate} = this.props

        if(refreshing) {return}

        let pos = this.getEventPos(e)

        let distance = pos.y - beginPosY

        if(distance <= 0) {return}

        this.setState({
            endPosY: pos.y,
            distance: distance * pullRate
        })
    }

    onMouseEnd = (e) => {
        if(this.container.scrollTop > 0) {return}
        
        const {onRefresh} = this.props

        this.onDrag = false
        const {beginPosY, endPosY, headerHeight, refreshing} = this.state
        const {pullRate} = this.props

        let distance = endPosY - beginPosY 

        if(refreshing) {return}
        
        if(distance * pullRate >= headerHeight) {
            
            setTimeout(() => {
                this.setState({
                    beginPosY: null, //设置null是为了区分用户释放手指与其他状态
                    endPosY: null,
                    distance: headerHeight,
                    refreshing: true
                })
                onRefresh && onRefresh()
            })
            
            return
        } else {
            this.setState({
                beginPosY: null,
                endPosY: null,
                distance: 0
            })
        }
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

    getRefreshText() {
        const {beginPosY, endPosY, headerHeight, refreshing} = this.state
        const {pullRate, refershText, downRefreshText, upRefreshText} = this.props

        if(refreshing) {return refershText}

        let posY = (endPosY - beginPosY) * pullRate

        if(posY >= headerHeight) {return upRefreshText}

        return downRefreshText
    }

    setContainerRef(ref) {
        const {getComponentRef} = this.props

        this.container = ref

        getComponentRef && getComponentRef(ref)
    }

    renderLoading() {
        const {
            prefixCls,
            refershControl,
            duration
        } = this.props

        const {headerHeight, distance, pullingUp} = this.state

        const transitionStyles = {
            entering: { transition: `0ms cubic-bezier(0.1, 0.57, 0.1, 1)` },
            entered:  { transition: `0ms cubic-bezier(0.1, 0.57, 0.1, 1)` },
            exiting: { transition: `${duration}ms cubic-bezier(0.1, 0.57, 0.1, 1)` },
            exited: { transition: `${duration}ms cubic-bezier(0.1, 0.57, 0.1, 1)` }
        }

        return <Transition
                in={!pullingUp}
                timeout={0}
            >
                {state => <div 
                    className={`${prefixCls}-loading`} 
                    ref={(ref) => {this.header = ref}}
                    style={{
                        ...transitionStyles[state],
                        transform: 'translateY(' + (distance - headerHeight) + 'px' + ')'
                    }}
                    >
                    {!!refershControl ? refershControl : 
                        <Indicator 
                            size='lg'
                            text={this.getRefreshText()}
                            style={{
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                padding: '6px 0'
                            }}
                            textStyle={{
                                fontSize: 12,
                                color: '#333',
                                marginLeft: 0,
                                marginTop: '6px'
                            }} 
                        />}
                </div>}
            
            </Transition>
    }

    renderFooter() {
        const {
            loading, hasMore, prefixCls, footer, footerLoading
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
                    {!!footerLoading ? footerLoading : <span>正在加载...</span>}
                </div>
            )
        }
    }

    render() {
        const {
            prefixCls, className, children, style, height, duration
        } = this.props

        const {distance, pullingUp} = this.state

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

        return (
            <div
                ref={this.setContainerRef.bind(this)}
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
                                transform: 'translateY(' + distance + 'px' +')'
                            }}
                        >
                            {children}
                            { this.renderFooter() }
                        </div>}
                        
                    </Transition>
                </div>
            </div>
        )
    }
}