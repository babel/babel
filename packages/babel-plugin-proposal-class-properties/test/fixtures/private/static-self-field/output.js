var _class, _temp, _x;

function wrapper(wc) {
  return wc;
}

var f = wrapper((_temp = _class = class Foo {}, _x = {
  writable: true,
  value: _class
}, babelHelpers.defineProperty(_class, "y", _class), _temp));
