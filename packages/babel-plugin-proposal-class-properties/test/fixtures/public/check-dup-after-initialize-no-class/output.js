// from issue 6872
// TODO: move to whatever plugin owns defineProperty?
var log = [];

class Foo extends class {} {
  constructor() {
    try {
      super();
    } finally {
      babelHelpers.defineProperty(this, "x", log.push(1));
    }

    try {
      super();
    } finally {
      babelHelpers.defineProperty(this, "x", log.push(1));
    }
  }

}

try {
  new Foo();
} catch (e) {}

expect(log).toEqual([1, 1]);
