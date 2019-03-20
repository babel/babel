// from issue 6872

var log = [];

class Foo {
  constructor() {
    log.push(1);
  }
}
class Bar extends Foo {
  x = log.push(2);

  constructor() {
    super();
    super();
  }
}

try {
  new Bar;
} catch(e) {}

expect(log).toEqual([1, 2, 1, 2]);
