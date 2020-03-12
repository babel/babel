// from issue 6872

var log = [];

class Foo extends class {} {
  x = log.push(1);

  constructor() {
    super();
    super();
  }
}
