function dec() {}

var i = 0;
var log = [];

function push(x) { log.push(x); return x; }

function decWithInitializer(_, { addInitializer }) {
  addInitializer(() => push(i++) );
}

new @dec class C1 {
  @dec static m() {}
}

new @dec class C2 {
  @dec static #m() {}
}

new @dec class C3 {
  @dec m() {}
}

new @dec class C4 {
  @dec #m() {}
}

new @decWithInitializer class C5 {
  @dec static m() {}
}

new @decWithInitializer class C6 {
  @dec static #m() {}
}

new @decWithInitializer class C7 {
  @dec m() {}
}

new @decWithInitializer class C8 {
  @dec #m() {}
}

new @dec class C9 {
  @decWithInitializer static m() {}
}

new @dec class C10 {
  @decWithInitializer static #m() {}
}

new @dec class C11 {
  @decWithInitializer m() {}
}

new @dec class C12 {
  @decWithInitializer #m() {}
}

new @decWithInitializer class C13 {
  @decWithInitializer static m() {}
}

new @decWithInitializer class C14 {
  @decWithInitializer static #m() {}
}

new @decWithInitializer class C15 {
  @decWithInitializer m() {}
}

new @decWithInitializer class C16 {
  @decWithInitializer #m() {}
}

var nums = Array.from({ length: 16 }, (_, i) => i);
expect(log).toEqual(nums);
