"use strict";

var x = {
  Foo: function (_Foo) {
    babelHelpers.inherits(_class, _Foo);

    function _class() {
      babelHelpers.classCallCheck(this, _class);
      return babelHelpers.possibleConstructorReturn(this, babelHelpers.wrapCtor(Object.getPrototypeOf(_class)).apply(this, arguments));
    }

    return _class;
  }(Foo)
};
