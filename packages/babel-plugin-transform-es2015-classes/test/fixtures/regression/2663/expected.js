"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;
var net = babelHelpers.interopRequireDefault(require("net"));

var _events = require("events");

var BinarySerializer = babelHelpers.interopRequireDefault(require("./helpers/binary-serializer"));

// import ...
var Connection = function (_EventEmitter) {
  babelHelpers.inherits(Connection, _EventEmitter);

  function Connection(endpoint, joinKey, joinData, roomId) {
    var _this;

    babelHelpers.classCallCheck(this, Connection);
    _this = babelHelpers.possibleConstructorReturn(this, (Connection.__proto__ || Object.getPrototypeOf(Connection)).call(this));
    _this.isConnected = false;
    _this.roomId = roomId; // ...

    return _this;
  }

  babelHelpers.createClass(Connection, [{
    key: "send",
    value: function send(message) {
      this.sock.write(BinarySerializer.serializeMessage(message));
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
