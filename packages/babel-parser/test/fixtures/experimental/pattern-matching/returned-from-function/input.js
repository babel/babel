function foo() {
  return match (x) {
    when({ z }) { false }
  }
}

const a = () => match (z) {
  when({ n: 200 }) { "true" }
}
