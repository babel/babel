define(["exports", "foo"], function (exports, _foo) {
  "use strict";

  var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { "default": obj }; };

  var _defaults = function (obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; };

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  _defaults(exports, _interopRequireWildcard(_foo));

  Object.defineProperty(exports, "foo", {
    enumerable: true,
    get: function get() {
      return _foo.foo;
    }
  });
  Object.defineProperty(exports, "foo", {
    enumerable: true,
    get: function get() {
      return _foo.foo;
    }
  });
  Object.defineProperty(exports, "bar", {
    enumerable: true,
    get: function get() {
      return _foo.bar;
    }
  });
  Object.defineProperty(exports, "bar", {
    enumerable: true,
    get: function get() {
      return _foo.foo;
    }
  });
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function get() {
      return _foo.foo;
    }
  });
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function get() {
      return _foo.foo;
    }
  });
  Object.defineProperty(exports, "bar", {
    enumerable: true,
    get: function get() {
      return _foo.bar;
    }
  });
});