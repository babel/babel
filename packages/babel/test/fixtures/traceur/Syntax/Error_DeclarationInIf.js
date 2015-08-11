// Options: --block-binding
// Error: :9:3: Unexpected reserved word let
// Error: :12:3: Unexpected reserved word const
// Error: :15:3: Unexpected reserved word function
// Error: :18:3: Unexpected reserved word class
// Error: :21:3: A statement cannot start with 'let ['

if (true)
  let x;

if (true)
  const y = 1;

if (true)
  function f() {}

if (true)
  class C {}

if (true)
  let[0] = 1;
