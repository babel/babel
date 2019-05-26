var Foo = function Foo(props) {
  "use strict";

  babelHelpers.classCallCheck(this, Foo);

  _client.set(this, {
    writable: true,
    value: void 0
  });

  ;
  [x, ...babelHelpers.classPrivateFieldDestructureSet(this, _client).value] = props;
};

var _client = new WeakMap();
