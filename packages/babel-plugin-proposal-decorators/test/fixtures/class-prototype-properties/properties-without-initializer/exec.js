function dec(target, name, descriptor) {

}

class Example {
  @dec prop;
}

let inst = new Example();
expect(inst).toHaveProperty("prop");
expect(inst.prop).toBeUndefined();
