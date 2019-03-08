'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

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

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

require('./index.less');

var _reactTransitionGroup = require('react-transition-group');

var _Indicator = require('../Indicator');

var _Indicator2 = _interopRequireDefault(_Indicator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
    var enterModule = require('react-hot-loader').enterModule;

    enterModule && enterModule(module);
})();

var PullToRefresh = function (_Component) {
    (0, _inherits3.default)(PullToRefresh, _Component);

    function PullToRefresh(props) {
        (0, _classCallCheck3.default)(this, PullToRefresh);

        var _this = (0, _possibleConstructorReturn3.default)(this, (PullToRefresh.__proto__ || (0, _getPrototypeOf2.default)(PullToRefresh)).call(this, props));

        _this.onScroll = function (e) {

            var element = e.target;
            var _this$props = _this.props,
                onLoadMore = _this$props.onLoadMore,
                loading = _this$props.loading,
                hasMore = _this$props.hasMore,
                distanceLoadMore = _this$props.distanceLoadMore;
            var _this$state = _this.state,
                refreshing = _this$state.refreshing,
                isLoading = _this$state.isLoading;

            //在刷新、加载更多、外部明确告知无更多消息时，不触发onloadmore

            if (isLoading || loading || refreshing || !hasMore) {
                return;
            }

            var offsetHeight = element.offsetHeight,
                scrollTop = element.scrollTop,
                scrollHeight = element.scrollHeight;


            if (scrollTop >= (scrollHeight - offsetHeight) * distanceLoadMore) {
                _this.setState({ isLoading: true });

                onLoadMore && onLoadMore();
            }
        };

        _this.onMoveStart = function (e) {
            var refreshing = _this.state.refreshing;


            if (refreshing || !!_this.container.scrollTop) {
                return;
            }

            _this.onDrag = true;
            var pos = _this.getEventPos(e);

            _this.setState({
                beginPosY: pos.y
            });
        };

        _this.onMouseMove = function (e) {
            //不在首页，不触发
            if (!_this.onDrag || !!_this.container.scrollTop) {
                return;
            }

            var _this$state2 = _this.state,
                beginPosY = _this$state2.beginPosY,
                refreshing = _this$state2.refreshing;
            var pullRate = _this.props.pullRate;


            if (refreshing) {
                return;
            }

            var pos = _this.getEventPos(e);

            var distance = pos.y - beginPosY;

            if (distance <= 0) {
                return;
            }

            _this.setState({
                endPosY: pos.y,
                distance: distance * pullRate
            });
        };

        _this.onMouseEnd = function (e) {
            if (!!_this.container.scrollTop) {
                return;
            }
            var onRefresh = _this.props.onRefresh;


            _this.onDrag = false;
            var _this$state3 = _this.state,
                beginPosY = _this$state3.beginPosY,
                endPosY = _this$state3.endPosY,
                headerHeight = _this$state3.headerHeight,
                refreshing = _this$state3.refreshing;
            var pullRate = _this.props.pullRate;


            var distance = endPosY - beginPosY;

            if (refreshing) {
                return;
            }

            if (distance * pullRate >= headerHeight) {
                onRefresh && onRefresh();
                _this.setState({
                    beginPosY: null, //设置null是为了区分用户释放手指与其他状态
                    endPosY: null,
                    distance: headerHeight,
                    refreshing: true
                });

                return;
            } else {
                _this.setState({
                    beginPosY: null,
                    endPosY: null,
                    distance: 0
                });
            }
        };

        _this.state = {
            propRefreshing: false, //记录传过来的刷新值
            refreshing: false, //是否在刷新
            headerHeight: 59, //组件头部loading高度, 超过这个高度并且释放手指才会触发刷新
            beginPosY: 0,
            endPosY: 0,
            distance: 0,
            pullingUp: false, //判断是否是手指释放后上拉
            propsLoading: false,
            isLoading: false
        };
        return _this;
    }

    (0, _createClass3.default)(PullToRefresh, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var refreshing = this.props.refreshing;


            this.setState({
                headerHeight: this.header.offsetHeight, //拿到实际的loading高度
                distance: refreshing ? this.header.offsetHeight : 0
            });
        }
    }, {
        key: 'getEventPos',
        value: function getEventPos(e) {
            e.persist();

            var pos = {};

            if (e.targetTouches) {
                pos.x = e.targetTouches[0].clientX;
                pos.y = e.targetTouches[0].clientY;
            } else {
                pos.x = e.clientX;
                pos.y = e.clientY;
            }

            return pos;
        }
    }, {
        key: 'getRefreshText',
        value: function getRefreshText() {
            var _state = this.state,
                beginPosY = _state.beginPosY,
                endPosY = _state.endPosY,
                headerHeight = _state.headerHeight,
                refreshing = _state.refreshing;
            var _props = this.props,
                pullRate = _props.pullRate,
                refershText = _props.refershText,
                downRefreshText = _props.downRefreshText,
                upRefreshText = _props.upRefreshText;


            if (refreshing) {
                return refershText;
            }

            var posY = (endPosY - beginPosY) * pullRate;

            if (posY >= headerHeight) {
                return upRefreshText;
            }

            return downRefreshText;
        }
    }, {
        key: 'setContainerRef',
        value: function setContainerRef(ref) {
            var getComponentRef = this.props.getComponentRef;


            this.container = ref;

            getComponentRef && getComponentRef(ref);
        }
    }, {
        key: 'renderLoading',
        value: function renderLoading() {
            var _this2 = this;

            var _props2 = this.props,
                prefixCls = _props2.prefixCls,
                refershControl = _props2.refershControl,
                duration = _props2.duration;
            var _state2 = this.state,
                headerHeight = _state2.headerHeight,
                distance = _state2.distance,
                pullingUp = _state2.pullingUp;


            var transitionStyles = {
                entering: { transition: '0ms cubic-bezier(0.1, 0.57, 0.1, 1)' },
                entered: { transition: '0ms cubic-bezier(0.1, 0.57, 0.1, 1)' },
                exiting: { transition: duration + 'ms cubic-bezier(0.1, 0.57, 0.1, 1)' },
                exited: { transition: duration + 'ms cubic-bezier(0.1, 0.57, 0.1, 1)' }
            };

            return _react2.default.createElement(
                _reactTransitionGroup.Transition,
                {
                    'in': !pullingUp,
                    timeout: 0
                },
                function (state) {
                    return _react2.default.createElement(
                        'div',
                        {
                            className: prefixCls + '-loading',
                            ref: function ref(_ref) {
                                _this2.header = _ref;
                            },
                            style: (0, _extends3.default)({}, transitionStyles[state], {
                                transform: 'translateY(' + (distance - headerHeight) + 'px' + ')'
                            })
                        },
                        !!refershControl ? refershControl : _react2.default.createElement(_Indicator2.default, {
                            size: 'lg',
                            text: _this2.getRefreshText(),
                            style: {
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                padding: '6px 0'
                            },
                            textStyle: {
                                fontSize: 12,
                                color: '#333',
                                marginLeft: 0,
                                marginTop: '6px'
                            }
                        })
                    );
                }
            );
        }
    }, {
        key: 'renderFooter',
        value: function renderFooter() {
            var _props3 = this.props,
                loading = _props3.loading,
                hasMore = _props3.hasMore,
                prefixCls = _props3.prefixCls,
                footer = _props3.footer,
                footerLoading = _props3.footerLoading;


            if (!hasMore) {
                return _react2.default.createElement(
                    'div',
                    { className: prefixCls + '-footer' },
                    !!footer ? footer : _react2.default.createElement(
                        'span',
                        null,
                        '\u6CA1\u6709\u66F4\u591A\u4E86'
                    )
                );
            }
            if (loading) {
                return _react2.default.createElement(
                    'div',
                    { className: prefixCls + '-footer' },
                    !!footerLoading ? footerLoading : _react2.default.createElement(
                        'span',
                        null,
                        '\u6B63\u5728\u52A0\u8F7D...'
                    )
                );
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _classNames,
                _this3 = this;

            var _props4 = this.props,
                prefixCls = _props4.prefixCls,
                className = _props4.className,
                children = _props4.children,
                style = _props4.style,
                height = _props4.height,
                duration = _props4.duration;
            var _state3 = this.state,
                distance = _state3.distance,
                pullingUp = _state3.pullingUp;


            var cls = (0, _classnames2.default)((_classNames = {}, (0, _defineProperty3.default)(_classNames, prefixCls, true), (0, _defineProperty3.default)(_classNames, className, className), _classNames));

            var sty = (0, _extends3.default)({}, style, {
                height: height
            });

            var transitionStyles = {
                entering: { transition: '0ms cubic-bezier(0.1, 0.57, 0.1, 1)' },
                entered: { transition: '0ms cubic-bezier(0.1, 0.57, 0.1, 1)' },
                exiting: { transition: duration + 'ms cubic-bezier(0.1, 0.57, 0.1, 1)' },
                exited: { transition: duration + 'ms cubic-bezier(0.1, 0.57, 0.1, 1)' }
            };

            return _react2.default.createElement(
                'div',
                {
                    ref: this.setContainerRef.bind(this),
                    className: cls,
                    style: sty,
                    onScroll: this.onScroll,
                    onTouchStart: this.onMoveStart,
                    onTouchMove: this.onMouseMove,
                    onTouchEnd: this.onMouseEnd,
                    onMouseDown: this.onMoveStart,
                    onMouseMove: this.onMouseMove,
                    onMouseUp: this.onMouseEnd
                },
                this.renderLoading(),
                _react2.default.createElement(
                    'div',
                    { className: prefixCls + '-wrap', ref: 'wrap' },
                    _react2.default.createElement(
                        _reactTransitionGroup.Transition,
                        {
                            'in': !pullingUp,
                            timeout: 0
                        },
                        function (state) {
                            return _react2.default.createElement(
                                'div',
                                {
                                    className: prefixCls + '-content',
                                    style: (0, _extends3.default)({}, transitionStyles[state], {
                                        transform: 'translateY(' + distance + 'px' + ')'
                                    })
                                },
                                children,
                                _this3.renderFooter()
                            );
                        }
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
    }], [{
        key: 'getDerivedStateFromProps',
        value: function getDerivedStateFromProps(props, state) {
            var pullingUp = state.endPosY != 0 && !state.endPosY ? true : false;

            if (props.refreshing != state.propRefreshing) {
                //外部组件主动出发刷新状态变更
                if (!props.refreshing) {
                    return (0, _extends3.default)({}, state, {
                        propRefreshing: props.refreshing,
                        refreshing: props.refreshing,
                        beginPosY: null,
                        endPosY: null,
                        distance: 0,
                        pullingUp: true
                    });
                }
                return (0, _extends3.default)({}, state, { distance: state.headerHeight, propRefreshing: props.refreshing, refreshing: props.refreshing, pullingUp: pullingUp });
            } else {
                if (props.loading != state.propsLoading) {
                    return (0, _extends3.default)({}, state, {
                        propsLoading: props.loading,
                        isLoading: props.loading
                    });
                }
                return (0, _extends3.default)({}, state, { pullingUp: pullingUp });
            }
        }
    }]);
    return PullToRefresh;
}(_react.Component);

PullToRefresh.defaultProps = {
    prefixCls: 'yh-pull-refresh',
    className: '',
    style: null,
    height: '',
    distanceLoadMore: 0.5,
    onRefresh: function onRefresh() {},
    onLoadMore: function onLoadMore() {},
    getComponentRef: function getComponentRef() {},
    footer: null,
    footerLoading: null,
    loading: false,
    hasMore: true,
    refreshing: false,
    downRefreshText: '下拉刷新',
    refershText: '加载中',
    upRefreshText: '释放更新',
    refershControl: null,
    pullRate: 0.5,
    duration: 800
};
var _default = PullToRefresh;
exports.default = _default;
;

(function () {
    var reactHotLoader = require('react-hot-loader').default;

    var leaveModule = require('react-hot-loader').leaveModule;

    if (!reactHotLoader) {
        return;
    }

    reactHotLoader.register(PullToRefresh, 'PullToRefresh', 'components/PullToRefresh/index.js');
    reactHotLoader.register(_default, 'default', 'components/PullToRefresh/index.js');
    leaveModule(module);
})();

;