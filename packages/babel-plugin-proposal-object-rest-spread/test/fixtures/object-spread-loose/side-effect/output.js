function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var k = {
  a: 1,
  b: 2
};

var o = _extends({
  a: 3
}, k, {
  b: k.a++
});

var pureA = {};
var pureB = {};
var pureC = {};
var pureD = {};
var pureE = {};

function impureFunc() {
  console.log('hello');
}

var output = _extends({}, pureA, {
  get foo() {},

  get bar() {}

}, pureB, pureC, impureFunc(), pureD, {
  pureD
});

var simpleOutput = _extends({}, pureA, {
  test: '1'
}, pureB);
