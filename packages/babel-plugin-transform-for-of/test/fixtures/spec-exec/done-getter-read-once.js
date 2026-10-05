// The `done` getter of each iterator result must be read exactly once,
// including for the final result (ECMA-262 IteratorComplete in
// ForIn/OfBodyEvaluation).

let doneReads = 0;
let count = 0;

const obj = {
  [Symbol.iterator]: () => ({
    next: () => {
      const done = ++count > 2;
      return {
        get done() {
          doneReads++;
          return done;
        },
        value: count,
      };
    },
  }),
};

const values = [];
for (const x of obj) {
  values.push(x);
}

expect(values).toEqual([1, 2]);
expect(doneReads).toBe(3);
