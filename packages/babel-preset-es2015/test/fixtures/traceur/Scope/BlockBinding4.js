// Options: --block-binding

let result = [];
for (let a = 1; a < 3; a++) {
  result.push(
    function() { return 'for ' + a; }
  );
}

// ----------------------------------------------------------------------------

expect(result).toHaveLength(2);
expect(result[0]()).toBe('for 1');
expect(result[1]()).toBe('for 2');
