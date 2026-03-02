{
  let receivedNewTarget;
  function decFactory(target) {
    receivedNewTarget = target;
    return x => x;
  }
  function B() {
    class C {
      @decFactory(new.target) #p;
    }
  }

  new B();

  expect(receivedNewTarget).toBe(B);
}

{
  let receivedNewTarget;
  function decFactory(target) {
    receivedNewTarget = target;
    return x => x;
  }
  function B() {
    @decFactory(new.target)
    class C {
       #p;
    }
  }

  new B();

  expect(receivedNewTarget).toBe(B);
}

{
  function noop() {}
  let receivedNewTarget;
  function decFactory(target) {
    receivedNewTarget = target;
    return x => x;
  }
  function B() {
    @noop
    class C {
      @decFactory(new.target) #p;
    }
  }

  new B();

  expect(receivedNewTarget).toBe(B);
}

{
  function noop() {}
  let receivedNewTarget;
  function decFactory(target) {
    receivedNewTarget = target;
    return x => x;
  }
  function B() {
    @noop
    class C {
      @decFactory(new.target) static #p;
    }
  }

  new B();

  expect(receivedNewTarget).toBe(B);
}

{
  let C;
  const newC = class {};
  function B () {
    C = @(new.target)
    class {
       #p;
    }
  }

  Reflect.construct(B, [], function () { return newC })
  expect(C).toBe(newC);
}