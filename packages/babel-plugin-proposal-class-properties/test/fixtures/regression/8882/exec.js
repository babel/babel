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

for(let i=0; i<= 10; ++i) {
  const clazz = classes[i];
  expect(clazz.foo).toBe('static field ' + i);
  
  const instance = new clazz();
  expect(Object.getOwnPropertyNames(instance)).toEqual([String(i)])
  expect(instance[i]).toBe('computed field ' + i);
  expect(instance.getBar()).toBe('private field ' + i);
}