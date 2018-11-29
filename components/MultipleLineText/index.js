import React, {PureComponent} from 'react'
import Icon from '../Icon'
import './index.less'

export default class MultipleLineText extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            height: 'auto',
            needMoreBtn: false,
            showEllipsis: true,
            clientHeight: 'auto'
        }
    }

    componentDidMount() {

        this.init()

        window.onresize = () => {
            clearTimeout(this.initTimer)
            this.initTimer = setTimeout(() => {
                this.init()
            }, 500)
        }
    }

    init() {
        const {textLine = 2} = this.props

        let clientHeight = this.realText.clientHeight
        let singleLineHeight = this.testText.clientHeight
        let height = singleLineHeight * textLine

        let needMoreBtn = clientHeight > (height + 5)

        this.setState({
            needMoreBtn: needMoreBtn,
            showEllipsis: needMoreBtn,
        })

        if(needMoreBtn) {
            let clientWidth = this.realText.clientWidth
            let singleTextWidth = this.testText.clientWidth
            let ellipsisBtnWidth = this.ellipsisBtn.offsetWidth

            let fontNum = parseInt(clientWidth / singleTextWidth) * textLine
            this.originalText = this.originalText || this.text.innerText.toString()
            let ellipsisFontNum = Math.ceil(ellipsisBtnWidth / singleTextWidth)
            let displayFontNum = fontNum - ellipsisFontNum - 2
            this.displayText = this.originalText.slice(0, displayFontNum) + '...'
            this.text.innerText = this.displayText
        } else {
            this.originalText = this.originalText || this.text.innerText.toString()
            this.displayText = this.originalText
            this.text.innerText = this.displayText
        }

        this.setState({
            height: height,
            clientHeight: clientHeight
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
        const {clientHeight} = this.state

        this.text.innerText = this.originalText
        this.setState({
            showEllipsis: false
        })
        this.textContainer.style.height = clientHeight + 'px'
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
                <span 
                    style={{position: 'absolute' ,zIndex: -9, left: 0, top: 0, visibility: 'hidden'}}
                    ref={ref => this.realText=ref}
                >
                    {children}
                    <a className="ml-ellipsis-btn">
                        <span>收起</span>
                        <Icon 
                            name="chevron-up" 
                            size="xxs" 
                            color="#24A8E8" 
                            style={{marginLeft: 5}}
                        />
                    </a>
                </span>
                {needMoreBtn && !showEllipsis && <a 
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
                </a>}
            {showEllipsis && <span 
                className={`ml-more-container ${ellipsiClassName || ''}`} 
                ref={ref => this.ellipsisBtn = ref}
                style={ellipsisStyle}
            >
                <a className="ml-ellipsis-btn" onClick={this.expandText.bind(this)}>
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