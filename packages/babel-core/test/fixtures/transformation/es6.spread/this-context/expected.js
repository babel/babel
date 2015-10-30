var obj = {
  foo: function foo() {
    this.bar.apply(this, arguments);
    this.blah.apply(this, arguments);
  }
};
