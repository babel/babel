new class {
  foo(_x, _x2) {
    return babelHelpers.asyncToGenerator(function (a, _ref) {
      let {
        b
      } = _ref;
      return function* () {}();
    }).apply(this, arguments);
  }
}().foo().catch(e => {
  console.log("caught");
});
new class {
  foo(_x3, _x4) {
    return babelHelpers.asyncToGenerator(function (a, _ref2) {
      let {
        b
      } = _ref2;
      return function* () {
        console.log(a, b);
      }();
    }).apply(this, arguments);
  }
}().foo(1, {
  b: 2
});
new class {
  foo(_x5, _x6) {
    var _arguments = arguments,
      _this = this;
    return babelHelpers.asyncToGenerator(function (a, _ref3) {
      let {
        b
      } = _ref3;
      return function* () {
        console.log(_this, _arguments);
      }();
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
  foo(_x7, _x8) {
    var _superprop_getC = () => super.c;
    return babelHelpers.asyncToGenerator(function (a, _ref4) {
      let {
        b
      } = _ref4;
      return function* () {
        console.log(_superprop_getC());
      }();
    }).apply(this, arguments);
  }
}().foo(1, {
  b: 2
});
