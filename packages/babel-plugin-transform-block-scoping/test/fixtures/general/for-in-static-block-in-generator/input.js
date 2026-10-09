function* run() {
  var captured;
  class C {
    static {
      for (let i = 0; i < 2; i++) captured = () => i;
    }
  }
  yield 0;
  return captured();
}

const iterator = run();
