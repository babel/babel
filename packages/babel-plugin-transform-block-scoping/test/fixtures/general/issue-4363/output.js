function WithoutCurlyBraces() {
  var _this = this;
  if (true) {
    var _loop = function () {
        foo = function () {
          return this;
        };
        bar = function () {
          return foo.call(this);
        };
        console.log(_this, k); // => undefined
      },
      foo,
      bar;
    for (var k in kv) {
      _loop();
    }
  }
}
function WithCurlyBraces() {
  var _this2 = this;
  if (true) {
    var _loop2 = function () {
        foo = function () {
          return this;
        };
        bar = function () {
          return foo.call(this);
        };
        console.log(_this2, k); // => 777
      },
      foo,
      bar;
    for (var k in kv) {
      _loop2();
    }
  }
}
