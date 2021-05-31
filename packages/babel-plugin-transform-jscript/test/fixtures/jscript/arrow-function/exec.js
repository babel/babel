class MyClass {
  test() {
    const that = this;
    const func = () => this === that;
    return func();
  }
}

expect(new MyClass().test()).toBe(true);
