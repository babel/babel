"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _net = babelHelpers.interopRequireDefault(require("net"));

var _events = require("events");

var _binarySerializer = babelHelpers.interopRequireDefault(require("./helpers/binary-serializer"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = babelHelpers.getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = babelHelpers.getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return babelHelpers.possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

// import ...
var Connection = /*#__PURE__*/function (_EventEmitter) {
  babelHelpers.inherits(Connection, _EventEmitter);

  var _super = _createSuper(Connection);

  function Connection(endpoint, joinKey, joinData, roomId) {
    var _this;

    babelHelpers.classCallCheck(this, Connection);
    _this = _super.call(this);
    _this.isConnected = false;
    _this.roomId = roomId; // ...

    return _this;
  }

  babelHelpers.createClass(Connection, [{
    key: "send",
    value: function send(message) {
      this.sock.write(_binarySerializer.default.serializeMessage(message));
    }
  }, {
    key: "disconnect",
    value: function disconnect() {
      this.sock.close();
    }
  }]);
  return Connection;
}(_events.EventEmitter);

exports.default = Connection;
