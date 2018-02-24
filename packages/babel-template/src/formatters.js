// @flow

export type Formatter<T> = {
  code: string => string,
  validate: BabelNodeFile => void,
  unwrap: BabelNodeFile => T,
};

function makeStatementFormatter<T>(
  fn: (Array<BabelNodeStatement>) => T,
): Formatter<T> {
  return {
    // We need to prepend a ";" to force statement parsing so that
    // ExpressionStatement strings won't be parsed as directives.
    // Alonside that, we also prepend a comment so that when a syntax error
    // is encountered, the user will be less likely to get confused about
    // where the random semicolon came from.
    code: str => `/* @babel/template */;\n${str}`,
    validate: () => {},
    unwrap: (ast: BabelNodeFile): T => {
      return fn(ast.program.body.slice(1));
    },
  };
}

export const smart: Formatter<
  Array<BabelNodeStatement> | BabelNodeStatement,
> = makeStatementFormatter(body => {
  if (body.length > 1) {
    return body;
  } else {
    return body[0];
  }
});

export const statements: Formatter<
  Array<BabelNodeStatement>,
> = makeStatementFormatter(body => body);

export const statement: Formatter<BabelNodeStatement> = makeStatementFormatter(
  body => {
    // We do this validation when unwrapping since the replacement process
    // could have added or removed statements.
    if (body.length === 0) {
      throw new Error("Found nothing to return.");
    }
    if (body.length > 1) {
      throw new Error("Found multiple statements but wanted one");
    }

    return body[0];
  },
);

export const expression: Formatter<BabelNodeExpression> = {
  code: str => `(\n${str}\n)`,
  validate: (ast: BabelNodeFile) => {
    const { program } = ast;
    if (program.body.length > 1) {
      throw new Error("Found multiple statements but wanted one");
    }
    const expression = program.body[0].expression;
    if (expression.start === 0) {
      throw new Error("Parse result included parens.");
    }
  },
  unwrap: ast => ast.program.body[0].expression,
};

export const program: Formatter<BabelNodeProgram> = {
  code: str => str,
  validate: () => {},
  unwrap: ast => ast.program,
};
