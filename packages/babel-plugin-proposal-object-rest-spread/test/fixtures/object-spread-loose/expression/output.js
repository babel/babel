function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var a;
var b;
var c;
var d;
var x;
var y;

_extends({
  x
}, y, {
  a
}, b, {
  c
});

_extends({}, Object.prototype);

_extends({}, {
  foo: 'bar'
});

_extends({}, {
  foo: 'bar'
}, {
  bar: 'baz'
});

_extends({}, {
  get foo() {
    return 'foo';
  }

});
