import net from 'net';
import { EventEmitter } from 'events';
import BinarySerializer from './helpers/binary-serializer';
// import ...
var Connection = /*#__PURE__*/function (_EventEmitter) {
  function Connection(endpoint, joinKey, joinData, roomId) {
    var _this;
    babelHelpers.classCallCheck(this, Connection);
    _this = babelHelpers.callSuper(this, Connection);
    _this.isConnected = false;
    _this.roomId = roomId;

    // ...
    return _this;
  }
  babelHelpers.inherits(Connection, _EventEmitter);
  return babelHelpers.createClass(Connection, [{
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
}(EventEmitter);
export { Connection as default };
