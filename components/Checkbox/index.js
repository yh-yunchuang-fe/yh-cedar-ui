/**
 * Created by wudi on 2018/09/04.
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Icon from '../Icon'
import './index.less'

export default class Checkbox extends Component {
    constructor(props) {
        super(props)
        const { checked, defaultChecked } = this.props;
        let initChecked = false;
        if (typeof checked === 'boolean') {
            initChecked = checked;
        } else {
            initChecked = defaultChecked;
        }
        this.state = {
            checked: initChecked,
        };
    }

    static defaultProps = {
        prefixCls: 'yh-checkbox',
        icon: true,
        dir: 'left',
        defaultChecked: false,
        onChange() {},
        style: {},
        textStyle: {},
        disabled: false,
    }

    static propTypes = {
        prefixCls: PropTypes.string,
        icon: PropTypes.oneOfType([
            PropTypes.bool,
            PropTypes.func
        ]),
        dir: PropTypes.string,
        defaultChecked: PropTypes.bool,
        onChange: PropTypes.func,
        style: PropTypes.object,
        textStyle: PropTypes.object,
        disabled: PropTypes.bool,

    }

    componentWillReceiveProps(nextProps) {
        if (typeof nextProps.checked === 'boolean') {
            this.setState({
                checked: nextProps.checked,
            });
        }
    }

    handleClick = () => {
        const checked = !this.state.checked;
        if (!(typeof this.props.checked === 'boolean')) {
            this.setState({
                checked,
            });
        }
        if (this.props.onChange) {
            this.props.onChange(checked);
        }
    };


    renderIcon() {
        const { icon, disabled } = this.props;
        if (typeof icon === 'function') {
            const elements = icon({ checked: this.state.checked });
            if (React.isValidElement(elements)) {
                return elements;
            }
        }

        if (typeof icon === 'boolean' && icon) {
            const defaultIcon = (checked) => {
                let icon = checked ? 'checked' : 'radio-off';
                let color = '#24A8E8'
                if(disabled) {
                    icon = 'radio-off'
                    color = '#ececec'
                }
                return (
                    <div className="icon">
                        <Icon name={icon} color={color} />
                    </div>
                );
            };
            return defaultIcon(this.state.checked);
        }
        return null;
    }

    render () {
        const { prefixCls, icon, onChange, defaultChecked,
            checked, dir, style, textStyle,
            disabled, children, ...restProps } = this.props;
        let elements = null;

        if (React.isValidElement(children)) {
            elements = children;
        }

        if (typeof children === 'string') {
            elements = <div style={textStyle}>{children}</div>
        }

        return (
           <div className={prefixCls}
                {...restProps}
                onClick={this.handleClick}
            >
                <div className={'container'} style={style}>
                    {dir === 'left' ? this.renderIcon() : null}
                    {elements}
                    {dir === 'right' ? this.renderIcon() : null}
                </div>
           </div>
        )
    }
}
