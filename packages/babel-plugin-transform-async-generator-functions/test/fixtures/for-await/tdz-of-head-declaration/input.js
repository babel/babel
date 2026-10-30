async function method() {
  const {a} = {};
  for await (const {a} of x(a)) {
    console.log(a);
  }
}
