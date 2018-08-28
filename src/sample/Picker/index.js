/**
 * Created by zhangyi on 2017/11/1.
 */
import React, { Component } from 'react'
import { Picker, DatePicker } from '../../components'
import './index.less'

export default class SearchDemo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            // value: ['HBS', '003']
            visible: false,
            dateVisible: false,
            dateValue: '2008-06-01',
            value: null,
            okValue: null,
            options: [[
                {
                    label: '安徽省',
                    value: 'AHS'
                },
                {
                    label: '湖北省',
                    value: 'HBS'
                },
                {
                    label: '山东省',
                    value: 'SDS'
                },
                {
                    label: '河南省',
                    value: 'HNS'
                },
                {
                    label: '湖南省',
                    value: 'HUNANS'
                },
                // {
                //     label: '广东省',
                //     value: 'GDS'
                // }
            ], ['001', '002', '003', '004', '005', '006', '007', '008', '009', '010']]
        }
    }

    fixedBody() {
        this.scrollTop = this.getScrollTop();
        // 使body脱离文档流
        document.body.classList.add('dialog-open');

        // 把脱离文档流的body拉上去！否则页面会回到顶部！
        document.body.style.top = -this.scrollTop + 'px';
    }

    staticBody() {
        // 滚回到老地方
        document.body.classList.remove('dialog-open')
        this.to(this.scrollTop)
    }

    to(scrollTop){
        document.body.scrollTop = document.documentElement.scrollTop = scrollTop;
    }

    getScrollTop(){
        return document.body.scrollTop || document.documentElement.scrollTop;
    }

    render() {
        // let newMoment = moment
        // console.log(newMoment())
        // console.log('moment:', moment("20120901", "YYYYMMDD").fromNow())

        const { value, visible, options, okValue, dateValue, dateVisible } = this.state

        return (
            <div style={{height: 1000}}>
                <div
                    className="selection"
                    onClick={() => {
                        this.setState({
                            visible: true
                        })
                        this.fixedBody()

                    }}>
                    { okValue ? JSON.stringify(okValue) : '请选择' }
                </div>

                <div
                    style={{marginTop: 10}}
                    className="selection"
                    onClick={() => {
                        this.setState({
                            dateVisible: true
                        })
                        this.fixedBody()

                    }}>
                    { dateValue ? JSON.stringify(dateValue) : '请选择日期' }
                </div>
                <Picker
                    visible={visible}
                    onClose={()=>{
                        this.setState({
                            visible: false
                        })
                        this.staticBody()
                    }}
                    options={options}
                    value={value}
                    onChange={(value) => {
                        console.log('onChange:', value)
                        this.setState({
                            value
                        })
                    }}
                    onOk={(value)=>{
                        console.log('onOk')

                        this.setState({
                            okValue: value
                        })
                    }}
                    onDismiss={()=>{
                        console.log('onDismiss')
                    }}/>

                <DatePicker
                    visible={dateVisible}
                    onClose={()=>{
                        this.setState({
                            dateVisible: false
                        })
                        this.staticBody()
                    }}
                    defaultValue={dateValue}
                    onChange={(value) => {
                        console.log('onChange:', value)
                        this.setState({
                            dateValue: value
                        })
                    }}
                    />
            </div>
        )
    }
}
