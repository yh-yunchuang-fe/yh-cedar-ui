'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

require('./iconfont/style.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
    var enterModule = require('react-hot-loader').enterModule;

    enterModule && enterModule(module);
})();

var iconMap = ['chevron-down', 'chevron-left', 'chevron-right', 'chevron-up', 'back-home', 'back', 'camera', 'close-circle', 'eye-off', 'more', 'unchecked', 'scan', 'search', 'checked', 'radio-on', 'radio-off', 'eye', 'alert', 'flash-circle', 'checkmark', 'chevron-left-circle', 'chevron-right-circle', 'trashcan', 'close', 'chevron-down-circle', 'edit', 'arrow-down', 'light-off', 'light-on', 'arrow-up', 'minus', 'order', 'plus', 'remark-active', 'remark', 'triangle-down', 'triangle-up', 'chevron-up-circle', 'close-circle-o', 'user-check', 'edit-plus', 'bell', 'clock-circle-o'];

var sizeMap = {
    'xxs': 12,
    'xs': 14,
    'sm': 16,
    'md': 18,
    'lg': 20
};

var Icon = function Icon(_ref) {
    var name = _ref.name,
        style = _ref.style,
        className = _ref.className,
        _ref$size = _ref.size,
        size = _ref$size === undefined ? 16 : _ref$size,
        _ref$color = _ref.color,
        color = _ref$color === undefined ? '#333' : _ref$color;

    if (iconMap.indexOf(name) === -1) {
        return console.warn('the name is not supported');
    }

    var fontSize = typeof size === 'string' ? sizeMap[size] : size;
    fontSize = fontSize || 16;
    var sty = (0, _extends3.default)({
        fontSize: fontSize + 'px',
        color: color
    }, style);
    var cls = (0, _classnames2.default)('icon-' + name, className);
    return _react2.default.createElement('i', { className: cls, style: sty });
};

Icon.propTypes = {
    name: _propTypes2.default.string.isRequired,
    color: _propTypes2.default.string,
    size: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
    style: _propTypes2.default.object,
    className: _propTypes2.default.string
};

var _default = Icon;
exports.default = _default;
;

(function () {
    var reactHotLoader = require('react-hot-loader').default;

    var leaveModule = require('react-hot-loader').leaveModule;

    if (!reactHotLoader) {
        return;
    }

    reactHotLoader.register(iconMap, 'iconMap', 'components/Icon/index.js');
    reactHotLoader.register(sizeMap, 'sizeMap', 'components/Icon/index.js');
    reactHotLoader.register(Icon, 'Icon', 'components/Icon/index.js');
    reactHotLoader.register(_default, 'default', 'components/Icon/index.js');
    leaveModule(module);
})();

;