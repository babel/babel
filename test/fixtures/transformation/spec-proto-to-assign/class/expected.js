"use strict";

var _defaults = function (obj, defaults) { for (var key in defaults) { if (obj[key] === undefined) { obj[key] = defaults[key]; } } return obj; };

var _classSuperConstructorCall = function (instance, Constructor) { if (Object.getPrototypeOf(Constructor) !== null) { Object.getPrototypeOf(Constructor).apply(instance, arguments); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) _defaults(subClass, superClass); };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var Foo = (function (Bar) {
  function Foo() {
    _classCallCheck(this, Foo);

    _classSuperConstructorCall(this, Foo);
  }

  _inherits(Foo, Bar);

  return Foo;
})(Bar);