// Options: --block-binding
// Error: :9:3: Unexpected reserved word let
// Error: :12:3: Unexpected reserved word const
// Error: :15:3: Unexpected reserved word function
// Error: :18:3: Unexpected reserved word class
// Error: :21:3: A statement cannot start with 'let ['

for (var item of [])
  let x;

for (var item of [])
  const y = 1;

for (var item of [])
  function f() {}

for (var item of [])
  class C {}

for (var item of [])
  let[0] = 1;
