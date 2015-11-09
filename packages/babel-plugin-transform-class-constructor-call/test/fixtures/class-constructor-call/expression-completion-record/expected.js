let _class2 = class {};

var _classCall = function () {
  foo();
};

var _class = function (...args) {
  if (this instanceof _class) {
    return Reflect.construct(_class2, args);
  } else {
    return _classCall.apply(this, args);
  }
};

_class.__proto__ = _class2;
_class;
