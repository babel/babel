var _client = /*#__PURE__*/new WeakMap();
let Foo = /*#__PURE__*/babelHelpers.createClass(function Foo(props) {
  "use strict";

  babelHelpers.classCallCheck(this, Foo);
  babelHelpers.classPrivateFieldInitSpec(this, _client, void 0);
  ({
    x: babelHelpers.toSetter(babelHelpers.classPrivateFieldSet2, [_client, this])._ = 5
  } = props);
});
