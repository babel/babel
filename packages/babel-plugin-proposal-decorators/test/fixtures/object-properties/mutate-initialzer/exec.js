function dec(target, name, descriptor){
  assert(target);
  assert.equal(name, "prop");
  assert.equal(typeof descriptor, "object");

  let {initializer} = descriptor;
  delete descriptor.initializer;
  delete descriptor.writable;

  let value;
  descriptor.get = function(){
    if (initializer){
      value = '__' + initializer.call(this) + '__';
      initializer = null;
    }
    return value;
  };
}

let inst = {
  @dec
  prop: 3
};

assert.equal(inst.prop, "__3__");
