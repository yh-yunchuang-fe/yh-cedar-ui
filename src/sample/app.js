/**
 * Created by zhangyi on 2017/10/23.
 */
import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import demoRoutes from './routes.js'
import './app.less'

class Demo extends Component {
    constructor (props) {
        super(props)
    }

    renderHeader () {
        let pathname = this.props.location.pathname
        let demoName = pathname.split('/')[2] || ''
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
        const { match } = this.props
        console.log('match:', match)
        console.log('demoRoutes:', demoRoutes)
        const routeNode = (
            <Switch>
                {
                    demoRoutes.map((cur, index) => {
                        if (cur.path !== '/') {
                            return (
                                <Route path={`${match.path}${cur.path}`} component={cur.component} key={index}/>
                            )
                        } else {
                            return (
                                <Route exact path={`${match.path}${cur.path}`} component={cur.component} key={index}/>
                            )
                        }
                    })
                }
            </Switch>
        )

        return (
            <div>
                { this.renderHeader() }
                { routeNode }
            </div>
        )
    }
}

export default withRouter(Demo)
