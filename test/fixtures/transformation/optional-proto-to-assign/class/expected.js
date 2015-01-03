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
    if (_Bar) {
      _Bar.apply(this, arguments);
    }
  };

  _inherits(Foo, _Bar);

  return Foo;
})();
