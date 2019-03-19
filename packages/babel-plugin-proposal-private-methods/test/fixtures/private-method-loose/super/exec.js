class Base {
  superMethod() {
    return 1017;
  }
}

class Sub extends Base {
  #privateMethod() {
    return super.superMethod();
  }

  publicMethod() {
    return this.#privateMethod();
  }
}

expect((new Sub()).publicMethod()).toEqual(1017);