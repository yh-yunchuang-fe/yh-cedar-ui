import React, {PureComponent} from 'react'
import Icon from '../Icon'
import './index.less'

export default class MultipleLineText extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            needMoreBtn: false,
            showEllipsis: false
        }
    }
    componentDidMount() {
        let scrollHeight = this.text.scrollHeight
        let offsetHeight = this.text.offsetHeight

        let needMoreBtn = scrollHeight > (offsetHeight + 5)

        this.setState({
            needMoreBtn: needMoreBtn,
            showEllipsis: needMoreBtn,
            scrollHeight: scrollHeight
        })
    }

    collapseText() {
        const {height} = this.props
        
        this.setState({
            showEllipsis: true
        })
        this.text.style.height = height + 'px'
    }

    expandText(e) {
        console.log(e)
        const {scrollHeight} = this.state
        this.setState({
            showEllipsis: false
        })
        this.text.style.height = scrollHeight + 'px'
    }

    render() {
        const {children, height, className, style, ellipsiClassName, ellipsisStyle} = this.props
        const {needMoreBtn, showEllipsis} = this.state

        return <div 
                className={`ml-text-container ${className || ''}`}
                style={{...style, height: height}}
                ref={(ref) => this.text=ref}
            >
                {children}
                {needMoreBtn && !showEllipsis && <span className="ml-ellipsis-btn" onClick={this.collapseText.bind(this)}>
                    <span>收起</span>
                    <Icon 
                        name="chevron-up" 
                        size="xxs" 
                        color="#24A8E8" 
                        style={{marginLeft: 5}}
                    />
                </span>}
            {showEllipsis && <div 
                className={`ml-more-container ${ellipsiClassName || ''}`} 
                style={ellipsisStyle}
                onClick={this.expandText.bind(this)}
            >
                <span className="ml-ellipsis">...</span>
                <a className="ml-ellipsis-btn">
                    <span>更多</span>
                    <Icon 
                        name="chevron-down" 
                        size="xxs" 
                        color="#24A8E8" 
                        style={{marginLeft: 5}}
                    />
                </a>
            </div>}
        </div>
    }
}