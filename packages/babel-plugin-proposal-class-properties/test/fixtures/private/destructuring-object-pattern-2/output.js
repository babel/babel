var Foo = function Foo(props) {
  "use strict";

  var _this$client;

  babelHelpers.classCallCheck(this, Foo);

  _client.set(this, {
    writable: true,
    value: void 0
  });

  ;
  ({
    client: _this$client
  } = props);
  babelHelpers.classPrivateFieldSet(this, _client, _this$client);
};

var _client = new WeakMap();
