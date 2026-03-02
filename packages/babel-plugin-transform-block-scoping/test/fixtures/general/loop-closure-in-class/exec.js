let run = [];

for (let i = 0; i < 2; i++) {
  run.push(class C {
    x = i;
  });
}

expect(new run[0]().x).toBe(0);
expect(new run[1]().x).toBe(1);
