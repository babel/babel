const x = async (
  // some comment
  a
) => {
  return foo(await a);
};

function foo(a) {
  return a;
}
