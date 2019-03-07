'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

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
})();

var Tag = function (_PureComponent) {
    (0, _inherits3.default)(Tag, _PureComponent);

    function Tag(props) {
        (0, _classCallCheck3.default)(this, Tag);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Tag.__proto__ || (0, _getPrototypeOf2.default)(Tag)).call(this, props));

        _this.onClick = function () {
            var _this$props = _this.props,
                readonly = _this$props.readonly,
                onChange = _this$props.onChange;

            if (readonly) {
                return;
            }

            var isSelect = _this.state.selected;
            _this.setState({
                selected: !isSelect
            }, function () {
                if (onChange) {
                    onChange(!isSelect);
                }
            });
        };

        _this.state = {
            selected: props.selected
        };
        return _this;
    }

    (0, _createClass3.default)(Tag, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if (this.props.selected !== nextProps.selected) {
                this.setState({
                    selected: nextProps.selected
                });
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _classNames;

            var _props = this.props,
                prefixCls = _props.prefixCls,
                className = _props.className,
                readonly = _props.readonly,
                fill = _props.fill,
                color = _props.color,
                children = _props.children,
                style = _props.style,
                size = _props.size,
                textColor = _props.textColor,
                textStyle = _props.textStyle,
                activeColor = _props.activeColor,
                restProps = (0, _objectWithoutProperties3.default)(_props, ['prefixCls', 'className', 'readonly', 'fill', 'color', 'children', 'style', 'size', 'textColor', 'textStyle', 'activeColor']);

            var selected = this.state.selected;
            var sty = {};
            var textSty = {};

            if (fill) {
                sty = {
                    backgroundColor: selected ? activeColor : color,
                    border: '1px solid ' + color
                };
                textSty = {
                    color: textColor ? textColor : '#ffffff'
                };
            } else {
                sty = {
                    borderColor: selected ? activeColor : color
                };
                textSty = {
                    color: selected ? activeColor : color
                };
            }

            var sizeSty = {
                fontSize: size + 'px'
            };

            var tagCls = (0, _classnames2.default)((_classNames = {}, (0, _defineProperty3.default)(_classNames, prefixCls, true), (0, _defineProperty3.default)(_classNames, className, className), _classNames));

            var styles = (0, _assign2.default)({}, sty, style);
            var textStyles = (0, _assign2.default)({}, textSty, textStyle, sizeSty);

            if (readonly) {
                return _react2.default.createElement(
                    'div',
                    { className: tagCls },
                    _react2.default.createElement(
                        'div',
                        { className: prefixCls + '-content', style: styles },
                        _react2.default.createElement(
                            'div',
                            restProps,
                            _react2.default.createElement(
                                'div',
                                { className: prefixCls + '-text', style: textStyles },
                                children
                            )
                        )
                    )
                );
            } else {
                return _react2.default.createElement(
                    'div',
                    { className: tagCls },
                    _react2.default.createElement(
                        'div',
                        { className: prefixCls + '-content', style: styles, onClick: this.onClick },
                        _react2.default.createElement(
                            'div',
                            restProps,
                            _react2.default.createElement(
                                'div',
                                { className: prefixCls + '-text', style: textStyles },
                                children
                            )
                        )
                    )
                );
            }
        }
    }, {
        key: '__reactstandin__regenerateByEval',
        // @ts-ignore
        value: function __reactstandin__regenerateByEval(key, code) {
            // @ts-ignore
            this[key] = eval(code);
        }
    }]);
    return Tag;
}(_react.PureComponent);

Tag.defaultProps = {
    prefixCls: 'yh-tag',
    className: '',
    readonly: true,
    fill: false,
    color: '#666',
    textColor: '',
    activeColor: '#24A8E8',
    style: null,
    size: 16,
    selected: false
};
Tag.propTypes = {
    prefixCls: _propTypes2.default.string,
    className: _propTypes2.default.string,
    readonly: _propTypes2.default.bool,
    fill: _propTypes2.default.bool,
    color: _propTypes2.default.string,
    textColor: _propTypes2.default.string,
    activeColor: _propTypes2.default.string,
    style: _propTypes2.default.object,
    size: _propTypes2.default.number,
    selected: _propTypes2.default.bool
};
var _default = Tag;
exports.default = _default;
;

(function () {
    var reactHotLoader = require('react-hot-loader').default;

    var leaveModule = require('react-hot-loader').leaveModule;

    if (!reactHotLoader) {
        return;
    }

    reactHotLoader.register(Tag, 'Tag', 'components/Tag/index.js');
    reactHotLoader.register(_default, 'default', 'components/Tag/index.js');
    leaveModule(module);
})();

;