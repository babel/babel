define(["exports", "foo"], function (exports, _foo) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _loop = function (_key2) {
    if (_key2 === "default") return "continue";
    Object.defineProperty(exports, _key2, {
      enumerable: true,
      get: function () {
        return _foo[_key2];
      }
    });
  };

  for (var _key2 in _foo) {
    var _ret = _loop(_key2);

    if (_ret === "continue") continue;
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
