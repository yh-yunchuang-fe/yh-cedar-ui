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

var _Icon = require('../Icon');

var _Icon2 = _interopRequireDefault(_Icon);

require('./index.less');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
    var enterModule = require('react-hot-loader').enterModule;

    enterModule && enterModule(module);
})();

var MultipleLineText = function (_PureComponent) {
    (0, _inherits3.default)(MultipleLineText, _PureComponent);

    function MultipleLineText(props) {
        (0, _classCallCheck3.default)(this, MultipleLineText);

        var _this = (0, _possibleConstructorReturn3.default)(this, (MultipleLineText.__proto__ || (0, _getPrototypeOf2.default)(MultipleLineText)).call(this, props));

        _this.state = {
            height: 'auto',
            needMoreBtn: false,
            showEllipsis: true,
            clientHeight: 'auto'
        };
        return _this;
    }

    (0, _createClass3.default)(MultipleLineText, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            this.init();

            window.onresize = function () {
                clearTimeout(_this2.initTimer);
                _this2.initTimer = setTimeout(function () {
                    _this2.init();
                }, 500);
            };
        }
    }, {
        key: 'init',
        value: function init() {
            var _props$textLine = this.props.textLine,
                textLine = _props$textLine === undefined ? 2 : _props$textLine;


            var clientHeight = this.realText.clientHeight;
            var singleLineHeight = this.testText.clientHeight;
            var height = singleLineHeight * textLine;

            var needMoreBtn = clientHeight > height + 5;

            this.setState({
                needMoreBtn: needMoreBtn,
                showEllipsis: needMoreBtn
            });

            if (needMoreBtn) {
                var clientWidth = this.realText.clientWidth;
                var singleTextWidth = this.testText.clientWidth;
                var ellipsisBtnWidth = this.ellipsisBtn.offsetWidth;

                var fontNum = parseInt(clientWidth / singleTextWidth) * textLine;
                this.originalText = this.originalText || this.text.innerText.toString();
                var ellipsisFontNum = Math.ceil(ellipsisBtnWidth / singleTextWidth);
                var displayFontNum = fontNum - ellipsisFontNum - 2;
                this.displayText = this.originalText.slice(0, displayFontNum) + '...';
                this.text.innerText = this.displayText;
            } else {
                this.originalText = this.originalText || this.text.innerText.toString();
                this.displayText = this.originalText;
                this.text.innerText = this.displayText;
            }

            this.setState({
                height: height,
                clientHeight: clientHeight
            });
        }
    }, {
        key: 'collapseText',
        value: function collapseText() {
            var _this3 = this;

            var height = this.state.height;


            this.setState({
                showEllipsis: true
            });
            setTimeout(function () {
                _this3.text.innerText = _this3.displayText;
            }, 100);
            this.textContainer.style.height = height + 'px';
        }
    }, {
        key: 'expandText',
        value: function expandText() {
            var clientHeight = this.state.clientHeight;


            this.text.innerText = this.originalText;
            this.setState({
                showEllipsis: false
            });
            this.textContainer.style.height = clientHeight + 'px';
        }
    }, {
        key: 'render',
        value: function render() {
            var _this4 = this;

            var _props = this.props,
                children = _props.children,
                className = _props.className,
                style = _props.style,
                ellipsiClassName = _props.ellipsiClassName,
                ellipsisStyle = _props.ellipsisStyle;
            var _state = this.state,
                height = _state.height,
                needMoreBtn = _state.needMoreBtn,
                showEllipsis = _state.showEllipsis;


            return _react2.default.createElement(
                'div',
                {
                    className: 'ml-text-container ' + (className || ''),
                    style: (0, _extends3.default)({}, style, { height: height }),
                    ref: function ref(_ref5) {
                        return _this4.textContainer = _ref5;
                    }
                },
                _react2.default.createElement(
                    'span',
                    { ref: function ref(_ref) {
                            return _this4.text = _ref;
                        } },
                    children
                ),
                _react2.default.createElement(
                    'span',
                    {
                        style: { position: 'absolute', zIndex: -9, left: 0, top: 0, visibility: 'hidden' },
                        ref: function ref(_ref2) {
                            return _this4.realText = _ref2;
                        }
                    },
                    children,
                    _react2.default.createElement(
                        'a',
                        { className: 'ml-ellipsis-btn' },
                        _react2.default.createElement(
                            'span',
                            null,
                            '\u6536\u8D77'
                        ),
                        _react2.default.createElement(_Icon2.default, {
                            name: 'chevron-up',
                            size: 'xxs',
                            color: '#24A8E8',
                            style: { marginLeft: 5 }
                        })
                    )
                ),
                needMoreBtn && !showEllipsis && _react2.default.createElement(
                    'a',
                    {
                        className: 'ml-ellipsis-btn',

                        onClick: this.collapseText.bind(this)
                    },
                    _react2.default.createElement(
                        'span',
                        null,
                        '\u6536\u8D77'
                    ),
                    _react2.default.createElement(_Icon2.default, {
                        name: 'chevron-up',
                        size: 'xxs',
                        color: '#24A8E8',
                        style: { marginLeft: 5 }
                    })
                ),
                showEllipsis && _react2.default.createElement(
                    'span',
                    {
                        className: 'ml-more-container ' + (ellipsiClassName || ''),
                        ref: function ref(_ref3) {
                            return _this4.ellipsisBtn = _ref3;
                        },
                        style: ellipsisStyle
                    },
                    _react2.default.createElement(
                        'a',
                        { className: 'ml-ellipsis-btn', onClick: this.expandText.bind(this) },
                        _react2.default.createElement(
                            'span',
                            null,
                            '\u66F4\u591A'
                        ),
                        _react2.default.createElement(_Icon2.default, {
                            name: 'chevron-down',
                            size: 'xxs',
                            color: '#24A8E8',
                            style: { marginLeft: 5 }
                        })
                    )
                ),
                _react2.default.createElement(
                    'span',
                    { style: { position: 'absolute', zIndex: -1, visibility: 'hidden' }, ref: function ref(_ref4) {
                            return _this4.testText = _ref4;
                        } },
                    '\u6D4B'
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
    return MultipleLineText;
}(_react.PureComponent);

var _default = MultipleLineText;
exports.default = _default;
;

(function () {
    var reactHotLoader = require('react-hot-loader').default;

    var leaveModule = require('react-hot-loader').leaveModule;

    if (!reactHotLoader) {
        return;
    }

    reactHotLoader.register(MultipleLineText, 'MultipleLineText', 'components/MultipleLineText/index.js');
    reactHotLoader.register(_default, 'default', 'components/MultipleLineText/index.js');
    leaveModule(module);
})();

;