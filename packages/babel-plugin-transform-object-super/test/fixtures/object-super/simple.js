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

expect(b.name()).toBe("Suyash Verma");
