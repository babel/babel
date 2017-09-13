"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return _get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } }

var Test = function Test() {
  var _this2 = this;

  _classCallCheck(this, Test);

  var Other =
  /*#__PURE__*/
  function (_Test) {
    _inherits(Other, _Test);

    function Other() {
      var _ref;

      var _temp, _this;

      _classCallCheck(this, Other);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _possibleConstructorReturn(_this, (_temp = _this = _possibleConstructorReturn(this, (_ref = Other.__proto__ || Object.getPrototypeOf(Other)).call.apply(_ref, [this].concat(args))), Object.defineProperty(_this, "a", {
        configurable: true,
        enumerable: true,
        writable: true,
        value: function value() {
          return _get(Other.prototype.__proto__ || Object.getPrototypeOf(Other.prototype), "test", _this);
        }
      }), _temp));
    }

    return Other;
  }(Test);

  Object.defineProperty(Other, "a", {
    configurable: true,
    enumerable: true,
    writable: true,
    value: function value() {
      return _get(Test.prototype.__proto__ || Object.getPrototypeOf(Test.prototype), "test", _this2);
    }
  });
};
