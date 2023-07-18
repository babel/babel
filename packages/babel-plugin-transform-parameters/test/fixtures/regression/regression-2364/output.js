function wrapper(fn) {
  return function () {
    var _arguments = arguments;
    var _loop = function () {
        var val = fn(..._arguments);
        return {
          v: val.test(function () {
            console.log(val);
          })
        };
      },
      _ret;
    while (someCondition) {
      _ret = _loop();
      if (_ret) return _ret.v;
    }
  };
}
