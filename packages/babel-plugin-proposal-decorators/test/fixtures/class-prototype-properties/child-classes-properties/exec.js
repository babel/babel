function dec(target, name, descriptor){
  assert(target);
  assert.equal(typeof name, "string");
  assert.equal(typeof descriptor, "object");

  target.decoratedProps = (target.decoratedProps || []).concat([name]);

  let initializer = descriptor.initializer;
  descriptor.initializer = function(...args){
    return "__" + initializer.apply(this, args) + "__";
  };
}

class Base {
  @dec
  prop2 = 4;
}

class Example extends Base {
  @dec
  prop = 3;
}

let inst = new Example();

assert.equal(inst.prop, "__3__");
assert.equal(inst.prop2, "__4__");
