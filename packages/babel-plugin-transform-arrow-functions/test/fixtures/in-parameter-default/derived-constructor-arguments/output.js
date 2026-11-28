class B {}
class C extends B {
  constructor(first, read = function (_arguments) {
    return function () {
      return _arguments.length;
    };
  }(arguments)) {
    super();
  }
}
