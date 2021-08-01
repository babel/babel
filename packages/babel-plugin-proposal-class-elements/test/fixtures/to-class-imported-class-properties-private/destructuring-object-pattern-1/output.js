var _client = /*#__PURE__*/new WeakMap();

var Foo = function Foo(props) {
  "use strict";

  babelHelpers.classCallCheck(this, Foo);

  _client.set(this, void 0);

  babelHelpers.classPrivateFieldSet2(this, _client, 'foo');
  ({
    x: this.x = babelHelpers.classPrivateFieldGet2(this, _client),
    y: babelHelpers.classInstancePrivateFieldDestructureSet2(this, _client)._,
    z: this.z = babelHelpers.classPrivateFieldGet2(this, _client)
  } = props);
};
