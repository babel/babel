// "random" :)
let random = (i => {
  const vals = [0, 0, 1, 1];
  return () => vals[i++];
})(0);

expect(() => {
  function f() { x }
  random() && f();
  let x;
}).not.toThrow();

expect(() => {
  function f() { x }
  random() || f();
  let x;
}).toThrow(ReferenceError);

expect(() => {
  function f() { x }
  random() && f();
  let x;
}).toThrow(ReferenceError);

expect(() => {
  function f() { x }
  random() || f();
  let x;
}).not.toThrow();
