class Foo {
  static getReceiver() {
    return babelHelpers.assertClassBrand(this, Foo, _tag)._.bind(this)``;
  }
}
var _tag = {
  _: function () {
    return this;
  }
};
