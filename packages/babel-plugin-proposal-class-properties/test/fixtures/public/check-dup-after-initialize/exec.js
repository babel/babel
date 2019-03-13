// from issue 6872

var log = [];

class Foo extends class {} {
  x = log.push(1);

  constructor() {
    super();
    super();
  }
}

try {
  new Foo;
} catch(e) {}

expect(log).toEqual([1, 1]);
