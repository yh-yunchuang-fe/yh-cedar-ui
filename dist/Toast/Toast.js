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

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Animation = require('../Animation');

var _Animation2 = _interopRequireDefault(_Animation);

var _Indicator = require('../Indicator');

var _Indicator2 = _interopRequireDefault(_Indicator);

var _Icon = require('../Icon');

var _Icon2 = _interopRequireDefault(_Icon);

require('./index.less');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
    var enterModule = require('react-hot-loader').enterModule;

    enterModule && enterModule(module);
})(); /**
       * Created by beilunyang on 2018/8/31
       */


var TRANSITION_DURATION = 200;

var Toast = function (_Component) {
    (0, _inherits3.default)(Toast, _Component);

    function Toast() {
        var _ref;

        var _temp, _this, _ret;

        (0, _classCallCheck3.default)(this, Toast);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Toast.__proto__ || (0, _getPrototypeOf2.default)(Toast)).call.apply(_ref, [this].concat(args))), _this), _this.ownIcon = false, _this.onClose = function (cb) {
            // TODO: toast去除DOM操作
            var toast = document.querySelector('.yh-toast-inner-container');
            toast.classList.add('yh-zoom-leave', 'yh-zoom-leave-active');
            setTimeout(function () {
                _this.props.onClose();
                cb();
            }, TRANSITION_DURATION);
        }, _this.renderIcon = function () {
            var _this$props = _this.props,
                type = _this$props.type,
                icon = _this$props.icon;


            if (type === 'loading') {
                return _react2.default.createElement(
                    'div',
                    { className: 'yh-toast-icon-container' },
                    _react2.default.createElement(_Indicator2.default, {
                        size: 'xl',
                        color: 'white'
                    })
                );
            }

            var iconName = '';
            switch (type) {
                case 'success':
                    iconName = 'unchecked';
                    break;
                case 'fail':
                    iconName = 'close-circle-o';
                    break;
                case 'warn':
                    iconName = 'alert';
                    break;
            }

            if (iconName) {
                _this.ownIcon = true;
                return _react2.default.createElement(
                    'div',
                    { className: 'yh-toast-icon-container' },
                    _react2.default.createElement(_Icon2.default, {
                        name: iconName,
                        color: '#fff',
                        size: 32
                    })
                );
            }

            if (_react2.default.isValidElement(icon)) {
                _this.ownIcon = true;
                return _react2.default.createElement(
                    'div',
                    { className: 'yh-toast-icon-container' },
                    icon
                );
            }

            if (typeof icon === 'function') {
                var elements = icon();
                if (_react2.default.isValidElement(elements)) {
                    _this.ownIcon = true;
                    return _react2.default.createElement(
                        'div',
                        { className: 'yh-toast-icon-container' },
                        elements
                    );
                }
                console.warn('icon must be a function that can render reactElements');
                return null;
            }
            return null;
        }, _this.renderContent = function () {
            var content = _this.props.content;

            if (typeof content === 'string') {
                var cls = (0, _classnames2.default)('yh-toast-text-container', 'yh-toast-content-text', _this.ownIcon ? 'yh-toast-own-icon' : null);
                return _react2.default.createElement(
                    'div',
                    { className: cls },
                    content
                );
            }

            if (_react2.default.isValidElement(content)) {
                return _react2.default.createElement(
                    'div',
                    { className: 'yh-toast-text-container' },
                    content
                );
            }

            return null;
        }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }

    (0, _createClass3.default)(Toast, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            var _props = this.props,
                type = _props.type,
                duration = _props.duration,
                animationEnd = _props.animationEnd;

            if (duration < 0) {
                console.warn('duration can not less than or equal to 0');
                return;
            }

            if (duration > 0 && type !== 'loading') {
                setTimeout(function () {
                    _this2.onClose(animationEnd);
                }, TRANSITION_DURATION + duration);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _props2 = this.props,
                duration = _props2.duration,
                animationEnd = _props2.animationEnd,
                mask = _props2.mask,
                position = _props2.position,
                className = _props2.className,
                restProps = (0, _objectWithoutProperties3.default)(_props2, ['duration', 'animationEnd', 'mask', 'position', 'className']);

            var innerCls = null;
            switch (position) {
                case 'top':
                    innerCls = 'yh-toast-top';
                    break;
                case 'bottom':
                    innerCls = 'yh-toast-bottom';
                    break;
            }
            innerCls = (0, _classnames2.default)('yh-toast-inner-container', innerCls, className);
            var cls = (0, _classnames2.default)('yh-toast-container', position === 'center' ? 'yh-toast-center' : null, mask ? 'yh-toast-mask' : null);
            return _react2.default.createElement(
                'div',
                { className: cls },
                _react2.default.createElement(
                    _Animation2.default,
                    {
                        key: 'toast',
                        component: 'div',
                        className: 'yh-toast-animation-div'
                    },
                    _react2.default.createElement(
                        'div',
                        (0, _extends3.default)({ className: innerCls }, restProps),
                        this.renderIcon(),
                        this.renderContent()
                    )
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
    return Toast;
}(_react.Component);

Toast.defaultProps = {
    duration: 2000,
    animationEnd: function animationEnd() {},
    onClose: function onClose() {},
    position: 'center',
    mask: false
};
Toast.propTypes = {
    type: _propTypes2.default.oneOf(['loading', 'success', 'fail', 'warn']),
    duration: _propTypes2.default.number,
    animationEnd: _propTypes2.default.func,
    onClose: _propTypes2.default.func,
    position: _propTypes2.default.oneOf(['top', 'center', 'bottom']),
    className: _propTypes2.default.string,
    mask: _propTypes2.default.bool
};
var _default = Toast;
exports.default = _default;
;

(function () {
    var reactHotLoader = require('react-hot-loader').default;

    var leaveModule = require('react-hot-loader').leaveModule;

    if (!reactHotLoader) {
        return;
    }

    reactHotLoader.register(TRANSITION_DURATION, 'TRANSITION_DURATION', 'components/Toast/Toast.js');
    reactHotLoader.register(Toast, 'Toast', 'components/Toast/Toast.js');
    reactHotLoader.register(_default, 'default', 'components/Toast/Toast.js');
    leaveModule(module);
})();

;