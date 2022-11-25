(new class {
  f() { delete super.x; }
}).f();

(new class {
  f() { delete super[0]; }
}).f();

// [expr] should be evaluated
var counter = 0;
(new class {
  f() { delete super[++counter]; }
}).f();

// TypeError before ReferenceError
(new class {
  f() { delete super[0()]; }
}).f();
