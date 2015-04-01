(function (FUNCTION_KEY) {
  function FUNCTION_ID() {
    return FUNCTION_KEY.apply(this, arguments);
  }

  FUNCTION_ID.toString = function () {
    return FUNCTION_ID.toString();
  }

  return FUNCTION_ID;
})(FUNCTION)
