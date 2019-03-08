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

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _Picker = require('../Picker');

var _Picker2 = _interopRequireDefault(_Picker);

var _omit = require('omit.js');

var _omit2 = _interopRequireDefault(_omit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
    var enterModule = require('react-hot-loader').enterModule;

    enterModule && enterModule(module);
})(); /**
       * Created by zhangyi on 2017/11/7.
       */


var DatePicker = function (_Component) {
    (0, _inherits3.default)(DatePicker, _Component);

    function DatePicker(props) {
        (0, _classCallCheck3.default)(this, DatePicker);

        var _this = (0, _possibleConstructorReturn3.default)(this, (DatePicker.__proto__ || (0, _getPrototypeOf2.default)(DatePicker)).call(this, props));

        _this.getYears = function (minDate, maxDate) {
            minDate = parseInt(minDate, 10);
            maxDate = parseInt(maxDate, 10);

            var years = [];
            for (var i = minDate; i <= maxDate; i++) {
                years.push({
                    label: i + '年',
                    value: i
                });
            }
            return years;
        };

        _this.getMonths = function () {
            var months = [];
            for (var i = 1; i <= 12; i++) {
                months.push({
                    label: i + '月',
                    value: i
                });
            }
            return months;
        };

        _this.getDays = function (year, month) {
            year = parseInt(year, 10);
            month = parseInt(month, 10);

            var dayNum = (0, _moment2.default)(new Date(year + '/' + month + '/01')).daysInMonth();
            var days = [];
            for (var i = 1; i <= dayNum; i++) {
                days.push({
                    label: i + '\u65E5',
                    value: i
                });
            }
            return days;
        };

        _this.getOptions = function () {
            var _this$props = _this.props,
                mode = _this$props.mode,
                minDate = _this$props.minDate,
                maxDate = _this$props.maxDate;

            var value = _this.state.pickerValue;
            var options = [];
            if (mode === 'date') {
                var year = value && value[0] || (0, _moment2.default)().year();
                var month = value && value[1] || 1;
                options = [_this.getYears(minDate, maxDate), _this.getMonths(), _this.getDays(year, month)];
            }
            return options;
        };

        _this.formatValue = function (value) {
            return (0, _moment2.default)(new Date(value[0] + '/' + value[1] + '/' + value[2])).format('YYYY年MM月DD日');
        };

        _this.state = {
            pickerValue: _this.getDefaultDate()
        };
        return _this;
    }

    (0, _createClass3.default)(DatePicker, [{
        key: 'getDefaultDate',
        value: function getDefaultDate() {
            var value = this.props.defaultValue;
            if (value) {
                return value.split('-');
            }
            var _props = this.props,
                minDate = _props.minDate,
                maxDate = _props.maxDate;

            minDate = (0, _moment2.default)(minDate);
            maxDate = (0, _moment2.default)(maxDate);

            var now = (0, _moment2.default)();
            var date = now;
            if (minDate && now.isBefore(minDate)) {
                date = minDate;
            }
            if (maxDate && maxDate.isBefore(now)) {
                date = minDate;
            }
            date = date.format('YYYY-MM-DD').split('-');
            return date;
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props2 = this.props,
                _onChange = _props2.onChange,
                _onOk = _props2.onOk;

            var restProps = (0, _omit2.default)(this.props, ['value', 'onChange', 'onOk']);
            var options = this.getOptions();
            // const  options = [
            //     [
            //         {label: '2008', value: 2008},
            //         {label: '2009', value: 2009},
            //         {label: '2010', value: 2010},
            //         {label: '2011', value: 2011}
            //     ],
            //     [
            //         {label: '1月', value: 1},
            //         {label: '2月', value: 2},
            //         {label: '3月', value: 3},
            //         {label: '4月', value: 4}
            //     ],
            //     [
            //         {label: '1日', value: 1},
            //         {label: '2日', value: 2},
            //         {label: '3日', value: 3},
            //         {label: '4日', value: 4}
            //     ],
            // ]
            return _react2.default.createElement(_Picker2.default, (0, _extends3.default)({
                options: options,
                value: this.state.pickerValue,
                onChange: function onChange(value) {
                    _this2.setState({
                        pickerValue: value
                    });
                    value = _this2.formatValue(value);
                    _onChange && _onChange(value);
                },
                onOk: function onOk(value) {
                    _this2.setState({
                        pickerValue: value
                    });
                    value = _this2.formatValue(value);
                    _onOk && _onOk(value);
                }
            }, restProps));
        }
    }, {
        key: '__reactstandin__regenerateByEval',
        // @ts-ignore
        value: function __reactstandin__regenerateByEval(key, code) {
            // @ts-ignore
            this[key] = eval(code);
        }
    }]);
    return DatePicker;
}(_react.Component);

DatePicker.defaultProps = {
    mode: 'date',
    defaultValue: null,
    minDate: (0, _moment2.default)().add(-10, 'year').format('YYYY-MM-DD'),
    maxDate: (0, _moment2.default)().add(10, 'year').format('YYYY-MM-DD')
};
DatePicker.propTypes = {
    mode: _propTypes2.default.string,
    value: _propTypes2.default.string,
    minDate: _propTypes2.default.string,
    maxDate: _propTypes2.default.string
};
var _default = DatePicker;
exports.default = _default;
;

(function () {
    var reactHotLoader = require('react-hot-loader').default;

    var leaveModule = require('react-hot-loader').leaveModule;

    if (!reactHotLoader) {
        return;
    }

    reactHotLoader.register(DatePicker, 'DatePicker', 'components/DatePicker/index.js');
    reactHotLoader.register(_default, 'default', 'components/DatePicker/index.js');
    leaveModule(module);
})();

;