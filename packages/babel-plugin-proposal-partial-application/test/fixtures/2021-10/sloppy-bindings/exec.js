function f(...args) {
  return args;
}

// The partially applied function has its own `arguments`
function shadowedArguments() {
  var arguments = 1;
  return f~(arguments);
}
expect(shadowedArguments()()).toEqual([1]);

// An Annex B `var` redeclaration assigns to the catch parameter
try {
  throw 1;
} catch (e) {
  var g = f~(e);
  var e = 2;
  expect(g()).toEqual([1]);
}
