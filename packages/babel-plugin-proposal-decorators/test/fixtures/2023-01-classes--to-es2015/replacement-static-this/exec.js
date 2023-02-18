
class Bar {}

let _this, _this2, _this3;

@(() => Bar)
class Foo {
  static {
    _this = this;
  }
  static field = (_this2 = this);
  static {
    _this3 = this;
  }
}

expect(_this).toBe(Bar);
expect(_this2).toBe(Bar);
expect(_this3).toBe(Bar);
