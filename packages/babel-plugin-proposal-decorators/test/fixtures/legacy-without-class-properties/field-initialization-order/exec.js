// Instance field initializers must run in source order even when decorated and
// undecorated fields are mixed. The decorated field is lowered into the
// constructor, so the undecorated public and private fields that follow it are
// relocated there too instead of running early as native class fields.
const order = [];

function dec(target, name, descriptor) {
  const { initializer } = descriptor;
  descriptor.initializer = function () {
    order.push(name);
    return initializer.call(this);
  };
}

class Example {
  a = order.push("a");
  @dec b = 1;
  c = order.push("c");
  #d = order.push("d");

  readD() {
    return this.#d;
  }
}

const inst = new Example();

expect(order).toEqual(["a", "b", "c", "d"]);
expect(inst.b).toBe(1);
expect(inst.readD()).toBe(4);
