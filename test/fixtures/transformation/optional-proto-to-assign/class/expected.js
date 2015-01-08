"use strict";

var _defaults = function (obj, defaults) {
  for (var key in defaults) {
    if (obj[key] === undefined) {
      obj[key] = defaults[key];
    }
  }

  return obj;
};

var _inherits = function (child, parent) {
  if (typeof parent !== "function" && parent !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof parent);
  }
  child.prototype = Object.create(parent && parent.prototype, {
    constructor: {
      value: child,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (parent) _defaults(child, parent);
};

var Foo = (function () {
  var _Bar = Bar;
  var Foo = function Foo() {
    if (Object.getPrototypeOf(Foo) !== null) {
      Object.getPrototypeOf(Foo).apply(this, arguments);
    }
  };

  _inherits(Foo, _Bar);

  return Foo;
})();
