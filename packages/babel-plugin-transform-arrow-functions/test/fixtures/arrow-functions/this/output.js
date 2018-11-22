function b() {
  var _this = this;

  var t = function (x) {
    return _this.x + x;
  };
}

class Foo extends function () {} {
  constructor() {
    var _this2;

    var foo = function () {
      return _this2;
    };

    if (true) {
      var _temp;

      console.log((_temp = super(), _this2 = this, _temp), foo());
    } else {
      super();
      _this2 = this;
      console.log(foo());
    }
  }

}
