import React, {Component} from 'react'
import './index.less'

export default class Indicator extends Component {
    static defaultProps = {
        size: 'md',
        color: 'blue',
        text: '',
        style: null,
        loadingStyle: null,
        textStyle: null
    }

    calcuLoadingSizeStyle() {
        const {size} = this.props
        let sizeStyle = {}

        switch(size) {
            case 'sm':
                sizeStyle.width = 18
                sizeStyle.height = 18
                break
            case 'md':
                sizeStyle.width = 24
                sizeStyle.height = 24
                break
            case 'lg':
                sizeStyle.width = 30
                sizeStyle.height = 30
                break
            case 'xl':
                sizeStyle.width = 36
                sizeStyle.height = 36
                break
        }

        return sizeStyle
    }

    render() {
        const {color, text, style, loadingStyle, textStyle} = this.props

        const loadingImageUrl = `loading-${color}.png`

        const loadingSizeStyle = this.calcuLoadingSizeStyle()

        return <div className='indicator' style={style}>
            <img src={require('./imgs/' + loadingImageUrl)} className='indicatorLoading' style={{...loadingSizeStyle, ...loadingStyle}} />
            {!!text && <div className='indicatorText' style={textStyle}>{text}</div>}
        </div>
    }
}