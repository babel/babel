let a = 0, result;

for (const { [a++]: x, ...y} of [["0", "1"]]) {
  const a = 1;
  result = x;
}

expect(result).toBe("0");
