class MyClass {
  test() {
    const that = this;
    const func = () => this === that;
    return func();
  }
}

assert(new MyClass().test());
