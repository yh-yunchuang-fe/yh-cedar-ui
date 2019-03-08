'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Image = require('../Image');

var _Image2 = _interopRequireDefault(_Image);

require('./index.less');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
    var enterModule = require('react-hot-loader').enterModule;

    enterModule && enterModule(module);
})(); /**
       * Created by beilunyang on 2018/8/31
       */


var Indicator = function Indicator(props) {
    var _props$size = props.size,
        size = _props$size === undefined ? 'md' : _props$size,
        _props$color = props.color,
        color = _props$color === undefined ? 'blue' : _props$color,
        text = props.text,
        className = props.className,
        textStyle = props.textStyle,
        textClassName = props.textClassName,
        restProps = (0, _objectWithoutProperties3.default)(props, ['size', 'color', 'text', 'className', 'textStyle', 'textClassName']);

    var spinnerImg = color === 'blue' ? 'loading-blue' : 'loading-white';
    var cls = (0, _classnames2.default)('yh-indicator', className);
    var imgCls = (0, _classnames2.default)('yh-indicator-loading-' + size, 'yh-indicator-loading');
    var textCls = (0, _classnames2.default)('yh-indicator-tip', textClassName);
    return _react2.default.createElement(
        'div',
        (0, _extends3.default)({ className: cls }, restProps),
        _react2.default.createElement(_Image2.default, { name: spinnerImg, className: imgCls }),
        text ? _react2.default.createElement(
            'span',
            { className: textCls, style: textStyle },
            text
        ) : null
    );
};

Indicator.propTypes = {
    size: _propTypes2.default.oneOf(['xl', 'lg', 'md', 'sm']),
    color: _propTypes2.default.oneOf(['blue', 'white']),
    className: _propTypes2.default.string,
    textStyle: _propTypes2.default.object,
    textClassName: _propTypes2.default.string
};

var _default = Indicator;
exports.default = _default;
;

(function () {
    var reactHotLoader = require('react-hot-loader').default;

    var leaveModule = require('react-hot-loader').leaveModule;

    if (!reactHotLoader) {
        return;
    }

    reactHotLoader.register(Indicator, 'Indicator', 'components/Indicator/index.js');
    reactHotLoader.register(_default, 'default', 'components/Indicator/index.js');
    leaveModule(module);
})();

;