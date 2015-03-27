var a = {
  name() {
    return "Suyash";
  }
};

var b = {
  name() {
    return super.name() + " Verma";
  }
};

Object.setPrototypeOf(b, a);

assert.equal(b.name(), "Suyash Verma");
