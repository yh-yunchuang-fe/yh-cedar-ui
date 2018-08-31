import React, { Component } from 'react';
import { Icon } from '../../components';
import './index.less';

const iconMap = [
    'chevron-down',
    'chevron-left',
    'chevron-right',
    'chevron-up',
    'back-home',
    'back',
    'camera',
    'close-circle',
    'eye-off',
    'more',
    'unchecked',
    'scan',
    'search',
    'checked',
    'radio-on',
    'radio-off',
    'eye',
    'alert',
    'flash-circle',
    'checkmark',
    'chevron-left-circle',
    'chevron-right-circle',
    'trashcan',
    'close',
    'chevron-down-circle',
    'edit',
    'arrow-down',
    'light-off',
    'light-on',
    'arrow-up',
    'minus',
    'order',
    'plus',
    'remark-active',
    'remark',
    'triangle-down',
    'triangle-up',
    'chevron-up-circle',
    'close-circle-o',
    'user-check',
    'edit-plus',
    'bell',
];

export default class IconDemo extends Component {
    handleClick = (idx) => {
        const name = iconMap[idx];
        if (name) {
            const el = document.querySelectorAll('.copy')[idx];
            el.focus();
            el.setSelectionRange(0, el.value.length);
            document.execCommand('copy', true);
            window.alert('复制成功');
        }
    };

    renderIcons = () => {
        return iconMap.map((name, idx) => {
            return (
                <div className="item" key={idx} onClick={this.handleClick.bind(this, idx)}>
                    <Icon name={name} />
                    <span className="name">{name}</span>
                    <input defaultValue={name} className="copy" />
                </div>
            );
        });
    };

    render() {
        return (
            <div className="container">
                {this.renderIcons()}
            </div>
        );
    }
}
