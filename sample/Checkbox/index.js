import React, { Component } from 'react'
import { Checkbox, Icon } from '../../components'

export default class CheckboxDemo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            checkedStyle: {},
            baiduStyle: {},
            singleValue: '',
            value: 1,
        };
    }

    render () {
        const CheckIcon = ({ checked }) => {
            const name = checked ? 'radio-on' : 'radio-off';
            return (
                <div style={{marginRight: '10px'}}>
                    <Icon name={name} color="red" />
                </div>
            );
        };

        return (
            <div style={{padding: '0 10px', flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <div style={{ padding: '10px 0', alignItems: 'center', justifyContent: 'center'}}>
                    <Checkbox
                        checked={this.state.value === 1}
                        onChange={() => {
                            this.setState({
                                value: 1,
                            });
                        }}
                    >
                        选项一
                    </Checkbox>
                    <Checkbox
                        checked={this.state.value === 2}
                        style={{
                            margin: '5px 0'
                        }}
                        onChange={() => {
                            this.setState({
                                value: 2,
                            });
                        }}
                    >
                        选项二
                    </Checkbox>
                    <Checkbox
                        checked={this.state.value === 3}
                        onChange={() => {
                            this.setState({
                                value: 3,
                            });
                        }}
                    >
                        选项三
                    </Checkbox>
                </div>

                <Checkbox
                    defaultChecked={false}
                    onChange={(checked) => console.log('checkedState:', checked)}
                >
                    default icon Checkbox
                </Checkbox>
                <div style={{padding: '5px 0'}}></div>
                <Checkbox
                    icon={CheckIcon}
                    textStyle={{ color: 'red' }}
                >
                    custom icon Checkbox
                </Checkbox>
                <div style={{padding: '5px 0'}}></div>
                <Checkbox
                    defaultChecked={true}
                    disabled={true}
                >
                    disabled checkbox and customize the div styles
                </Checkbox>

                <div style={{padding: '5px 0'}}></div>
                <Checkbox
                    icon={false}
                    onChange={(checked) => {
                        if (checked) {
                            this.setState({
                                baiduStyle: {
                                    color: '#24a8e8',
                                },
                            });
                        } else {
                            this.setState({
                                baiduStyle: {

                                },
                            });
                        }
                    }}
                >
                    <div style={{
                        backgroundColor: '#fff',
                        padding: '10px 15px',
                        ...this.state.baiduStyle,
                    }}>no icon, just a checkable component</div>
                </Checkbox>
                <div style={{padding: '5px 0'}}></div>
                <Checkbox
                    defaultChecked={true}
                    dir="right"
                    icon={({ checked }) => {
                        return checked ?
                                <div style={{marginLeft: '10px'}}>
                                    <Icon name="checkmark" size={12}/>
                                </div> : null;
                    }}
                    style={{
                        backgroundColor: '#fff',
                        padding: '10px',
                    }}
                >
                    <div>
                        <div>custom icon and change the default icon's direction</div>
                    </div>
                </Checkbox>

                <div style={{padding: '5px 0'}}></div>
                <Checkbox
                    style={{
                        backgroundColor: '#fff',
                        padding: '20px 15px',
                        ...this.state.checkedStyle,
                    }}
                    onChange={(checked) => {
                        checked ? this.setState({
                            checkedStyle: {
                                backgroundColor: '#e7f7ff',
                            },
                        }) : this.setState({
                            checkedStyle: {},
                        })
                    }}
                >
                    <div>
                        <div style={{ marginBottom: '10px', fontSize: '16px' }}>组件</div>
                        <div style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
                            <div>支持插入组件</div>
                            <div>可修改选中icon</div>
                            <div>可自定义选中后的背景色</div>
                        </div>
                    </div>
                </Checkbox>
            </div>
        )
    }
}
