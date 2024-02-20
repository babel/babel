var _initProto, _obj;
let fn, obj;
class A {
  static {
    [_initProto] = babelHelpers.applyDecs2311(this, [], [[[void 0, fn(), _obj = obj.prop, _obj.foo], 18, "method"]]).e;
  }
  constructor() {
    _initProto(this);
  }
  method() {}
}
