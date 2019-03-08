'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = alert;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _Modal = require('../Modal');

var _Modal2 = _interopRequireDefault(_Modal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
    var enterModule = require('react-hot-loader').enterModule;

    enterModule && enterModule(module);
})(); /**
       * Created by zhangyi on 2017/10/23.
       */


function touchMove(event) {
    // 判断默认行为是否可以被禁用
    if (event.cancelable) {
        // 判断默认行为是否已经被禁用
        if (!event.defaultPrevented) {
            event.preventDefault();
        }
    }
}

function alert() {
    var title = arguments.length <= 0 ? undefined : arguments[0];
    var content = arguments.length <= 1 ? undefined : arguments[1];
    var actions = (arguments.length <= 2 ? undefined : arguments[2]) || [{ text: '确定' }];
    var prefixCls = 'yh-modal';
    var modalRoot = document.getElementById('modal-root');

    if (!title && !content) {
        return {
            close: function close() {}
        };
    }

    var div = document.createElement('div');
    modalRoot.appendChild(div);

    modalRoot.addEventListener('touchmove', touchMove, false);

    function close() {
        var maskDom = div.querySelector('.' + prefixCls + '-mask');
        var wrapDom = div.querySelector('.' + prefixCls + '-wrap');

        // 直接移除dom不会有动画，需要先添加关闭动画，在移除dom
        maskDom.classList.add('yh-fade-leave', 'yh-fade-leave-active');
        wrapDom.classList.add('yh-zoom-leave', 'yh-zoom-leave-active');

        setTimeout(function () {
            _reactDom2.default.unmountComponentAtNode(div);
            modalRoot.removeEventListener('touchmove', touchMove, false);
            if (div) {
                modalRoot.removeChild(div);
            }
        }, 210);
    }

    var footer = actions.map(function (btn) {
        var orginPress = btn.onPress || function () {};
        btn.onPress = function () {
            var res = orginPress();
            if (res && res.then) {
                res.then(function () {
                    close();
                });
            } else {
                close();
            }
        };
        return btn;
    });

    _reactDom2.default.render(_react2.default.createElement(
        _Modal2.default,
        {
            usePortal: false,
            visible: true,
            prefixCls: prefixCls,
            title: title,
            maskClosable: false,
            animation: 'zoom',
            maskAnimation: 'fade',
            footer: footer
        },
        _react2.default.createElement(
            'div',
            { style: { zoom: 1, overflow: 'hidden' } },
            content
        )
    ), div);

    return {
        close: close
    };
}
;

(function () {
    var reactHotLoader = require('react-hot-loader').default;

    var leaveModule = require('react-hot-loader').leaveModule;

    if (!reactHotLoader) {
        return;
    }

    reactHotLoader.register(touchMove, 'touchMove', 'components/Alert/index.js');
    reactHotLoader.register(alert, 'alert', 'components/Alert/index.js');
    leaveModule(module);
})();

;