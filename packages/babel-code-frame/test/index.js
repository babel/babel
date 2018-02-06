import assert from "assert";
import chalk from "chalk";
import stripAnsi from "strip-ansi";
import codeFrame, { codeFrameColumns } from "..";

describe("@babel/code-frame", function() {
  it("basic usage", function() {
    const rawLines = ["class Foo {", "  constructor()", "};"].join("\n");
    assert.equal(
      codeFrame(rawLines, 2, 16),
      [
        "  1 | class Foo {",
        "> 2 |   constructor()",
        "    |                ^",
        "  3 | };",
      ].join("\n"),
    );
  });

  it("optional column number", function() {
    const rawLines = ["class Foo {", "  constructor()", "};"].join("\n");
    assert.equal(
      codeFrame(rawLines, 2, null),
      ["  1 | class Foo {", "> 2 |   constructor()", "  3 | };"].join("\n"),
    );
  });

  it("maximum context lines and padding", function() {
    const rawLines = [
      "/**",
      " * Sums two numbers.",
      " *",
      " * @param a Number",
      " * @param b Number",
      " * @returns Number",
      " */",
      "",
      "function sum(a, b) {",
      "  return a + b",
      "}",
    ].join("\n");
    assert.equal(
      codeFrame(rawLines, 7, 2),
      [
        "   5 |  * @param b Number",
        "   6 |  * @returns Number",
        ">  7 |  */",
        "     |  ^",
        "   8 | ",
        "   9 | function sum(a, b) {",
        "  10 |   return a + b",
      ].join("\n"),
    );
  });

  it("no unnecessary padding due to one-off errors", function() {
    const rawLines = [
      "/**",
      " * Sums two numbers.",
      " *",
      " * @param a Number",
      " * @param b Number",
      " * @returns Number",
      " */",
      "",
      "function sum(a, b) {",
      "  return a + b",
      "}",
    ].join("\n");
    assert.equal(
      codeFrame(rawLines, 6, 2),
      [
        "  4 |  * @param a Number",
        "  5 |  * @param b Number",
        "> 6 |  * @returns Number",
        "    |  ^",
        "  7 |  */",
        "  8 | ",
        "  9 | function sum(a, b) {",
      ].join("\n"),
    );
  });

  it("tabs", function() {
    const rawLines = [
      "\tclass Foo {",
      "\t  \t\t    constructor\t(\t)",
      "\t};",
    ].join("\n");
    assert.equal(
      codeFrame(rawLines, 2, 25),
      [
        "  1 | \tclass Foo {",
        "> 2 | \t  \t\t    constructor\t(\t)",
        "    | \t  \t\t               \t \t ^",
        "  3 | \t};",
      ].join("\n"),
    );
  });

  it("opts.highlightCode", function() {
    const rawLines = "console.log('babel')";
    const result = codeFrame(rawLines, 1, 9, { highlightCode: true });
    const stripped = stripAnsi(result);
    assert.ok(result.length > stripped.length);
    assert.equal(
      stripped,
      ["> 1 | console.log('babel')", "    |         ^"].join("\n"),
    );
  });

  it("opts.linesAbove", function() {
    const rawLines = [
      "/**",
      " * Sums two numbers.",
      " *",
      " * @param a Number",
      " * @param b Number",
      " * @returns Number",
      " */",
      "",
      "function sum(a, b) {",
      "  return a + b",
      "}",
    ].join("\n");
    assert.equal(
      codeFrame(rawLines, 7, 2, { linesAbove: 1 }),
      [
        "   6 |  * @returns Number",
        ">  7 |  */",
        "     |  ^",
        "   8 | ",
        "   9 | function sum(a, b) {",
        "  10 |   return a + b",
      ].join("\n"),
    );
  });

  it("opts.linesBelow", function() {
    const rawLines = [
      "/**",
      " * Sums two numbers.",
      " *",
      " * @param a Number",
      " * @param b Number",
      " * @returns Number",
      " */",
      "",
      "function sum(a, b) {",
      "  return a + b",
      "}",
    ].join("\n");
    assert.equal(
      codeFrame(rawLines, 7, 2, { linesBelow: 1 }),
      [
        "  5 |  * @param b Number",
        "  6 |  * @returns Number",
        "> 7 |  */",
        "    |  ^",
        "  8 | ",
      ].join("\n"),
    );
  });

  it("opts.linesAbove and opts.linesBelow", function() {
    const rawLines = [
      "/**",
      " * Sums two numbers.",
      " *",
      " * @param a Number",
      " * @param b Number",
      " * @returns Number",
      " */",
      "",
      "function sum(a, b) {",
      "  return a + b",
      "}",
    ].join("\n");
    assert.equal(
      codeFrame(rawLines, 7, 2, { linesAbove: 1, linesBelow: 1 }),
      ["  6 |  * @returns Number", "> 7 |  */", "    |  ^", "  8 | "].join(
        "\n",
      ),
    );
  });

  it("opts.linesAbove no lines above", function() {
    const rawLines = [
      "class Foo {",
      "  constructor() {",
      "    console.log(arguments);",
      "  }",
      "};",
    ].join("\n");
    assert.equal(
      codeFrameColumns(rawLines, { start: { line: 2 } }, { linesAbove: 0 }),
      [
        "> 2 |   constructor() {",
        "  3 |     console.log(arguments);",
        "  4 |   }",
        "  5 | };",
      ].join("\n"),
    );
  });

  it("opts.linesBelow no lines below", function() {
    const rawLines = [
      "class Foo {",
      "  constructor() {",
      "    console.log(arguments);",
      "  }",
      "};",
    ].join("\n");
    assert.equal(
      codeFrameColumns(rawLines, { start: { line: 2 } }, { linesBelow: 0 }),
      ["  1 | class Foo {", "> 2 |   constructor() {"].join("\n"),
    );
  });

  it("opts.linesBelow single line", function() {
    const rawLines = [
      "class Foo {",
      "  constructor() {",
      "    console.log(arguments);",
      "  }",
      "};",
    ].join("\n");
    assert.equal(
      codeFrameColumns(
        rawLines,
        { start: { line: 2 } },
        { linesAbove: 0, linesBelow: 0 },
      ),
      ["> 2 |   constructor() {"].join("\n"),
    );
  });

  it("opts.forceColor", function() {
    const marker = chalk.red.bold;
    const gutter = chalk.grey;

    const rawLines = ["", "", "", ""].join("\n");
    assert.equal(
      codeFrame(rawLines, 3, null, {
        linesAbove: 1,
        linesBelow: 1,
        forceColor: true,
      }),
      chalk.reset(
        [
          " " + gutter(" 2 | "),
          marker(">") + gutter(" 3 | "),
          " " + gutter(" 4 | "),
        ].join("\n"),
      ),
    );
  });

  it("basic usage, new API", function() {
    const rawLines = ["class Foo {", "  constructor()", "};"].join("\n");
    assert.equal(
      codeFrameColumns(rawLines, { start: { line: 2, column: 16 } }),
      [
        "  1 | class Foo {",
        "> 2 |   constructor()",
        "    |                ^",
        "  3 | };",
      ].join("\n"),
    );
  });

  it("mark multiple columns", function() {
    const rawLines = ["class Foo {", "  constructor()", "};"].join("\n");
    assert.equal(
      codeFrameColumns(rawLines, {
        start: { line: 2, column: 3 },
        end: { line: 2, column: 16 },
      }),
      [
        "  1 | class Foo {",
        "> 2 |   constructor()",
        "    |   ^^^^^^^^^^^^^",
        "  3 | };",
      ].join("\n"),
    );
  });

  it("mark multiple columns across lines", function() {
    const rawLines = ["class Foo {", "  constructor() {", "  }", "};"].join(
      "\n",
    );
    assert.equal(
      codeFrameColumns(rawLines, {
        start: { line: 2, column: 17 },
        end: { line: 3, column: 3 },
      }),
      [
        "  1 | class Foo {",
        "> 2 |   constructor() {",
        "    |                 ^",
        "> 3 |   }",
        "    | ^^^",
        "  4 | };",
      ].join("\n"),
    );
  });

  it("mark multiple columns across multiple lines", function() {
    const rawLines = [
      "class Foo {",
      "  constructor() {",
      "    console.log(arguments);",
      "  }",
      "};",
    ].join("\n");
    assert.equal(
      codeFrameColumns(rawLines, {
        start: { line: 2, column: 17 },
        end: { line: 4, column: 3 },
      }),
      [
        "  1 | class Foo {",
        "> 2 |   constructor() {",
        "    |                 ^",
        "> 3 |     console.log(arguments);",
        "    | ^^^^^^^^^^^^^^^^^^^^^^^^^^^",
        "> 4 |   }",
        "    | ^^^",
        "  5 | };",
      ].join("\n"),
    );
  });

  it("mark across multiple lines without columns", function() {
    const rawLines = [
      "class Foo {",
      "  constructor() {",
      "    console.log(arguments);",
      "  }",
      "};",
    ].join("\n");
    assert.equal(
      codeFrameColumns(rawLines, { start: { line: 2 }, end: { line: 4 } }),
      [
        "  1 | class Foo {",
        "> 2 |   constructor() {",
        "> 3 |     console.log(arguments);",
        "> 4 |   }",
        "  5 | };",
      ].join("\n"),
    );
  });

  it("opts.message", function() {
    const rawLines = ["class Foo {", "  constructor()", "};"].join("\n");
    assert.equal(
      codeFrameColumns(
        rawLines,
        { start: { line: 2, column: 16 } },
        {
          message: "Missing {",
        },
      ),
      [
        "  1 | class Foo {",
        "> 2 |   constructor()",
        "    |                ^ Missing {",
        "  3 | };",
      ].join("\n"),
    );
  });

  it("opts.message without column", function() {
    const rawLines = ["class Foo {", "  constructor()", "};"].join("\n");
    assert.equal(
      codeFrameColumns(
        rawLines,
        { start: { line: 2 } },
        {
          message: "Missing {",
        },
      ),
      [
        "  Missing {",
        "  1 | class Foo {",
        "> 2 |   constructor()",
        "  3 | };",
      ].join("\n"),
    );
  });

  it("opts.message with multiple lines", function() {
    const rawLines = [
      "class Foo {",
      "  constructor() {",
      "    console.log(arguments);",
      "  }",
      "};",
    ].join("\n");
    assert.equal(
      codeFrameColumns(
        rawLines,
        {
          start: { line: 2, column: 17 },
          end: { line: 4, column: 3 },
        },
        {
          message: "something about the constructor body",
        },
      ),
      [
        "  1 | class Foo {",
        "> 2 |   constructor() {",
        "    |                 ^",
        "> 3 |     console.log(arguments);",
        "    | ^^^^^^^^^^^^^^^^^^^^^^^^^^^",
        "> 4 |   }",
        "    | ^^^ something about the constructor body",
        "  5 | };",
      ].join("\n"),
    );
  });

  it("opts.message with multiple lines without columns", function() {
    const rawLines = [
      "class Foo {",
      "  constructor() {",
      "    console.log(arguments);",
      "  }",
      "};",
    ].join("\n");
    assert.equal(
      codeFrameColumns(
        rawLines,
        { start: { line: 2 }, end: { line: 4 } },
        {
          message: "something about the constructor body",
        },
      ),
      [
        "  something about the constructor body",
        "  1 | class Foo {",
        "> 2 |   constructor() {",
        "> 3 |     console.log(arguments);",
        "> 4 |   }",
        "  5 | };",
      ].join("\n"),
    );
  });
});
