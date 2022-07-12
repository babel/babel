import { declare } from "@babel/helper-plugin-utils";
import syntaxFunctionBind from "@babel/plugin-syntax-function-bind";
import { types as t } from "@babel/core";
import type { Scope } from "@babel/traverse";

export default declare(api => {
  api.assertVersion(7);

  function getTempId(scope: Scope) {
    let id = scope.path.getData("functionBind");
    if (id) return t.cloneNode(id);

    id = scope.generateDeclaredUidIdentifier("context");
    return scope.path.setData("functionBind", id);
  }

  function getObject(bind: t.BindExpression) {
    if (t.isExpression(bind.object)) {
      return bind.object;
    }

    return (bind.callee as t.MemberExpression).object;
  }

  function getStaticContext(bind: t.BindExpression, scope: Scope) {
    const object = getObject(bind);
    return (
      scope.isStatic(object) &&
      (t.isSuper(object) ? t.thisExpression() : object)
    );
  }

  function inferBindContext(bind: t.BindExpression, scope: Scope) {
    const staticContext = getStaticContext(bind, scope);
    if (staticContext) return t.cloneNode(staticContext);

    const tempId = getTempId(scope);
    if (bind.object) {
      bind.callee = t.sequenceExpression([
        t.assignmentExpression("=", tempId, bind.object),
        bind.callee,
      ]);
    } else if (t.isMemberExpression(bind.callee)) {
      bind.callee.object = t.assignmentExpression(
        "=",
        tempId,
        // @ts-ignore(Babel 7 vs Babel 8) Fixme: support `super.foo(?)`
        bind.callee.object,
      );
    }
    return t.cloneNode(tempId);
  }

  return {
    name: "proposal-function-bind",
    inherits: syntaxFunctionBind,

    visitor: {
      CallExpression({ node, scope }) {
        const bind = node.callee;
        if (!t.isBindExpression(bind)) return;

        const context = inferBindContext(bind, scope);
        node.callee = t.memberExpression(bind.callee, t.identifier("call"));
        node.arguments.unshift(context);
      },

      BindExpression(path) {
        const { node, scope } = path;
        const context = inferBindContext(node, scope);
        path.replaceWith(
          t.callExpression(
            t.memberExpression(node.callee, t.identifier("bind")),
            [context],
          ),
        );
      },
    },
  };
});
