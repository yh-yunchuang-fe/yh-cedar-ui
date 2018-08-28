import React, { Component } from 'react'
import { Switch } from '../../components'

export default class SwitchDemo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            firstChecked: false,
        }
    }

    render() {
        return (
            <div>
                <Switch
                    checked={this.state.firstChecked}
                    onChange={(checked)=>{
                        console.log('onChange checked:', checked)
                        this.setState({
                            firstChecked: checked
                        })
                    }}
                    onClick={(checked)=>{
                        console.log('onClick checked:', checked)
                    }}
                />
                <br/>
                <Switch
                    checked={true}
                    disabled={true}
                />
                <br/>
                <Switch
                    checked={false}
                    disabled={true}
                />
            </div>
        )
    }
}
