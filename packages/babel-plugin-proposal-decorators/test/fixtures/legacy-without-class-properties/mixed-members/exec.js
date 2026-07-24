// The decorated field is initialized while undecorated public fields, a private
// field declared before it and private methods are left as native class syntax.
function dec(target, name, descriptor) {
  descriptor.enumerable = true;
}

class Example {
  #privateField = 30;
  @dec decorated = 10;
  undecorated = 20;

  readPrivate() {
    return this.#privateField;
  }
}

const inst = new Example();

expect(inst.decorated).toBe(10);
expect(inst.undecorated).toBe(20);
expect(inst.readPrivate()).toBe(30);
expect(Object.getOwnPropertyDescriptor(inst, "decorated").enumerable).toBe(true);
