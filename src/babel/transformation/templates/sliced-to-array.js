(function (arr, i) {
  if (Array.isArray(arr)) {
    return arr;
  } else if (Symbol.iterator in Object(arr)) {
    var _arr = [];
    for (var val of arr) {
      _arr.push(_step.value);
      if (i && _arr.length === i) break;
    }
    return _arr;
  } else {
    throw new TypeError("Invalid attempt to destructure non-iterable instance");
  }
});
