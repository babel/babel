import repeating from "repeating";
import * as keywords from "../fragments/keywords";
import * as punctuators from "../fragments/punctuators";
import * as t from "babel-types";

export function WithStatement(node: Object) {
  this.push(new keywords.WithKeyword);
  this.push(new punctuators.ParenLPunctuator);
  this.print(node.object, node);
  this.push(new punctuators.ParenRPunctuator);
  this.printBlock(node);
}

export function IfStatement(node: Object) {
  this.push(new keywords.IfKeyword);
  this.push(new punctuators.ParenLPunctuator);
  this.print(node.test, node);
  this.push(new punctuators.ParenRPunctuator);

  let needsBlock = node.alternate && t.isIfStatement(node.consequent);
  if (needsBlock) {
    this.push(new punctuators.CurlyLPunctuator);
    this.newline();
    this.indent();
  }

  this.printAndIndentOnComments(node.consequent, node);

  if (needsBlock) {
    this.dedent();
    this.newline();
    this.push(new punctuators.CurlyRPunctuator);
  }

  if (node.alternate) {
    this.push(new keywords.ElseKeyword);
    this.printAndIndentOnComments(node.alternate, node);
  }
}

export function ForStatement(node: Object) {
  this.push(new keywords.ForKeyword);
  this.push(new punctuators.ParenLPunctuator);

  this._inForStatementInit = true;
  this.print(node.init, node);
  this._inForStatementInit = false;
  this.push(new punctuators.SemicolonPunctuator);

  if (node.test) {
    this.print(node.test, node);
  }
  this.push(new punctuators.SemicolonPunctuator);

  if (node.update) {
    this.print(node.update, node);
  }

  this.push(new punctuators.ParenRPunctuator);
  this.printBlock(node);
}

export function WhileStatement(node: Object) {
  this.push(new keywords.WhileKeyword);
  this.push(new punctuators.ParenLPunctuator);
  this.print(node.test, node);
  this.push(new punctuators.ParenRPunctuator);
  this.printBlock(node);
}

let buildForXStatement = function (op) {
  return function (node: Object) {
    this.push(new keywords.ForKeyword);
    this.push(new punctuators.ParenLPunctuator);
    this.print(node.left, node);
    this.push(` ${op} `);
    this.print(node.right, node);
    this.push(new punctuators.ParenRPunctuator);
    this.printBlock(node);
  };
};

export let ForInStatement = buildForXStatement("in");
export let ForOfStatement = buildForXStatement("of");

export function DoWhileStatement(node: Object) {
  this.push(new keywords.DoKeyword);
  this.print(node.body, node);
  this.push(new keywords.WhileKeyword);
  this.push(new punctuators.ParenLPunctuator);
  this.print(node.test, node);
  this.push(new punctuators.ParenRPunctuator);
}

function buildLabelStatement(PrefixKeyword, key = "label") {
  return function (node: Object) {
    this.push(new PrefixKeyword);

    let label = node[key];
    if (label) {
      this.print(label, node);
    }

    this.push(new punctuators.SemicolonPunctuator);
  };
}

export let ContinueStatement = buildLabelStatement(keywords.ContinueKeyword);
export let ReturnStatement   = buildLabelStatement(keywords.ReturnKeyword, "argument");
export let BreakStatement    = buildLabelStatement(keywords.BreakKeyword);
export let ThrowStatement    = buildLabelStatement(keywords.ThrowKeyword, "argument");

export function LabeledStatement(node: Object) {
  this.print(node.label, node);
  this.push(": ");
  this.print(node.body, node);
}

export function TryStatement(node: Object) {
  this.push(new keywords.TryKeyword);
  this.print(node.block, node);

  // Esprima bug puts the catch clause in a `handlers` array.
  // see https://code.google.com/p/esprima/issues/detail?id=433
  // We run into this from regenerator generated ast.
  if (node.handlers) {
    this.print(node.handlers[0], node);
  } else {
    this.print(node.handler, node);
  }

  if (node.finalizer) {
    this.push(new keywords.FinallyKeyword);
    this.print(node.finalizer, node);
  }
}

export function CatchClause(node: Object) {
  this.push(new keywords.CatchKeyword);
  this.push(new punctuators.ParenLPunctuator);
  this.print(node.param, node);
  this.push(new punctuators.ParenRPunctuator);
  this.print(node.body, node);
}

export function SwitchStatement(node: Object) {
  this.push(new keywords.SwitchKeyword);
  this.push(new punctuators.ParenLPunctuator);
  this.print(node.discriminant, node);
  this.push(new punctuators.ParenRPunctuator);
  this.push(new punctuators.CurlyLPunctuator);

  this.printSequence(node.cases, node, {
    indent: true,
    addNewlines(leading, cas) {
      if (!leading && node.cases[node.cases.length - 1] === cas) return -1;
    }
  });

  this.push(new punctuators.CurlyRPunctuator);
}

export function SwitchCase(node: Object) {
  if (node.test) {
    this.push(new keywords.CaseKeyword);
    this.print(node.test, node);
    this.push(new punctuators.ColonPunctuator);
  } else {
    this.push(new keywords.DefaultKeyword);
    this.push(new punctuators.ColonPunctuator);
  }

  if (node.consequent.length) {
    this.newline();
    this.printSequence(node.consequent, node, { indent: true });
  }
}

export function DebuggerStatement() {
  this.push("debugger;");
}

export function VariableDeclaration(node: Object, parent: Object) {
  if (node.kind === "let") {
    this.push(new keywords.LetKeyword);
  } else if (node.kind === "const") {
    this.push(new keywords.ConstKeyword);
  } else if (node.kind === "var") {
    this.push(new keywords.VarKeyword);
  } else {
    throw new TypeError(`Unknown variable declaration kind ${JSON.stringify(node.kind)}`);
  }

  let hasInits = false;
  // don't add whitespace to loop heads
  if (!t.isFor(parent)) {
    for (let declar of (node.declarations: Array<Object>)) {
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

  let sep;
  if (!this.format.compact && !this.format.concise && hasInits && !this.format.retainLines) {
    sep = `,\n${repeating(" ", node.kind.length + 1)}`;
  }

  //

  this.printList(node.declarations, node, { separator: sep });

  if (t.isFor(parent)) {
    // don't give semicolons to these nodes since they'll be inserted in the parent generator
    if (parent.left === node || parent.init === node) return;
  }

  this.push(new punctuators.SemicolonPunctuator);
}

export function VariableDeclarator(node: Object) {
  this.print(node.id, node);
  this.print(node.id.typeAnnotation, node);
  if (node.init) {
    this.push(" = ");
    this.print(node.init, node);
  }
}
