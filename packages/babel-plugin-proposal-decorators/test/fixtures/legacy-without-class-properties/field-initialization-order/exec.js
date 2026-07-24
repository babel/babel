// Instance field initializers must run in source order even when decorated and
// undecorated fields are mixed. The decorated field is lowered into the
// constructor, so the undecorated public fields that follow it are relocated
// there too instead of running early as native class fields. A private field
// *before* the first decorated one keeps its native position.
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
  #pre = order.push("pre");
  @dec b = 1;
  c = order.push("c");
  d = order.push("d");

  readPre() {
    return this.#pre;
  }
}

const inst = new Example();

expect(order).toEqual(["a", "pre", "b", "c", "d"]);
expect(inst.b).toBe(1);
expect(inst.readPre()).toBe(2);
