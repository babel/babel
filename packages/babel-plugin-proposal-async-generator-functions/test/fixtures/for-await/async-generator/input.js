async function* g() {
  for await (let x of y) {
    f(x);
  }
}
