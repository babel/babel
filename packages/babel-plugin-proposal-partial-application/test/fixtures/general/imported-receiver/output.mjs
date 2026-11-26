var _obj$m, _obj;
import { obj } from "obj";

// `obj` might be reassigned before calling `f`, but the receiver
// must be the value it had when `f` was created.
const f = (_obj = obj, _obj$m = _obj.m, function m(_argPlaceholder) {
  return _obj$m.call(_obj, _argPlaceholder, 1);
});
