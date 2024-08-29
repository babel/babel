import { parse } from "../lib/index.js";
import { IS_BABEL_8 } from "$repo-utils";

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
  it("consistent reasonCode between Flow and TypeScript in Babel 8", () => {
    const code = `function f([]?) {}`;
    const {
      errors: [tsError],
    } = parse(code, {
      errorRecovery: true,
      plugins: ["typescript"],
    });
    const {
      errors: [flowError],
    } = parse(code, {
      errorRecovery: true,
      plugins: ["flow"],
    });
    expect(flowError.reasonCode).toBe(
      process.env.BABEL_8_BREAKING
        ? tsError.reasonCode
        : "OptionalBindingPattern",
    );
    expect(flowError.message).toBe(tsError.message);
  });
  it("Use correct spelling in Babel 8", function () {
    const code = `
interface Foo {
  get foo<T>(): string;
  set bar<T>(v);
}
`;
    const { errors } = parse(code, {
      errorRecovery: true,
      plugins: ["typescript"],
    });
    const error = errors[0];
    expect(error.code).toBe("BABEL_PARSER_SYNTAX_ERROR");
    expect(error.reasonCode).toBe(
      IS_BABEL_8()
        ? "AccessorCannotHaveTypeParameters"
        : "AccesorCannotHaveTypeParameters",
    );
  });
});
