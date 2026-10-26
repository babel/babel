function redeclared(a, b = a) {
  function a() {}
  return [b, arguments[0]];
}
expect(redeclared(7)).toEqual([7, 7]);

function restRedeclared(a, ...r) {
  function a() {}
  return [typeof a, arguments[0], r];
}
expect(restRedeclared(7, 8)).toEqual(["function", 7, [8]]);

function evalVar(a, ...r) {
  eval("var a = 2");
  return [a, arguments[0], r];
}
expect(evalVar(7, 8)).toEqual([2, 7, [8]]);

function evalBlock(a, ...r) {
  eval("");
  {
    function a() {}
  }
  return [typeof a, arguments[0], r];
}
expect(evalBlock(7, 8)).toEqual(["number", 7, [8]]);

function callee(a = 0) {
  return arguments;
}
function calleeIIFE(a, b = a) {
  function a() {}
  return arguments;
}
for (const args of [callee(7, 8), calleeIIFE(7, 8)]) {
  expect(args.length).toBe(2);
  expect([args[0], args[1]]).toEqual([7, 8]);
  const descriptor = Object.getOwnPropertyDescriptor(args, "callee");
  expect(descriptor.get).toBe(descriptor.set);
  expect(typeof descriptor.get).toBe("function");
  expect(descriptor.enumerable).toBe(false);
  expect(descriptor.configurable).toBe(false);
  expect(() => args.callee).toThrow(TypeError);
  expect(() => descriptor.set.call(args, null)).toThrow(TypeError);
  expect(delete args.callee).toBe(false);
}

function shadowedArguments(arguments, { a }) {
  eval("");
  return arguments;
}
expect(shadowedArguments(7, {})).toBe(7);

function bodyArguments(a, { b }) {
  function arguments() {}
  return typeof arguments;
}
expect(bodyArguments(7, {})).toBe("function");

function lexicalArguments(a, { b }) {
  const arguments = 7;
  eval("");
  return arguments;
}
expect(lexicalArguments(7, {})).toBe(7);
