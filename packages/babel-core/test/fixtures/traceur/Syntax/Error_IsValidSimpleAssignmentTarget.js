// Options: --async-functions --async-generators --for-on
// Error: :16:1: Invalid left-hand side expression in assignment
// Error: :17:1: Invalid left-hand side expression in assignment
// Error: :18:3: Invalid left-hand side expression in prefix operation
// Error: :19:3: Invalid left-hand side expression in prefix operation
// Error: :20:1: Invalid left-hand side expression in postfix operation
// Error: :21:1: Invalid left-hand side expression in postfix operation
// Error: :25:3: Invalid left-hand side expression in assignment
// Error: :26:3: Invalid left-hand side expression in assignment
// Error: :30:5: Invalid left-hand side expression in assignment
// Error: :33:12: Invalid left-hand side expression in assignment
// Error: :35:6: Invalid left-hand side expression in assignment
// Error: :37:6: Invalid left-hand side expression in assignment
// Error: :40:7: Invalid left-hand side expression in assignment

this = 1;
42 = 1;
++42
--42
42++
42--

function f() {
  'use strict';
  arguments = 1;
  eval = 1;
}

var x;
[x, 42] = [1, 2];

var y;
({y, prop: 42} = {y: 2, prop: 3});

for (42 in {}) {}

for (42 of []) {}

async function* ag() {
 for (42 on {}) {}
}
