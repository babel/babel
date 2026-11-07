function f() {
  const { a, [k]: b, [1]: c, [key()]: d, ...rest } = obj;
  return rest;
}
