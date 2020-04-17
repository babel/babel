async function f() {
  for await (let { x, y: [z] } of a) {
    g(x, z);
  }
}
