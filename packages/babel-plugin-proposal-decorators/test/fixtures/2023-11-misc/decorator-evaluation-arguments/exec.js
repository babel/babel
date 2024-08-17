{
  let receivedArguments;
  function decFactory(args) {
    receivedArguments = args;
    return x => x;
  }
  function B() {
    class C {
      @decFactory(arguments) #p;
    }
  }

  B(0);
  expect(receivedArguments).toHaveLength(1);
  expect(receivedArguments[0]).toBe(0);
}

{
  function noop() {}
  let receivedArguments;
  function decFactory(args) {
    receivedArguments = args;
    return x => x;
  }
  function B() {
    @noop
    class C {
      @decFactory(arguments) #p;
    }
  }

  B(0);
  expect(receivedArguments).toHaveLength(1);
  expect(receivedArguments[0]).toBe(0);
}

{
  function noop() {}
  let receivedArguments;
  function decFactory(args) {
    receivedArguments = args;
    return x => x;
  }
  function B() {
    @noop
    class C {
      @decFactory(arguments) static #p;
    }
  }

  B(0);
  expect(receivedArguments).toHaveLength(1);
  expect(receivedArguments[0]).toBe(0);
}
