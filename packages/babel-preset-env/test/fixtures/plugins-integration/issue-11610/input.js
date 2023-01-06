async function v(source = 2) {
  for await (source of [1]) {
  }
}
