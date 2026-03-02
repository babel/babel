function dec() {}

var i = 0;
var log = [];

function push(x) { log.push(x); return x; }

function decWithInitializer(_, { addInitializer }) {
  addInitializer(() => push(i++) );
}

new @dec class C1 {
  @dec static p
}

new @dec class C2 {
  @dec static #p
}

new @dec class C3 {
  @dec p
}

new @dec class C4 {
  @dec #p
}

new @decWithInitializer class C5 {
  @dec static p
}

new @decWithInitializer class C6 {
  @dec static #p
}

new @decWithInitializer class C7 {
  @dec p
}

new @decWithInitializer class C8 {
  @dec #p
}

var nums = Array.from({ length: 4 }, (_, i) => i);
expect(log).toEqual(nums);
