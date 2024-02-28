var _client = /*#__PURE__*/babelHelpers.classPrivateFieldLooseKey("client");
var Foo = /*#__PURE__*/babelHelpers.createClass(function Foo(props) {
  "use strict";

  babelHelpers.classCallCheck(this, Foo);
  Object.defineProperty(this, _client, {
    writable: true,
    value: void 0
  });
  babelHelpers.classPrivateFieldLoose(this, _client, 1)[_client] = 'foo';
  ({
    x: this.x = babelHelpers.classPrivateFieldLoose(this, _client),
    y: babelHelpers.classPrivateFieldLoose(this, _client, 1)[_client],
    z: this.z = babelHelpers.classPrivateFieldLoose(this, _client)
  } = props);
});
