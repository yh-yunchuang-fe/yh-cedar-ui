import React from 'react'
import DemoList from './DemoList'
import Button from './Button'
import Badge from './Badge'
import Dialog from './Dialog'
import Modal from './Modal'
import Picker from './Picker'
import SearchBar from './SearchBar'
import SwipeAction from './SwipeAction'
import Switch from './Switch'
import Tag from './Tag'


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
    path: '/Modal',
    component: Modal,
    name: 'Modal'
},{
    path: '/Picker',
    component: Picker,
    name: 'Picker'
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
},{
    path: '/Tag',
    component: Tag,
    name: 'Tag'
}]

export default routes
