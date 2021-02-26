var Foo = function Foo(props) {
  "use strict";

  babelHelpers.classCallCheck(this, Foo);
  ({
    client: babelHelpers.classStaticPrivateFieldDestructureSet(Foo, Foo, _client).value
  } = props);
};

var _client = {
  writable: true,
  value: void 0
};
