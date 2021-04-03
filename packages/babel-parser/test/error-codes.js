import { parse } from "../lib";

describe("error codes", function () {
  it("raises an error with BABEL_PARSER_SOURCETYPE_MODULE_REQUIRED and reasonCode", function () {
    const code = `import "foo"`;
    const { errors } = parse(code, {
      errorRecovery: true,
      sourceType: "script",
    });
    const error = errors[0];
    expect(error.code).toBe("BABEL_PARSER_SOURCETYPE_MODULE_REQUIRED");
    expect(error.reasonCode).toBe("ImportOutsideModule");
  });
  it("raises an error with BABEL_PARSER_SYNTAX_ERROR and reasonCode", function () {
    const code = `a b`;
    const { errors } = parse(code, { errorRecovery: true });
    const error = errors[0];
    expect(error.code).toBe("BABEL_PARSER_SYNTAX_ERROR");
    expect(error.reasonCode).toBe("MissingSemicolon");
  });
});
