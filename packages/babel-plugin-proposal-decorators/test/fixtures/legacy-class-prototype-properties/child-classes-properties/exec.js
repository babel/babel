function dec(target, name, descriptor){
  expect(target).toBeTruthy();
  expect(typeof name).toBe("string");
  expect(typeof descriptor).toBe("object");

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

expect(inst.prop).toBe("__3__");
expect(inst.prop2).toBe("__4__");
