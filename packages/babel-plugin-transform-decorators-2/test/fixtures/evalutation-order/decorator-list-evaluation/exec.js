const calls = [];

function dec(id){
  calls.push(id);
  return function(descriptor) { return {descriptor, extras:[], finishers:[] };};
}

class Foo {
  @dec(1)
  @dec(2)
  method1() {}

  @dec(3)
  @dec(4)
  method2() {}

  @dec(5)
  @dec(6)
  method3() {}

  @dec(7)
  @dec(8)
  method4() {}
}

assert.deepEqual(calls, [1, 2, 3, 4, 5, 6, 7, 8]);

