var _client = /*#__PURE__*/new WeakMap();
var Foo = /*#__PURE__*/babelHelpers.createClass(function Foo(props) {
  "use strict";

  babelHelpers.classCallCheck(this, Foo);
  babelHelpers.classPrivateFieldInitSpec(this, _client, {
    writable: true,
    value: void 0
  });
  babelHelpers.classPrivateFieldSet(this, _client, 'foo');
  ({
    x: this.x = babelHelpers.classPrivateFieldGet(this, _client),
    y: babelHelpers.classPrivateFieldDestructureSet(this, _client).value,
    z: this.z = babelHelpers.classPrivateFieldGet(this, _client)
  } = props);
});
