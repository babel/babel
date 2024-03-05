var _client = /*#__PURE__*/babelHelpers.classPrivateFieldLooseKey("client");
var Foo = /*#__PURE__*/babelHelpers.createClass(function Foo(props) {
  "use strict";

  babelHelpers.classCallCheck(this, Foo);
  Object.defineProperty(this, _client, {
    writable: true,
    value: void 0
  });
  babelHelpers.assertClassBrandLoose(this, _client)[_client] = 'foo';
  ({
    x: this.x = babelHelpers.assertClassBrandLoose(this, _client, 1),
    y: babelHelpers.assertClassBrandLoose(this, _client)[_client],
    z: this.z = babelHelpers.assertClassBrandLoose(this, _client, 1)
  } = props);
});
