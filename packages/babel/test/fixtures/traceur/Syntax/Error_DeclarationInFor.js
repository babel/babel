// Options: --block-binding
// Error: :9:3: Unexpected reserved word let
// Error: :12:3: Unexpected reserved word const
// Error: :15:3: Unexpected reserved word function
// Error: :18:3: Unexpected reserved word class
// Error: :21:3: A statement cannot start with 'let ['

for (;;)
  let x;

for (;;)
  const y = 1;

for (;;)
  function f() {}

for (;;)
  class C {}

for (;;)
  let[0] = 1;
