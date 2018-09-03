import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import './index.less'
import { CSSTransition } from 'react-transition-group'

export default class PullToRefresh extends Component {
    static defaultProps = {
        prefixCls: 'yh-pull-refresh',
        className: '',
        style: null,
        height: '',
        distanceToRefresh: 100,
        distanceLoadMore: 0.5,
        onRefresh: ()=>{},
        onLoadMore: ()=>{},
        footer: null,
        loading: false,
        hasMore: true,
        refreshing: false,
        refershControl: null,
        pullRate: 0.5
    }

    constructor(props) {
        super(props)

        this.state = {
            propRefreshing: true,
            refreshing: false,
            headerHeight: 30,
            beginPosY: null,
            endPosY: null
        }
    }

    static getDerivedStateFromProps(props, state) {
        if(props.refreshing != state.propRefreshing) {
            if(!props.refreshing) {
                return {
                    ...state, 
                    propRefreshing: props.refreshing, 
                    refreshing: props.refreshing,
                    beginPosY: null,
                    endPosY: null
                }
            }
            
            return {...state, propRefreshing: props.refreshing, refreshing: props.refreshing}
        } else {
            return state
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
        
        if (scrollTop + offsetHeight + distanceLoadMore >= scrollHeight) {
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
        } = this.props

        const {headerHeight, refreshing} = this.state

        let posY = this.getPosY()

        if(true) {
            return <CSSTransition
                in={refreshing}
                timeout={50}
                classNames='fade-element'
            >
            <div 
                className={`${prefixCls}-loading ${!refreshing ? '' : 'transtion-out'}`} 
                ref={(ref) => {this.header = ref}}
                style={{
                    transform: 'translateY(' + (-1 * headerHeight + posY) + 'px' + ')'
                }}
                >
                {!!refershControl ? refershControl : '加载中'}
            </div>
            </CSSTransition>
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

        const {refreshing} = this.state

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
                    <CSSTransition
                        in={refreshing}
                        timeout={50}
                        classNames='fade-element'
                    >
                        <div 
                            className={`${prefixCls}-content`} 
                            style={{
                                transform: 'translateY(' + posY + 'px' +')'
                            }}
                        >
                            {children}
                        </div>
                    </CSSTransition>
                    
                    { this.renderFooter() }
                </div>
            </div>
        )
    }
}