const m = module {
  if (true) {
    function f() {
      return true;
    }
  }

  function g() {
    return f();
  }
};
