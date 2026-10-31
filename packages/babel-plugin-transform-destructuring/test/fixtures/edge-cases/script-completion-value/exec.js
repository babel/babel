// The completion value of a script (e.g. with `eval`) is the one of the last
// statement that does not complete empty: lowering a destructuring assignment
// must not change it.
function check(code) {
  const lowered = transform(code, {
    configFile: false,
    sourceType: "script",
    plugins: ["@babel/plugin-transform-destructuring"],
  }).code;
  expect((0, eval)(lowered)).toEqual((0, eval)(code));
}

// for-x heads
check("var a; for ({ a } of [{ a: 1 }]);");
check("var a; for ({ a } of [{ a: 1 }]) { var q; }");
check("var a; for ({ a } of [{ a: 1 }]) continue;");
check("var a; for ({ a } of [{ a: 1 }, { a: 2 }]) a + 1;");
check("var k; for ([k] in { xy: 0 }) {}");
check("var k; for ([k] in { xy: 0 }) k;");
check("var a; 0; for ({ a } of []);");

// followed by statements that complete empty
check("var a; for ({ a } of [{ a: 1 }]); var z;");
check("var a; for ({ a } of [{ a: 1 }]); function z() {}");
check("var a; if (true) { for ({ a } of [{ a: 1 }]); ; } var z;");
check("var a; switch (0) { case 0: for ({ a } of [{ a: 1 }]); case 1: var z; }");
check("var a; l: for ({ a } of [{ a: 1 }]); m: { var z; }");

// assignments
check("var a; ({ a } = { a: 1 });");
check("var a; ({ a } = { a: 1 }); var z;");
check("var a; 0, ({ a } = { a: 1 }); { var z; }");
check("var a; ({ a } = { a: 1 }); 2;");
check("var a; { ({ a } = { a: 1 }); } debugger; class z {}");
check("var a; ({ a } = { a: 1 }), 2; var z;");

// `break` and `continue` carry the completion value of the list they exit
check("var a, o = { a: 1 }; while (true) { ({ a } = o); break; }");
check("var a, o = { a: 1 }; for (;;) { ({ a } = o); break; 0; }");
check("var a, i = 0; do { i++; ({ a } = { a: i }); continue; } while (i < 2)");
check("var a; for (;;) { for ({ a } of [{ a: 1 }]); break; }");
check("var a; l: { ({ a } = { a: 1 }); break l; } var z;");
check("var a; for ({ a } of [{ a: 1 }]) { if (a) break; }");

// a statement producing a value replaces the one of the assignment
check("var a; for ({ a } of [{ a: 1 }]) a + 1; var z;");
check("var a; for ({ a } of [{ a: 1 }]) { var q; if (a) break; } var z;");
check("var a; { ({ a } = { a: 1 }); if (a) 0; } var z;");
