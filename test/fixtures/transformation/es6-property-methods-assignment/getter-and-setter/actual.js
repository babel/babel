var obj = {
  get foo() {
    return 5 + 5;
  },
  set foo(value) {
    this._foo = value;
  }
};
