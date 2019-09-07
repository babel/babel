expect(
  () => {
    var [foo, bar] = undefined;
  }).toThrow("Invalid attempt to destructure non-iterable instance");

expect(
  () => {
    var foo = [ ...undefined ];
  }).toThrow("Invalid attempt to spread non-iterable instance");
