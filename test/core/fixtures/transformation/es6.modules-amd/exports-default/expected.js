define(["exports", "module"], function (exports, module) {
  "use strict";

  module.exports = foo;
  module.exports = 42;
  module.exports = {};
  module.exports = [];
  module.exports = foo;

  module.exports = function () {};

  var _default = function _default() {
    babelHelpers.classCallCheck(this, _default);
  };

  module.exports = _default;

  function foo() {}

  var Foo = function Foo() {
    babelHelpers.classCallCheck(this, Foo);
  };

  module.exports = Foo;
  module.exports = foo;

  module.exports = (function () {
    return "foo";
  })();
});