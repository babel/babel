var _initProto, _obj, _methodDecs;
let fn, obj;
_obj = obj.prop;
_methodDecs = [void 0, fn(), _obj, _obj.foo];
class A {
  static {
    [_initProto] = babelHelpers.applyDecs2311(this, [[_methodDecs, 18, "method"]], []).e;
  }
  constructor() {
    _initProto(this);
  }
  method() {}
}
