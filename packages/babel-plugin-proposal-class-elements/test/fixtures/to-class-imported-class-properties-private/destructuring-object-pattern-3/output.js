var _client = /*#__PURE__*/new WeakMap();

var Foo = function Foo(props) {
  "use strict";

  babelHelpers.classCallCheck(this, Foo);

  _client.set(this, void 0);

  ({
    x: babelHelpers.classInstancePrivateFieldDestructureSet2(this, _client)._ = 5
  } = props);
};
