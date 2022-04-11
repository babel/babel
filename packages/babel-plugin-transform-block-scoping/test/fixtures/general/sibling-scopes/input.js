var f1, f2;
{
  let z = 'z1 value';
  f1 = function() { return z; };
}
{
  let z = 'z2 value';
  f2 = function() { return z; };
}
f1();
f2();
