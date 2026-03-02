{
  let receivedName;
  function decFactory(name) {
    receivedName = name;
    return x => x;
  }
  class B {
    static m() {
      class C {
        @decFactory(this.name) #p;
      }
    }
  }

  B.m();
  expect(receivedName).toBe("B");
}

{
  let receivedLength;
  function decFactory(length) {
    receivedLength = length;
    return x => x;
  }
  function noop() {}
  class B {
    static m() {
      @noop
      class C {
        @decFactory(this.length) #p;
        constructor(bar) {}
      }
    }
    constructor(foo, bar) {}
  }

  B.m();
  expect(receivedLength).toBe(2);
}

{
  let receivedLength;
  function decFactory(length) {
    receivedLength = length;
    return x => x;
  }
  function noop() {}
  class B {
    static m() {
      @noop
      class C {
        @decFactory(this.length) static #p;
        constructor(bar) {}
      }
    }
    constructor(foo, bar) {}
  }

  B.m();
  expect(receivedLength).toBe(2);
}
