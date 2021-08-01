var _tag = babelHelpers.temporalUndefined;

class Foo {
  static getReceiver() {
    return babelHelpers.classCheckPrivateStaticAccess(this, Foo, _tag).bind(this)``;
  }

}

_tag = function () {
  return this;
};
