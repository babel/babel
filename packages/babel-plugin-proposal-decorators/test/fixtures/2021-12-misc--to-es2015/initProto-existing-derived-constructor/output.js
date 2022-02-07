var _initProto;

class A extends B {
  constructor() {
    let a = 2;

    _initProto(super(a));

    foo();
  }

  method() {}

}

(() => {
  [_initProto] = babelHelpers.applyDecs(A, [[deco, 2, "method"]], []);
})();
