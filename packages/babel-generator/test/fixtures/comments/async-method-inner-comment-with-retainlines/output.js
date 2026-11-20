class A {
  async /* 1*/ *a()

  {}

  async /* 2*/ [b]()

  {}

  async /* 3 */ [c]()

  {}
}

var o = {
  async /* 4*/ *a()

  {},

  async /* 5*/ [b]()

  {},

  async /* 6 */ [c]()

  {}
};