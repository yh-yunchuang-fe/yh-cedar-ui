'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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

var _omit = require('omit.js');

var _omit2 = _interopRequireDefault(_omit);

var _Dialog = require('../Dialog');

var _Dialog2 = _interopRequireDefault(_Dialog);

require('./style/index.less');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
    var enterModule = require('react-hot-loader').enterModule;

    enterModule && enterModule(module);
})(); /**
       * Created by zhangyi on 2017/10/23.
       */


var Modal = function (_Component) {
    (0, _inherits3.default)(Modal, _Component);

    function Modal(props) {
        (0, _classCallCheck3.default)(this, Modal);
        return (0, _possibleConstructorReturn3.default)(this, (Modal.__proto__ || (0, _getPrototypeOf2.default)(Modal)).call(this, props));
    }

    (0, _createClass3.default)(Modal, [{
        key: 'renderHeader',
        value: function renderHeader() {
            var _props = this.props,
                prefixCls = _props.prefixCls,
                title = _props.title;

            return _react2.default.createElement(
                'div',
                { className: prefixCls + '-header' },
                _react2.default.createElement(
                    'div',
                    { className: prefixCls + '-title' },
                    title
                )
            );
        }
    }, {
        key: 'renderFooterButton',
        value: function renderFooterButton(button, prefixCls, index) {
            var onClickFn = function onClickFn(e) {
                e.preventDefault();
                if (button.onPress) {
                    button.onPress();
                }
            };
            return _react2.default.createElement(
                'a',
                { key: index, style: { color: button.color }, href: 'javascript:;', className: prefixCls + '-button', role: 'button', onClick: onClickFn },
                button.text || 'Button'
            );
        }
    }, {
        key: 'renderFooter',
        value: function renderFooter() {
            var _this2 = this;

            var _props2 = this.props,
                prefixCls = _props2.prefixCls,
                _props2$footer = _props2.footer,
                footer = _props2$footer === undefined ? [] : _props2$footer;

            var btnGroupClass = prefixCls + '-button-group-h';
            var footerDom = footer.length ? _react2.default.createElement(
                'div',
                { className: btnGroupClass },
                footer.map(function (button, index) {
                    return _this2.renderFooterButton(button, prefixCls, index);
                })
            ) : null;

            return _react2.default.createElement(
                'div',
                { className: prefixCls + '-footer' },
                footerDom
            );
        }
    }, {
        key: 'render',
        value: function render() {
            var _props3 = this.props,
                prefixCls = _props3.prefixCls,
                style = _props3.style,
                title = _props3.title,
                children = _props3.children,
                className = _props3.className,
                maskClassName = _props3.maskClassName;


            var rootStyle = (0, _extends3.default)({
                width: '7rem',
                height: 'auto'
            }, style);

            var resetProps = (0, _omit2.default)(this.props, ['style', 'className', 'maskClassName']);

            return _react2.default.createElement(
                _Dialog2.default,
                (0, _extends3.default)({
                    style: rootStyle,
                    className: className,
                    maskClassName: maskClassName
                }, resetProps),
                _react2.default.createElement(
                    'div',
                    { className: prefixCls + '-content' },
                    title ? this.renderHeader() : null,
                    _react2.default.createElement(
                        'div',
                        { className: prefixCls + '-body' },
                        children
                    ),
                    this.renderFooter()
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
    return Modal;
}(_react.Component);

Modal.defaultProps = {
    prefixCls: 'yh-modal',
    closable: 'false',
    title: '',
    footer: [],
    style: null,
    className: '',
    maskClassName: ''
};
var _default = Modal;
exports.default = _default;
;

(function () {
    var reactHotLoader = require('react-hot-loader').default;

    var leaveModule = require('react-hot-loader').leaveModule;

    if (!reactHotLoader) {
        return;
    }

    reactHotLoader.register(Modal, 'Modal', 'components/Modal/index.js');
    reactHotLoader.register(_default, 'default', 'components/Modal/index.js');
    leaveModule(module);
})();

;