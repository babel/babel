function f(...args) {
  args[0] = convert(args[0]);
  return g(...args);
}
