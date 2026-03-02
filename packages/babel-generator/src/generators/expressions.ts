import type Printer from "../printer";
import {
  isCallExpression,
  isLiteral,
  isMemberExpression,
  isNewExpression,
} from "@babel/types";
import type * as t from "@babel/types";
import * as n from "../node";

export function UnaryExpression(this: Printer, node: t.UnaryExpression) {
  if (
    node.operator === "void" ||
    node.operator === "delete" ||
    node.operator === "typeof" ||
    // throwExpressions
    node.operator === "throw"
  ) {
    this.word(node.operator);
    this.space();
  } else {
    this.token(node.operator);
  }

  this.print(node.argument, node);
}

export function DoExpression(this: Printer, node: t.DoExpression) {
  if (node.async) {
    this.word("async");
    this.space();
  }
  this.word("do");
  this.space();
  this.print(node.body, node);
}

export function ParenthesizedExpression(
  this: Printer,
  node: t.ParenthesizedExpression,
) {
  this.token("(");
  this.print(node.expression, node);
  this.token(")");
}

export function UpdateExpression(this: Printer, node: t.UpdateExpression) {
  if (node.prefix) {
    this.token(node.operator);
    this.print(node.argument, node);
  } else {
    this.startTerminatorless(true);
    this.print(node.argument, node);
    this.endTerminatorless();
    this.token(node.operator);
  }
}

export function ConditionalExpression(
  this: Printer,
  node: t.ConditionalExpression,
) {
  this.print(node.test, node);
  this.space();
  this.token("?");
  this.space();
  this.print(node.consequent, node);
  this.space();
  this.token(":");
  this.space();
  this.print(node.alternate, node);
}

export function NewExpression(
  this: Printer,
  node: t.NewExpression,
  parent: any,
) {
  this.word("new");
  this.space();
  this.print(node.callee, node);
  if (
    this.format.minified &&
    node.arguments.length === 0 &&
    !node.optional &&
    !isCallExpression(parent, { callee: node }) &&
    !isMemberExpression(parent) &&
    !isNewExpression(parent)
  ) {
    return;
  }

  this.print(node.typeArguments, node); // Flow
  this.print(node.typeParameters, node); // TS

  if (node.optional) {
    this.token("?.");
  }
  this.token("(");
  this.printList(node.arguments, node);
  this.token(")");
}

export function SequenceExpression(this: Printer, node: t.SequenceExpression) {
  this.printList(node.expressions, node);
}

export function ThisExpression(this: Printer) {
  this.word("this");
}

export function Super(this: Printer) {
  this.word("super");
}

export function Decorator(this: Printer, node: t.Decorator) {
  this.token("@");
  this.print(node.expression, node);
  this.newline();
}

export function OptionalMemberExpression(
  this: Printer,
  node: t.OptionalMemberExpression,
) {
  this.print(node.object, node);

  if (!node.computed && isMemberExpression(node.property)) {
    throw new TypeError("Got a MemberExpression for MemberExpression property");
  }

  let computed = node.computed;
  // @ts-expect-error todo(flow->ts) maybe instead of typeof check specific literal types?
  if (isLiteral(node.property) && typeof node.property.value === "number") {
    computed = true;
  }
  if (node.optional) {
    this.token("?.");
  }

  if (computed) {
    this.token("[");
    this.print(node.property, node);
    this.token("]");
  } else {
    if (!node.optional) {
      this.token(".");
    }
    this.print(node.property, node);
  }
}

export function OptionalCallExpression(
  this: Printer,
  node: t.OptionalCallExpression,
) {
  this.print(node.callee, node);

  this.print(node.typeArguments, node); // Flow
  this.print(node.typeParameters, node); // TS

  if (node.optional) {
    this.token("?.");
  }
  this.token("(");
  this.printList(node.arguments, node);
  this.token(")");
}

export function CallExpression(this: Printer, node: t.CallExpression) {
  this.print(node.callee, node);

  this.print(node.typeArguments, node); // Flow
  this.print(node.typeParameters, node); // TS
  this.token("(");
  this.printList(node.arguments, node);
  this.token(")");
}

export function Import(this: Printer) {
  this.word("import");
}

function buildYieldAwait(keyword: string) {
  return function (node: any) {
    this.word(keyword);

    if (node.delegate) {
      this.token("*");
    }

    if (node.argument) {
      this.space();
      const terminatorState = this.startTerminatorless();
      this.print(node.argument, node);
      this.endTerminatorless(terminatorState);
    }
  };
}

export const YieldExpression = buildYieldAwait("yield");
export const AwaitExpression = buildYieldAwait("await");

export function EmptyStatement(this: Printer) {
  this.semicolon(true /* force */);
}

export function ExpressionStatement(
  this: Printer,
  node: t.ExpressionStatement,
) {
  this.print(node.expression, node);
  this.semicolon();
}

export function AssignmentPattern(this: Printer, node: t.AssignmentPattern) {
  this.print(node.left, node);
  // @ts-expect-error todo(flow->ts) property present on some of the types in union but not all
  if (node.left.optional) this.token("?");
  // @ts-expect-error todo(flow->ts) property present on some of the types in union but not all
  this.print(node.left.typeAnnotation, node);
  this.space();
  this.token("=");
  this.space();
  this.print(node.right, node);
}

export function AssignmentExpression(
  this: Printer,
  node: t.AssignmentExpression,
  parent: any,
) {
  // Somewhere inside a for statement `init` node but doesn't usually
  // needs a paren except for `in` expressions: `for (a in b ? a : b;;)`
  const parens =
    this.inForStatementInitCounter &&
    node.operator === "in" &&
    !n.needsParens(node, parent);

  if (parens) {
    this.token("(");
  }

  this.print(node.left, node);

  this.space();
  if (node.operator === "in" || node.operator === "instanceof") {
    this.word(node.operator);
  } else {
    this.token(node.operator);
  }
  this.space();

  this.print(node.right, node);

  if (parens) {
    this.token(")");
  }
}

export function BindExpression(this: Printer, node: t.BindExpression) {
  this.print(node.object, node);
  this.token("::");
  this.print(node.callee, node);
}

export {
  AssignmentExpression as BinaryExpression,
  AssignmentExpression as LogicalExpression,
};

export function MemberExpression(this: Printer, node: t.MemberExpression) {
  this.print(node.object, node);

  if (!node.computed && isMemberExpression(node.property)) {
    throw new TypeError("Got a MemberExpression for MemberExpression property");
  }

  let computed = node.computed;
  // @ts-expect-error todo(flow->ts) maybe use specific literal types
  if (isLiteral(node.property) && typeof node.property.value === "number") {
    computed = true;
  }

  if (computed) {
    this.token("[");
    this.print(node.property, node);
    this.token("]");
  } else {
    this.token(".");
    this.print(node.property, node);
  }
}

export function MetaProperty(this: Printer, node: t.MetaProperty) {
  this.print(node.meta, node);
  this.token(".");
  this.print(node.property, node);
}

export function PrivateName(this: Printer, node: t.PrivateName) {
  this.token("#");
  this.print(node.id, node);
}

export function V8IntrinsicIdentifier(
  this: Printer,
  node: t.V8IntrinsicIdentifier,
) {
  this.token("%");
  this.word(node.name);
}

export function ModuleExpression(node: t.ModuleExpression) {
  this.word("module");
  this.space();
  this.token("{");
  if (node.body.body.length === 0) {
    this.token("}");
  } else {
    this.newline();
    this.printSequence(node.body.body, node, { indent: true });
    this.rightBrace();
  }
}
