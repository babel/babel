import type Printer from "../printer.ts";
import {
  isFor,
  isForStatement,
  isIfStatement,
  isStatement,
} from "@babel/types";
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
  this.printBlock(node);
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

  {
    const exit = this.enterForStatementInit();
    this.tokenContext |= TokenContext.forHead;
    this.print(node.init);
    exit();
  }

  this.token(";");

  if (node.test) {
    this.space();
    this.print(node.test);
  }
  this.token(";");

  if (node.update) {
    this.space();
    this.print(node.update);
  }

  this.token(")");
  this.printBlock(node);
}

export function WhileStatement(this: Printer, node: t.WhileStatement) {
  this.word("while");
  this.space();
  this.token("(");
  this.print(node.test);
  this.token(")");
  this.printBlock(node);
}

function ForXStatement(this: Printer, node: t.ForXStatement) {
  this.word("for");
  this.space();
  const isForOf = node.type === "ForOfStatement";
  if (isForOf && node.await) {
    this.word("await");
    this.space();
  }
  this.noIndentInnerCommentsHere();
  this.token("(");
  {
    const exit = isForOf ? null : this.enterForStatementInit();
    this.tokenContext |= isForOf
      ? TokenContext.forOfHead
      : TokenContext.forInHead;
    this.print(node.left);
    exit?.();
  }
  this.space();
  this.word(isForOf ? "of" : "in");
  this.space();
  this.print(node.right);
  this.token(")");
  this.printBlock(node);
}

export const ForInStatement = ForXStatement;
export const ForOfStatement = ForXStatement;

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

function printStatementAfterKeyword(printer: Printer, node: t.Node) {
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

  this.printSequence(node.cases, {
    indent: true,
    addNewlines(leading, cas) {
      if (!leading && node.cases[node.cases.length - 1] === cas) return -1;
    },
  });

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
    this.printSequence(node.consequent, { indent: true });
  }
}

export function DebuggerStatement(this: Printer) {
  this.word("debugger");
  this.semicolon();
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
  if (kind === "await using") {
    this.word("await");
    this.space();
    this.word("using", true);
  } else {
    this.word(kind, kind === "using");
  }
  this.space();

  let hasInits = false;
  // don't add whitespace to loop heads
  if (!isFor(parent)) {
    for (const declar of node.declarations) {
      if (declar.init) {
        // has an init so let's split it up over multiple lines
        hasInits = true;
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

  this.printList(node.declarations, {
    separator: hasInits
      ? function (this: Printer) {
          this.token(",");
          this.newline();
        }
      : undefined,
    indent: node.declarations.length > 1 ? true : false,
  });

  if (isFor(parent)) {
    // don't give semicolons to these nodes since they'll be inserted in the parent generator
    if (isForStatement(parent)) {
      if (parent.init === node) return;
    } else {
      if (parent.left === node) return;
    }
  }

  this.semicolon();
}

export function VariableDeclarator(this: Printer, node: t.VariableDeclarator) {
  this.print(node.id);
  if (node.definite) this.token("!"); // TS
  // @ts-expect-error todo(flow-ts) Property 'typeAnnotation' does not exist on type 'MemberExpression'.
  this.print(node.id.typeAnnotation);
  if (node.init) {
    this.space();
    this.token("=");
    this.space();
    this.print(node.init);
  }
}
