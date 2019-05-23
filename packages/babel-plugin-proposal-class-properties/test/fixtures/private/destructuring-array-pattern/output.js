var Foo =
/*#__PURE__*/
function () {
  "use strict";

  function Foo(props) {
    var _this$client;

    babelHelpers.classCallCheck(this, Foo);

    _client.set(this, {
      writable: true,
      value: void 0
    });

    ;
    [_this$client] = props;
    babelHelpers.classPrivateFieldSet(this, _client, _this$client);
  }

  babelHelpers.createClass(Foo, [{
    key: "getClient",
    value: function getClient() {
      return babelHelpers.classPrivateFieldGet(this, _client);
    }
  }]);
  return Foo;
}();

var _client = new WeakMap();

var foo = new Foo(['bar']);
expect(foo.getClient()).toBe('bar');
