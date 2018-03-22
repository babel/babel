// Options: --block-binding

var f1, f2;

{
  let z = 'z1 value';
  f1 = function() { return z; };
}
{
  let z = 'z2 value';
  f2 = function() { return z; };
}

// ----------------------------------------------------------------------------

expect(f1()).toBe('z1 value');
expect(f2()).toBe('z2 value');
