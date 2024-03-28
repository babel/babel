import _Promise from "core-js-pure/features/promise/index.js";
import _bindInstanceProperty from "core-js-pure/features/instance/bind.js";
export default function _callAsync(fn, self, args) {
  return new _Promise(function (resolve, reject) {
    function step(key, arg) {
      try {
        var info = gen[key](arg);
        var value = info.value;
      } catch (error) {
        reject(error);
        return;
      }
      if (info.done) {
        resolve(value);
      } else {
        _Promise.resolve(value).then(_next, _throw);
      }
    }
    var gen = fn.apply(self, args),
      _next = _bindInstanceProperty(step).call(step, this, "next"),
      _throw = _bindInstanceProperty(step).call(step, this, "throw");
    _next();
  });
}