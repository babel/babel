{ a; }
{ let a; }

(function () {
  { b; }
  { let b; }
})();

{ c = 0; }
{ let c; }

(function () {
  { d = 0; }
  { let d; }
})