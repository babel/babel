var autobind = function (target, name, descriptor) {
  var fn = descriptor.value;
  delete descriptor.value;
  delete descriptor.writable;
  descriptor.get = function () {
    return fn.bind(this);
  };
};

var person = {
  first: "Sebastian",
  last: "McKenzie",

  @autobind
  getName() {
    return `${this.first} ${this.last}`;
  }
}

assert.equal(person.getName.call(null), "Sebastian McKenzie")
