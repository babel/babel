(function () {
  function Tail(func, args, context) {
    this.func = func;
    this.args = args;
    this.context = context;
  }

  var isRunning = false;

  return function (func, args, context) {
    var result = new Tail(func, args, context);
    if (!isRunning) {
      isRunning = true;
      do {
        result = result.func.apply(result.context, result.args);
      } while (result instanceof Tail);
      isRunning = false;
    }
    return result;
  };
})()
