'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

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

var _reactDom = require('react-dom');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Animation = require('../Animation');

var _Animation2 = _interopRequireDefault(_Animation);

var _LazyRenderBox = require('./LazyRenderBox');

var _LazyRenderBox2 = _interopRequireDefault(_LazyRenderBox);

require('./style/index.less');

var _utils = require('../../src/utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
    var enterModule = require('react-hot-loader').enterModule;

    enterModule && enterModule(module);
})(); /**
       * 模态状况基类
       * @date 2017-07-10-17
       */


var Dialog = function (_Component) {
    (0, _inherits3.default)(Dialog, _Component);

    function Dialog(props) {
        (0, _classCallCheck3.default)(this, Dialog);
        return (0, _possibleConstructorReturn3.default)(this, (Dialog.__proto__ || (0, _getPrototypeOf2.default)(Dialog)).call(this, props));
    }

    (0, _createClass3.default)(Dialog, [{
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            var props = this.props;
            if (props.visible) {
                (0, _utils.fixedBody)();
                this.openTime = Date.now();
            }
        }
    }, {
        key: 'getMaskElement',
        value: function getMaskElement() {
            var maskElement = null;
            var _props = this.props,
                prefixCls = _props.prefixCls,
                mask = _props.mask,
                visible = _props.visible,
                maskTransition = _props.maskTransition,
                maskClassName = _props.maskClassName,
                maskTransitionTimeout = _props.maskTransitionTimeout;

            if (mask && visible) {
                maskElement = _react2.default.createElement(_LazyRenderBox2.default, { key: 'mask',
                    style: this.getMaskStyle(),
                    className: prefixCls + '-mask ' + (maskClassName || '') });
                (0, _utils.fixedBody)();
            }
            if (maskTransition) {
                var maskTransitionName = this.getMaskTransitionName();
                maskElement = _react2.default.createElement(
                    _Animation2.default,
                    { key: 'mask',
                        transitionName: maskTransitionName,
                        transitionEnterTimeout: maskTransitionTimeout,
                        transitionAppearTimeout: maskTransitionTimeout,
                        transitionLeaveTimeout: maskTransitionTimeout },
                    maskElement
                );
                (0, _utils.looseBody)();
            }

            return maskElement;
        }
    }, {
        key: 'getDialogElement',
        value: function getDialogElement() {
            var _props2 = this.props,
                prefixCls = _props2.prefixCls,
                visible = _props2.visible,
                maskClosable = _props2.maskClosable,
                style = _props2.style,
                wrapClassName = _props2.wrapClassName,
                className = _props2.className,
                children = _props2.children;

            var wrapStyle = this.getWrapStyle();

            var dialogElement = null;
            if (visible) {
                dialogElement = _react2.default.createElement(
                    'div',
                    { role: 'dialog',
                        className: prefixCls + '-wrap ' + (wrapClassName || ''),
                        style: wrapStyle,
                        onClick: maskClosable ? this.onMaskClick.bind(this) : undefined
                    },
                    _react2.default.createElement(
                        _LazyRenderBox2.default,
                        { key: 'dialog-element', role: 'document', ref: 'dialog',
                            style: style,
                            className: prefixCls + ' ' + (className || '') },
                        children
                    )
                );
            }

            return dialogElement;
        }

        //获取蒙板动画

    }, {
        key: 'getMaskTransitionName',
        value: function getMaskTransitionName() {
            var props = this.props;
            var maskTransitionName = props.maskTransitionName;
            var prefixCls = props.prefixCls,
                maskAnimation = props.maskAnimation;

            if (!maskTransitionName && maskAnimation) {
                maskTransitionName = prefixCls + '-' + maskAnimation;
            }
            return maskTransitionName;
        }

        //获取content动画

    }, {
        key: 'getTransitionName',
        value: function getTransitionName() {
            var props = this.props;
            var transitionName = props.transitionName;
            var animation = props.animation;

            if (!transitionName && animation) {
                transitionName = 'yh-' + animation;
            }
            return transitionName;
        }
    }, {
        key: 'getZIndexStyle',
        value: function getZIndexStyle() {
            var style = {};
            var props = this.props;
            if (props.zIndex !== undefined) {
                style.zIndex = props.zIndex;
            }
            return style;
        }
    }, {
        key: 'getMaskStyle',
        value: function getMaskStyle() {
            return (0, _assign2.default)({}, this.getZIndexStyle(), this.props.maskStyle);
        }
    }, {
        key: 'getWrapStyle',
        value: function getWrapStyle() {
            return (0, _assign2.default)({}, this.getZIndexStyle(), this.props.wrapStyle);
        }
    }, {
        key: 'onMaskClick',
        value: function onMaskClick(e) {
            if (Date.now() - this.openTime < 300) {
                return;
            }
            if (e.target === e.currentTarget) {
                this.close(e);
            }
        }
    }, {
        key: 'close',
        value: function close(e) {
            this.props.onClose(e);
        }
    }, {
        key: 'render',
        value: function render() {
            var props = this.props;
            var transitionName = this.getTransitionName();
            var modalRoot = document.getElementById('modal-root');

            var node = _react2.default.createElement(
                'div',
                { ref: 'dialog-wrapper' },
                this.getMaskElement(),
                _react2.default.createElement(
                    _Animation2.default,
                    {
                        ref: 'dialog-animation',
                        key: 'dialog-animation',
                        transitionName: transitionName,
                        transitionEnterTimeout: props.transitionTimeout,
                        transitionAppearTimeout: props.transitionTimeout,
                        transitionLeaveTimeout: props.transitionTimeout },
                    this.getDialogElement()
                )
            );

            if (props.usePortal) {
                return (0, _reactDom.createPortal)(node, modalRoot);
            } else {
                return node;
            }
        }
    }, {
        key: '__reactstandin__regenerateByEval',
        // @ts-ignore
        value: function __reactstandin__regenerateByEval(key, code) {
            // @ts-ignore
            this[key] = eval(code);
        }
    }]);
    return Dialog;
}(_react.Component);

Dialog.propTypes = {
    prefixCls: _propTypes2.default.string,
    // position: PropTypes.oneOf(['fixed', 'absolute']),
    // closable: PropTypes.bool,
    maskClosable: _propTypes2.default.bool,
    // animated: PropTypes.bool,
    className: _propTypes2.default.string,
    maskClassName: _propTypes2.default.string,
    transitionName: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.object]),
    animation: _propTypes2.default.string,
    transitionTimeout: _propTypes2.default.number,
    mask: _propTypes2.default.bool, //是否显示蒙板
    maskAnimation: _propTypes2.default.string,
    maskTransition: _propTypes2.default.bool,
    maskTransitionName: _propTypes2.default.string,
    maskTransitionTimeout: _propTypes2.default.number,
    zIndex: _propTypes2.default.number,
    maskStyle: _propTypes2.default.object,
    children: _propTypes2.default.any,
    visible: _propTypes2.default.bool,
    // title: PropTypes.element,
    // footer: PropTypes.element,
    wrapClassName: _propTypes2.default.string,
    wrapStyle: _propTypes2.default.object,
    style: _propTypes2.default.object,
    // onShow: PropTypes.func,
    onClose: _propTypes2.default.func
    // afterClose: PropTypes.func
};
Dialog.defaultProps = {
    prefixCls: 'yh-dialog', //动画样式前缀 默认不需要传
    // position: 'fixed',      //为了解决fixed 弹窗中有文本框，光标位置异常问题 需把fixed改为absolute
    // closable: true,
    maskClosable: true, //点击蒙板是否可关闭
    animated: true,
    className: 'yh-dialog',
    maskClassName: 'yh-dialog-mask',
    transitionName: '', //自定义动画名 默认不使用
    animation: 'zoom', //动画名简写
    transitionTimeout: 500,
    mask: true, //是否显示蒙板
    maskAnimation: 'fade', //蒙板动画名简写
    maskTransition: true, //蒙板是否有动画
    maskTransitionName: 'yh-fade', //默认蒙板动画名
    maskTransitionTimeout: 500,
    zIndex: undefined,
    maskStyle: null,
    visible: false,
    // title: null,
    // footer: null,
    wrapClassName: '',
    wrapStyle: {},
    style: {},
    // onShow: noop,
    onClose: function onClose() {},
    usePortal: true
    // afterClose: noop
};
var _default = Dialog;
exports.default = _default;
;

(function () {
    var reactHotLoader = require('react-hot-loader').default;

    var leaveModule = require('react-hot-loader').leaveModule;

    if (!reactHotLoader) {
        return;
    }

    reactHotLoader.register(Dialog, 'Dialog', 'components/Dialog/index.js');
    reactHotLoader.register(_default, 'default', 'components/Dialog/index.js');
    leaveModule(module);
})();

;