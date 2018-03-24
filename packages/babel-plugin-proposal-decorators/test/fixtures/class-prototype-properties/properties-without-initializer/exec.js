function dec(target, name, descriptor) {

}

class Example {
  @dec prop;
}

let inst = new Example();
expect(inst.hasOwnProperty("prop")).toBe(true);
expect(inst.prop).toBeUndefined();
