"use strict";

var _classProps = function (child, staticProps, instanceProps) {
  if (staticProps) Object.defineProperties(child, staticProps);
  if (instanceProps) Object.defineProperties(child.prototype, instanceProps);
};

var Foo = (function () {
  var Foo = function Foo() {};

  _classProps(Foo, null, (function (_ref) {
    _ref[bar] = {
      get: function () {
        if (this._memoDone) return this._memo;
        this._memoDone = true;
        return this._memo = complex();
      },
      enumerable: true
    };
    return _ref;
  })({
    bar: {
      get: function () {
        if (this._barDone) return this._bar;
        this._barDone = true;
        return this._bar = complex();
      },
      enumerable: true
    }
  }));

  return Foo;
})();

var foo = (function (_foo) {
  _foo[bar] = function () {
    if (this._memo2Done) return this._memo2;
    this._memo2Done = true;
    return this._memo2 = complex();
  };

  return _foo;
})((function (_ref2) {
  Object.defineProperties(_ref2, {
    bar: {
      get: function () {
        if (this._barDone) return this._bar;
        this._barDone = true;
        return this._bar = complex();
      },
      enumerable: true
    }
  });

  return _ref2;
})({}));
