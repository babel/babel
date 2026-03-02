class Foo {
  static getReceiver() {
    return babelHelpers.assertClassBrand(Foo, this, _tag)._.bind(this)``;
  }
}
var _tag = {
  _: function () {
    return this;
  }
};
