'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

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

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

require('./index.less');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
    var enterModule = require('react-hot-loader').enterModule;

    enterModule && enterModule(module);
})(); /**
       * 开关
       * @author zhangyi
       * @date 2017-12-25 圣诞快乐
       */


var Switch = function (_PureComponent) {
    (0, _inherits3.default)(Switch, _PureComponent);

    function Switch(props) {
        (0, _classCallCheck3.default)(this, Switch);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Switch.__proto__ || (0, _getPrototypeOf2.default)(Switch)).call(this, props));

        _this.onChange = function (e) {
            var checked = e.target.checked;
            if (_this.props.onChange) {
                _this.props.onChange(checked);
            }
        };

        _this.onClick = function (e) {
            var _this$props = _this.props,
                onClick = _this$props.onClick,
                checked = _this$props.checked;

            if (onClick) {
                var val = void 0;
                if (e && e.target && e.target.checked !== undefined) {
                    val = e.target.checked;
                } else {
                    val = checked;
                }
                onClick(val);
            }
        };

        return _this;
    }

    (0, _createClass3.default)(Switch, [{
        key: 'render',
        value: function render() {
            var _classNames;

            var _props = this.props,
                prefixCls = _props.prefixCls,
                className = _props.className,
                checked = _props.checked,
                disabled = _props.disabled,
                color = _props.color;


            var wrapCls = (0, _classnames2.default)((_classNames = {}, (0, _defineProperty3.default)(_classNames, prefixCls, true), (0, _defineProperty3.default)(_classNames, className, className), _classNames));

            var switchCls = (0, _classnames2.default)({
                'switch': true,
                'switch-disabled': disabled
            });

            return _react2.default.createElement(
                'label',
                {
                    className: wrapCls
                },
                _react2.default.createElement('input', (0, _extends3.default)({
                    type: 'checkbox',
                    className: prefixCls + '-checkbox',
                    disabled: disabled,
                    checked: checked,
                    onChange: this.onChange,
                    value: checked ? 'on' : 'off'
                }, !disabled ? { onClick: this.onClick } : {})),
                _react2.default.createElement(
                    'div',
                    {
                        className: switchCls },
                    _react2.default.createElement('div', { className: 'switch-tag' })
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
    return Switch;
}(_react.PureComponent);

Switch.defaultProps = {
    prefixCls: 'yh-switch',
    className: '',
    checked: false,
    disabled: false,
    color: '', //开关打开后的背景颜色
    onChange: function onChange() {},
    onClick: function onClick() {}
};
Switch.propTypes = {
    prefixCls: _propTypes2.default.string,
    className: _propTypes2.default.string,
    checked: _propTypes2.default.bool,
    disabled: _propTypes2.default.bool,
    color: _propTypes2.default.string,
    onChange: _propTypes2.default.func,
    onClick: _propTypes2.default.func
};
var _default = Switch;
exports.default = _default;
;

(function () {
    var reactHotLoader = require('react-hot-loader').default;

    var leaveModule = require('react-hot-loader').leaveModule;

    if (!reactHotLoader) {
        return;
    }

    reactHotLoader.register(Switch, 'Switch', 'components/Switch/index.js');
    reactHotLoader.register(_default, 'default', 'components/Switch/index.js');
    leaveModule(module);
})();

;