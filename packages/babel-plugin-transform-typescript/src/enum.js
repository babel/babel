export default function transpileEnum(path, t) {
  const { node } = path;
  if (node.declare) {
    path.remove();
    return;
  }

  if (node.const) {
    throw path.buildCodeFrameError("'const' enums are not supported.");
  }

  const name = node.id.name;
  const fill = enumFill(path, t, node.id);

  switch (path.parent.type) {
    case "BlockStatement":
    case "Program": {
      const isGlobal = t.isProgram(path.parent); // && !path.parent.body.some(t.isModuleDeclaration);
      if (seen(path.parentPath)) {
        path.replaceWith(fill);
      } else {
        path.replaceWithMultiple([
          makeVar(node.id, t, isGlobal ? "var" : "let"),
          fill,
        ]);
      }
      break;
    }

    case "ExportNamedDeclaration": {
      path.insertAfter(fill);
      if (seen(path.parentPath.parentPath)) {
        path.remove();
      } else {
        path.replaceWith(makeVar(node.id, t, "let"));
      }
      break;
    }

    default:
      throw new Error(`Unexpected enum parent '${path.parent.type}`);
  }

  function seen(parentPath: Path<Node>) {
    if (parentPath.getData(name)) {
      return true;
    } else {
      parentPath.setData(name, true);
      return false;
    }
  }
}

function makeVar(id, t, kind): VariableDeclaration {
  return t.variableDeclaration(kind, [t.variableDeclarator(id)]);
}

/**
 * Generates the statement that fills in the variable declared by the enum.
 * `(function (E) { ... assignments ... })(E || (E = {}));`
 */
function enumFill(path, t, id) {
  const x = translateEnumValues(path, t);
  const assignments = x.map(([memberName, memberValue]) => {
    const inner = t.assignmentExpression(
      "=",
      t.memberExpression(id, t.stringLiteral(memberName), /*computed*/ true),
      memberValue,
    );
    const outer = t.assignmentExpression(
      "=",
      t.memberExpression(id, inner, /*computed*/ true),
      t.stringLiteral(memberName),
    );
    return t.expressionStatement(outer);
  });

  // E || (E = {})
  const callArg = t.logicalExpression(
    "||",
    id,
    t.assignmentExpression("=", id, t.objectExpression([])),
  );
  const body = t.blockStatement(assignments);
  const callee = t.functionExpression(null, [id], body);
  return t.expressionStatement(t.callExpression(callee, [callArg]));
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
type PreviousEnumMembers = { [name: string]: number | typeof undefined };

function translateEnumValues(path, t) {
  const seen: PreviousEnumMembers = Object.create(null);
  // Start at -1 so the first enum member is its increment, 0.
  let prev: number | typeof undefined = -1;
  return path.node.members.map(member => {
    const name = t.isIdentifier(member.id) ? member.id.name : member.id.value;
    const initializer = member.initializer;
    let value: Expression;
    if (initializer) {
      const constValue = evaluate(initializer, seen);
      if (constValue !== undefined) {
        value = t.numericLiteral(constValue);
        prev = constValue;
      } else {
        value = initializer;
        prev = undefined;
      }
    } else {
      if (prev !== undefined) {
        prev++;
        value = t.numericLiteral(prev);
      } else {
        throw path.buildCodeFrameError("Enum member must have initializer.");
      }
    }

    return [name, value];
  });
}

// Based on the TypeScript repository's `evalConstant` in `checker.ts`.
function evaluate(expr, seen: PreviousEnumMembers) {
  return evalConstant(expr);

  function evalConstant(expr) {
    switch (expr.type) {
      case "UnaryExpression":
        return evalUnaryExpression(expr);
      case "BinaryExpression":
        return evalBinaryExpression(expr);
      case "NumericLiteral":
        return expr.value;
      case "ParenthesizedExpression":
        return evalConstant(expr.expression);
      case "Identifier":
        return seen[expr.name];
      default:
        return undefined;
    }
  }

  function evalUnaryExpression({ argument, operator }) {
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

  function evalBinaryExpression(expr) {
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
