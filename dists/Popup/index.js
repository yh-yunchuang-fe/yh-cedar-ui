'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

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

require('./index.less');

var _Dialog = require('../Dialog');

var _Dialog2 = _interopRequireDefault(_Dialog);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
    var enterModule = require('react-hot-loader').enterModule;

    enterModule && enterModule(module);
})();

var Popup = function (_Component) {
    (0, _inherits3.default)(Popup, _Component);

    function Popup(props) {
        (0, _classCallCheck3.default)(this, Popup);
        return (0, _possibleConstructorReturn3.default)(this, (Popup.__proto__ || (0, _getPrototypeOf2.default)(Popup)).call(this, props));
    }

    (0, _createClass3.default)(Popup, [{
        key: 'render',
        value: function render() {
            var _classNames;

            var _props = this.props,
                prefixCls = _props.prefixCls,
                position = _props.position,
                maskStyle = _props.maskStyle,
                wrapStyle = _props.wrapStyle,
                children = _props.children,
                style = _props.style,
                className = _props.className,
                restProps = (0, _objectWithoutProperties3.default)(_props, ['prefixCls', 'position', 'maskStyle', 'wrapStyle', 'children', 'style', 'className']);


            style = (0, _assign2.default)({}, style, { position: position });
            maskStyle = (0, _assign2.default)({}, maskStyle, { position: position });
            wrapStyle = (0, _assign2.default)({}, wrapStyle, { position: position });

            var cls = (0, _classnames2.default)((_classNames = {}, (0, _defineProperty3.default)(_classNames, prefixCls, true), (0, _defineProperty3.default)(_classNames, className, className), _classNames));

            return _react2.default.createElement(
                _Dialog2.default,
                (0, _extends3.default)({
                    animation: 'slide-up',
                    maskAnimation: 'fade',
                    maskStyle: maskStyle,
                    wrapStyle: wrapStyle,
                    className: cls,
                    style: style
                }, restProps),
                children
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
    return Popup;
}(_react.Component);

Popup.defaultProps = {
    prefixCls: 'yh-popup',
    position: 'fixed'

};
var _default = Popup;
exports.default = _default;
;

(function () {
    var reactHotLoader = require('react-hot-loader').default;

    var leaveModule = require('react-hot-loader').leaveModule;

    if (!reactHotLoader) {
        return;
    }

    reactHotLoader.register(Popup, 'Popup', 'components/Popup/index.js');
    reactHotLoader.register(_default, 'default', 'components/Popup/index.js');
    leaveModule(module);
})();

;