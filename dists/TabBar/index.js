'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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

require('./index.less');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
    var enterModule = require('react-hot-loader').enterModule;

    enterModule && enterModule(module);
})(); /**
       * @author zhangyi
       * @date 2018/9/5
       */


var TabBar = function (_Component) {
    (0, _inherits3.default)(TabBar, _Component);

    function TabBar(props) {
        (0, _classCallCheck3.default)(this, TabBar);

        var _this = (0, _possibleConstructorReturn3.default)(this, (TabBar.__proto__ || (0, _getPrototypeOf2.default)(TabBar)).call(this, props));

        _this.onTabClick = function (activeIndex, item) {
            if (activeIndex === _this.state.activeIndex) {
                return;
            }

            _this.setState({
                activeIndex: activeIndex
            });
            if (_this.props.onChange) {
                _this.props.onChange(activeIndex, item);
            }
        };

        _this.state = {
            activeIndex: props.defaultActiveIndex || 0
        };
        return _this;
    }

    (0, _createClass3.default)(TabBar, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if (!!nextProps.defaultActiveIndex || nextProps.defaultActiveIndex == 0) {
                this.setState({
                    activeIndex: nextProps.defaultActiveIndex
                });
            }
        }
    }, {
        key: 'renderTabs',
        value: function renderTabs() {
            var _this2 = this;

            var _props = this.props,
                prefixCls = _props.prefixCls,
                items = _props.items,
                tintColor = _props.tintColor,
                unselectedTintColor = _props.unselectedTintColor;


            var activeIndex = this.state.activeIndex;

            return items.map(function (item, index) {
                var _classNames;

                var color = activeIndex === index ? tintColor : unselectedTintColor;
                var cls = (0, _classnames2.default)((_classNames = {}, (0, _defineProperty3.default)(_classNames, prefixCls + '-tab', true), (0, _defineProperty3.default)(_classNames, prefixCls + '-tab-active', activeIndex === index), _classNames));
                return _react2.default.createElement(
                    'div',
                    {
                        className: cls,
                        style: { color: color },
                        key: index,
                        onClick: _this2.onTabClick.bind(_this2, index, item) },
                    _react2.default.createElement(
                        'span',
                        null,
                        item
                    )
                );
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _classNames2;

            var _props2 = this.props,
                prefixCls = _props2.prefixCls,
                tabBarPosition = _props2.tabBarPosition,
                className = _props2.className,
                style = _props2.style,
                barTintColor = _props2.barTintColor,
                items = _props2.items,
                tintColor = _props2.tintColor,
                underline = _props2.underline;
            var activeIndex = this.state.activeIndex;


            var wrapCls = (0, _classnames2.default)((_classNames2 = {}, (0, _defineProperty3.default)(_classNames2, prefixCls, true), (0, _defineProperty3.default)(_classNames2, className, className), (0, _defineProperty3.default)(_classNames2, prefixCls + '-top', tabBarPosition === 'top'), (0, _defineProperty3.default)(_classNames2, prefixCls + '-bottom', tabBarPosition === 'bottom'), (0, _defineProperty3.default)(_classNames2, prefixCls + '-line', underline), _classNames2));

            var wrapSty = (0, _extends3.default)({}, style, {
                backgroundColor: barTintColor
            });

            var len = items.length;
            var width = 100 / len;
            var underSty = {
                width: width + '%',
                left: width * activeIndex + '%',
                borderColor: tintColor || ''
            };

            return _react2.default.createElement(
                'div',
                { className: wrapCls, style: wrapSty },
                this.renderTabs(),
                underline && _react2.default.createElement('div', { className: prefixCls + '-underline', ref: 'underline', style: underSty })
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
    return TabBar;
}(_react.Component);

TabBar.defaultProps = {
    prefixCls: 'yh-tab-bar',
    tabBarPosition: 'top',
    className: '',
    style: null,
    items: [],
    barTintColor: '', //tabbar 背景色
    tintColor: '', //选中的字体颜色
    unselectedTintColor: '', //未选中的字体颜色
    defaultActiveIndex: 0, //默认选中第几个
    underline: true,
    onChange: function onChange() {}
};
TabBar.propTypes = {
    prefixCls: _propTypes2.default.string,
    tabBarPosition: _propTypes2.default.string,
    className: _propTypes2.default.string,
    style: _propTypes2.default.object,
    items: _propTypes2.default.array,
    barTintColor: _propTypes2.default.string, //tabbar 背景色
    tintColor: _propTypes2.default.string, //选中的字体颜色
    unselectedTintColor: _propTypes2.default.string, //未选中的字体颜色
    defaultActiveIndex: _propTypes2.default.number, //默认选中第几个
    underline: _propTypes2.default.bool, // 是否有上下边线和指示器
    onChange: _propTypes2.default.func
};
var _default = TabBar;
exports.default = _default;
;

(function () {
    var reactHotLoader = require('react-hot-loader').default;

    var leaveModule = require('react-hot-loader').leaveModule;

    if (!reactHotLoader) {
        return;
    }

    reactHotLoader.register(TabBar, 'TabBar', 'components/TabBar/index.js');
    reactHotLoader.register(_default, 'default', 'components/TabBar/index.js');
    leaveModule(module);
})();

;