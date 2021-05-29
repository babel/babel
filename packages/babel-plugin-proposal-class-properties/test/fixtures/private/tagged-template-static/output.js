var Foo = /*#__PURE__*/function () {
  "use strict";

  function Foo() {
    babelHelpers.classCallCheck(this, Foo);
  }

  babelHelpers.createClass(Foo, null, [{
    key: "getReceiver",
    value: function getReceiver() {
      return babelHelpers.classStaticPrivateMethodGet(this, Foo, _tag).bind(this)``;
    }
  }, {
    key: "getReceiver2",
    value: function getReceiver2() {
      return babelHelpers.classStaticPrivateFieldSpecGet(this, Foo, _tag3).bind(this)``;
    }
  }]);
  return Foo;
}();

function _tag() {
  return this;
}

var _tag3 = {
  writable: true,
  value: () => Foo
};
