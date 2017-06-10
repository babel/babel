var _ref = function (fn, _arguments) {
  var val = fn(..._arguments);
  return {
    v: val.test(function () {
      console.log(val);
    })
  };
};

function wrapper(fn) {
  return function () {
    var _arguments = arguments;
    var _loop = _ref;

    while (someCondition) {
      var _ret = _loop(fn, _arguments);

      if (typeof _ret === "object") return _ret.v;
    }
  };
}