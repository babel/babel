// A private instance field after a decorated field can't be lowered without the
// class-properties transform: its brand is installed with the native class
// element, before the constructor body, so a relocated initializer reaching it
// would observe it too early. The transform keeps the class-properties
// handshake for such classes; without class-properties the marker fails loudly
// instead of silently changing initialization order.
function dec(target, name, descriptor) {}

class Example {
  @dec decorated = 1;
  #privateField = 2;

  read() {
    return this.#privateField;
  }
}

expect(() => new Example()).toThrow(/transform-class-properties is enabled/);
