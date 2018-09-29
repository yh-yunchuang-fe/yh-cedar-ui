/**
 * Created by zhangyi on 2017/10/23.
 */
import React, { Component } from 'react'
import { withRouter, Switch, Route } from 'react-router-dom'
import routes from './routes.js'
import { hot } from 'react-hot-loader'
import './app.less'


class App extends Component {
    constructor (props) {
        super(props)
    }

    renderHeader () {
        let pathname = this.props.location.pathname
        let demoName = pathname.split('/')[1] || ''
        if (demoName) {
            return (
                <div className="demo-header">
                    <h1 onClick={()=>{
                        this.props.history.push('/')
                    }}>Home</h1>
                    <span className="separate">|</span>
                    <h2>{demoName}</h2>
                </div>
            )
        } else {
            return (
                <div className="demo-header">
                    <h1>Home</h1>
                    <span className="separate">|</span>
                    <span>基于React的移动端组件集</span>
                </div>
            )
        }
    }



    render() {
        console.log('routes:', routes)

        return (
            <div className="container">
                { this.renderHeader() }
                <Switch>
                    {
                        routes.map((cur, index) => {
                            return (
                                <Route exact path={cur.path} component={cur.component} key={index}/>
                            )
                        })
                    }
                </Switch>
            </div>
        )
    }
}

export default hot(module)(withRouter(App));//withRouter(Demo)
