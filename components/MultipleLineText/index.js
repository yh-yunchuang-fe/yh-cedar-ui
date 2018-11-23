import React, {PureComponent} from 'react'
import Icon from '../Icon'
import './index.less'

export default class MultipleLineText extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            height: 'auto',
            needMoreBtn: false,
            showEllipsis: true
        }
    }
    componentDidMount() {
        const {textLine = 2} = this.props
        let clientHeight = this.textContainer.clientHeight
        let clientWidth = this.textContainer.clientWidth
        let singleLineHeight = this.testText.clientHeight
        let singleTextWidth = this.testText.clientWidth
        let ellipsisBtnWidth = this.ellipsisBtn.offsetWidth

        let height = singleLineHeight * textLine
        let fontNum = parseInt(clientWidth / singleTextWidth) * textLine
        this.originalText = this.text.innerText.toString()
        let ellipsisFontNum = Math.ceil(ellipsisBtnWidth / singleTextWidth)
        let displayFontNum = fontNum - ellipsisFontNum - 2
        this.displayText = this.originalText.slice(0, displayFontNum) + '...'

        this.text.innerText = this.displayText

        let needMoreBtn = clientHeight > (height + 5)

        this.setState({
            needMoreBtn: needMoreBtn,
            showEllipsis: needMoreBtn,
            height: height,
            offsetHeight: clientHeight
        })
    }

    collapseText() {
        const {height} = this.state
        
        this.setState({
            showEllipsis: true
        })
        setTimeout(() => {
            this.text.innerText = this.displayText
        }, 100)
        this.textContainer.style.height = height + 'px'
    }

    expandText() {
        const {offsetHeight} = this.state

        this.text.innerText = this.originalText
        this.setState({
            showEllipsis: false
        })
        this.textContainer.style.height = offsetHeight + 'px'
    }

    render() {
        const {children, className, style, ellipsiClassName, ellipsisStyle} = this.props
        const {height, needMoreBtn, showEllipsis} = this.state

        return <div 
                className={`ml-text-container ${className || ''}`}
                style={{...style, height: height}}
                ref={(ref) => this.textContainer=ref}
            >
                <span ref={ref => this.text = ref}>{children}</span>
                {needMoreBtn && !showEllipsis && <span 
                    className="ml-ellipsis-btn" 
                    
                    onClick={this.collapseText.bind(this)}
                >
                    <span>收起</span>
                    <Icon 
                        name="chevron-up" 
                        size="xxs" 
                        color="#24A8E8" 
                        style={{marginLeft: 5}}
                    />
                </span>}
            {showEllipsis && <span 
                className={`ml-more-container ${ellipsiClassName || ''}`} 
                ref={ref => this.ellipsisBtn = ref}
                style={ellipsisStyle}
                onClick={this.expandText.bind(this)}
            >
                <a className="ml-ellipsis-btn">
                    <span>更多</span>
                    <Icon 
                        name="chevron-down" 
                        size="xxs" 
                        color="#24A8E8" 
                        style={{marginLeft: 5}}
                    />
                </a>
            </span>}
            <span style={{position: 'absolute' ,zIndex: -1, visibility: 'hidden'}} ref={ref => this.testText = ref}>测</span>
        </div>
    }
}