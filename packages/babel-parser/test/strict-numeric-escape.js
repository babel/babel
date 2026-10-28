import { parse } from "../lib/index.js";

describe.each([
  ["strict option", { strictMode: true }, ""],
  ["module", { sourceType: "module" }, ""],
  ["strict directive", { sourceType: "script" }, '; "use strict";'],
])("numeric escapes with %s", (_, options, suffix) => {
  test.each([
    [String.raw`\8`, String.raw`\8`],
    [String.raw`\9`, String.raw`\9`],
    [String.raw`\1`, String.raw`\1`],
    [String.raw`\07`, String.raw`\07`],
    [String.raw`\377`, String.raw`\377`],
    [String.raw`\400`, String.raw`\40`],
    [String.raw`\08`, String.raw`\08`],
    [String.raw`\09`, String.raw`\09`],
  ])("identifies %s", (input, escape) => {
    const source = `"${input}"${suffix}`;
    const message = `Invalid numeric escape '${escape}' in strict mode. (1:2)`;

    expect(() => parse(source, options)).toThrow(message);

    const { errors } = parse(source, { ...options, errorRecovery: true });
    expect(errors).toHaveLength(1);
    expect(errors[0]).toMatchObject({
      message,
      reasonCode: "StrictNumericEscape",
      loc: { line: 1, column: 2, index: 2 },
      details: { escape },
    });
  });

  it("accepts a null escape", () => {
    expect(parse(`"\\0"${suffix}`, options).errors).toHaveLength(0);
  });
});
