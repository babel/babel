var _x = /*#__PURE__*/new WeakMap(),
    _y = /*#__PURE__*/new WeakMap();

class Point {
  constructor(x = 0, y = 0) {
    _x.set(this, void 0);

    _y.set(this, void 0);

    babelHelpers.classPrivateFieldSet2(this, _x, +x);
    babelHelpers.classPrivateFieldSet2(this, _y, +y);
  }

  get x() {
    return babelHelpers.classPrivateFieldGet2(this, _x);
  }

  set x(value) {
    babelHelpers.classPrivateFieldSet2(this, _x, +value);
  }

  get y() {
    return babelHelpers.classPrivateFieldGet2(this, _y);
  }

  set y(value) {
    babelHelpers.classPrivateFieldSet2(this, _y, +value);
  }

  equals(p) {
    return babelHelpers.classPrivateFieldGet2(this, _x) === babelHelpers.classPrivateFieldGet2(p, _x) && babelHelpers.classPrivateFieldGet2(this, _y) === babelHelpers.classPrivateFieldGet2(p, _y);
  }

  toString() {
    return `Point<${babelHelpers.classPrivateFieldGet2(this, _x)},${babelHelpers.classPrivateFieldGet2(this, _y)}>`;
  }

}
