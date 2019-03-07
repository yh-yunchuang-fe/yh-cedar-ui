'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

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

var _reactAddonsCssTransitionGroup = require('react-addons-css-transition-group');

var _reactAddonsCssTransitionGroup2 = _interopRequireDefault(_reactAddonsCssTransitionGroup);

var _utils = require('./utils');

require('./index.less');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
    var enterModule = require('react-hot-loader').enterModule;

    enterModule && enterModule(module);
})();
// import TransitionGroup from 'react-transition-group/TransitionGroup'


var Animation = function (_Component) {
    (0, _inherits3.default)(Animation, _Component);

    function Animation(props) {
        (0, _classCallCheck3.default)(this, Animation);
        return (0, _possibleConstructorReturn3.default)(this, (Animation.__proto__ || (0, _getPrototypeOf2.default)(Animation)).call(this, props));
    }

    (0, _createClass3.default)(Animation, [{
        key: 'componentWillAppear',


        /**
         * 动画的生命周期
         */
        value: function componentWillAppear() {
            console.log('componentWillAppear');
        }
    }, {
        key: 'componentDidAppear',
        value: function componentDidAppear() {}

        // componentWillEnter () {}
        //
        // componentDidEnter () {
        //     console.log('componentDidEnter')
        // }

    }, {
        key: 'componentWillLeave',
        value: function componentWillLeave() {
            console.log('componentWillLeave');
        }
    }, {
        key: 'componentDidLeave',
        value: function componentDidLeave() {
            console.log('componentDidLeave');
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                children = _props.children,
                other = (0, _objectWithoutProperties3.default)(_props, ['children']);

            var newChildren = (0, _utils.toArrayChildren)((0, _utils.getChildrenFromProps)(children));
            var node = newChildren.map(function (child) {
                if (child === null || child === undefined) {
                    return child;
                }
                if (!child.key) {
                    throw new Error('must set key for <animation> children');
                }
                return child;
            });
            return _react2.default.createElement(
                _reactAddonsCssTransitionGroup2.default,
                other,
                node
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
    return Animation;
}(_react.Component);

Animation.propTypes = {
    children: _propTypes2.default.any,
    component: _propTypes2.default.any,
    transitionName: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.object]),
    transitionEnter: _propTypes2.default.bool,
    transitionAppear: _propTypes2.default.bool,
    transitionLeave: _propTypes2.default.bool,
    transitionEnterTimeout: _propTypes2.default.number,
    transitionAppearTimeout: _propTypes2.default.number,
    transitionLeaveTimeout: _propTypes2.default.number
};
Animation.defaultProps = {
    component: 'span',
    transitionName: 'yh-zoom',
    transitionEnter: true,
    transitionAppear: true,
    transitionLeave: true,
    transitionEnterTimeout: 200,
    transitionAppearTimeout: 200,
    transitionLeaveTimeout: 200 };
var _default = Animation;
exports.default = _default;
;

(function () {
    var reactHotLoader = require('react-hot-loader').default;

    var leaveModule = require('react-hot-loader').leaveModule;

    if (!reactHotLoader) {
        return;
    }

    reactHotLoader.register(Animation, 'Animation', 'components/Animation/index.js');
    reactHotLoader.register(_default, 'default', 'components/Animation/index.js');
    leaveModule(module);
})();

;