'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
    var enterModule = require('react-hot-loader').enterModule;

    enterModule && enterModule(module);
})();

var LazyRenderBox = function (_Component) {
    (0, _inherits3.default)(LazyRenderBox, _Component);

    function LazyRenderBox(props) {
        (0, _classCallCheck3.default)(this, LazyRenderBox);
        return (0, _possibleConstructorReturn3.default)(this, (LazyRenderBox.__proto__ || (0, _getPrototypeOf2.default)(LazyRenderBox)).call(this, props));
    }

    (0, _createClass3.default)(LazyRenderBox, [{
        key: 'render',
        value: function render() {
            var className = this.props.className;
            var props = (0, _assign2.default)({}, this.props);
            delete props.visible;
            props.className = className;

            return _react2.default.createElement('div', props);
        }
    }, {
        key: '__reactstandin__regenerateByEval',
        // @ts-ignore
        value: function __reactstandin__regenerateByEval(key, code) {
            // @ts-ignore
            this[key] = eval(code);
        }
    }]);
    return LazyRenderBox;
}(_react.Component);

var _default = LazyRenderBox;
exports.default = _default;
;

(function () {
    var reactHotLoader = require('react-hot-loader').default;

    var leaveModule = require('react-hot-loader').leaveModule;

    if (!reactHotLoader) {
        return;
    }

    reactHotLoader.register(LazyRenderBox, 'LazyRenderBox', 'components/Dialog/LazyRenderBox.js');
    reactHotLoader.register(_default, 'default', 'components/Dialog/LazyRenderBox.js');
    leaveModule(module);
})();

;