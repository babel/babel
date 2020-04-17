var _this = this;

function _newArrowCheck(innerThis, boundThis) { if (innerThis !== boundThis) { throw new TypeError("Cannot instantiate an arrow function"); } }

var bar = "bar";

var x = function x() {
  _newArrowCheck(this, _this);

  return "foo".concat(bar);
}.bind(this);
