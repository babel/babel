"use strict";

function square(x){
  return x * x;
}

const foo = square(?);

expect(foo(3)).toBe(9);
expect(foo.length).toEqual(1);
expect(foo.name).toEqual("square");
