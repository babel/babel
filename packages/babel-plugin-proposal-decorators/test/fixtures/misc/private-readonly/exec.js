function writable(w) {
  return desc => {
    desc.descriptor.writable = w;
  }
}

class A {
  @writable(false)
  #x = 2;

  @writable(true)
  @writable(false)
  #y = 2;

  testX() {
    this.#x = 1;
  }

  testY() {
    this.#y = 1;
  }
}

expect(() => new A().testX()).toThrow();
expect(() => new A().testY()).not.toThrow();
