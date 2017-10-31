const calls = [];
function dec(id){
  calls.push(id);
  return function(){};
}

const obj = {
  @dec(1)
  @dec(2)
  method1(){},

  @dec(3)
  @dec(4)
  prop1: 1,

  @dec(5)
  @dec(6)
  method2(){},

  @dec(7)
  @dec(8)
  prop2: 2,
}

assert.deepEqual(calls, [1, 2, 3, 4, 5, 6, 7, 8]);
