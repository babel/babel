"use strict";

var obj = babelHelpers.createDecoratedObject([{
  key: "bar",
  decorators: [foo],
  value: function value() {}
}, {
  key: "foo",
  decorators: [bar],
  value: "lol"
}, {
  key: "yes",
  value: "wow"
}]);
