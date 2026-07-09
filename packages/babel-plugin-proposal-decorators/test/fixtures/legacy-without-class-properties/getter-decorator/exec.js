// A legacy decorator may replace a field with an accessor installed on the
// prototype. The decorated field must therefore be lowered into the
// constructor (a native field initializer would create an own data property
// shadowing the prototype getter).
function dec(target, name, descriptor) {
  let { initializer } = descriptor;
  delete descriptor.initializer;
  delete descriptor.writable;

  let value;
  descriptor.get = function () {
    if (initializer) {
      value = "__" + initializer.call(this) + "__";
      initializer = null;
    }
    return value;
  };
}

class Example {
  @dec prop = 3;
  undecorated = 9;
}

const inst = new Example();

expect(inst.prop).toBe("__3__");
expect(inst.undecorated).toBe(9);
// The accessor lives on the prototype, not as an own property of the instance.
expect(Object.prototype.hasOwnProperty.call(inst, "prop")).toBe(false);
expect(
  typeof Object.getOwnPropertyDescriptor(Example.prototype, "prop").get,
).toBe("function");
