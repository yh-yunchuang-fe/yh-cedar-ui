'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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

require('./index.less');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
    var enterModule = require('react-hot-loader').enterModule;

    enterModule && enterModule(module);
})();

var Rate = function (_PureComponent) {
    (0, _inherits3.default)(Rate, _PureComponent);

    function Rate(props) {
        (0, _classCallCheck3.default)(this, Rate);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Rate.__proto__ || (0, _getPrototypeOf2.default)(Rate)).call(this, props));

        _this.state = {
            rates: _this.buildInitialState(),
            beginClear: false
        };
        return _this;
    }

    (0, _createClass3.default)(Rate, [{
        key: 'buildInitialState',
        value: function buildInitialState() {
            var _props = this.props,
                _props$count = _props.count,
                count = _props$count === undefined ? 5 : _props$count,
                value = _props.value;

            var rates = [];

            for (var i = 0; i < count; i++) {
                rates.push({
                    key: 'rate' + i,
                    selected: i < Number(value) ? true : false
                });
            }

            return rates;
        }
    }, {
        key: 'changeState',
        value: function changeState(index) {
            var _state = this.state,
                rates = _state.rates,
                beginClear = _state.beginClear;
            var _props2 = this.props,
                allowClear = _props2.allowClear,
                onChange = _props2.onChange,
                disabled = _props2.disabled;


            if (disabled) {
                return;
            }

            var operateRates = rates.slice();
            var originalRate = operateRates[index].selected;
            var lastLightStarIndex = rates.findIndex(function (rate) {
                return !rate.selected;
            }) - 1;
            lastLightStarIndex = lastLightStarIndex < 0 ? rates.length - 1 : lastLightStarIndex;

            if (!(allowClear && index === 0) && index === lastLightStarIndex && originalRate) {
                return;
            }

            if (!originalRate) {
                for (var i = 0; i <= index; i++) {
                    operateRates[i].selected = !originalRate;
                }
            } else {
                for (var _i = rates.length - 1; _i > index; _i--) {
                    operateRates[_i].selected = !originalRate;
                }
                if (allowClear && index === 0) {
                    if (beginClear) {
                        operateRates[index].selected = !originalRate;
                        this.setState({
                            beginClear: false
                        });
                    } else {
                        this.setState({
                            beginClear: true
                        });
                    }
                }
            }

            this.setState({
                rates: operateRates
            });

            var finalResult = allowClear && index === 0 && beginClear ? index : index + 1;

            onChange && onChange(finalResult);
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var rates = this.state.rates;
            var _props3 = this.props,
                disabled = _props3.disabled,
                className = _props3.className,
                _props3$style = _props3.style,
                style = _props3$style === undefined ? {} : _props3$style;


            return _react2.default.createElement(
                'ul',
                { className: 'rate-container ' + (className || ''), style: (0, _extends3.default)({}, style, { cursor: disabled ? 'not-allowed' : 'default' }) },
                rates.map(function (rate, index) {
                    return _react2.default.createElement(
                        'li',
                        { key: rate.key, className: 'rate-item', style: { width: '16px', height: '16px' } },
                        _react2.default.createElement(
                            'a',
                            { className: 'rate-tag', onClick: _this2.changeState.bind(_this2, index, rate.key) },
                            _react2.default.createElement('img', {
                                className: 'rate-img',
                                src: rate.selected ? require("./imgs/star-active@2x.png") : require("./imgs/star@2x.png")
                            })
                        )
                    );
                })
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
    return Rate;
}(_react.PureComponent);

var _default = Rate;
exports.default = _default;
;

(function () {
    var reactHotLoader = require('react-hot-loader').default;

    var leaveModule = require('react-hot-loader').leaveModule;

    if (!reactHotLoader) {
        return;
    }

    reactHotLoader.register(Rate, 'Rate', 'components/Rate/index.js');
    reactHotLoader.register(_default, 'default', 'components/Rate/index.js');
    leaveModule(module);
})();

;