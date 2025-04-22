new class {
  foo(_x, _x2) {
    return babelHelpers.asyncToGenerator(function* (a, {
      b
    }) {}).apply(this, arguments);
  }
}().foo().catch(e => {
  console.log("caught");
});
new class {
  foo(_x3, _x4) {
    return babelHelpers.asyncToGenerator(function* (a, {
      b
    }) {
      console.log(a, b);
    }).apply(this, arguments);
  }
}().foo(1, {
  b: 2
});
new class {
  foo(_x5) {
    return babelHelpers.asyncToGenerator(function* (a, b = (() => {
      throw new Error("required");
    })()) {
      console.log(a, b);
    }).apply(this, arguments);
  }
}().foo(1, 2);
new class {
  foo(a, ...b) {
    return babelHelpers.asyncToGenerator(function* () {
      console.log(a, b);
    })();
  }
}().foo(1, 2);
new class {
  foo(_x6, _x7) {
    var _arguments = arguments,
      _this = this;
    return babelHelpers.asyncToGenerator(function* (a, {
      b
    }) {
      console.log(_this, _arguments);
    }).apply(this, arguments);
  }
}().foo(1, {
  b: 2
});
new class extends class {
  get c() {
    return "c";
  }
} {
  foo(_x8, _x9) {
    var _superprop_getC = () => super.c;
    return babelHelpers.asyncToGenerator(function* (a, {
      b
    }) {
      console.log(_superprop_getC());
    }).apply(this, arguments);
  }
}().foo(1, {
  b: 2
});
