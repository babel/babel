// Options: --block-binding

let result = [];
let obj = {a : 'hello a', b : 'hello b', c : 'hello c' };
for (let x in obj) {
  result.push(
    function() { return obj[x]; }
  );
}

// ----------------------------------------------------------------------------

expect(result[0]()).toBe('hello a');
expect(result[1]()).toBe('hello b');
expect(result[2]()).toBe('hello c');
