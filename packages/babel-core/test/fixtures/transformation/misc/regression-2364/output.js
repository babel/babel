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
    };

    while (someCondition) {
      var _ret = _loop();

      if (typeof _ret === "object") return _ret.v;
    }
  };
}
