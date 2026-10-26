function f(a) {
  let b = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : () => a;
  return function* () {
    {
      let a;
      {
        function a() {}
      }
    }
    a = 9;
    yield b();
  }();
}
