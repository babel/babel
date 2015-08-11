// Options: --block-binding
// Error: :9:3: Unexpected reserved word let
// Error: :12:3: Unexpected reserved word const
// Error: :15:3: Unexpected reserved word function
// Error: :18:3: Unexpected reserved word class
// Error: :21:3: A statement cannot start with 'let ['

if (true) {} else
  let x;

if (true) {} else
  const y = 1;

if (true) {} else
  function f() {}

if (true) {} else
  class C {}

if (true) {} else
  let[0] = 1;

