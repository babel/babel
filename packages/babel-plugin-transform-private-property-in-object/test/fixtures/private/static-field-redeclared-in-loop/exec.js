const results = [];

for (let i = 0; i < 2; i++) {
  class C {
    static before = results.push(#x in C);
    static #x = i;
    static after = results.push(#x in C);
  }
}

// Every evaluation of the class declaration shares the storage of #x, so after
// the first one it already holds a value before the next class initializes it.
// This output is wrong: natively, it is [false, true, false, true].
expect(results).toEqual([false, true, true, true]);
