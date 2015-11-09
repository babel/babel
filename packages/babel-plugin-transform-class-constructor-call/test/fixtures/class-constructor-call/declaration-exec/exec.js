class Foo {
  constructor() {
    this.num = 1;
  }

  call constructor() {
    return { num: 2 };
  }
}

assert.equal(new Foo().num, 1);
assert.equal(Foo().num, 2);
