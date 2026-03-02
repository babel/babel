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
