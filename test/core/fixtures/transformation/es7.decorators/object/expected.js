"use strict";

var obj = babelHelpers.createDecoratedObject([{
  key: "bar",
  decorators: [foo],
  value: function bar() {}
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
