import React from 'react'
import DemoList from './DemoList'
import Button from './Button'
import Badge from './Badge'
import Dialog from './Dialog'
import Modal from './Modal'
import Picker from './Picker'
import Icon from "./Icon"
import Indicator from './Indicator'
import Checkbox from './Checkbox'
import PullToRefersh from './PullToRefresh'
import SearchBar from './SearchBar'
import SwipeAction from './SwipeAction'
import Switch from './Switch'
import TabBar from './TabBar'
import Tag from './Tag'
import Toast from './Toast'

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
    path: '/Checkbox',
    component: Checkbox,
    name: 'Checkbox'
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
    path: '/Icon',
    component: Icon,
    name: 'Icon'
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
},{
    path: '/Tag',
    component: Tag,
    name: 'Tag'
},{
    path: '/TabBar',
    component: TabBar,
    name: 'TabBar'
},{
    path: '/Toast',
    component: Toast,
    name: 'Toast'
}]

export default routes
