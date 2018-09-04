import React from 'react'
import DemoList from './DemoList'
import Button from './Button'
import Badge from './Badge'
import Dialog from './Dialog'
import Indicator from './Indicator'
import Modal from './Modal'
import Picker from './Picker'
import PullToRefersh from './PullToRefresh'
import SearchBar from './SearchBar'
import SwipeAction from './SwipeAction'
import Switch from './Switch'



const routes = [{
    path: '/',
    component: DemoList
},{
    path: '/Button',
    component: Button,
    name: 'Button'
},{
    path: '/Badge',
    component: Badge,
    name: 'Badge'
},{
    path: '/Dialog',
    component: Dialog,
    name: 'Dialog'
},{
    path: '/Indicator',
    component: Indicator,
    name: 'Indicator'
},{
    path: '/Modal',
    component: Modal,
    name: 'Modal'
},{
    path: '/Picker',
    component: Picker,
    name: 'Picker'
},{
    path: '/PullToRefersh',
    component: PullToRefersh,
    name: 'PullToRefersh'
},{
    path: '/SearchBar',
    component: SearchBar,
    name: 'SearchBar'
},{
    path: '/SwipeAction',
    component: SwipeAction,
    name: 'SwipeAction'
},{
    path: '/Switch',
    component: Switch,
    name: 'Switch'
}]

export default routes
