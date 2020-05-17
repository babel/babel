var _client = babelHelpers.classPrivateFieldLooseKey("client");

var Foo = function Foo(props) {
  "use strict";

  babelHelpers.classCallCheck(this, Foo);
  Object.defineProperty(this, _client, {
    writable: true,
    value: void 0
  });
  [babelHelpers.classPrivateFieldLooseBase(this, _client)[_client] = 5] = props;
};
