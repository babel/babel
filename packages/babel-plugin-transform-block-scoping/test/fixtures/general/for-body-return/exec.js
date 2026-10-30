function run() {
  for (let i = 0; i < 2; i++) return () => i;
}

const reader = run();
expect(reader()).toBe(0);
