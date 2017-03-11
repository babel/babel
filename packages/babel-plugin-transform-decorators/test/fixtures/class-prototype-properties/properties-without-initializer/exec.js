function dec(target, name, descriptor) {

}

class Example {
  @dec prop;
}

let inst = new Example();
assert(inst.hasOwnProperty("prop"));
assert.equal(inst.prop, undefined);
