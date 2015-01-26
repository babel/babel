"use strict";

var _defaults = function (obj, defaults) { for (var key in defaults) { if (obj[key] === undefined) { obj[key] = defaults[key]; } } return obj; };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) _defaults(subClass, superClass); };

var Foo = (function (Bar) {
  function Foo() {
    if (Object.getPrototypeOf(Foo) !== null) {
      Object.getPrototypeOf(Foo).apply(this, arguments);
    }
  }

  _inherits(Foo, Bar);

  return Foo;
})(Bar);