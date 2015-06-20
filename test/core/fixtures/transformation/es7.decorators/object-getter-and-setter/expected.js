"use strict";

var obj = babelHelpers.createDecoratedObject([{
  key: "foo",
  decorators: [foo, foo],
  get: function get() {},
  set: function set(bar) {}
}]);