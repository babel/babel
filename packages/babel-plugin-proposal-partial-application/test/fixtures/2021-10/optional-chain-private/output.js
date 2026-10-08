class A {
  #f() {}
  static test(o) {
    var _o$x;
    o === null || o === void 0 || (_o$f => function (_argPlaceholder) {
      return _o$f.call(o, _argPlaceholder);
    })(o.#f);
    o === null || o === void 0 || ((_o$x$f, _o$x2) => function (_argPlaceholder2) {
      return _o$x$f.call(_o$x2, _argPlaceholder2);
    })((_o$x = o.x).#f, _o$x);
  }
}
