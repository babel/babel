// Options: --block-binding

let result = [];
for (let i = 1; i < 3; i ++) {
  for (let j = 9; j > 7; j --) {
    result.push(
      function() { return i + ':' + j; }
    );
  }
}

// ----------------------------------------------------------------------------

expect(result).toHaveLength(4);
expect(result[0]()).toBe('1:9');
expect(result[1]()).toBe('1:8');
expect(result[2]()).toBe('2:9');
expect(result[3]()).toBe('2:8');
