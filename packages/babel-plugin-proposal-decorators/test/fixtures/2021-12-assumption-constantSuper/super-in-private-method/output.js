var _call_x, _initProto;

class Foo extends Bar {
  static {
    [_call_x, _initProto] = babelHelpers.applyDecs(this, [], [[dec, 2, "x", function () {
      return Bar.prototype.foo.call(this);
    }]]);
  }

  constructor(...args) {
    super(...args);

    _initProto(this);
  }

  #x = _call_x;
}
