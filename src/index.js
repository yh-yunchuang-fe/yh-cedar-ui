/**
 * Created by zhangyi on 2017/10/19.
 */
import 'core-js/es6/map'
import 'core-js/es6/set'
import 'core-js/es6/promise'
import React from 'react'
import { render } from 'react-dom'
import { HashRouter } from 'react-router-dom'
import 'normalize.css'
import './assets/css/base.less'
import App from './sample/app'

render(
    <HashRouter>
        <App/>
    </HashRouter>,
    document.getElementById('app')
)
