const results = [];

for (let i = 0; i < 2; i++) {
  class C {
    static before = results.push(#x in C);
    static #x = i;
    static after = results.push(#x in C);
  }
}

// Every evaluation of the class declaration has its own storage for #x
expect(results).toEqual([false, true, false, true]);
