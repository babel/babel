const instances = [];
const classes = [];
for (const i of [1, 2]) {
  class C {
    #m() {
      return [C, i];
    }
    static get(o) {
      return o.#m();
    }
  }
  instances.push(new C());
  classes.push(C);

  classes.push(
    class {
      #m() {
        return i;
      }
      get() {
        return this.#m();
      }
    },
  );
}

// Instances created in the first iteration keep working after the second one,
// and each class only accepts its own instances
expect(classes[0].get(instances[0])).toEqual([classes[0], 1]);
expect(classes[2].get(instances[1])).toEqual([classes[2], 2]);
expect(() => classes[2].get(instances[0])).toThrow(TypeError);
expect(new classes[1]().get()).toBe(1);
expect(new classes[3]().get()).toBe(2);
expect(() => classes[3].prototype.get.call(new classes[1]())).toThrow(
  TypeError,
);

// In a switch case, the variables are declared in the loop body
const saved = [];
for (const i of [1, 2]) {
  switch (i) {
    default: {
      class S {
        #m() {
          return i;
        }
        read() {
          return this.#m();
        }
      }
      saved.push(new S());
    }
  }
  switch (i) {
    default:
      class S {
        #m() {
          return i;
        }
        read() {
          return this.#m();
        }
      }
      saved.push(new S());
  }
}
expect(saved.map(s => s.read())).toEqual([1, 1, 2, 2]);
