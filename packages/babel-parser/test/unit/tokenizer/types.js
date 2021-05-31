import { types } from "../../../src/tokenizer/types";

describe("token types", () => {
  it("should check if the binOp for relational === in", () => {
    expect(types.relational.binop).toEqual(types._in.binop);
  });

  it("should check if the binOp for relational === instanceOf", () => {
    expect(types.relational.binop).toEqual(types._instanceof.binop);
  });

  it("should check if the binOp for in === instanceOf", () => {
    expect(types._in.binop).toEqual(types._instanceof.binop);
  });
});
