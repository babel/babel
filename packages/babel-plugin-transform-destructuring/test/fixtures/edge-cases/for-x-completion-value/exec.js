// The completion value of a loop is the one of its last iteration whose body
// does not complete empty: assigning the pattern must not change it.
function check(code) {
  const lowered = transform(code, {
    configFile: false,
    sourceType: "script",
    plugins: ["@babel/plugin-transform-destructuring"],
  }).code;
  expect((0, eval)(lowered)).toBe((0, eval)(code));
}

check("var a; for ({ a } of [{ a: 1 }]);");
check("var a; for ({ a } of [{ a: 1 }]) { var q; }");
check("var a; for ({ a } of [{ a: 1 }]) continue;");
check("var a; for ({ a } of [{ a: 1 }, { a: 2 }]) a + 1;");
check("var k; for ([k] in { xy: 0 }) {}");
check("var k; for ([k] in { xy: 0 }) k;");
check("var a; 0; for ({ a } of []);");
