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

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Icon = require('../Icon');

var _Icon2 = _interopRequireDefault(_Icon);

require('./index.less');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
    var enterModule = require('react-hot-loader').enterModule;

    enterModule && enterModule(module);
})();

var InputNumber = function (_Component) {
    (0, _inherits3.default)(InputNumber, _Component);

    function InputNumber(props) {
        (0, _classCallCheck3.default)(this, InputNumber);

        var _this = (0, _possibleConstructorReturn3.default)(this, (InputNumber.__proto__ || (0, _getPrototypeOf2.default)(InputNumber)).call(this, props));

        _this.state = {
            inputValue: props.value || props.defaultValue
        };
        return _this;
    }

    (0, _createClass3.default)(InputNumber, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _props = this.props,
                value = _props.value,
                defaultValue = _props.defaultValue,
                formatter = _props.formatter;

            var newValue = void 0;

            if (value !== null) {
                newValue = this.accurateNum(value);
            } else {
                newValue = this.accurateNum(defaultValue);
            }

            if (isFunction(formatter)) {
                newValue = formatter(newValue);
            }

            this.input.value = newValue;
        }
    }, {
        key: 'accurateNum',
        value: function accurateNum(value) {
            var precision = this.props.precision;


            if (!precision) {
                return Number(value);
            }

            precision = Math.max(precision, 0);

            return Number(value).toFixed(precision);
        }
    }, {
        key: 'onReduce',
        value: function onReduce() {
            var _props2 = this.props,
                step = _props2.step,
                min = _props2.min,
                disabled = _props2.disabled,
                parse = _props2.parse;
            var inputValue = this.state.inputValue;


            if (disabled || inputValue <= min) {
                return;
            }

            var currentVal = void 0;

            if (isFunction(parse)) {
                currentVal = Number(parse(this.input.value));
            } else {
                currentVal = Number(this.input.value);
            }

            var newValue = currentVal - step;
            newValue = Math.max(min, newValue);

            this.onChange(newValue);
        }
    }, {
        key: 'onAdd',
        value: function onAdd() {
            var _props3 = this.props,
                step = _props3.step,
                max = _props3.max,
                disabled = _props3.disabled,
                parse = _props3.parse;
            var inputValue = this.state.inputValue;


            if (disabled || inputValue >= max) {
                return;
            }

            var currentVal = void 0;

            if (isFunction(parse)) {
                currentVal = Number(parse(this.input.value));
            } else {
                currentVal = Number(this.input.value);
            }
            var newValue = currentVal + step;
            newValue = Math.min(newValue, max);

            this.onChange(newValue);
        }
    }, {
        key: 'onInputChange',
        value: function onInputChange(e) {
            var currentVal = e.target.value;

            var _props4 = this.props,
                parse = _props4.parse,
                formatter = _props4.formatter;


            if (isFunction(parse)) {
                currentVal = parse(currentVal);
            }

            if (isFunction(formatter)) {
                this.input.value = formatter(currentVal);
            }
        }
    }, {
        key: 'onInputBlur',
        value: function onInputBlur(e) {
            var currentVal = e.target.value;

            var _props5 = this.props,
                min = _props5.min,
                max = _props5.max,
                parse = _props5.parse;
            var inputValue = this.state.inputValue;


            if (isFunction(parse)) {
                currentVal = parse(currentVal);
            }

            var reg = /^\-*(?:\d+|\d+\.\d+)$/;
            var result = reg.test(currentVal);
            var newValue = !result ? inputValue : currentVal;
            newValue = Math.min(max, Math.max(min, newValue));

            this.onChange(newValue);
        }
    }, {
        key: 'onChange',
        value: function onChange(newValue) {
            var _props6 = this.props,
                onChange = _props6.onChange,
                formatter = _props6.formatter,
                value = _props6.value;

            var accurateValue = this.accurateNum(newValue);

            if (value === null) {
                if (isFunction(formatter)) {
                    this.input.value = formatter(accurateValue);
                } else {
                    this.input.value = accurateValue;
                }
            }

            this.setState({ inputValue: accurateValue });
            onChange && onChange(accurateValue);
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            var value = this.props.value;


            if (value !== null) {
                this.input.value = value;
            }
        }
    }, {
        key: 'getInputRef',
        value: function getInputRef(ref) {
            var getInputRef = this.props.getInputRef;


            this.input = ref;

            getInputRef && getInputRef(ref);
        }
    }, {
        key: 'render',
        value: function render() {
            var _classNames,
                _this2 = this;

            var inputValue = this.state.inputValue;
            var _props7 = this.props,
                prefixCls = _props7.prefixCls,
                className = _props7.className,
                minusIcon = _props7.minusIcon,
                plusIcon = _props7.plusIcon,
                autoFocus = _props7.autoFocus,
                disabled = _props7.disabled,
                max = _props7.max,
                min = _props7.min;


            var cls = (0, _classnames2.default)((_classNames = {}, (0, _defineProperty3.default)(_classNames, prefixCls, true), (0, _defineProperty3.default)(_classNames, className, className), (0, _defineProperty3.default)(_classNames, 'disabled', disabled), _classNames));

            return _react2.default.createElement(
                'div',
                { className: cls },
                _react2.default.createElement(
                    'a',
                    {
                        ref: function ref(_ref) {
                            _this2.reduceBtn = _ref;
                        },
                        className: prefixCls + '-btn ' + (inputValue <= min ? 'disabled' : ''),
                        onClick: this.onReduce.bind(this)
                    },
                    minusIcon ? minusIcon : _react2.default.createElement(_Icon2.default, { name: 'minus' })
                ),
                _react2.default.createElement('input', {
                    autoFocus: autoFocus,
                    disabled: disabled,
                    className: prefixCls + '-input',
                    ref: this.getInputRef.bind(this),
                    onBlur: this.onInputBlur.bind(this),
                    onChange: this.onInputChange.bind(this)
                }),
                _react2.default.createElement(
                    'a',
                    {
                        className: prefixCls + '-btn ' + (inputValue >= max ? 'disabled' : ''),
                        onClick: this.onAdd.bind(this),
                        ref: function ref(_ref2) {
                            return _this2.addBtn = _ref2;
                        }
                    },
                    plusIcon ? plusIcon : _react2.default.createElement(_Icon2.default, { name: 'plus' })
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
    return InputNumber;
}(_react.Component);

InputNumber.defaultProps = {
    prefixCls: 'yh-inputnumber',
    className: '',
    autoFocus: false,
    disabled: false,
    minusIcon: null,
    plusIcon: null,
    defaultValue: 0,
    value: null,
    min: -Infinity,
    max: Infinity,
    step: 1,
    precision: null,
    onChange: null,
    formatter: null,
    parse: null,
    getInputRef: null
};
InputNumber.propTypes = {
    prefixCls: _propTypes2.default.string,
    className: _propTypes2.default.string,
    autoFocus: _propTypes2.default.bool,
    disabled: _propTypes2.default.bool,
    minusIcon: _propTypes2.default.any,
    plusIcon: _propTypes2.default.any,
    defaultValue: _propTypes2.default.number,
    value: _propTypes2.default.number,
    min: _propTypes2.default.number,
    max: _propTypes2.default.number,
    step: _propTypes2.default.number,
    precision: _propTypes2.default.number,
    onChange: _propTypes2.default.func,
    formatter: _propTypes2.default.func,
    parse: _propTypes2.default.func,
    getInputRef: _propTypes2.default.func
};
var _default = InputNumber;
exports.default = _default;


function isFunction(param) {
    return Object.prototype.toString.apply(param) === '[object Function]';
}
;

(function () {
    var reactHotLoader = require('react-hot-loader').default;

    var leaveModule = require('react-hot-loader').leaveModule;

    if (!reactHotLoader) {
        return;
    }

    reactHotLoader.register(InputNumber, 'InputNumber', 'components/InputNumber/index.js');
    reactHotLoader.register(isFunction, 'isFunction', 'components/InputNumber/index.js');
    reactHotLoader.register(_default, 'default', 'components/InputNumber/index.js');
    leaveModule(module);
})();

;