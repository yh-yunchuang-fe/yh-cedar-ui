'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _Toast = require('./Toast');

var _Toast2 = _interopRequireDefault(_Toast);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
    var enterModule = require('react-hot-loader').enterModule;

    enterModule && enterModule(module);
})(); /**
       * Created by beilunyang on 2018/8/31
       */


var TRANSITION_DURATION = 200;

var show = function show(content) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var mask = options.mask,
        icon = options.icon,
        type = options.type,
        duration = options.duration,
        position = options.position,
        onClose = options.onClose,
        style = options.style;

    var div = document.createElement('div');
    document.getElementById('modal-root').appendChild(div);
    var animationEnd = function animationEnd() {
        _reactDom2.default.unmountComponentAtNode(div);
    };
    _reactDom2.default.render(_react2.default.createElement(_Toast2.default, {
        mask: mask,
        icon: icon,
        type: type,
        style: style,
        content: content,
        duration: duration,
        position: position,
        onClose: onClose,
        animationEnd: animationEnd
    }), div);
    return div;
};

var _default = {
    LONG: 3500,
    SHORT: 2000,
    success: function success(content) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var duration = options.duration,
            position = options.position,
            onClose = options.onClose,
            style = options.style,
            mask = options.mask;

        return show(content, {
            type: 'success',
            duration: duration,
            position: position,
            onClose: onClose,
            style: style,
            mask: mask
        });
    },
    fail: function fail(content) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var duration = options.duration,
            position = options.position,
            onClose = options.onClose,
            style = options.style,
            mask = options.mask;

        return show(content, {
            type: 'fail',
            duration: duration,
            position: position,
            onClose: onClose,
            style: style,
            mask: mask
        });
    },
    warn: function warn(content) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var duration = options.duration,
            position = options.position,
            onClose = options.onClose,
            style = options.style,
            mask = options.mask;

        return show(content, {
            type: 'warn',
            duration: duration,
            position: position,
            onClose: onClose,
            style: style,
            mask: mask
        });
    },
    loading: function loading(content) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var duration = options.duration,
            position = options.position,
            onClose = options.onClose,
            style = options.style,
            mask = options.mask;

        return show(content, {
            type: 'loading',
            duration: duration,
            position: position,
            onClose: onClose,
            style: style,
            mask: mask
        });
    },
    hide: function hide(div) {
        // TODO: toast去除DOM操作
        var toast = div.querySelector('.yh-toast-inner-container');
        toast.classList.add('yh-zoom-leave', 'yh-zoom-leave-active');
        setTimeout(function () {
            _reactDom2.default.unmountComponentAtNode(div);
        }, TRANSITION_DURATION);
    },

    show: show
};
exports.default = _default;
;

(function () {
    var reactHotLoader = require('react-hot-loader').default;

    var leaveModule = require('react-hot-loader').leaveModule;

    if (!reactHotLoader) {
        return;
    }

    reactHotLoader.register(TRANSITION_DURATION, 'TRANSITION_DURATION', 'components/Toast/index.js');
    reactHotLoader.register(show, 'show', 'components/Toast/index.js');
    reactHotLoader.register(_default, 'default', 'components/Toast/index.js');
    leaveModule(module);
})();

;