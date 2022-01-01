define(["foo"], function (foo) {
  "use strict";

  foo = babelHelpers.interopRequireWildcard(foo, true);
  foo.bar();
  foo.baz();
});
