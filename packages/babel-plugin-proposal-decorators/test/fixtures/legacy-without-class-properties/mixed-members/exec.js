// The decorated field is initialized while undecorated public fields, private
// fields and private methods are left as native class syntax.
function dec(target, name, descriptor) {
  descriptor.enumerable = true;
}

class Example {
  @dec decorated = 10;
  undecorated = 20;
  #privateField = 30;

  readPrivate() {
    return this.#privateField;
  }
}

const inst = new Example();

expect(inst.decorated).toBe(10);
expect(inst.undecorated).toBe(20);
expect(inst.readPrivate()).toBe(30);
expect(Object.getOwnPropertyDescriptor(inst, "decorated").enumerable).toBe(true);
