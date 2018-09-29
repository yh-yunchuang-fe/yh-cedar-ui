import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
// import TransitionGroup from 'react-transition-group/TransitionGroup'
import {
    getChildrenFromProps,
    toArrayChildren
} from './utils'
import './index.less'

export default class Animation extends Component {
    constructor(props) {
        super(props)
    }

    static propTypes = {
        children: PropTypes.any,
        component: PropTypes.any,
        transitionName: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.object
        ]),
        transitionEnter: PropTypes.bool,
        transitionAppear: PropTypes.bool,
        transitionLeave: PropTypes.bool,
        transitionEnterTimeout: PropTypes.number,
        transitionAppearTimeout: PropTypes.number,
        transitionLeaveTimeout: PropTypes.number
    }

    static defaultProps = {
        component: 'span',
        transitionName: 'yh-zoom',
        transitionEnter: true,
        transitionAppear: true,
        transitionLeave: true,
        transitionEnterTimeout: 200,
        transitionAppearTimeout: 200,
        transitionLeaveTimeout: 200
    }

    /**
     * 动画的生命周期
     */
    componentWillAppear () {
        console.log('componentWillAppear')
    }

    componentDidAppear () {}

    // componentWillEnter () {}
    //
    // componentDidEnter () {
    //     console.log('componentDidEnter')
    // }

    componentWillLeave () {
        console.log('componentWillLeave')
    }

    componentDidLeave () {
        console.log('componentDidLeave')
    }


    render() {
        let {
            children,
            ...other
        } = this.props
        let newChildren = toArrayChildren(getChildrenFromProps(children))
        let node = newChildren.map((child) => {
            if (child === null || child === undefined) {
                return child
            }
            if (!child.key) {
                throw new Error('must set key for <animation> children');
            }
            return child
        })
        return (
            <ReactCSSTransitionGroup {...other}>
                {node}
            </ReactCSSTransitionGroup>
        )
    }
}
