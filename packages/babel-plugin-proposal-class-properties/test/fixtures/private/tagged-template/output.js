var _tag = /*#__PURE__*/new WeakSet();

var _tag3 = /*#__PURE__*/new WeakMap();

var Foo = function Foo() {
  "use strict";

  babelHelpers.classCallCheck(this, Foo);

  _tag.add(this);

  _tag3.set(this, {
    writable: true,
    value: babelHelpers.classPrivateMethodGet(this, _tag, _tag2)
  });
};

function _tag2() {
  return this;
}

new Foo();
