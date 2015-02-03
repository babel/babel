"use strict";

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var Test = function Test() {
  _classCallCheck(this, Test);

  this.state = "test";
};

var Foo = (function (Bar) {
  function Foo() {
    _classCallCheck(this, Foo);

    this.state = "test";
  }

  _inherits(Foo, Bar);

  return Foo;
})(Bar);