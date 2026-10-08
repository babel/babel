class A {
  #f() {}
  static test(o) {
    var _o$x, _o$f2;
    o === null || o === void 0 || (_o$f => function (_argPlaceholder) {
      return _o$f.call(o, _argPlaceholder);
    })(o.#f);
    o === null || o === void 0 || ((_o$x$f, _o$x2) => function (_argPlaceholder2) {
      return _o$x$f.call(_o$x2, _argPlaceholder2);
    })((_o$x = o.x).#f, _o$x);
    (_o$f2 = o.#f) === null || _o$f2 === void 0 ? void 0 : (_o$f3 => function (_argPlaceholder3) {
      return _o$f3.call(o, _argPlaceholder3);
    })(_o$f2);
  }
}
