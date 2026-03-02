expect(() => {
  var { ...x } = null;
}).toThrow(/null/);

expect(() => {
  var { x, ...y } = null;
}).toThrow(/null/);
