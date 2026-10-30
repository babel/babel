async function run() {
  var captured;
  class C {
    static {
      for (let i = 0; i < 2; i++) captured = () => i;
    }
  }
  await 0;
  return captured();
}

const result = run();
expect(result).resolves.toBe(1);
