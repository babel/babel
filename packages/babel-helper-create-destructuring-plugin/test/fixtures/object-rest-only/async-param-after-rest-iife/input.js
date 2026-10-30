async function f({ ...o }, ...rest) {
  function rest() {}
  return [o, typeof rest];
}
