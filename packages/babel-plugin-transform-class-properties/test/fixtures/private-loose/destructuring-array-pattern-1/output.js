var _client = /*#__PURE__*/babelHelpers.classPrivateFieldLooseKey("client");
var Foo = /*#__PURE__*/babelHelpers.createClass(function Foo(props) {
  "use strict";

  babelHelpers.classCallCheck(this, Foo);
  Object.defineProperty(this, _client, {
    writable: true,
    value: void 0
  });
  babelHelpers.assertClassBrandLoose(this, _client)[_client] = 1;
  [this.x = babelHelpers.assertClassBrandLoose(this, _client, 1), babelHelpers.assertClassBrandLoose(this, _client)[_client], this.y = babelHelpers.assertClassBrandLoose(this, _client, 1)] = props;
});
