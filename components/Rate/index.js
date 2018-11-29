import React, {PureComponent} from 'react'
import './index.less'

export default class Rate extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            rates: this.buildInitialState(),
            beginClear: false
        }
    }

    buildInitialState() {
        const {count = 5, value} = this.props
        let rates = []

        for(let i = 0; i < count; i++) {
            rates.push({
                key: 'rate' + i,
                selected: i < Number(value) ? true : false
            })
        }

        return rates
    }

    changeState(index) {
        const {rates, beginClear} = this.state
        const {allowClear, onChange, disabled} = this.props

        if(disabled) {return}

        let operateRates = rates.slice()
        let originalRate = operateRates[index].selected
        let lastLightStarIndex = rates.findIndex(rate => !rate.selected) - 1
        lastLightStarIndex = lastLightStarIndex < 0 ? rates.length - 1 : lastLightStarIndex

        if(!(allowClear && index === 0) && index === lastLightStarIndex && originalRate) {return}

        if(!originalRate) {
            for(let i = 0; i <= index; i++) {
                operateRates[i].selected = !originalRate
            }
        } else {
            for(let i = rates.length - 1 ; i > index; i--) {
                operateRates[i].selected = !originalRate
            }
            if(allowClear && index === 0) {
                if(beginClear) {
                    operateRates[index].selected = !originalRate
                    this.setState({
                        beginClear: false
                    })
                } else {
                    this.setState({
                        beginClear: true
                    })
                }
            }
        }

        this.setState({
            rates: operateRates
        })

        let finalResult = allowClear && index === 0 && beginClear ? index : index + 1

        onChange && onChange(finalResult)
    }

    render() {
        const {rates} = this.state
        const {disabled, className, style = {}} = this.props

        return <ul className={`rate-container ${className || ''}`} style={{...style, cursor: disabled ? 'not-allowed' : 'default'}}>
            {rates.map((rate, index) => {
                return <li key={rate.key} className="rate-item" style={{width: '16px', height: '16px'}}>
                    <a className="rate-tag" onClick={this.changeState.bind(this, index, rate.key)}>
                        <img 
                            className="rate-img" 
                            src={rate.selected ? require("./imgs/star-active@2x.png") : require("./imgs/star@2x.png")} 
                        />
                    </a>
                </li>
            })}
            
        </ul>
    }
}