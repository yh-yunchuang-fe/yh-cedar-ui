import React, {PureComponent} from 'react'
import './index.less'

export default class Rate extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            rates: this.buildInitialState()
        }
    }

    buildInitialState() {
        const {count} = this.props
        let rates = []

        for(let i = 0; i < count; i++) {
            rates.push({
                key: 'rate' + i,
                selected: false
            })
        }

        return rates
    }

    changeState(index) {
        const {rates} = this.state
        const {allowClear} = this.props

        let operateRates = rates.slice()
        let originalRate = operateRates[index].selected
        let lastLightStarIndex = (rates.findIndex(rate => !rate.selected) + 5) % 5

        if(index === lastLightStarIndex && originalRate) {return}

        if(!originalRate) {
            for(let i = 0; i <= index; i++) {
                operateRates[i].selected = !originalRate
            }
        } else {
            for(let i = rates.length - 1 ; i > index; i--) {
                operateRates[i].selected = !originalRate
            }
            if(allowClear && index === 0) {
                operateRates[index].selected = !originalRate
            }
        }

        this.setState({
            rates: operateRates
        })
    }

    render() {
        const {rates} = this.state

        return <ul className="rate-container">
            {rates.map((rate, index) => {
                return <li key={rate.key} className="rate-item" style={{width: '16px', height: '16px'}}>
                    <a className="rate-tag" onClick={this.changeState.bind(this, index, rate.key)}>
                        <img 
                            className="rate-img" 
                            src={rate.selected ? require("./imgs/star-active.png") : require("./imgs/star.png")} 
                        />
                    </a>
                </li>
            })}
            
        </ul>
    }
}