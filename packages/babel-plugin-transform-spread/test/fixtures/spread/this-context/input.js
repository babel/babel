var obj = {
  foo: function foo() {
    this.bar(...arguments)
    this.blah(...arguments)
  }
}
