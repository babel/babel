var _client = /*#__PURE__*/new WeakMap();
let Foo = /*#__PURE__*/babelHelpers.createClass(function Foo(props) {
  "use strict";

  babelHelpers.classCallCheck(this, Foo);
  babelHelpers.classPrivateFieldInitSpec(this, _client, void 0);
  babelHelpers.classPrivateFieldSet2(_client, this, 'foo');
  ({
    x: this.x = babelHelpers.classPrivateFieldGet2(_client, this),
    y: babelHelpers.toSetter(babelHelpers.classPrivateFieldSet2, [_client, this])._,
    z: this.z = babelHelpers.classPrivateFieldGet2(_client, this)
  } = props);
});
