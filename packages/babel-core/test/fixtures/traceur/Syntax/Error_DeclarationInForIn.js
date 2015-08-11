// Options: --block-binding
// Error: :9:3: Unexpected reserved word let
// Error: :12:3: Unexpected reserved word const
// Error: :15:3: Unexpected reserved word function
// Error: :18:3: Unexpected reserved word class
// Error: :21:3: A statement cannot start with 'let ['

for (var key in {})
  let x;

for (var key in {})
  const y = 1;

for (var key in {})
  function f() {}

for (var key in {})
  class C {}

for (var key in {})
  let[0] = 1;
