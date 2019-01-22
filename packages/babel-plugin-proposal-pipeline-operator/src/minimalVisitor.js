import { types as t } from "@babel/core";

const hasPipelineDescendant = path => {
  if (path.isBinaryExpression() && path.node.operator === "|>") return true;

  let foundPipeline = false;

  path.traverse({
    BinaryExpression(path) {
      if (path.node.operator === "|>") {
        foundPipeline = true;
        path.stop();
      }
    },
  });

  return foundPipeline;
};

const minimalVisitor = {
  ArrowFunctionExpression(path) {
    if (hasPipelineDescendant(path)) {
      path.ensureBlock();
    }
  },
  IfStatement(path) {
    if (hasPipelineDescendant(path)) {
      path
        .get("consequent")
        .replaceWith(t.blockStatement([t.cloneNode(path.node.consequent)]));
      path
        .get("alternate")
        .replaceWith(t.blockStatement([t.cloneNode(path.node.alternate)]));
    }
  },
  WhileStatement(path) {
    if (hasPipelineDescendant(path.get("test"))) {
      const testId = path.scope.generateUidIdentifier("test");
      const originalTest = t.cloneNode(path.node.test);
      path.insertBefore(
        t.variableDeclaration("let", [
          t.variableDeclarator(testId, t.cloneNode(originalTest)),
        ]),
      );
      path.get("test").replaceWith(t.cloneNode(testId));
      path.ensureBlock();
      path.node.body.body.push(
        t.expressionStatement(
          t.assignmentExpression(
            "=",
            t.cloneNode(testId),
            t.cloneNode(originalTest),
          ),
        ),
      );
    }
  },
  ForStatement(path) {
    if (
      hasPipelineDescendant(path.get("test")) ||
      hasPipelineDescendant(path.get("update"))
    ) {
      const testId = path.scope.generateUidIdentifier("test");
      const originalTest = t.cloneNode(path.node.test);

      path.insertBefore(t.cloneNode(path.node.init));
      path.get("init").remove();

      path.insertBefore(
        t.variableDeclaration("let", [
          t.variableDeclarator(testId, t.cloneNode(originalTest)),
        ]),
      );
      path.get("test").replaceWith(t.cloneNode(testId));

      path.ensureBlock();

      path.node.body.body.push(
        t.expressionStatement(t.cloneNode(path.node.update)),
      );
      path.get("update").remove();

      path.node.body.body.push(
        t.expressionStatement(
          t.assignmentExpression(
            "=",
            t.cloneNode(testId),
            t.cloneNode(originalTest),
          ),
        ),
      );
    }
  },
  BinaryExpression: {
    exit(path) {
      const { scope } = path;
      const { node } = path;
      const { operator, left } = node;
      let { right } = node;
      if (operator !== "|>") return;

      if (t.isIdentifier(right, { name: "eval" })) {
        right = t.sequenceExpression([t.numericLiteral(0), right]);
      }

      const insertionPoint = path.getStatementParent();
      const leftRef = scope.generateUidIdentifier("pipe");
      insertionPoint.insertBefore(
        t.variableDeclaration("const", [t.variableDeclarator(leftRef, left)]),
      );

      let optimizeArrow =
        t.isArrowFunctionExpression(right) &&
        t.isExpression(right.body) &&
        !right.async &&
        !right.generator;
      let param;

      if (optimizeArrow) {
        const { params } = right;
        if (params.length === 1 && t.isIdentifier(params[0])) {
          param = params[0];
        } else if (params.length > 0) {
          optimizeArrow = false;
        }
      }

      if (optimizeArrow && !param) {
        // Arrow function with 0 arguments
        path.replaceWith(right.body);
        return;
      }

      if (param) {
        path.get("right").scope.rename(param.name, leftRef.name);
      }

      const call = optimizeArrow
        ? right.body
        : t.callExpression(right, [t.cloneNode(leftRef)]);

      path.replaceWith(call);
    },
  },
};

export default minimalVisitor;
