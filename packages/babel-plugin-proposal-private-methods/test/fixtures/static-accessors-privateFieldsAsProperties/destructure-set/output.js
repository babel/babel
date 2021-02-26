var _p = babelHelpers.classPrivateFieldLooseKey("p");

var _q = babelHelpers.classPrivateFieldLooseKey("q");

class C {
  constructor() {
    [babelHelpers.classPrivateFieldLooseBase(C, _p)[_p]] = [0];
  }

}

var _set_p = function (v) {
  babelHelpers.classPrivateFieldLooseBase(C, _q)[_q] = v;
};

Object.defineProperty(C, _p, {
  get: void 0,
  set: _set_p
});
Object.defineProperty(C, _q, {
  writable: true,
  value: void 0
});
new C();
