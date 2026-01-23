for (let i = 0; i < 3; i++) {
    if (i === 0) {
        function test() {
            return i;
        }
    }
  expect(test()).toBe(0);
}
