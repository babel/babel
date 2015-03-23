var autobind = function (target, name, descriptor) {
  var fn = descriptor.value;
  delete descriptor.value;
  delete descriptor.writable;
  descriptor.get = function () {
    return fn.bind(this);
  };
};

class Person {
  constructor() {
    this.first = "Sebastian";
    this.last = "McKenzie";
  }

  @autobind
  getName() {
    return `${this.first} ${this.last}`;
  }
}

assert.equal(new Person().getName.call(null), "Sebastian McKenzie")
