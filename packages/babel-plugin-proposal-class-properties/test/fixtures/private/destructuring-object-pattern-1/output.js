var _client = new WeakMap();

var Foo = function Foo(props) {
  "use strict";

  babelHelpers.classCallCheck(this, Foo);

  _client.set(this, {
    writable: true,
    value: void 0
  });

  babelHelpers.classPrivateFieldSet(this, _client, 'foo');
  ({
    x: this.x = babelHelpers.classPrivateFieldGet(this, _client),
    y: babelHelpers.classPrivateFieldDestructureSet(this, _client).value,
    z: this.z = babelHelpers.classPrivateFieldGet(this, _client)
  } = props);
};
