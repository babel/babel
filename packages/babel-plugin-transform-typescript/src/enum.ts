import { template } from "@babel/core";
import type { NodePath } from "@babel/traverse";
import type * as t from "@babel/types";
import assert from "assert";

type t = typeof t;

export default function transpileEnum(
  path: NodePath<t.TSEnumDeclaration>,
  t: t,
) {
  const { node } = path;

  if (node.declare) {
    path.remove();
    return;
  }

  const name = node.id.name;
  const fill = enumFill(path, t, node.id);

  switch (path.parent.type) {
    case "BlockStatement":
    case "ExportNamedDeclaration":
    case "Program": {
      path.insertAfter(fill);
      if (seen(path.parentPath)) {
        path.remove();
      } else {
        const isGlobal = t.isProgram(path.parent); // && !path.parent.body.some(t.isModuleDeclaration);
        path.scope.registerDeclaration(
          path.replaceWith(makeVar(node.id, t, isGlobal ? "var" : "let"))[0],
        );
      }
      break;
    }

    default:
      throw new Error(`Unexpected enum parent '${path.parent.type}`);
  }

  function seen(parentPath: NodePath<t.Node>): boolean {
    if (parentPath.isExportDeclaration()) {
      return seen(parentPath.parentPath);
    }

    if (parentPath.getData(name)) {
      return true;
    } else {
      parentPath.setData(name, true);
      return false;
    }
  }
}

function makeVar(id: t.Identifier, t: t, kind: "var" | "let" | "const") {
  return t.variableDeclaration(kind, [t.variableDeclarator(id)]);
}

const buildEnumWrapper = template(`
  (function (ID) {
    ASSIGNMENTS;
  })(ID || (ID = {}));
`);

const buildStringAssignment = template(`
  ENUM["NAME"] = VALUE;
`);

const buildNumericAssignment = template(`
  ENUM[ENUM["NAME"] = VALUE] = "NAME";
`);

const buildEnumMember = (isString: boolean, options: Record<string, unknown>) =>
  (isString ? buildStringAssignment : buildNumericAssignment)(options);

/**
 * Generates the statement that fills in the variable declared by the enum.
 * `(function (E) { ... assignments ... })(E || (E = {}));`
 */
function enumFill(path: NodePath<t.TSEnumDeclaration>, t: t, id: t.Identifier) {
  const x = translateEnumValues(path, t);
  const assignments = x.map(([memberName, memberValue]) =>
    buildEnumMember(t.isStringLiteral(memberValue), {
      ENUM: t.cloneNode(id),
      NAME: memberName,
      VALUE: memberValue,
    }),
  );

  return buildEnumWrapper({
    ID: t.cloneNode(id),
    ASSIGNMENTS: assignments,
  });
}

/**
 * Maps the name of an enum member to its value.
 * We keep track of the previous enum members so you can write code like:
 *   enum E {
 *     X = 1 << 0,
 *     Y = 1 << 1,
 *     Z = X | Y,
 *   }
 */
type PreviousEnumMembers = Map<string, number | string>;

type EnumSelfReferenceVisitorState = {
  seen: PreviousEnumMembers;
  path: NodePath<t.TSEnumDeclaration>;
  t: t;
};

function ReferencedIdentifier(
  expr: NodePath<t.Identifier>,
  state: EnumSelfReferenceVisitorState,
) {
  const { seen, path, t } = state;
  const name = expr.node.name;
  if (seen.has(name) && !expr.scope.hasOwnBinding(name)) {
    expr.replaceWith(
      t.memberExpression(t.cloneNode(path.node.id), t.cloneNode(expr.node)),
    );
    expr.skip();
  }
}

const enumSelfReferenceVisitor = {
  ReferencedIdentifier,
};

export function translateEnumValues(
  path: NodePath<t.TSEnumDeclaration>,
  t: t,
): Array<[name: string, value: t.Expression]> {
  const seen: PreviousEnumMembers = new Map();
  // Start at -1 so the first enum member is its increment, 0.
  let constValue: number | string | undefined = -1;
  let lastName: string;

  return path.get("members").map(memberPath => {
    const member = memberPath.node;
    const name = t.isIdentifier(member.id) ? member.id.name : member.id.value;
    const initializer = member.initializer;
    let value: t.Expression;
    if (initializer) {
      constValue = evaluate(initializer, seen);
      if (constValue !== undefined) {
        seen.set(name, constValue);
        if (typeof constValue === "number") {
          value = t.numericLiteral(constValue);
        } else {
          assert(typeof constValue === "string");
          value = t.stringLiteral(constValue);
        }
      } else {
        const initializerPath = memberPath.get("initializer");

        if (initializerPath.isReferencedIdentifier()) {
          ReferencedIdentifier(initializerPath, {
            t,
            seen,
            path,
          });
        } else {
          initializerPath.traverse(enumSelfReferenceVisitor, { t, seen, path });
        }

        value = initializerPath.node;
        seen.set(name, undefined);
      }
    } else if (typeof constValue === "number") {
      constValue += 1;
      value = t.numericLiteral(constValue);
      seen.set(name, constValue);
    } else if (typeof constValue === "string") {
      throw path.buildCodeFrameError("Enum member must have initializer.");
    } else {
      // create dynamic initializer: 1 + ENUM["PREVIOUS"]
      const lastRef = t.memberExpression(
        t.cloneNode(path.node.id),
        t.stringLiteral(lastName),
        true,
      );
      value = t.binaryExpression("+", t.numericLiteral(1), lastRef);
      seen.set(name, undefined);
    }

    lastName = name;
    return [name, value];
  });
}

// Based on the TypeScript repository's `evalConstant` in `checker.ts`.
function evaluate(
  expr: t.Node,
  seen: PreviousEnumMembers,
): number | string | typeof undefined {
  return evalConstant(expr);

  function evalConstant(expr: t.Node): number | typeof undefined {
    switch (expr.type) {
      case "StringLiteral":
        return expr.value;
      case "UnaryExpression":
        return evalUnaryExpression(expr);
      case "BinaryExpression":
        return evalBinaryExpression(expr);
      case "NumericLiteral":
        return expr.value;
      case "ParenthesizedExpression":
        return evalConstant(expr.expression);
      case "Identifier":
        return seen.get(expr.name);
      case "TemplateLiteral":
        if (expr.quasis.length === 1) {
          return expr.quasis[0].value.cooked;
        }
      /* falls through */
      default:
        return undefined;
    }
  }

  function evalUnaryExpression({
    argument,
    operator,
  }: t.UnaryExpression): number | typeof undefined {
    const value = evalConstant(argument);
    if (value === undefined) {
      return undefined;
    }

    switch (operator) {
      case "+":
        return value;
      case "-":
        return -value;
      case "~":
        return ~value;
      default:
        return undefined;
    }
  }

  function evalBinaryExpression(expr: t.BinaryExpression): number | undefined {
    const left = evalConstant(expr.left);
    if (left === undefined) {
      return undefined;
    }
    const right = evalConstant(expr.right);
    if (right === undefined) {
      return undefined;
    }

    switch (expr.operator) {
      case "|":
        return left | right;
      case "&":
        return left & right;
      case ">>":
        return left >> right;
      case ">>>":
        return left >>> right;
      case "<<":
        return left << right;
      case "^":
        return left ^ right;
      case "*":
        return left * right;
      case "/":
        return left / right;
      case "+":
        return left + right;
      case "-":
        return left - right;
      case "%":
        return left % right;
      default:
        return undefined;
    }
  }
}
