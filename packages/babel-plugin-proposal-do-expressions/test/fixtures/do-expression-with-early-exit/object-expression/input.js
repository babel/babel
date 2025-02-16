function main() {
  const obj = {
    [effect(1)]: effect(2),
    [effect(3)]: do { if (effect(4)) return 0 },
    [effect(5)]: effect(6),
  }
}
