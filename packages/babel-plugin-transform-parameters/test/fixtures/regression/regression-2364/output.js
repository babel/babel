function wrapper(fn) {
  return function () {
    var _arguments = arguments;
    var _ret,
      _loop = function () {
        var val = fn(..._arguments);
        return {
          v: val.test(function () {
            console.log(val);
          })
        };
      };
    while (someCondition) {
      _ret = _loop();
      if (_ret) return _ret.v;
    }
  };
}
