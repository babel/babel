let list = [1, 2, 3, 4];
for (let i = 0, { length } = list; i < length; i++) {
  list[i];
}

let sum = 0;
for (let i = 0, { length } = list; i < length; i++) {
  sum += list[i];
}
expect(sum).toBe(10);
expect(typeof length).toBe("undefined");
