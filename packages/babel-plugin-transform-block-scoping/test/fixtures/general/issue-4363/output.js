function WithoutCurlyBraces() {
  var _this = this;
  if (true) {
    var _loop = function () {
      function foo() {
        return this;
      }
      function bar() {
        return foo.call(this);
      }
      console.log(_this, k); // => undefined
    };
    for (var k in kv) {
      _loop();
    }
  }
}
function WithCurlyBraces() {
  var _this2 = this;
  if (true) {
    var _loop2 = function () {
      function foo() {
        return this;
      }
      function bar() {
        return foo.call(this);
      }
      console.log(_this2, k); // => 777
    };
    for (var k in kv) {
      _loop2();
    }
  }
}
