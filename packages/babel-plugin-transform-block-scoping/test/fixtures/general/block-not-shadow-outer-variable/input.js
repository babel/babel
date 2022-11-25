let a = 1;

function f() {
  { console.log(a); }
  { let a = 2; }
}
