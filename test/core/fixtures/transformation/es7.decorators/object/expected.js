"use strict";

var obj = babelHelpers.createDecoratedObject([{
  key: "bar",
  decorators: [foo],
  initializer: function () {
    return function bar() {};
  }
}, {
  key: "foo",
  decorators: [bar],
  initializer: function () {
    return "lol";
  }
}, {
  key: "yes",
  initializer: function () {
    return "wow";
  }
}]);
