// Options: --block-binding
// Error: :9:3: Unexpected reserved word let
// Error: :12:3: Unexpected reserved word const
// Error: :15:3: Unexpected reserved word function
// Error: :18:3: Unexpected reserved word class
// Error: :21:3: A statement cannot start with 'let ['

while (false)
  let x;

while (false)
  const y = 1;

while (false)
  function f() {}

while (false)
  class C {}

while (false)
  let[0] = 1;
