function f({ ...a }, { ...b } = a) {}
function g({ a, ...r }, { [a]: b, ...s }) {}
