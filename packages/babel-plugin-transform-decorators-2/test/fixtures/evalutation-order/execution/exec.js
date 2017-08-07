const calls = [];

function dec(id){
  return function(descriptor) { 
    calls.push(id); 
    return {descriptor, extras:[], finishers:[] };
  };
}

class Foo {
  @dec(2)
  @dec(1)
  method1() {}

  @dec(4)
  @dec(3)
  method2() {}

  @dec(6)
  @dec(5)
  method3() {}

  @dec(8)
  @dec(7)
  method4() {}
}

assert.deepEqual(calls, [1, 2, 3, 4, 5, 6, 7, 8]);
