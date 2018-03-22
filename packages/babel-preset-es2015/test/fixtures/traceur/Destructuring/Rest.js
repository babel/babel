function destructRest() {
  var a, b, c, d;
  [...a] = [1, 2, 3];
  [b, ...c] = [1, 2, 3];
  [,,, ...d] = [1, 2, 3];
  return {a: a, b: b, c: c, d: d};
}

var result = destructRest();
expect(result.a).toEqual([1, 2, 3]);;
expect(result.b).toBe(1);
expect(result.c).toEqual([2, 3]);;
expect(result.d).toEqual([]);;

assert.throw(function() {
  var e;
  // No iterator.
  [...e] = {x: 'boom'};
}, TypeError);
