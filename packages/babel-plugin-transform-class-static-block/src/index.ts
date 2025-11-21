import { declare } from "@babel/helper-plugin-utils";
import type { NodePath, Scope, types as t } from "@babel/core";

import {
  buildNamedEvaluationVisitor,
  enableFeature,
  FEATURES,
} from "@babel/helper-create-class-features-plugin";

/**
 * Generate a uid that is not in `denyList`
 *
 * @param {Scope} scope
 * @param {Set<string>} denyList a deny list that the generated uid should avoid
 * @returns
 */
function generateUid(scope: Scope, denyList: Set<string>) {
  const name = "";
  let uid;
  let i = 1;
  do {
    uid = `_${name}`;
    if (i > 1) uid += i;
    i++;
  } while (denyList.has(uid));
  return uid;
}

function mapLast<T>(arr: T[], fn: (value: T) => T): T[] {
  if (arr.length === 0) return arr;
  return [...arr.slice(0, -1), fn(arr[arr.length - 1])];
}

export default declare(({ types: t, template, traverse, assertVersion }) => {
  assertVersion(REQUIRED_VERSION("^7.12.0 || ^8.0.0-0"));

  const rawNamedEvaluationVisitor = buildNamedEvaluationVisitor(
    (path: NodePath) => {
      if (!path.isClassExpression()) return false;
      for (let i = path.node.body.body.length - 1; i >= 0; i--) {
        const el = path.node.body.body[i];
        if (t.isStaticBlock(el)) {
          return true;
        }
        if (
          (t.isClassProperty(el) || t.isClassPrivateProperty(el)) &&
          el.static
        ) {
          break;
        }
      }
      return false;
    },
    (classPath: NodePath<t.ClassExpression>, state, name) => {
      const nameNode = typeof name === "string" ? t.stringLiteral(name) : name;

      classPath.get("body").unshiftContainer(
        "body",
        t.staticBlock([
          template.statement.ast`
            ${state.addHelper("setFunctionName")}(this, ${nameNode});
          `,
        ]),
      );
    },
  );

  if (!process.env.BABEL_8_BREAKING && !t.classAccessorProperty) {
    // For old versions of Babel 7, with no ClassAccessorProperty support.
    delete rawNamedEvaluationVisitor.ClassAccessorProperty;
  }

  const namedEvaluationVisitor = traverse.visitors.explode(
    rawNamedEvaluationVisitor,
  );

  const maybeSequenceExpression = (
    expressions: t.Expression[],
  ): t.Expression => {
    if (expressions.length === 1) {
      return expressions[0];
    } else {
      return t.sequenceExpression(expressions);
    }
  };

  const blocksToExpressions = (blocks: Array<t.StaticBlock>) =>
    blocks.map(block => {
      const { body } = block;
      if (body.length === 1 && t.isExpressionStatement(body[0])) {
        // We special-case the single expression case to avoid the iife, since
        // it's common.
        return t.inheritsComments(
          t.inheritsComments(body[0].expression, body[0]),
          block,
        );
      }
      return t.inheritsComments(
        template.expression.ast`(() => { ${body} })()`,
        block,
      );
    });

  const prependToInitializer = (
    prop: t.ClassProperty | t.ClassPrivateProperty,
    expressions: t.Expression[],
  ) => {
    prop.value = prop.value
      ? t.sequenceExpression([...expressions, prop.value])
      : maybeSequenceExpression(
          mapLast(expressions, expr => t.unaryExpression("void", expr)),
        );
  };

  return {
    name: "transform-class-static-block",
    manipulateOptions: process.env.BABEL_8_BREAKING
      ? undefined
      : (_, parser) => parser.plugins.push("classStaticBlock"),

    pre() {
      // Enable this in @babel/helper-create-class-features-plugin, so that it
      // can be handled by the private fields and methods transform.
      enableFeature(this.file, FEATURES.staticBlocks, /* loose */ false);
    },

    visitor: {
      // Run on ClassBody and not on class so that if @babel/helper-create-class-features-plugin
      // is enabled it can generate optimized output without passing from the intermediate
      // private fields representation.
      ClassBody(classBody) {
        const { scope } = classBody;

        // If needed, add the name to the class
        let parentPath: NodePath<t.Node> = classBody.parentPath;
        if (parentPath.isClassExpression() && !parentPath.node.id) {
          do ({ parentPath } = parentPath);
          while (
            parentPath &&
            !namedEvaluationVisitor[parentPath.type] &&
            !parentPath.isStatement()
          );
          if (parentPath) {
            namedEvaluationVisitor[parentPath.type]?.enter.forEach(f =>
              f.call(this, parentPath, this),
            );
          }
        }

        const pendingStaticBlocks: Array<t.StaticBlock> = [];
        let lastStaticProp:
          | null
          | NodePath<t.ClassProperty>
          | NodePath<t.ClassPrivateProperty> = null;

        for (const path of classBody.get("body")) {
          if (path.isStaticBlock()) {
            pendingStaticBlocks.push(path.node);
            path.remove();
          } else if (
            path.isClassProperty({ static: true }) ||
            path.isClassPrivateProperty({ static: true })
          ) {
            lastStaticProp = path;

            if (pendingStaticBlocks.length > 0) {
              // push static blocks right before the initializer of the next
              // static field in the class.

              prependToInitializer(
                path.node,
                blocksToExpressions(pendingStaticBlocks),
              );
              pendingStaticBlocks.length = 0;
            }
          }
        }

        if (pendingStaticBlocks.length > 0) {
          // if there are static blocks not followed by a static field where
          // we can inject them, wrap them in a function and push it in the
          // last static field in the class (or create a new one, if needed).
          // After the class body runs, call the function to run the remaining
          // static blocks bodies.

          const tmp = scope.generateDeclaredUidIdentifier("staticBlock");
          let arrowBody;
          const needsCompletionValue = classBody.parentPath.isExpression();
          if (
            pendingStaticBlocks.length > 1 ||
            (pendingStaticBlocks[0].body.length === 1 &&
              t.isExpressionStatement(pendingStaticBlocks[0].body[0]))
          ) {
            const expressions = blocksToExpressions(pendingStaticBlocks);
            if (needsCompletionValue) {
              expressions.push(t.thisExpression());
            }
            arrowBody = maybeSequenceExpression(expressions);
          } else {
            arrowBody = t.blockStatement(pendingStaticBlocks[0].body);
            if (needsCompletionValue) {
              arrowBody.body.push(t.returnStatement(t.thisExpression()));
            }
          }
          const init = template.expression.ast`${tmp} = () => ${arrowBody}`;

          if (lastStaticProp) {
            prependToInitializer(lastStaticProp.node, [init]);
          } else {
            // If there are no static fields at all, it's safe to inject a
            // new private properties before running the static blocks because
            // there is no code that could have already made the class
            // non-extensible.

            const privateNames = new Set<string>();
            for (const path of classBody.get("body")) {
              if (path.isPrivate()) {
                privateNames.add(path.get("key.id").node.name);
              }
            }
            const staticBlockPrivateId = generateUid(scope, privateNames);
            const staticBlockRef = t.privateName(
              t.identifier(staticBlockPrivateId),
            );
            classBody.pushContainer("body", [
              t.classPrivateProperty(staticBlockRef, init, [], true),
            ]);
          }

          const staticBlockClosureCall = t.callExpression(t.cloneNode(tmp), []);
          if (classBody.parentPath.isClassExpression()) {
            // We don't use .insertAfter() because we don't need to insert the
            // tmp variable to preserve the class as the result value, because
            // the call will already return the class itself.
            classBody.parentPath.replaceWith(
              t.sequenceExpression([
                classBody.parent as t.ClassExpression,
                staticBlockClosureCall,
              ]),
            );
          } else {
            classBody.parentPath.insertAfter(
              t.expressionStatement(staticBlockClosureCall),
            );
          }
        }
      },
    },
  };
});
