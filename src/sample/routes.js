import React from 'react'
import DemoList from './DemoList'
import Button from './Button'
import Badge from './Badge'
import Dialog from './Dialog'

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
}]

export default routes
