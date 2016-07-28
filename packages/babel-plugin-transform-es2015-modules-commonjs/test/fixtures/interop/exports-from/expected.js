"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _foo = require("foo");

Object.keys(_foo).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _foo[key];
    }
  });
});
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
Object.defineProperty(exports, "foo", {
  enumerable: true,
  get: function () {
    return babelHelpers.interopRequireDefault(_foo).default;
  }
});
