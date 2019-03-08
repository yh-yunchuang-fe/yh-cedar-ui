'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

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

require('./index.less');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
    var enterModule = require('react-hot-loader').enterModule;

    enterModule && enterModule(module);
})(); /**
       * Created by zhangyi on 2017/10/31.
       */


var Badge = function (_PureComponent) {
    (0, _inherits3.default)(Badge, _PureComponent);

    function Badge(props) {
        (0, _classCallCheck3.default)(this, Badge);
        return (0, _possibleConstructorReturn3.default)(this, (Badge.__proto__ || (0, _getPrototypeOf2.default)(Badge)).call(this, props));
    }

    (0, _createClass3.default)(Badge, [{
        key: 'render',
        value: function render() {
            var _classNames, _classNames2;

            var _props = this.props,
                prefixCls = _props.prefixCls,
                className = _props.className,
                dot = _props.dot,
                text = _props.text,
                corner = _props.corner,
                size = _props.size,
                overflowCount = _props.overflowCount,
                children = _props.children;


            text = typeof text === 'number' && text > overflowCount ? overflowCount + '+' : text;

            if (dot) {
                text = '';
            }

            var badgeCls = (0, _classnames2.default)((_classNames = {}, (0, _defineProperty3.default)(_classNames, prefixCls, true), (0, _defineProperty3.default)(_classNames, className, className), (0, _defineProperty3.default)(_classNames, prefixCls + '-not-a-wrapper', !children), (0, _defineProperty3.default)(_classNames, prefixCls + '-corner-wrapper', corner), (0, _defineProperty3.default)(_classNames, prefixCls + '-corner-wrapper-large', corner && size === 'large'), _classNames));

            var scrollNumberCls = (0, _classnames2.default)((_classNames2 = {}, (0, _defineProperty3.default)(_classNames2, prefixCls + '-dot', dot), (0, _defineProperty3.default)(_classNames2, prefixCls + '-dot-large', dot && size === 'large'), (0, _defineProperty3.default)(_classNames2, prefixCls + '-text', !dot && !corner), (0, _defineProperty3.default)(_classNames2, prefixCls + '-corner', corner), (0, _defineProperty3.default)(_classNames2, prefixCls + '-corner-large', corner && size === 'large'), _classNames2));

            return _react2.default.createElement(
                'span',
                { className: badgeCls },
                children,
                (text || dot) && _react2.default.createElement(
                    'sup',
                    { className: scrollNumberCls },
                    text
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
    return Badge;
}(_react.PureComponent);

Badge.defaultProps = {
    prefixCls: 'yh-badge',
    className: '',
    dot: false,
    text: '',
    corner: '',
    overflowCount: 99,
    size: 'small'
};
var _default = Badge;
exports.default = _default;
;

(function () {
    var reactHotLoader = require('react-hot-loader').default;

    var leaveModule = require('react-hot-loader').leaveModule;

    if (!reactHotLoader) {
        return;
    }

    reactHotLoader.register(Badge, 'Badge', 'components/Badge/index.js');
    reactHotLoader.register(_default, 'default', 'components/Badge/index.js');
    leaveModule(module);
})();

;