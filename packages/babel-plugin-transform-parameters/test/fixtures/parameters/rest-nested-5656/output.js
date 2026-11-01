function a() {
  var foo = function () {
    return Function.prototype.apply.call(bar, void 0, arguments);
  };
  Function.prototype.apply.call(foo, void 0, arguments);
}
function b() {
  var foo = function () {
    return Function.prototype.apply.call(bar, void 0, arguments);
  };
  Function.prototype.apply.call(foo, void 0, arguments);
}
function c() {
  var foo = function () {
    return Function.prototype.apply.call(bar, void 0, arguments);
  };
  foo([]);
}
function d(thing) {
  var foo = function () {
    return Function.prototype.apply.call(bar, void 0, arguments);
  };
  {
    var args = thing;
    foo(thing);
  }
}
