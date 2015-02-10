"use strict";

var _defaults = function (obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var key in keys) { if (obj[key] === undefined) { Object.defineProperty(obj, key, Object.getOwnPropertyDescriptor(defaults, key)); } } return obj; };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) _defaults(subClass, superClass); };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var Foo = (function (Bar) {
  function Foo() {
    _classCallCheck(this, Foo);

    if (Bar != null) {
      Bar.apply(this, arguments);
    }
  }

  _inherits(Foo, Bar);

  return Foo;
})(Bar);