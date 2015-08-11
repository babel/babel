function f([x] = [1], {y} = {y: 2}) {
  return x + y;
}

assert.equal(3, f());