var _tag = /*#__PURE__*/new WeakSet();

var _privateTagMethod = /*#__PURE__*/new WeakMap();

class Foo {
  constructor() {
    _privateTagMethod.set(this, {
      get: _get_privateTagMethod,
      set: void 0
    });

    _tag.add(this);
  }

  publicGetPrivateTagMethod() {
    return babelHelpers.classPrivateFieldGet(this, _privateTagMethod);
  }

}

function _tag2() {
  return this;
}

function _get_privateTagMethod() {
  return babelHelpers.classPrivateMethodGet(this, _tag, _tag2).bind(this)``;
}

var instance = new Foo();
