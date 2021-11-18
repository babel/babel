const describeSkipPublish = process.env.IS_PUBLISH ? describe.skip : describe;

describeSkipPublish("token types", () => {
  let tt, tokenOperatorPrecedence;
  beforeAll(async () => {
    ({ tt, tokenOperatorPrecedence } = await import(
      "../../../lib/tokenizer/types.js"
    ));
  });

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
