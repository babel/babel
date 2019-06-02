var Foo = function Foo(props) {
  "use strict";

  babelHelpers.classCallCheck(this, Foo);

  _client.set(this, {
    writable: true,
    value: void 0
  });

  [babelHelpers.classPrivateFieldDestructureSet(this, _client).value = 5] = props;
};

var _client = new WeakMap();
