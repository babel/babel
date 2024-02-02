var _client = /*#__PURE__*/new WeakMap();
let Foo = /*#__PURE__*/babelHelpers.createClass(function Foo(props) {
  "use strict";

  babelHelpers.classCallCheck(this, Foo);
  babelHelpers.classPrivateFieldInitSpec(this, _client, void 0);
  babelHelpers.classPrivateFieldSet2(this, _client, 'foo');
  ({
    x: this.x = babelHelpers.classPrivateFieldGet2(this, _client),
    y: babelHelpers.toSetter(babelHelpers.classPrivateFieldSet2, null, this, _client)._,
    z: this.z = babelHelpers.classPrivateFieldGet2(this, _client)
  } = props);
});
