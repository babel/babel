const React = { createElement: type => type };

// `<arguments.callee />` reads the throwing `callee` accessor of the unmapped
// `arguments` object of a function with destructuring parameters
function f(a, { ...r }) {
  return <arguments.callee />;
}
expect(() => f(1, {})).toThrow(TypeError);
