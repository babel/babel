async function f() {
  for await (let x of y) {
    g(x);
  }
}
