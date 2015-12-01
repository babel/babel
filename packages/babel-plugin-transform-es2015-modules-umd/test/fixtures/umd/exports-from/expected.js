"use strict";

(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "foo"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("foo"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.foo);
    global.actual = mod.exports;
  }
})(this, function (exports, _foo) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  for (var _key in _foo) {
    if (_key === "default") continue;
    Object.defineProperty(exports, _key, {
      enumerable: true,
      get: (function (k) {
        return function () {
          return _foo[k];
        };
      })(_key)
    });
  }

  Object.defineProperty(exports, "foo", {
    enumerable: true,
    get: function () {
      return _foo.foo;
    }
  });
  Object.defineProperty(exports, "foo", {
    enumerable: true,
    get: function () {
      return _foo.foo;
    }
  });
  Object.defineProperty(exports, "bar", {
    enumerable: true,
    get: function () {
      return _foo.bar;
    }
  });
  Object.defineProperty(exports, "bar", {
    enumerable: true,
    get: function () {
      return _foo.foo;
    }
  });
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function () {
      return _foo.foo;
    }
  });
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function () {
      return _foo.foo;
    }
  });
  Object.defineProperty(exports, "bar", {
    enumerable: true,
    get: function () {
      return _foo.bar;
    }
  });
});
