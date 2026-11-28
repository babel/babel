function f(first, read = function (_arguments) {
  return function () {
    return _arguments.length;
  };
}(arguments)) {
  return read();
}
