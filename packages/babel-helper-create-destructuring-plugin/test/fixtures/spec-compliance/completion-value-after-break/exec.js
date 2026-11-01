// A `break` or `continue` carries the completion value of the list it exits
// past the following statements of the outer lists.
function check(code) {
  const lowered = transform(code, {
    configFile: false,
    sourceType: "script",
    plugins: ["@babel/plugin-transform-destructuring"],
  }).code;
  expect((0, eval)(lowered)).toEqual((0, eval)(code));
}

check("var a, o = { a: 1 }; switch (1) { case 1: ({ a } = o); break; case 2: 5; }");
check("var a, o = { a: 1 }; for (;;) { { ({ a } = o); break; } 5; }");
check("var a, o = { a: 1 }; do { if (1) { ({ a } = o); break; } 5; } while (0)");
check("var a, o = { a: 1 }; L: { if (true) { ({ a } = o); break L; } 5; }");
check("var a, o = { a: 1 }; for (var i = 0; i < 2; i++) { if (i) { ({ a } = o); continue; } 5; }");
check("var a, b; switch (1) { case 1: [a, b] = [1, 2]; break; case 2: 5; }");
check("var a; for (;;) { { for ({ a } of [{ a: 1 }]); break; } 5; }");
check("var a, b; switch (1) { case 1: for ([a, b] of [[1, 2]]); break; case 2: 5; }");

// in a function, the completion value is not observable
check("var a, o = { a: 1 }; (function () { for (;;) { { ({ a } = o); break; } 5; } })();");
