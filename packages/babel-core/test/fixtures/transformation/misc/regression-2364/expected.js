function wrapper(fn) {
  return function () {
    var _arguments = arguments;

    if (someCondition) {
      var _ret = function () {
        var val = fn(..._arguments);
        return {
          v: val.test(function () {
            console.log(val);
          })
        };
      }();

      if (typeof _ret === "object") return _ret.v;
    }
  };
}