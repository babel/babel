const calls = [];

function dec(id){
  calls.push(id);
  return function() {};
}

@dec(1)
@dec(2)
class Example {
  @dec(3)
  @dec(4)
  method1() {};

  @dec(5)
  @dec(6)
  prop1 = 1;

  @dec(7)
  @dec(8)
  method2() {};

  @dec(9)
  @dec(10)
  prop2 = 2;
}

expect(calls).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
