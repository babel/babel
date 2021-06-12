class Foo {
  static getReceiver() {
    return babelHelpers.classStaticPrivateFieldSpecGet(this, Foo, _tag).bind(this)``;
  }

}

var _tag = {
  writable: true,
  value: function () {
    return this;
  }
};
