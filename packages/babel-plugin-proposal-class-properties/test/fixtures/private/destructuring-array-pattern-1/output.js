var Foo = function Foo(props) {
  "use strict";

  babelHelpers.classCallCheck(this, Foo);

  _client.set(this, {
    writable: true,
    value: void 0
  });

  babelHelpers.classPrivateFieldSet(this, _client, 1);
  [this.x = babelHelpers.classPrivateFieldGet(this, _client), babelHelpers.classPrivateFieldDestructureSet(this, _client).value, this.y = babelHelpers.classPrivateFieldGet(this, _client)] = props;
};

var _client = new WeakMap();
