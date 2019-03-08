'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

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

var _utils = require('../../src/utils');

require('./index.less');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
    var enterModule = require('react-hot-loader').enterModule;

    enterModule && enterModule(module);
})(); /**
       * Created by zhangyi on 2017/11/2.
       */


function getGesturePointFromEvent(evt) {
    var point = {};

    if (evt.targetTouches && evt.targetTouches.length > 0) {
        // Prefer Touch Events
        point.x = evt.targetTouches[0].clientX;
        point.y = evt.targetTouches[0].clientY;
    } else {
        // Either Mouse event or Pointer Event
        point.x = evt.clientX;
        point.y = evt.clientY;
    }

    return point;
}

var PickerColumn = function (_Component) {
    (0, _inherits3.default)(PickerColumn, _Component);

    function PickerColumn(props) {
        (0, _classCallCheck3.default)(this, PickerColumn);

        var _this = (0, _possibleConstructorReturn3.default)(this, (PickerColumn.__proto__ || (0, _getPrototypeOf2.default)(PickerColumn)).call(this, props));

        _initialiseProps.call(_this);

        _this.state = {
            init: true,
            isMoving: false,
            translateY: 0,
            startTranslateY: 0,
            startTouchY: 0,
            maxTranslateY: 0,
            minTranslateY: 0
        };
        return _this;
    }

    (0, _createClass3.default)(PickerColumn, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var prefixCls = this.props.prefixCls;


            this.columnHeight = this.column.getBoundingClientRect().height;
            this.itemHeight = document.querySelector('.' + prefixCls + '-col-item').getBoundingClientRect().height;

            this.computeTranslate(this.props);
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if (this.state.isMoving) {
                return;
            }
            this.computeTranslate(nextProps);
        }

        // 每个月的日期数不同，需要重新触发render
        // shouldComponentUpdate (nextProps, nextState) {
        //     const state = this.state
        //     /* &&
        //      state.startTouchY === nextState.startTouchY*/
        //     if (state.isMoving === nextState.isMoving &&
        //         state.translateY === nextState.translateY) {
        //         return false
        //     }
        //     return true
        // }

        // 计算初始的translate

    }, {
        key: 'renderItems',
        value: function renderItems() {
            var _props = this.props,
                prefixCls = _props.prefixCls,
                options = _props.options,
                value = _props.value;


            return options.map(function (option, index) {
                var curValue = '';
                var label = '';
                if ((0, _utils.isObject)(option)) {
                    curValue = option.value;
                    label = option.label;
                } else {
                    curValue = option;
                    label = option;
                }

                var className = prefixCls + '-col-item';
                if (curValue === value) {
                    className = className + (' ' + prefixCls + '-col-item-selected');
                }
                return _react2.default.createElement(
                    'div',
                    {
                        key: index,
                        className: className,
                        value: curValue },
                    label
                );
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var prefixCls = this.props.prefixCls;


            var style = {
                transform: 'translate3d(0, ' + this.state.translateY + 'px, 0)'
                // 初始化时不要有延迟
            };if (!this.state.init) {
                style.transition = 'cubic-bezier(0,0,0.2,1.15) .3s';
            }

            return _react2.default.createElement(
                'div',
                { className: prefixCls + '-col', ref: function ref(_ref) {
                        _this2.column = _ref;
                    },
                    onTouchStart: this.onTouchStart,
                    onTouchMove: this.onTouchMove,
                    onTouchEnd: this.onTouchEnd,
                    onTouchCancel: this.onTouchCancel },
                _react2.default.createElement('div', { className: prefixCls + '-mask' }),
                _react2.default.createElement('div', { className: prefixCls + '-indicator' }),
                _react2.default.createElement(
                    'div',
                    {
                        style: style,
                        className: prefixCls + '-col-scroller',
                        ref: 'scrollRef'
                    },
                    this.renderItems()
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
    return PickerColumn;
}(_react.Component);

PickerColumn.defaultProps = {
    prefixCls: 'yh-picker',
    options: [],
    value: [],
    onChange: function onChange() {}
};

var _initialiseProps = function _initialiseProps() {
    var _this3 = this;

    this.computeTranslate = function (props) {
        var options = props.options,
            value = props.value;
        var columnHeight = _this3.columnHeight,
            itemHeight = _this3.itemHeight;

        // 找到默认选中项

        var selectedIndex = -1;
        options.some(function (cur, index) {
            var curValue = (0, _utils.isObject)(cur) ? cur.value : cur;
            if (curValue === value) {
                selectedIndex = index;
                return true;
            }
        });

        if (selectedIndex < 0) {
            _this3.onSelected(options[0]);
            selectedIndex = 0;
        }

        _this3.setState({
            translateY: columnHeight / 2 - itemHeight / 2 - selectedIndex * itemHeight,
            maxTranslateY: columnHeight / 2 - itemHeight / 2,
            minTranslateY: columnHeight / 2 - itemHeight * options.length + itemHeight / 2
        });
    };

    this.onTouchStart = function (e) {
        _this3.setState({
            init: false,
            startTouchY: e.targetTouches[0].pageY,
            startTranslateY: _this3.state.translateY //缓存拖拽前的Y轴 新的Y值在这个基础加上move距离
        });
    };

    this.onTouchMove = function (e) {
        // 判断默认行为是否可以被禁用
        if (e.cancelable) {
            // 判断默认行为是否已经被禁用
            if (!e.defaultPrevented) {
                e.preventDefault();
            }
        }
        var touchY = e.targetTouches[0].pageY;

        _this3.setState(function (_ref2) {
            var isMoving = _ref2.isMoving,
                startTranslateY = _ref2.startTranslateY,
                startTouchY = _ref2.startTouchY,
                maxTranslateY = _ref2.maxTranslateY,
                minTranslateY = _ref2.minTranslateY;

            // 第一次触发move 设置isMoving为true
            if (!isMoving) {
                return {
                    isMoving: true
                };
            }

            var nextTranslate = startTranslateY + touchY - startTouchY;

            if (nextTranslate < minTranslateY) {
                // nextTranslate = minTranslateY
                // 加滚动弹回效果
                nextTranslate = minTranslateY - Math.pow(minTranslateY - nextTranslate, 0.8);
            } else if (nextTranslate > maxTranslateY) {
                // nextTranslate = maxTranslateY
                nextTranslate = maxTranslateY + Math.pow(nextTranslate - maxTranslateY, 0.8);
            }

            return {
                translateY: nextTranslate
            };
        });
    };

    this.onTouchEnd = function (e) {
        if (!_this3.state.isMoving) {
            return;
        }

        _this3.setState({
            isMoving: false,
            startTouchY: 0,
            startTranslateY: 0
        });

        setTimeout(function () {
            var options = _this3.props.options;
            var _state = _this3.state,
                translateY = _state.translateY,
                minTranslateY = _state.minTranslateY,
                maxTranslateY = _state.maxTranslateY;

            // 计算选中的option

            var activeIndex = void 0;
            if (translateY > maxTranslateY) {
                activeIndex = 0;
            } else if (translateY < minTranslateY) {
                activeIndex = options.length - 1;
            } else {
                activeIndex = -Math.round((translateY - maxTranslateY) / _this3.itemHeight);
            }
            _this3.onSelected(options[activeIndex]);
        }, 0);
    };

    this.onTouchCancel = function (e) {
        if (!_this3.state.isMoving) {
            return;
        }
        _this3.setState(function (_ref3) {
            var startTranslateY = _ref3.startTranslateY;

            return {
                isMoving: false,
                startTouchY: 0,
                translateY: startTranslateY,
                startTranslateY: 0
            };
        });
    };

    this.onSelected = function (option) {
        if (_this3.props.onChange) {
            var value = (0, _utils.isObject)(option) ? option.value : option;
            _this3.props.onChange(value);
        }
    };
};

var _default = PickerColumn;
exports.default = _default;
;

(function () {
    var reactHotLoader = require('react-hot-loader').default;

    var leaveModule = require('react-hot-loader').leaveModule;

    if (!reactHotLoader) {
        return;
    }

    reactHotLoader.register(getGesturePointFromEvent, 'getGesturePointFromEvent', 'components/Picker/PickerColumn.js');
    reactHotLoader.register(PickerColumn, 'PickerColumn', 'components/Picker/PickerColumn.js');
    reactHotLoader.register(_default, 'default', 'components/Picker/PickerColumn.js');
    leaveModule(module);
})();

;