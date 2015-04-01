(function (FUNCTION_KEY) {
  function* FUNCTION_ID() {
    return yield* FUNCTION_ID.apply(this, arguments);
  }

  FUNCTION_ID.toString = function () {
    return FUNCTION_ID.toString();
  };

  return FUNCTION_ID;
})(FUNCTION)
