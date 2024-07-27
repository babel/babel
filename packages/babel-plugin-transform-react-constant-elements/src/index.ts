import { declare } from "@babel/helper-plugin-utils";
import { types as t, template } from "@babel/core";
import type { Visitor, Scope, NodePath } from "@babel/core";

export interface Options {
  allowMutablePropsOnTags?: null | string[];
}

interface VisitorState {
  isImmutable: boolean;
  mutablePropsAllowed: boolean;
  jsxScope: Scope;
  targetScope: Scope;
}
export default declare((api, options: Options) => {
  api.assertVersion(REQUIRED_VERSION(7));

  const { allowMutablePropsOnTags } = options;

  if (
    allowMutablePropsOnTags != null &&
    !Array.isArray(allowMutablePropsOnTags)
  ) {
    throw new Error(
      ".allowMutablePropsOnTags must be an array, null, or undefined.",
    );
  }

  // Element -> Target scope
  const HOISTED = new WeakMap();

  function declares(node: t.Identifier | t.JSXIdentifier, scope: Scope) {
    if (
      t.isJSXIdentifier(node, { name: "this" }) ||
      t.isJSXIdentifier(node, { name: "arguments" }) ||
      t.isJSXIdentifier(node, { name: "super" }) ||
      t.isJSXIdentifier(node, { name: "new" })
    ) {
      const { path } = scope;
      return path.isFunctionParent() && !path.isArrowFunctionExpression();
    }

    return scope.hasOwnBinding(node.name);
  }

  function isHoistingScope({ path }: Scope) {
    return path.isFunctionParent() || path.isLoop() || path.isProgram();
  }

  function getHoistingScope(scope: Scope) {
    while (!isHoistingScope(scope)) scope = scope.parent;
    return scope;
  }

  const targetScopeVisitor: Visitor<VisitorState> = {
    ReferencedIdentifier(path, state) {
      const { node } = path;
      let { scope } = path;

      while (scope !== state.jsxScope) {
        // If a binding is declared in an inner function, it doesn't affect hoisting.
        if (declares(node, scope)) return;

        scope = scope.parent;
      }

      while (scope) {
        // We cannot hoist outside of the previous hoisting target
        // scope, so we return early and we don't update it.
        if (scope === state.targetScope) return;

        // If the scope declares this identifier (or we're at the function
        // providing the lexical env binding), we can't hoist the var any
        // higher.
        if (declares(node, scope)) break;

        scope = scope.parent;
      }

      state.targetScope = getHoistingScope(scope);
    },
  };

  const immutabilityVisitor: Visitor<VisitorState> = {
    enter(path, state) {
      const stop = () => {
        state.isImmutable = false;
        path.stop();
      };

      const skip = () => {
        path.skip();
      };

      if (path.isJSXClosingElement()) {
        skip();
        return;
      }

      // Elements with refs are not safe to hoist.
      if (
        path.isJSXIdentifier({ name: "ref" }) &&
        path.parentPath.isJSXAttribute({ name: path.node })
      ) {
        stop();
        return;
      }

      // Ignore JSX expressions and immutable values.
      if (
        path.isJSXIdentifier() ||
        path.isJSXMemberExpression() ||
        path.isJSXNamespacedName() ||
        path.isImmutable()
      ) {
        return;
      }

      // Ignore constant bindings.
      if (path.isIdentifier()) {
        const binding = path.scope.getBinding(path.node.name);
        if (binding?.constant) return;
      }

      // If we allow mutable props, tags with function expressions can be
      // safely hoisted.
      const { mutablePropsAllowed } = state;
      if (mutablePropsAllowed && path.isFunction()) {
        path.traverse(targetScopeVisitor, state);
        skip();
        return;
      }

      if (!path.isPure()) {
        stop();
        return;
      }

      // If it's not immutable, it may still be a pure expression, such as string concatenation.
      // It is still safe to hoist that, so long as its result is immutable.
      // If not, it is not safe to replace as mutable values (like objects) could be mutated after render.
      // https://github.com/facebook/react/issues/3226
      const expressionResult = path.evaluate();
      if (expressionResult.confident) {
        // We know the result; check its mutability.
        const { value } = expressionResult;
        if (
          mutablePropsAllowed ||
          value === null ||
          (typeof value !== "object" && typeof value !== "function")
        ) {
          // It evaluated to an immutable value, so we can hoist it.
          skip();
          return;
        }
      } else if (expressionResult.deopt?.isIdentifier()) {
        // It's safe to hoist here if the deopt reason is an identifier (e.g. func param).
        // The hoister will take care of how high up it can be hoisted.
        return;
      }

      stop();
    },
  };

  // We cannot use traverse.visitors.merge because it doesn't support
  // immutabilityVisitor's bare `enter` visitor.
  // It's safe to just use ... because the two visitors don't share any key.
  const hoistingVisitor = { ...immutabilityVisitor, ...targetScopeVisitor };

  return {
    name: "transform-react-constant-elements",

    visitor: {
      "JSXElement|JSXFragment"(path: NodePath<t.JSXElement | t.JSXFragment>) {
        if (HOISTED.has(path.node)) return;
        let mutablePropsAllowed = false;
        let name: t.JSXOpeningElement["name"] | t.JSXFragment;
        if (path.isJSXElement()) {
          name = path.node.openingElement.name;

          // This transform takes the option `allowMutablePropsOnTags`, which is an array
          // of JSX tags to allow mutable props (such as objects, functions) on. Use sparingly
          // and only on tags you know will never modify their own props.
          if (allowMutablePropsOnTags != null) {
            // Get the element's name. If it's a member expression, we use the last part of the path.
            // So the option ["FormattedMessage"] would match "Intl.FormattedMessage".
            let lastSegment = name;
            while (t.isJSXMemberExpression(lastSegment)) {
              lastSegment = lastSegment.property;
            }

            const elementName = lastSegment.name;
            // @ts-expect-error Fixme: allowMutablePropsOnTags should handle JSXNamespacedName
            mutablePropsAllowed = allowMutablePropsOnTags.includes(elementName);
          }
        } else {
          name = path.node;
        }

        // In order to avoid hoisting unnecessarily, we need to know which is
        // the scope containing the current JSX element. If a parent of the
        // current element has already been hoisted, we can consider its target
        // scope as the base scope for the current element.
        let jsxScope;
        let current: NodePath<t.JSX> = path;
        while (!jsxScope && current.parentPath.isJSX()) {
          current = current.parentPath;
          jsxScope = HOISTED.get(current.node);
        }
        jsxScope ??= path.scope;
        // The initial HOISTED is set to jsxScope, s.t.
        // if the element's JSX ancestor has been hoisted, it will be skipped
        HOISTED.set(path.node, jsxScope);

        const visitorState: VisitorState = {
          isImmutable: true,
          mutablePropsAllowed,
          jsxScope,
          targetScope: path.scope.getProgramParent(),
        };
        path.traverse(hoistingVisitor, visitorState);
        if (!visitorState.isImmutable) return;

        const { targetScope } = visitorState;
        // Only hoist if it would give us an advantage.
        for (let currentScope = jsxScope; ; ) {
          if (targetScope === currentScope) return;
          if (isHoistingScope(currentScope)) break;

          currentScope = currentScope.parent;
          if (!currentScope) {
            throw new Error(
              "Internal @babel/plugin-transform-react-constant-elements error: " +
                "targetScope must be an ancestor of jsxScope. " +
                "This is a Babel bug, please report it.",
            );
          }
        }

        const id = path.scope.generateUidBasedOnNode(name);
        targetScope.push({ id: t.identifier(id) });
        // If the element is to be hoisted, update HOISTED to be the target scope
        HOISTED.set(path.node, targetScope);

        let replacement: t.Expression | t.JSXExpressionContainer = template
          .expression.ast`
          ${t.identifier(id)} || (${t.identifier(id)} = ${path.node})
        `;
        if (
          path.parentPath.isJSXElement() ||
          path.parentPath.isJSXAttribute() ||
          path.parentPath.isJSXFragment()
        ) {
          replacement = t.jsxExpressionContainer(replacement);
        }

        path.replaceWith(replacement);
      },
    },
  };
});
