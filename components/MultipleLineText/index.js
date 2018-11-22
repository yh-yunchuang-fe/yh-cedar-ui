import React, {PureComponent} from 'react'
import Icon from '../Icon'
import './index.less'

export default class MultipleLineText extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            height: 'auto',
            needMoreBtn: true,
            showEllipsis: false
        }
    }
    componentDidMount() {
        const {line = 2} = this.props
        let offsetHeight = this.text.offsetHeight
        let textLineHeight = this.testTextLine.scrollHeight
        let height = textLineHeight * line

        let needMoreBtn = offsetHeight > (height + 5)

        this.setState({
            needMoreBtn: needMoreBtn,
            showEllipsis: needMoreBtn,
            height: height,
            offsetHeight: offsetHeight
        })
    }

    collapseText() {
        const {height} = this.state
        
        this.setState({
            showEllipsis: true
        })
        this.text.style.height = height + 'px'
    }

    expandText() {
        const {offsetHeight} = this.state
        this.setState({
            showEllipsis: false
        })
        this.text.style.height = offsetHeight + 'px'
    }

    render() {
        const {children, className, style, ellipsiClassName, ellipsisStyle} = this.props
        const {height, needMoreBtn, showEllipsis} = this.state

        return <div 
                className={`ml-text-container ${className || ''}`}
                style={{...style, height: height}}
                ref={(ref) => this.text=ref}
            >
                {children}
                {needMoreBtn && <span className="ml-ellipsis-btn" onClick={this.collapseText.bind(this)}>
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
            <div style={{height: '1px', visibility: 'hidden'}} ref={ref => this.testTextLine = ref}>测试文字</div>
        </div>
    }
}