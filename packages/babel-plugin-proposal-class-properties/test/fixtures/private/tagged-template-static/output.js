class Foo {
  static getReceiver() {
    return babelHelpers.classStaticPrivateMethodGet(this, Foo, _tag).bind(this)``;
  }

  static getReceiver2() {
    return babelHelpers.classStaticPrivateFieldSpecGet(this, Foo, _tag3).bind(this)``;
  }

}

function _tag() {
  return this;
}

var _tag3 = {
  writable: true,
  value: function () {
    return this;
  }
};
