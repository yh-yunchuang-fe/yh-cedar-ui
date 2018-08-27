/**
 * Created by zhangyi on 2017/11/8.
 */
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import routes from '../routes.js'
import './index.less'

export default class DemoList extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <ul className="demo-list">
                {
                    routes.map((cur, index) => {
                        if (cur.path != '/') {
                            return (
                                <li className="list-item" key={index}>
                                    <Link to={`${cur.path}`}>
                                        { cur.name }
                                    </Link>
                                </li>
                            )
                        }
                    })
                }
            </ul>
        )
    }
}
