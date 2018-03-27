function f([x] = [1], {y} = {y: 2}) {
  return x + y;
}

expect(3).toBe(f());
