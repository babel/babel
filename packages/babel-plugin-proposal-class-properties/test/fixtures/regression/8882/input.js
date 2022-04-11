const classes = [];
for (let i = 0; i <= 10; ++i) {
  classes.push(
    class A {
      [i] = `computed field ${i}`;
      static foo = `static field ${i}`;
      #bar = `private field ${i}`;
      getBar() {
        return this.#bar;
      }
    }
  );
}