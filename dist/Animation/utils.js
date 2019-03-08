'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getChildrenFromProps = getChildrenFromProps;
exports.toArrayChildren = toArrayChildren;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
    var enterModule = require('react-hot-loader').enterModule;

    enterModule && enterModule(module);
})();

var defaultKey = 'zy_animate_' + Date.now();

function getChildrenFromProps(children) {
    if (_react2.default.isValidElement(children)) {
        if (!children.key) {
            return _react2.default.cloneElement(children, { key: defaultKey });
        }
    }
    return children;
}

function toArrayChildren(children) {
    var ret = [];
    _react2.default.Children.forEach(children, function (child) {
        if (child) {
            ret.push(child);
        }
    });
    return ret;
}
;

(function () {
    var reactHotLoader = require('react-hot-loader').default;

    var leaveModule = require('react-hot-loader').leaveModule;

    if (!reactHotLoader) {
        return;
    }

    reactHotLoader.register(defaultKey, 'defaultKey', 'components/Animation/utils.js');
    reactHotLoader.register(getChildrenFromProps, 'getChildrenFromProps', 'components/Animation/utils.js');
    reactHotLoader.register(toArrayChildren, 'toArrayChildren', 'components/Animation/utils.js');
    leaveModule(module);
})();

;