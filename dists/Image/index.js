'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
    var enterModule = require('react-hot-loader').enterModule;

    enterModule && enterModule(module);
})(); /**
       * Created by beilunyang on 2018/9/3
       */


var imgMap = {
    'loading-blue': require('./loading-blue.png'),
    'loading-white': require('./loading-white.png')
};

var Image = function Image(_ref) {
    var name = _ref.name,
        restProps = (0, _objectWithoutProperties3.default)(_ref, ['name']);

    var keys = (0, _keys2.default)(imgMap);
    if (keys.indexOf(name) === -1) {
        console.warn('the img name ' + name + ' is not existed');
        return null;
    }

    return _react2.default.createElement('img', (0, _extends3.default)({
        src: imgMap[name]
    }, restProps));
};

var _default = Image;
exports.default = _default;
;

(function () {
    var reactHotLoader = require('react-hot-loader').default;

    var leaveModule = require('react-hot-loader').leaveModule;

    if (!reactHotLoader) {
        return;
    }

    reactHotLoader.register(imgMap, 'imgMap', 'components/Image/index.js');
    reactHotLoader.register(Image, 'Image', 'components/Image/index.js');
    reactHotLoader.register(_default, 'default', 'components/Image/index.js');
    leaveModule(module);
})();

;