import type Printer from "../printer.ts";
import { isFor, isIfStatement, isStatement, isVoidPattern } from "@babel/types";
import type * as t from "@babel/types";

// We inline this package
// eslint-disable-next-line import/no-extraneous-dependencies
import * as charCodes from "charcodes";
import { TokenContext } from "../node/index.ts";

export function WithStatement(this: Printer, node: t.WithStatement) {
  this.word("with");
  this.space();
  this.token("(");
  this.print(node.object);
  this.token(")");
  this.printBlock(node.body);
}

export function IfStatement(this: Printer, node: t.IfStatement) {
  this.word("if");
  this.space();
  this.token("(");
  this.print(node.test);
  this.token(")");
  this.space();

  const needsBlock =
    node.alternate && isIfStatement(getLastStatement(node.consequent));
  if (needsBlock) {
    this.token("{");
    this.newline();
    this.indent();
  }

  this.printAndIndentOnComments(node.consequent);

  if (needsBlock) {
    this.dedent();
    this.newline();
    this.token("}");
  }

  if (node.alternate) {
    if (this.endsWith(charCodes.rightCurlyBrace)) this.space();
    this.word("else");
    this.space();
    this.printAndIndentOnComments(node.alternate);
  }
}

// Recursively get the last statement.
function getLastStatement(statement: t.Statement): t.Statement {
  // @ts-expect-error: If statement.body is empty or not a Node, isStatement will return false
  const { body } = statement;
  if (isStatement(body) === false) {
    return statement;
  }

  return getLastStatement(body);
}

export function ForStatement(this: Printer, node: t.ForStatement) {
  this.word("for");
  this.space();
  this.token("(");

  this.tokenContext |=
    TokenContext.forInitHead | TokenContext.forInOrInitHeadAccumulate;
  this.print(node.init);
  this.tokenContext = TokenContext.normal;

  this.token(";");

  if (node.test) {
    this.space();
    this.print(node.test);
  }
  this.tokenChar(charCodes.semicolon, 1);

  if (node.update) {
    this.space();
    this.print(node.update);
  }

  this.token(")");
  this.printBlock(node.body);
}

export function WhileStatement(this: Printer, node: t.WhileStatement) {
  this.word("while");
  this.space();
  this.token("(");
  this.print(node.test);
  this.token(")");
  this.printBlock(node.body);
}

export function ForInStatement(this: Printer, node: t.ForInStatement) {
  this.word("for");
  this.space();
  this.noIndentInnerCommentsHere();
  this.token("(");
  this.tokenContext |=
    TokenContext.forInHead | TokenContext.forInOrInitHeadAccumulate;
  this.print(node.left);
  this.tokenContext = TokenContext.normal;
  this.space();
  this.word("in");
  this.space();
  this.print(node.right);
  this.token(")");
  this.printBlock(node.body);
}

export function ForOfStatement(this: Printer, node: t.ForOfStatement) {
  this.word("for");
  this.space();
  if (node.await) {
    this.word("await");
    this.space();
  }
  this.noIndentInnerCommentsHere();
  this.token("(");
  this.tokenContext |= TokenContext.forOfHead;
  this.print(node.left);
  this.space();
  this.word("of");
  this.space();
  this.print(node.right);
  this.token(")");
  this.printBlock(node.body);
}

export function DoWhileStatement(this: Printer, node: t.DoWhileStatement) {
  this.word("do");
  this.space();
  this.print(node.body);
  this.space();
  this.word("while");
  this.space();
  this.token("(");
  this.print(node.test);
  this.token(")");
  this.semicolon();
}

function printStatementAfterKeyword(
  printer: Printer,
  node: t.Node | null | undefined,
) {
  if (node) {
    printer.space();
    printer.printTerminatorless(node);
  }

  printer.semicolon();
}

export function BreakStatement(this: Printer, node: t.ContinueStatement) {
  this.word("break");
  printStatementAfterKeyword(this, node.label);
}

export function ContinueStatement(this: Printer, node: t.ContinueStatement) {
  this.word("continue");
  printStatementAfterKeyword(this, node.label);
}

export function ReturnStatement(this: Printer, node: t.ReturnStatement) {
  this.word("return");
  printStatementAfterKeyword(this, node.argument);
}

export function ThrowStatement(this: Printer, node: t.ThrowStatement) {
  this.word("throw");
  printStatementAfterKeyword(this, node.argument);
}

export function LabeledStatement(this: Printer, node: t.LabeledStatement) {
  this.print(node.label);
  this.token(":");
  this.space();
  this.print(node.body);
}

export function TryStatement(this: Printer, node: t.TryStatement) {
  this.word("try");
  this.space();
  this.print(node.block);
  this.space();

  // Esprima bug puts the catch clause in a `handlers` array.
  // see https://code.google.com/p/esprima/issues/detail?id=433
  // We run into this from regenerator generated ast.
  // @ts-expect-error todo(flow->ts) should ast node type be updated to support this?
  if (node.handlers) {
    // @ts-expect-error todo(flow->ts) should ast node type be updated to support this?
    this.print(node.handlers[0]);
  } else {
    this.print(node.handler);
  }

  if (node.finalizer) {
    this.space();
    this.word("finally");
    this.space();
    this.print(node.finalizer);
  }
}

export function CatchClause(this: Printer, node: t.CatchClause) {
  this.word("catch");
  this.space();
  if (node.param) {
    this.token("(");
    this.print(node.param);
    this.print(node.param.typeAnnotation);
    this.token(")");
    this.space();
  }
  this.print(node.body);
}

export function SwitchStatement(this: Printer, node: t.SwitchStatement) {
  this.word("switch");
  this.space();
  this.token("(");
  this.print(node.discriminant);
  this.token(")");
  this.space();
  this.token("{");

  this.printSequence(node.cases, true);

  this.rightBrace(node);
}

export function SwitchCase(this: Printer, node: t.SwitchCase) {
  if (node.test) {
    this.word("case");
    this.space();
    this.print(node.test);
    this.token(":");
  } else {
    this.word("default");
    this.token(":");
  }

  if (node.consequent.length) {
    this.newline();
    this.printSequence(node.consequent, true);
  }
}

export function DebuggerStatement(this: Printer) {
  this.word("debugger");
  this.semicolon();
}

function commaSeparatorWithNewline(this: Printer, occurrenceCount: number) {
  this.tokenChar(charCodes.comma, occurrenceCount);
  this.newline();
}

export function VariableDeclaration(
  this: Printer,
  node: t.VariableDeclaration,
  parent: t.Node,
) {
  if (node.declare) {
    // TS
    this.word("declare");
    this.space();
  }

  const { kind } = node;
  switch (kind) {
    case "await using":
      this.word("await");
      this.space();
    // fallthrough
    case "using":
      this.word("using", true);
      break;
    default:
      this.word(kind);
  }
  this.space();

  let hasInits = false;
  // don't add whitespace to loop heads
  if (!isFor(parent)) {
    for (const declar of node.declarations) {
      if (declar.init) {
        // has an init so let's split it up over multiple lines
        hasInits = true;
        break;
      }
    }
  }

  //
  // use a pretty separator when we aren't in compact mode, have initializers and don't have retainLines on
  // this will format declarations like:
  //
  //   let foo = "bar", bar = "foo";
  //
  // into
  //
  //   let foo = "bar",
  //       bar = "foo";
  //

  this.printList(
    node.declarations,
    undefined,
    undefined,
    node.declarations.length > 1,
    hasInits ? commaSeparatorWithNewline : undefined,
  );

  if (parent != null) {
    switch (parent.type) {
      case "ForStatement":
        if (parent.init === node) {
          return;
        }
        break;
      case "ForInStatement":
      case "ForOfStatement":
        if (parent.left === node) {
          return;
        }
    }
  }

  this.semicolon();
}

export function VariableDeclarator(this: Printer, node: t.VariableDeclarator) {
  this.print(node.id);
  if (node.definite) this.token("!"); // TS

  if (!isVoidPattern(node.id)) {
    this.print(node.id.typeAnnotation);
  }

  if (node.init) {
    this.space();
    this.token("=");
    this.space();
    this.print(node.init);
  }
}
