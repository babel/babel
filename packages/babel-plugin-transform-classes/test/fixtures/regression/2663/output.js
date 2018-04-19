"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _net = babelHelpers.interopRequireDefault(require("net"));

var _events = require("events");

var _binarySerializer = babelHelpers.interopRequireDefault(require("./helpers/binary-serializer"));

// import ...
var Connection =
/*#__PURE__*/
function (_EventEmitter) {
  babelHelpers.inherits(Connection, _EventEmitter);

  function Connection(endpoint, joinKey, joinData, roomId) {
    var _this;

    babelHelpers.classCallCheck(this, Connection);
    _this = babelHelpers.possibleConstructorReturn(this, babelHelpers.getPrototypeOf(Connection).call(this));
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
