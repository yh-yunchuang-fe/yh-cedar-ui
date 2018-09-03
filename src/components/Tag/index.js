import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames'
import '../../assets/css/default.less';
import './index.less';

export default class Tag extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            selected: props.selected,
        }
    }

    static defaultProps = {
        prefixCls: 'yh-tag',
        className: '',
        readonly: true,
        fill: false,
        color: '#666',
        textColor: '',
        activeColor: '#24A8E8',
        style: null,
        size: 'default',
        selected: false,
    }

    static propTypes = {
        prefixCls: PropTypes.string,
        className: PropTypes.string,
        readonly: PropTypes.bool,
        fill: PropTypes.bool,
        color: PropTypes.string,
        textColor: PropTypes.string,
        activeColor: PropTypes.string,
        style: PropTypes.object,
        size: PropTypes.string,
        selected: PropTypes.bool,
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
                border: `1px solid ${color}` ,
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

        let textSizeSty = `text${size}Sty`;

        const cls = classNames({
            [`${prefixCls}-text`]: true,
            [textSizeSty]: textSizeSty
        })

        const styles = Object.assign({}, sty, style)
        const textStyles = Object.assign({}, textSty, textStyle)

        if (readonly) {
            return (
                <div className={prefixCls}>
                    <div className={`${prefixCls}-content`}  style={styles}>
                        <div {...restProps}>
                            <div className={cls} style={textStyles}>
                                { children }
                            </div>
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div className={prefixCls}>
                    <div className={`${prefixCls}-content`} onClick={this.onClick}>
                        <div style={styles} {...restProps}>
                            <div className={cls} style={textStyles}>
                                { children }
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }
}
