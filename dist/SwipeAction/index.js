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

// el.matches 是否包含某个classname
function closest(el, selector) {
    var matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;

    while (el) {
        if (matchesSelector.call(el, selector)) {
            return el;
        } else {
            el = el.parentElement;
        }
    }
    return null;
}

var SwipeAction = function (_Component) {
    (0, _inherits3.default)(SwipeAction, _Component);

    function SwipeAction(props) {
        (0, _classCallCheck3.default)(this, SwipeAction);

        var _this = (0, _possibleConstructorReturn3.default)(this, (SwipeAction.__proto__ || (0, _getPrototypeOf2.default)(SwipeAction)).call(this, props));

        _this.onCloseSwipe = function (ev) {
            var pNode = closest(ev.target, '.' + _this.props.prefixCls + '-actions');
            if (!pNode) {
                // ev.preventDefault(); // TODO 注意除chrome外的浏览器不阻止默认事件是否有问题
                _this.close();
            }
        };

        _this.onTouchStart = function (e) {
            if (e.touches && e.touches.length > 1) {
                return;
            }

            _this.swiping = true;

            _this.startPoint = getGesturePointFromEvent(e);
        };

        _this.onTouchMove = function (e) {
            if (!_this.swiping) {
                return;
            }
            _this.endPoint = getGesturePointFromEvent(e);

            var _this$getMoveStatus = _this.getMoveStatus(),
                direction = _this$getMoveStatus.direction,
                moveX = _this$getMoveStatus.moveX;

            var _this$props = _this.props,
                left = _this$props.left,
                right = _this$props.right;
            // 显示方向和滑动方向是相反的

            _this.needShowRight = direction === 'left' && right && right.length > 0;
            _this.needShowLeft = direction === 'right' && left && left.length > 0;

            // 如果只触发了touchStart 关闭时也要有动画
            // 开始滑动时 transition需要设置为none, 只触发touchStart时不能设置transition
            if (direction !== 'none') {
                _this.setState({ swiping: true });
            }

            _this.setStyle(moveX);
        };

        _this.onTouchEnd = function () {
            if (!_this.swiping) {
                return;
            }
            var moveX = _this.endPoint.x - _this.startPoint.x;

            var needOpenRight = _this.needShowRight && Math.abs(moveX) > _this.btnsRightWidth / 2;
            var needOpenLeft = _this.needShowLeft && Math.abs(moveX) > _this.btnsLeftWidth / 2;

            if (needOpenRight) {
                _this.openRight();
            } else if (needOpenLeft) {
                _this.openLeft();
            } else {
                _this.close();
            }

            _this.setState({ swiping: false });
            _this.swiping = false;
            _this.needShowRight = false;
            _this.needShowLeft = false;
        };

        _this.setStyle = function (value) {
            window.requestAnimationFrame(function () {
                var limit = value > 0 ? _this.btnsLeftWidth : -_this.btnsRightWidth;
                var translateLeft = Math.abs(value) > Math.abs(limit) ? limit : value;
                var transform = 'translate3d(' + translateLeft + 'px, 0px, 0px)';
                _this.content.style.transform = transform;
            });
        };

        _this.openRight = function () {
            _this.open(-_this.btnsRightWidth, false, true);
        };

        _this.openLeft = function () {
            _this.open(_this.btnsLeftWidth);
        };

        _this.open = function (value, openedLeft, openedRight) {
            if (!_this.openLeft && !_this.openedRight && _this.props.onOpen) {
                _this.props.onOpen();
            }

            _this.openedLeft = openedLeft;
            _this.openedRight = openedRight;
            _this.setStyle(value);
        };

        _this.close = function () {
            if ((_this.openedLeft || _this.openedRight) && _this.props.onClose) {
                _this.props.onClose();
            }
            _this.setStyle(0);
            _this.openedLeft = false;
            _this.openedRight = false;
        };

        _this.getMoveStatus = function () {
            var startPoint = _this.startPoint,
                endPoint = _this.endPoint;

            var moveX = endPoint.x - startPoint.x;
            var direction = 'none';

            if (moveX > 0) {
                direction = 'right';
            } else if (moveX < 0) {
                direction = 'left';
            }

            return {
                direction: direction,
                moveX: moveX
            };
        };

        _this.content = null;
        _this.left = null;
        _this.right = null;

        _this.btnsLeftWidth = 0;
        _this.btnsRightWidth = 0;
        _this.openedLeft = false;
        _this.openedRight = false;

        _this.swiping = false;

        _this.startPoint = {};
        _this.endPoint = {};

        _this.state = {
            swiping: false // 开始滑动，修改content的样式
        };
        return _this;
    }

    (0, _createClass3.default)(SwipeAction, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.btnsLeftWidth = this.left ? this.left.offsetWidth : 0;
            this.btnsRightWidth = this.right ? this.right.offsetWidth : 0;
            document.body.addEventListener('touchstart', this.onCloseSwipe, true);
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            document.body.removeEventListener('touchstart', this.onCloseSwipe, true);
        }

        // touchEnd 获取不到 e.targetTouches


        // 设置 translate3d


        /**
         * 返回移动方向和移动距离
         * @returns {{direction: string, moveX: number}}
         */

    }, {
        key: 'onBtnClick',
        value: function onBtnClick(e, btn) {
            if (btn.onPress) {
                btn.onPress(e);
            }
            if (this.props.autoClose) {
                this.close();
            }
        }
    }, {
        key: 'renderBtns',
        value: function renderBtns(btns, _ref) {
            var _this2 = this;

            var prefixCls = this.props.prefixCls;

            if (btns && btns.length > 0) {
                return _react2.default.createElement(
                    'div',
                    {
                        className: prefixCls + '-actions ' + prefixCls + '-actions-' + _ref,
                        ref: function ref(el) {
                            return _this2[_ref] = el;
                        }
                    },
                    btns.map(function (btn, i) {
                        return _react2.default.createElement(
                            'div',
                            {
                                key: i,
                                className: prefixCls + '-btn',
                                style: btn.style,
                                role: 'button',
                                onClick: function onClick(e) {
                                    return _this2.onBtnClick(e, btn);
                                } },
                            _react2.default.createElement(
                                'span',
                                { className: prefixCls + '-btn-text' },
                                btn.text || 'Click'
                            )
                        );
                    })
                );
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var _props = this.props,
                children = _props.children,
                left = _props.left,
                right = _props.right,
                prefixCls = _props.prefixCls;


            var cls = (0, _classnames2.default)((0, _defineProperty3.default)({
                'yh-swipe': true
            }, prefixCls + '-swiping', this.state.swiping));

            return _react2.default.createElement(
                'div',
                { className: cls },
                this.renderBtns(left, 'left'),
                this.renderBtns(right, 'right'),
                _react2.default.createElement(
                    'div',
                    {
                        ref: function ref(el) {
                            _this3.content = el;
                        },
                        className: 'yh-swipe-content',
                        onTouchStart: this.onTouchStart,
                        onTouchMove: this.onTouchMove,
                        onTouchEnd: this.onTouchEnd,
                        onTouchCancel: this.onTouchCancel
                    },
                    children
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
    return SwipeAction;
}(_react.Component);

SwipeAction.defaultProps = {
    prefixCls: 'yh-swipe',
    left: [],
    right: [],
    autoClose: false,
    onOpen: function onOpen() {},
    onClose: function onClose() {}
};
SwipeAction.propTypes = {
    prefixCls: _propTypes2.default.string,
    left: _propTypes2.default.array,
    right: _propTypes2.default.array,
    autoClose: _propTypes2.default.bool,
    onOpen: _propTypes2.default.func,
    onClose: _propTypes2.default.func
};
var _default = SwipeAction;
exports.default = _default;
;

(function () {
    var reactHotLoader = require('react-hot-loader').default;

    var leaveModule = require('react-hot-loader').leaveModule;

    if (!reactHotLoader) {
        return;
    }

    reactHotLoader.register(getGesturePointFromEvent, 'getGesturePointFromEvent', 'components/SwipeAction/index.js');
    reactHotLoader.register(closest, 'closest', 'components/SwipeAction/index.js');
    reactHotLoader.register(SwipeAction, 'SwipeAction', 'components/SwipeAction/index.js');
    reactHotLoader.register(_default, 'default', 'components/SwipeAction/index.js');
    leaveModule(module);
})();

;