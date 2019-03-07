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

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

require('./index.less');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
    var enterModule = require('react-hot-loader').enterModule;

    enterModule && enterModule(module);
})();

var Label = function (_PureComponent) {
    (0, _inherits3.default)(Label, _PureComponent);

    function Label(props) {
        (0, _classCallCheck3.default)(this, Label);
        return (0, _possibleConstructorReturn3.default)(this, (Label.__proto__ || (0, _getPrototypeOf2.default)(Label)).call(this, props));
    }

    (0, _createClass3.default)(Label, [{
        key: 'render',
        value: function render() {
            var _classNames;

            var _props = this.props,
                prefixCls = _props.prefixCls,
                className = _props.className,
                left = _props.left,
                leftColor = _props.leftColor,
                right = _props.right,
                rightColor = _props.rightColor;


            var cls = (0, _classnames2.default)((_classNames = {}, (0, _defineProperty3.default)(_classNames, prefixCls, true), (0, _defineProperty3.default)(_classNames, className, className), _classNames));

            return _react2.default.createElement(
                'div',
                { className: cls },
                _react2.default.createElement(
                    'span',
                    {
                        className: prefixCls + '-left',
                        style: { color: leftColor } },
                    left
                ),
                _react2.default.createElement(
                    'span',
                    {
                        className: prefixCls + '-right',
                        style: { color: rightColor } },
                    right
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
    return Label;
}(_react.PureComponent);

Label.defaultProps = {
    prefixCls: 'yh-label',
    className: '',
    left: '',
    leftColor: '',
    right: '',
    rightColor: ''
};
var _default = Label;
exports.default = _default;
;

(function () {
    var reactHotLoader = require('react-hot-loader').default;

    var leaveModule = require('react-hot-loader').leaveModule;

    if (!reactHotLoader) {
        return;
    }

    reactHotLoader.register(Label, 'Label', 'components/Label/index.js');
    reactHotLoader.register(_default, 'default', 'components/Label/index.js');
    leaveModule(module);
})();

;