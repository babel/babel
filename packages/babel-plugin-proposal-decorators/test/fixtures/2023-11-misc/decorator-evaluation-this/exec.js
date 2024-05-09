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
  let receivedName;
  function decFactory(name) {
    receivedName = name;
    return x => x;
  }
  class B {
    static m() {
      @decFactory(this.name)
      class C {
         #p;
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

{
  let C;
  const newC = class {};
  const B = () => newC;
  B.m = function () {
    C = @(this)
    class {
       #p;
    }
  }

  B.m();
  expect(C).toBe(newC);
}