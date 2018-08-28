/**
 * Created by zhangyi on 2017/10/25.
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import './index.less'

function noop () {}

export default class SearchBar extends Component {
    constructor(props) {
        super(props)
        this.scrollIntoViewTimeout = null
        this.firstFocus = false
        const value = this.props.defaultValue || ''
        this.state = {
            value,
            focus: false
        }
    }

    static defaultProps = {
        prefixCls: 'yh-search',
        fixed: false,
        placeholder: 'Search',
        autoFocus: false,
        showCancel: true,
        cancelText: '取消',
        cancelColor: '',
        defaultValue: '',
        className: '',
        onSubmit: noop,
        onChange: noop,
        onFocus: noop,
        onBlur: noop,
        onCancel: noop,
        onClear: noop,
        // showCancelButton: true
    }

    static propTypes = {
        prefixCls: PropTypes.string,
        fixed: PropTypes.bool,
        placeholder: PropTypes.string,
        showCancel: PropTypes.bool,
        cancelText: PropTypes.string,
        cancelColor: PropTypes.string,
        defaultValue: PropTypes.string,
        className: PropTypes.string,
        onSubmit: PropTypes.func,
        onChange: PropTypes.func,
        onFocus: PropTypes.func,
        onBlur: PropTypes.func,
        onCancel: PropTypes.func,
        onClear: PropTypes.func,
        // showCancelButton: PropTypes.bool
    }

    componentDidMount () {
        this.componentDidUpdate()
        if (this.props.autoFocus) {
            this.refs.searchInput.focus()
            this.refs.searchInput.addEventListener('click', () =>{
                this.refs.searchInput.focus()
            })
            // setTimeout(()=>{
                // this.refs.searchInput.focus()
            // }, 0)
        }
    }

    componentDidUpdate () {
        if (this.props.showCancel) {
            const cancelSty = window.getComputedStyle(this.refs.cancelBtn)
            const cancelBtnMarginLeft = cancelSty['margin-left']
            if (!this.state.focus) {
                let left = -this.refs.cancelBtn.offsetWidth + parseInt(cancelBtnMarginLeft, 10)
                this.refs.cancelBtn.style.marginRight = left + 'px';
            } else {
                this.refs.cancelBtn.style.marginRight = 0
            }
        }
    }

    componentWillUnmount () {
        if (this.scrollIntoViewTimeout) {
            clearTimeout(this.scrollIntoViewTimeout)
            this.scrollIntoViewTimeout = null
        }
    }

    onSubmit = (e) => {
        e.preventDefault()
        if(this.props.onSubmit) {
            this.props.onSubmit(this.state.value)
        }
        this.refs.searchInput.blur()
    }

    onChange = (e) => {
        e.preventDefault()
        if (!this.state.focus) {
            this.setState({
                focus: true
            })
        }
        let value = e.target.value
        this.setState({ value })
        if (this.props.onChange) {
            this.props.onChange(value)
        }
    }

    onFocus = (e) => {
        this.setState({
            focus: true
        })
        this.firstFocus = true
        if (this.props.onFocus) {
            this.props.onFocus()
        }

        // 如果不在可视区域就滚动到可视区域
        if (document.activeElement.tagName.toLowerCase() === 'input') {
            this.scrollIntoViewTimeout = setTimeout(() => {
                try{
                    document.activeElement.scrollIntoViewIfNeeded()
                }catch(e){}
            }, 100)
        }
    }

    onBlur = () => {
        // setTimeout(() => {
        //     this.setState({
        //         focus: false
        //     })
        // }, 0)
        if (this.props.onBlur) {
            this.props.onBlur(this.state.value)
        }
    }

    onClear = (e) => {
        e.preventDefault()
        this.setState({
            value: ''
        })

        if (this.props.onClear) {
            this.props.onClear('');
        }
        if (this.props.onChange) {
            this.props.onChange('');
        }
        setTimeout(()=>{
            this.refs.searchInput.focus()
        }, 0)
    }

    onCancel = () => {
        if (this.props.onCancel) {
            this.props.onCancel(this.state.value)
        } else {
            this.onClear()
        }
        this.refs.searchInput.blur()
    }



    render() {
        const {
            fixed,
            prefixCls, placeholder, cancelText, className, showCancel, cancelColor
        } = this.props

        const { value, focus } = this.state

        const wrapCls = classNames({
            'yh-search-wrap': true,
        })

        const contentCls = classNames({
            'yh-search': true,
            'yh-search-fixed': fixed,
            [className]: className
        })

        const inputCls = classNames({
            'show-close': focus && value && value.length > 0
        })

        const clearCls = classNames({
            'icon': true,
            'yhicon-delete-circle': true,
            [`${prefixCls}-close-show`]: focus && value && value.length > 0
        })

        const cancelCls = classNames({
            [`${prefixCls}-cancel`]: true,
            [`${prefixCls}-cancel-show`]: focus,
            [`${prefixCls}-cancel-anim`]: this.firstFocus,
        })

        return (
            <div className={wrapCls}>
                <form action="#" className={contentCls} onSubmit={this.onSubmit}>
                    <div className="yh-search-input">
                        <i className="icon yhicon-search"/>
                        <input
                            value={value}
                            type="search"
                            ref="searchInput"
                            placeholder={placeholder}
                            className={inputCls}
                            onChange={this.onChange}
                            onFocus={this.onFocus}
                            onBlur={this.onBlur}
                        />
                        <a className={clearCls} onClick={this.onClear}/>
                    </div>
                    {
                        showCancel &&
                        <a
                            ref="cancelBtn"
                            style={{color: cancelColor}}
                            className={cancelCls}
                            onClick={this.onCancel}>
                            {cancelText}
                        </a>
                    }

                </form>
            </div>
        )
    }
}