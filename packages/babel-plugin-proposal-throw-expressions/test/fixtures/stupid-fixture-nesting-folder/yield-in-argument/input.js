function* test() {
  (throw new Error(yield 'test'));
}
