"use strict";

var obj = babelHelpers.createDecoratedObject([{
  key: "bar",
  decorators: [foo],
  initializer: function initializer() {
    return function () {};
  }
}, {
  key: "foo",
  decorators: [bar],
  initializer: function initializer() {
    return "lol";
  }
}, {
  key: "yes",
  initializer: function initializer() {
    return "wow";
  }
}]);