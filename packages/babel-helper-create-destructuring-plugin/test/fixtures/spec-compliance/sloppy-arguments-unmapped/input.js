function f(b, { ...a }) {
  b = 9;
  return arguments[0];
}
function g(c, [d], { ...e }) {
  arguments[0] = "changed";
  return c;
}
function h(i, { ...j }) {
  function i() {}
  return [typeof i, typeof arguments[0]];
}
function k(l, { ...m }) {
  arguments;
  {
    function l() {}
  }
  return typeof l;
}
function n(o, { ...p }) {
  var o;
  arguments;
  return o;
}
