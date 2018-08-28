/**
 * Created by zhangyi on 2017/10/25.
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
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

// el.matches 是否包含某个classname
function closest(el, selector) {
    const matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;

    while (el) {
        if (matchesSelector.call(el, selector)) {
            return el;
        } else {
            el = el.parentElement;
        }
    }
    return null;
}

export default class SwipeAction extends Component {
    constructor(props) {
        super(props)
        this.content = null
        this.left = null
        this.right = null

        this.btnsLeftWidth = 0
        this.btnsRightWidth = 0
        this.openedLeft = false
        this.openedRight = false

        this.swiping = false

        this.startPoint = {}
        this.endPoint = {}

        this.state = {
            swiping: false  // 开始滑动，修改content的样式
        }
    }

    static defaultProps = {
        prefixCls: 'yh-swipe',
        left: [],
        right: [],
        autoClose: false,
        onOpen: ()=>{},
        onClose: ()=>{},
    }

    static propTypes = {
        prefixCls: PropTypes.string,
        left: PropTypes.array,
        right: PropTypes.array,
        autoClose: PropTypes.bool,
        onOpen: PropTypes.func,
        onClose: PropTypes.func,
    }

    componentDidMount () {
        this.btnsLeftWidth = this.left ? this.left.offsetWidth : 0
        this.btnsRightWidth = this.right ? this.right.offsetWidth : 0
        document.body.addEventListener('touchstart', this.onCloseSwipe, true);
    }

    componentWillUnmount () {
        document.body.removeEventListener('touchstart', this.onCloseSwipe, true);
    }

    onCloseSwipe = (ev) => {
        const pNode = closest(ev.target, `.${this.props.prefixCls}-actions`);
        if (!pNode) {
            // ev.preventDefault(); // TODO 注意除chrome外的浏览器不阻止默认事件是否有问题
            this.close();
        }
    }

    onTouchStart = (e) => {
        if (e.touches && e.touches.length > 1) {
            return;
        }

        this.swiping = true

        this.startPoint = getGesturePointFromEvent(e)
    }

    onTouchMove = (e) => {
        if (!this.swiping) {
            return;
        }
        this.endPoint = getGesturePointFromEvent(e)
        const {direction, moveX} = this.getMoveStatus()
        const { left, right } = this.props
        // 显示方向和滑动方向是相反的
        this.needShowRight = direction === 'left' && right && right.length > 0
        this.needShowLeft = direction === 'right' && left && left.length > 0

        // 如果只触发了touchStart 关闭时也要有动画
        // 开始滑动时 transition需要设置为none, 只触发touchStart时不能设置transition
        if (direction !== 'none') {
            this.setState({ swiping: true })
        }

        this.setStyle(moveX)
    }

    // touchEnd 获取不到 e.targetTouches
    onTouchEnd = () => {
        if (!this.swiping) {
            return;
        }
        let moveX = this.endPoint.x - this.startPoint.x

        const needOpenRight = this.needShowRight && Math.abs(moveX) > this.btnsRightWidth / 2
        const needOpenLeft = this.needShowLeft && Math.abs(moveX) > this.btnsLeftWidth / 2

        if (needOpenRight) {
            this.openRight()
        } else if (needOpenLeft) {
            this.openLeft()
        } else {
            this.close()
        }

        this.setState({ swiping: false })
        this.swiping = false
        this.needShowRight = false
        this.needShowLeft = false
    }

    // 设置 translate3d
    setStyle = (value) => {
        window.requestAnimationFrame(() => {
            const limit = value > 0 ? this.btnsLeftWidth : -this.btnsRightWidth;
            const translateLeft = Math.abs(value) > Math.abs(limit) ? limit : value;
            const transform = `translate3d(${translateLeft}px, 0px, 0px)`;
            this.content.style.transform = transform;
        })
    }

    openRight = () => {
        this.open(-this.btnsRightWidth, false, true)
    }

    openLeft = () => {
        this.open(this.btnsLeftWidth)
    }

    open = (value, openedLeft, openedRight) => {
        if (!this.openLeft && !this.openedRight && this.props.onOpen) {
            this.props.onOpen()
        }

        this.openedLeft = openedLeft
        this.openedRight = openedRight
        this.setStyle(value)
    }

    close = () => {
        if ((this.openedLeft || this.openedRight) && this.props.onClose) {
            this.props.onClose();
        }
        this.setStyle(0)
        this.openedLeft = false;
        this.openedRight = false;
    }

    /**
     * 返回移动方向和移动距离
     * @returns {{direction: string, moveX: number}}
     */
    getMoveStatus = () => {
        const { startPoint, endPoint } = this
        let moveX = endPoint.x - startPoint.x
        let direction = 'none'

        if (moveX > 0) {
            direction = 'right'
        } else if (moveX < 0) {
            direction = 'left'
        }

        return {
            direction,
            moveX
        }
    }

    onBtnClick (e, btn) {
        if (btn.onPress) {
            btn.onPress(e)
        }
        if (this.props.autoClose) {
            this.close()
        }
    }


    renderBtns (btns, ref) {
        const { prefixCls } = this.props
        if (btns && btns.length > 0) {
            return (
                <div
                    className={`${prefixCls}-actions ${prefixCls}-actions-${ref}`}
                    ref={(el) => this[ref] = el}
                >
                    {
                        btns.map((btn, i)=>(
                            <div
                                key={i}
                                className={`${prefixCls}-btn`}
                                style={btn.style}
                                role="button"
                                onClick={(e) => this.onBtnClick(e, btn)}>
                                <span className={`${prefixCls}-btn-text`}>{btn.text || 'Click'}</span>
                            </div>
                        ))
                    }
                </div>
            )
        }
    }

    render() {
        const {
            children, left, right, prefixCls
        } = this.props

        const cls = classNames({
            'yh-swipe': true,
            [`${prefixCls}-swiping`]: this.state.swiping
        })

        return (
            <div className={cls}>
                { this.renderBtns(left, 'left') }
                { this.renderBtns(right, 'right') }

                <div
                    ref={(el)=>{this.content = el}}
                    className="yh-swipe-content"
                    onTouchStart={this.onTouchStart}
                    onTouchMove={this.onTouchMove}
                    onTouchEnd={this.onTouchEnd}
                    onTouchCancel={this.onTouchCancel}
                    >
                    {children}
                </div>
            </div>
        )
    }
}