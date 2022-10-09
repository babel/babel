class A extends B {
  handle = (() => {
    var _newtarget = new.target,
      _superprop_getY = () => super.y,
      _this = this;
    return function () {
      let x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      console.log(x, _this, _newtarget, _superprop_getY());
    };
  })()(() => {
    var _this2 = this;
    let y = 0;
    return function () {
      let x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : y;
      return x + _this2;
    };
  })((() => function () {
    let x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
  })())(this);
}
