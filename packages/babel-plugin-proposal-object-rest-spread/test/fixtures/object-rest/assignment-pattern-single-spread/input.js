var qux = { quux: 42 };
const { foo: { ...bar } = qux } = state;
