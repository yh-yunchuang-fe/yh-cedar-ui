'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Icon = require('../Icon');

var _Icon2 = _interopRequireDefault(_Icon);

require('./index.less');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
    var enterModule = require('react-hot-loader').enterModule;

    enterModule && enterModule(module);
})(); /**
       * Created by wudi on 2018/09/04.
       */


var Checkbox = function (_Component) {
    (0, _inherits3.default)(Checkbox, _Component);

    function Checkbox(props) {
        (0, _classCallCheck3.default)(this, Checkbox);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Checkbox.__proto__ || (0, _getPrototypeOf2.default)(Checkbox)).call(this, props));

        _initialiseProps.call(_this);

        var _this$props = _this.props,
            checked = _this$props.checked,
            defaultChecked = _this$props.defaultChecked;

        var initChecked = false;
        if (typeof checked === 'boolean') {
            initChecked = checked;
        } else {
            initChecked = defaultChecked;
        }
        _this.state = {
            checked: initChecked
        };
        return _this;
    }

    (0, _createClass3.default)(Checkbox, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if (typeof nextProps.checked === 'boolean') {
                this.setState({
                    checked: nextProps.checked
                });
            }
        }
    }, {
        key: 'renderIcon',
        value: function renderIcon() {
            var _props = this.props,
                icon = _props.icon,
                disabled = _props.disabled;

            if (typeof icon === 'function') {
                var elements = icon({ checked: this.state.checked });
                if (_react2.default.isValidElement(elements)) {
                    return elements;
                }
            }

            if (typeof icon === 'boolean' && icon) {
                var defaultIcon = function defaultIcon(checked) {
                    var icon = checked ? 'checked' : 'radio-off';
                    var color = '#24A8E8';
                    if (disabled) {
                        icon = 'radio-off';
                        color = '#ececec';
                    }
                    return _react2.default.createElement(
                        'div',
                        { className: 'icon' },
                        _react2.default.createElement(_Icon2.default, { name: icon, color: color })
                    );
                };
                return defaultIcon(this.state.checked);
            }
            return null;
        }
    }, {
        key: 'render',
        value: function render() {
            var _props2 = this.props,
                prefixCls = _props2.prefixCls,
                icon = _props2.icon,
                onChange = _props2.onChange,
                defaultChecked = _props2.defaultChecked,
                checked = _props2.checked,
                dir = _props2.dir,
                style = _props2.style,
                textStyle = _props2.textStyle,
                disabled = _props2.disabled,
                children = _props2.children,
                restProps = (0, _objectWithoutProperties3.default)(_props2, ['prefixCls', 'icon', 'onChange', 'defaultChecked', 'checked', 'dir', 'style', 'textStyle', 'disabled', 'children']);

            var elements = null;

            if (_react2.default.isValidElement(children)) {
                elements = children;
            }

            if (typeof children === 'string') {
                elements = _react2.default.createElement(
                    'div',
                    { style: textStyle },
                    children
                );
            }

            return _react2.default.createElement(
                'div',
                (0, _extends3.default)({ className: prefixCls
                }, restProps, {
                    onClick: this.handleClick
                }),
                _react2.default.createElement(
                    'div',
                    { className: 'container', style: style },
                    dir === 'left' ? this.renderIcon() : null,
                    elements,
                    dir === 'right' ? this.renderIcon() : null
                )
            );
        }
    }, {
        key: '__reactstandin__regenerateByEval',
        // @ts-ignore
        value: function __reactstandin__regenerateByEval(key, code) {
            // @ts-ignore
            this[key] = eval(code);
        }
    }]);
    return Checkbox;
}(_react.Component);

Checkbox.defaultProps = {
    prefixCls: 'yh-checkbox',
    icon: true,
    dir: 'left',
    defaultChecked: false,
    onChange: function onChange() {},

    style: {},
    textStyle: {},
    disabled: false
};
Checkbox.propTypes = {
    prefixCls: _propTypes2.default.string,
    icon: _propTypes2.default.oneOfType([_propTypes2.default.bool, _propTypes2.default.func]),
    dir: _propTypes2.default.string,
    defaultChecked: _propTypes2.default.bool,
    onChange: _propTypes2.default.func,
    style: _propTypes2.default.object,
    textStyle: _propTypes2.default.object,
    disabled: _propTypes2.default.bool

};

var _initialiseProps = function _initialiseProps() {
    var _this2 = this;

    this.handleClick = function () {
        var checked = !_this2.state.checked;
        if (!(typeof _this2.props.checked === 'boolean')) {
            _this2.setState({
                checked: checked
            });
        }
        if (_this2.props.onChange) {
            _this2.props.onChange(checked);
        }
    };
};

var _default = Checkbox;
exports.default = _default;
;

(function () {
    var reactHotLoader = require('react-hot-loader').default;

    var leaveModule = require('react-hot-loader').leaveModule;

    if (!reactHotLoader) {
        return;
    }

    reactHotLoader.register(Checkbox, 'Checkbox', 'components/Checkbox/index.js');
    reactHotLoader.register(_default, 'default', 'components/Checkbox/index.js');
    leaveModule(module);
})();

;