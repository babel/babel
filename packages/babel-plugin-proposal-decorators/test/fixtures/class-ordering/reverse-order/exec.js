const calls = [];

function dec(id){
  return function(){
    calls.push(id);
  };
}

@dec(10)
@dec(9)
class Example2 {
  @dec(2)
  @dec(1)
  method1() {};

  @dec(4)
  @dec(3)
  prop1 = 1;

  @dec(6)
  @dec(5)
  method2() {};

  @dec(8)
  @dec(7)
  prop2 = 2;
}

assert.deepEqual(calls, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
