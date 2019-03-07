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

var _PickerColumn = require('./PickerColumn');

var _PickerColumn2 = _interopRequireDefault(_PickerColumn);

var _Dialog = require('../Dialog');

var _Dialog2 = _interopRequireDefault(_Dialog);

require('./index.less');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
    var enterModule = require('react-hot-loader').enterModule;

    enterModule && enterModule(module);
})(); /**
       * Created by zhangyi on 2017/11/1.
       */


function noop() {}

var Picker = function (_Component) {
    (0, _inherits3.default)(Picker, _Component);

    function Picker(props) {
        (0, _classCallCheck3.default)(this, Picker);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Picker.__proto__ || (0, _getPrototypeOf2.default)(Picker)).call(this, props));

        _this.onOK = function () {
            if (_this.props.onOk) {
                _this.props.onOk(_this.value);
            }
            _this.props.onClose();
        };

        _this.onDismiss = function () {
            if (_this.props.onDismiss) {
                _this.props.onDismiss();
            }
            _this.props.onClose();
        };

        _this.value = [];
        return _this;
    }

    (0, _createClass3.default)(Picker, [{
        key: 'renderHeader',
        value: function renderHeader() {
            var _props = this.props,
                prefixCls = _props.prefixCls,
                okText = _props.okText,
                dismissText = _props.dismissText,
                title = _props.title;


            return _react2.default.createElement(
                'div',
                { className: prefixCls + '-header' },
                dismissText ? _react2.default.createElement(
                    'div',
                    {
                        className: prefixCls + '-header-item ' + prefixCls + '-header-left', onClick: this.onDismiss },
                    dismissText
                ) : null,
                _react2.default.createElement(
                    'div',
                    { className: prefixCls + '-header-item ' + prefixCls + '-header-title' },
                    title
                ),
                _react2.default.createElement(
                    'div',
                    { className: prefixCls + '-header-item ' + prefixCls + '-header-right', onClick: this.onOK },
                    okText
                )
            );
        }
    }, {
        key: 'renderColumn',
        value: function renderColumn() {
            var _this2 = this;

            var _props2 = this.props,
                prefixCls = _props2.prefixCls,
                options = _props2.options,
                value = _props2.value,
                _onChange = _props2.onChange;


            value = value || [];
            var colNodes = null;
            if (!Array.isArray(options[0])) {
                colNodes = _react2.default.createElement(_PickerColumn2.default, {
                    prefixCls: prefixCls,
                    key: '0',
                    options: options,
                    value: value,
                    onChange: function onChange(selected) {
                        _this2.value = selected;
                        _onChange(selected);
                    } });
            } else {
                colNodes = options.map(function (cur, index) {
                    return _react2.default.createElement(_PickerColumn2.default, {
                        prefixCls: prefixCls,
                        key: index,
                        options: cur,
                        value: value[index],
                        onChange: function onChange(selected) {
                            value[index] = selected;
                            _this2.value = value;
                            _onChange(value);
                        } });
                });
            }

            return colNodes;
        }
    }, {
        key: 'render',
        value: function render() {
            var _classNames;

            var _props3 = this.props,
                prefixCls = _props3.prefixCls,
                className = _props3.className,
                style = _props3.style,
                options = _props3.options,
                visible = _props3.visible,
                onClose = _props3.onClose;


            if (visible) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'auto';
            }

            if (!options || options.length === 0) {
                return null;
            }

            var wrapCls = (0, _classnames2.default)((_classNames = {}, (0, _defineProperty3.default)(_classNames, prefixCls, true), (0, _defineProperty3.default)(_classNames, className, className), _classNames));

            return _react2.default.createElement(
                _Dialog2.default,
                {
                    visible: visible,
                    title: 'yh-picker',
                    maskClosable: true,
                    animation: 'slide-up',
                    maskAnimation: 'fade',
                    onClose: onClose,
                    style: {
                        left: 0,
                        bottom: 0,
                        position: 'fixed',
                        width: '100%',
                        backgroundColor: '#fff'
                    }
                },
                _react2.default.createElement(
                    'div',
                    { className: wrapCls, style: style },
                    this.renderHeader(),
                    _react2.default.createElement(
                        'div',
                        { className: prefixCls + '-wrapper' },
                        this.renderColumn()
                    )
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
    return Picker;
}(_react.Component);

Picker.defaultProps = {
    prefixCls: 'yh-picker',
    visible: false,
    onClose: noop,
    className: '',
    style: null,
    options: [], // 支持一维数组和多维数组 {label, value}
    value: [],
    onChange: noop,
    onOk: noop,
    onDismiss: noop,
    title: '',
    okText: '确定',
    dismissText: '取消'
};
Picker.propTypes = {
    prefixCls: _propTypes2.default.string,
    visible: _propTypes2.default.bool,
    onClose: _propTypes2.default.func,
    className: _propTypes2.default.string,
    style: _propTypes2.default.object,
    options: _propTypes2.default.array,
    value: _propTypes2.default.array,
    onChange: _propTypes2.default.func,
    onOk: _propTypes2.default.func,
    onDismiss: _propTypes2.default.func,
    title: _propTypes2.default.string,
    okText: _propTypes2.default.string,
    dismissText: _propTypes2.default.string
};
var _default = Picker;
exports.default = _default;
;

(function () {
    var reactHotLoader = require('react-hot-loader').default;

    var leaveModule = require('react-hot-loader').leaveModule;

    if (!reactHotLoader) {
        return;
    }

    reactHotLoader.register(noop, 'noop', 'components/Picker/index.js');
    reactHotLoader.register(Picker, 'Picker', 'components/Picker/index.js');
    reactHotLoader.register(_default, 'default', 'components/Picker/index.js');
    leaveModule(module);
})();

;