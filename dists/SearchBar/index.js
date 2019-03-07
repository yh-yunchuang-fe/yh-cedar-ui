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
       * Created by zhangyi on 2017/10/25.
       */


function noop() {}

var SearchBar = function (_Component) {
    (0, _inherits3.default)(SearchBar, _Component);

    function SearchBar(props) {
        (0, _classCallCheck3.default)(this, SearchBar);

        var _this = (0, _possibleConstructorReturn3.default)(this, (SearchBar.__proto__ || (0, _getPrototypeOf2.default)(SearchBar)).call(this, props));

        _initialiseProps.call(_this);

        _this.scrollIntoViewTimeout = null;
        _this.firstFocus = false;
        var value = _this.props.defaultValue || '';
        _this.state = {
            value: value,
            focus: false
        };
        return _this;
    }

    (0, _createClass3.default)(SearchBar, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            this.componentDidUpdate();
            if (this.props.autoFocus) {
                this.refs.searchInput.focus();
                this.refs.searchInput.addEventListener('click', function () {
                    _this2.refs.searchInput.focus();
                });
                // setTimeout(()=>{
                // this.refs.searchInput.focus()
                // }, 0)
            }
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            if (this.props.showCancel) {
                var cancelSty = window.getComputedStyle(this.refs.cancelBtn);
                var cancelBtnMarginLeft = cancelSty['margin-left'];
                if (!this.state.focus) {
                    var left = -this.refs.cancelBtn.offsetWidth + parseInt(cancelBtnMarginLeft, 10);
                    this.refs.cancelBtn.style.marginRight = left + 'px';
                } else {
                    this.refs.cancelBtn.style.marginRight = 0;
                }
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            if (this.scrollIntoViewTimeout) {
                clearTimeout(this.scrollIntoViewTimeout);
                this.scrollIntoViewTimeout = null;
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _classNames3;

            var _props = this.props,
                fixed = _props.fixed,
                prefixCls = _props.prefixCls,
                placeholder = _props.placeholder,
                cancelText = _props.cancelText,
                className = _props.className,
                showCancel = _props.showCancel,
                cancelColor = _props.cancelColor;
            var _state = this.state,
                value = _state.value,
                focus = _state.focus;


            var wrapCls = (0, _classnames2.default)({
                'yh-search-wrap': true
            });

            var contentCls = (0, _classnames2.default)((0, _defineProperty3.default)({
                'yh-search': true,
                'yh-search-fixed': fixed
            }, className, className));

            var inputCls = (0, _classnames2.default)({
                'show-close': focus && value && value.length > 0
            });

            var clearCls = (0, _classnames2.default)((0, _defineProperty3.default)({
                'icon': true,
                'yhicon-delete-circle': true
            }, prefixCls + '-close-show', focus && value && value.length > 0));

            var cancelCls = (0, _classnames2.default)((_classNames3 = {}, (0, _defineProperty3.default)(_classNames3, prefixCls + '-cancel', true), (0, _defineProperty3.default)(_classNames3, prefixCls + '-cancel-show', focus), (0, _defineProperty3.default)(_classNames3, prefixCls + '-cancel-anim', this.firstFocus), _classNames3));

            return _react2.default.createElement(
                'div',
                { className: wrapCls },
                _react2.default.createElement(
                    'form',
                    { action: '#', className: contentCls, onSubmit: this.onSubmit },
                    _react2.default.createElement(
                        'div',
                        { className: 'yh-search-input' },
                        _react2.default.createElement('i', { className: 'icon yhicon-search' }),
                        _react2.default.createElement('input', {
                            value: value,
                            type: 'search',
                            ref: 'searchInput',
                            placeholder: placeholder,
                            className: inputCls,
                            onChange: this.onChange,
                            onFocus: this.onFocus,
                            onBlur: this.onBlur
                        }),
                        _react2.default.createElement('a', { className: clearCls, onClick: this.onClear })
                    ),
                    showCancel && _react2.default.createElement(
                        'a',
                        {
                            ref: 'cancelBtn',
                            style: { color: cancelColor },
                            className: cancelCls,
                            onClick: this.onCancel },
                        cancelText
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
    return SearchBar;
}(_react.Component);

SearchBar.defaultProps = {
    prefixCls: 'yh-search',
    fixed: false,
    placeholder: 'Search',
    autoFocus: false,
    showCancel: true,
    cancelText: '取消',
    cancelColor: '',
    defaultValue: '',
    className: '',
    onSubmit: noop,
    onChange: noop,
    onFocus: noop,
    onBlur: noop,
    onCancel: noop,
    onClear: noop
    // showCancelButton: true
};
SearchBar.propTypes = {
    prefixCls: _propTypes2.default.string,
    fixed: _propTypes2.default.bool,
    placeholder: _propTypes2.default.string,
    showCancel: _propTypes2.default.bool,
    cancelText: _propTypes2.default.string,
    cancelColor: _propTypes2.default.string,
    defaultValue: _propTypes2.default.string,
    className: _propTypes2.default.string,
    onSubmit: _propTypes2.default.func,
    onChange: _propTypes2.default.func,
    onFocus: _propTypes2.default.func,
    onBlur: _propTypes2.default.func,
    onCancel: _propTypes2.default.func,
    onClear: _propTypes2.default.func
    // showCancelButton: PropTypes.bool
};

var _initialiseProps = function _initialiseProps() {
    var _this3 = this;

    this.onSubmit = function (e) {
        e.preventDefault();
        if (_this3.props.onSubmit) {
            _this3.props.onSubmit(_this3.state.value);
        }
        _this3.refs.searchInput.blur();
    };

    this.onChange = function (e) {
        e.preventDefault();
        if (!_this3.state.focus) {
            _this3.setState({
                focus: true
            });
        }
        var value = e.target.value;
        _this3.setState({ value: value });
        if (_this3.props.onChange) {
            _this3.props.onChange(value);
        }
    };

    this.onFocus = function (e) {
        _this3.setState({
            focus: true
        });
        _this3.firstFocus = true;
        if (_this3.props.onFocus) {
            _this3.props.onFocus();
        }

        // 如果不在可视区域就滚动到可视区域
        if (document.activeElement.tagName.toLowerCase() === 'input') {
            _this3.scrollIntoViewTimeout = setTimeout(function () {
                try {
                    document.activeElement.scrollIntoViewIfNeeded();
                } catch (e) {}
            }, 100);
        }
    };

    this.onBlur = function () {
        // setTimeout(() => {
        //     this.setState({
        //         focus: false
        //     })
        // }, 0)
        if (_this3.props.onBlur) {
            _this3.props.onBlur(_this3.state.value);
        }
    };

    this.onClear = function (e) {
        e.preventDefault();
        _this3.setState({
            value: ''
        });

        if (_this3.props.onClear) {
            _this3.props.onClear('');
        }
        if (_this3.props.onChange) {
            _this3.props.onChange('');
        }
        setTimeout(function () {
            _this3.refs.searchInput.focus();
        }, 0);
    };

    this.onCancel = function () {
        if (_this3.props.onCancel) {
            _this3.props.onCancel(_this3.state.value);
        } else {
            _this3.onClear();
        }
        _this3.refs.searchInput.blur();
    };
};

var _default = SearchBar;
exports.default = _default;
;

(function () {
    var reactHotLoader = require('react-hot-loader').default;

    var leaveModule = require('react-hot-loader').leaveModule;

    if (!reactHotLoader) {
        return;
    }

    reactHotLoader.register(noop, 'noop', 'components/SearchBar/index.js');
    reactHotLoader.register(SearchBar, 'SearchBar', 'components/SearchBar/index.js');
    reactHotLoader.register(_default, 'default', 'components/SearchBar/index.js');
    leaveModule(module);
})();

;