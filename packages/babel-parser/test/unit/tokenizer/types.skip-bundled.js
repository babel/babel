import { tt, tokenOperatorPrecedence } from "../../../lib/tokenizer/types.js";

describe("token types", () => {
  it("should check if the binOp for relational === in", () => {
    expect(tokenOperatorPrecedence(tt.relational)).toEqual(
      tokenOperatorPrecedence(tt._in),
    );
  });

  it("should check if the binOp for relational === instanceOf", () => {
    expect(tokenOperatorPrecedence(tt.relational)).toEqual(
      tokenOperatorPrecedence(tt._instanceof),
    );
  });

  it("should check if the binOp for in === instanceOf", () => {
    expect(tokenOperatorPrecedence(tt._in)).toEqual(
      tokenOperatorPrecedence(tt._instanceof),
    );
  });
});
