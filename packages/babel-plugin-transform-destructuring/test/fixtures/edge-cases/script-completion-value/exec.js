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
