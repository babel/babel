(function () {
  function Tail(func, args, context) {
    this.func = func;
    this.args = args;
    this.context = context;
  }

  Tail.prototype._isTailDescriptor = true;

  var isRunning = false;

  return function (func, args, context) {
    if (isRunning) {
      return func.apply(context, args);
    }
    var result = new Tail(func, args, context);
    isRunning = true;
    do {
      result = result.func.apply(result.context, result.args);
    } while (result instanceof Tail || (result && result._isTailDescriptor));
    isRunning = false;
    return result;
  };
})()
