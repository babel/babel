define(["exports", "foo"], function (exports, _foo) {
  "use strict";

  var _interopRequireWildcard = function (obj) {
    return obj && obj.constructor === Object ? obj : {
      "default": obj
    };
  };

  var _exportsWildcard = function (obj, exports) {
    for (var i in obj) {
      if (exports[i] !== undefined) {
        exports[i] = obj[i];
      }
    }
  };

  _exportsWildcard(_interopRequireWildcard(_foo), exports);

  exports.foo = _foo.foo;
  exports.foo = _foo.foo;
  exports.bar = _foo.bar;
  exports.bar = _foo.foo;
  exports["default"] = _foo.foo;
  exports["default"] = _foo.foo;
  exports.bar = _foo.bar;
});
