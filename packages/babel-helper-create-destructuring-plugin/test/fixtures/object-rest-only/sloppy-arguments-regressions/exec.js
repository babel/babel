function redeclared(a, { ...r }, b = a) {
  function a() {}
  return [b, arguments[0]];
}
expect(redeclared(7, {})).toEqual([7, 7]);

function bodyFunction(a, { ...r }) {
  function a() {}
  return [typeof a, arguments[0], r];
}
expect(bodyFunction(7, { b: 8 })).toEqual(["function", 7, { b: 8 }]);

function evalVar(a, { ...r }) {
  eval("var a = 2");
  return [a, arguments[0], r];
}
expect(evalVar(7, { b: 8 })).toEqual([2, 7, { b: 8 }]);

function evalBlock(a, { ...r }) {
  eval("");
  {
    function a() {}
  }
  return [typeof a, arguments[0], r];
}
expect(evalBlock(7, { b: 8 })).toEqual(["number", 7, { b: 8 }]);

function callee({ ...r }) {
  return arguments;
}
function calleeIIFE(a, { ...r }) {
  function a() {}
  return arguments;
}
const value = { b: 8 };
const args = callee(value);
expect(args.length).toBe(1);
expect(args[0]).toBe(value);
const iifeArgs = calleeIIFE(7, value);
expect(iifeArgs.length).toBe(2);
expect(iifeArgs[0]).toBe(7);
expect(iifeArgs[1]).toBe(value);
for (const args of [callee(value), iifeArgs]) {
  const descriptor = Object.getOwnPropertyDescriptor(args, "callee");
  expect(descriptor.get).toBe(descriptor.set);
  expect(typeof descriptor.get).toBe("function");
  expect(descriptor.enumerable).toBe(false);
  expect(descriptor.configurable).toBe(false);
  expect(() => args.callee).toThrow(TypeError);
  expect(() => descriptor.set.call(args, null)).toThrow(TypeError);
  expect(delete args.callee).toBe(false);
}

function shadowedArguments(arguments, { ...r }) {
  eval("");
  return arguments;
}
expect(shadowedArguments(7, {})).toBe(7);

function bodyArguments(a, { ...r }) {
  function arguments() {}
  return typeof arguments;
}
expect(bodyArguments(7, {})).toBe("function");

function lexicalArguments(a, { ...r }) {
  const arguments = 7;
  eval("");
  return arguments;
}
expect(lexicalArguments(7, {})).toBe(7);
