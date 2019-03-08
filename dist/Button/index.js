'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

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

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

require('./index.less');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
    var enterModule = require('react-hot-loader').enterModule;

    enterModule && enterModule(module);
})(); /**
       * Created by zhangyi on 2017/10/24.
       */


var Button = function (_Component) {
    (0, _inherits3.default)(Button, _Component);

    function Button(props) {
        (0, _classCallCheck3.default)(this, Button);
        return (0, _possibleConstructorReturn3.default)(this, (Button.__proto__ || (0, _getPrototypeOf2.default)(Button)).call(this, props));
    }

    (0, _createClass3.default)(Button, [{
        key: 'render',
        value: function render() {
            var _wrapCls;

            var _props = this.props,
                children = _props.children,
                prefixCls = _props.prefixCls,
                className = _props.className,
                type = _props.type,
                size = _props.size,
                inline = _props.inline,
                disabled = _props.disabled,
                onClick = _props.onClick,
                restProps = (0, _objectWithoutProperties3.default)(_props, ['children', 'prefixCls', 'className', 'type', 'size', 'inline', 'disabled', 'onClick']);


            var wrapCls = (_wrapCls = {}, (0, _defineProperty3.default)(_wrapCls, className, className), (0, _defineProperty3.default)(_wrapCls, prefixCls, true), (0, _defineProperty3.default)(_wrapCls, prefixCls + '-primary', type === 'primary'), (0, _defineProperty3.default)(_wrapCls, prefixCls + '-ghost', type === 'ghost'), (0, _defineProperty3.default)(_wrapCls, prefixCls + '-warning', type === 'warning'), (0, _defineProperty3.default)(_wrapCls, prefixCls + '-small', size === 'small'), (0, _defineProperty3.default)(_wrapCls, prefixCls + '-inline', inline), (0, _defineProperty3.default)(_wrapCls, prefixCls + '-disabled', disabled), _wrapCls);

            //需要加上 ontouchstart 事件，否则在iOS下css :active伪类不会被触发
            return _react2.default.createElement(
                'a',
                (0, _extends3.default)({
                    onTouchStart: function onTouchStart() {},
                    role: 'button',
                    className: (0, _classnames2.default)(wrapCls),
                    onClick: disabled ? undefined : onClick,
                    'aria-disabled': disabled
                }, restProps),
                _react2.default.createElement(
                    'span',
                    null,
                    children
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
    return Button;
}(_react.Component);

Button.defaultProps = {
    prefixCls: 'yh-button',
    size: 'large',
    inline: false,
    disabled: false,
    type: 'default',
    className: '',
    // activeClassName: '',
    style: {},
    // activeStyle: {},
    onClick: function onClick() {}
};
Button.propTypes = {
    prefixCls: _propTypes2.default.string,
    size: _propTypes2.default.string,
    inline: _propTypes2.default.bool,
    disabled: _propTypes2.default.bool,
    type: _propTypes2.default.string,
    className: _propTypes2.default.string,
    // activeClassName: PropTypes.string,
    style: _propTypes2.default.object,
    // activeStyle: PropTypes.object,
    onClick: _propTypes2.default.func
};
var _default = Button;
exports.default = _default;
;

(function () {
    var reactHotLoader = require('react-hot-loader').default;

    var leaveModule = require('react-hot-loader').leaveModule;

    if (!reactHotLoader) {
        return;
    }

    reactHotLoader.register(Button, 'Button', 'components/Button/index.js');
    reactHotLoader.register(_default, 'default', 'components/Button/index.js');
    leaveModule(module);
})();

;