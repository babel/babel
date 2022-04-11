function foo() {
  let input = ['a', 'b', 'c']
  let output = {}

  for (let c of input) {
    let name = c
    output[name] = name
  }

  return output
}
