import React, { PureComponent } from 'react'
import './index.less'

export default class Tag extends PureComponent {
    constructor(props) {
        super(props)
    }

    static defaultProps = {
        prefixCls: 'yh-tag',
        className: '',
        readonly: true,
        fill: false,
        color: variables.color_label,
        textColor: '',
        activeColor: variables.color_link,
        style: null,
        size: 'default',
        selected: false,
    }

    componentWillReceiveProps (nextProps) {
        if (this.props.selected !== nextProps.selected) {
            this.setState({
                selected: nextProps.selected,
            });
        }
    }

    onClick = () => {
        const { readonly, onChange } = this.props;
        if (readonly) {
            return;
        }

        const isSelect = this.state.selected;
        this.setState({
            selected: !isSelect,
        }, () => {
            if (onChange) {
                onChange(!isSelect);
            }
        });
    };


    render() {
        const {
            prefixCls, readonly, fill, color, children, style, size, textColor, textStyle,
            activeColor, ...restProps
        } = this.props;
        const selected = this.state.selected;

        let sty = {};
        let textSty  = {};

        if (fill) {
            sty = {
                backgroundColor: selected ? activeColor : color,
                borderWidth: 0
            };
            textSty = {
                color: textColor ? textColor : '#ffffff'
            };
        } else {
            sty = {
                borderColor: selected ? activeColor : color,
            };
            textSty = {
                color: selected ? activeColor : color,
            }

        }

        let textSizeSty = styles[`text${size}Sty`];

        if (readonly) {
            return (
                <div style={prefixCls}>
                    <div style={[`${prefixCls}-content`, sty, style]} {...restProps}>
                        <div style={[`${prefixCls}-text`, textSizeSty, textSty, textStyle]}>
                            { children }
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div style={prefixCls}>
                    <div onClick={this.onClick}>
                        <div style={[`${prefixCls}-content`, sty, style]} {...restProps}>
                            <div style={[`${prefixCls}-text`, textSizeSty, textSty, textStyle]}>
                                { children }
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }
}
