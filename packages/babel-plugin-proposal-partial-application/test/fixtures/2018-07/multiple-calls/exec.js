function add(a, b) {
  return a + b;
}

function square(x){
  return x * x;
}

const foo = add(?, 1);
const bar = square(?);

expect(bar(foo(2))).toEqual(9);
expect(foo(2)).toEqual(3);
expect(bar(4)).toEqual(16);
expect(foo.length).toEqual(1);
expect(foo.name).toEqual("add");
expect(bar.length).toEqual(1);
expect(bar.name).toEqual("square");
