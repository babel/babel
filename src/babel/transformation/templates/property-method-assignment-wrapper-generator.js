(function (FUNCTION_KEY) {
  var WRAPPER_KEY = function* FUNCTION_ID() {
    return yield* FUNCTION_KEY.apply(this, arguments);
  };

  WRAPPER_KEY.toString = function () {
    return FUNCTION_KEY.toString();
  };

  return WRAPPER_KEY;
})(FUNCTION)
