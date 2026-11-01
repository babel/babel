var obj = {
  foo: function foo() {
    Function.prototype.apply.call(this.bar, this, arguments);
    Function.prototype.apply.call(this.blah, this, arguments);
  }
};
