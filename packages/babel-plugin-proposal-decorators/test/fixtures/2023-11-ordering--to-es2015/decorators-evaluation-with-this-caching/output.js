var _initProto, _obj, _methodDecs, _A;
let fn, obj;
_obj = obj.prop;
_methodDecs = [void 0, fn(), _obj, _obj.foo];
class A {
  constructor() {
    _initProto(this);
  }
  method() {}
}
_A = A;
[_initProto] = babelHelpers.applyDecs2311(_A, [[_methodDecs, 18, "method"]], []).e;
