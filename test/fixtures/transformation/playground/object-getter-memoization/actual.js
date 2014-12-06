class Foo {
  memo bar() {
    return complex();
  }

  memo [bar]() {
    return complex();
  }
}

var foo = {
  memo bar() {
    return complex();
  },

  memo [bar]() {
    return complex();
  }
};
