import { declare } from "@babel/helper-plugin-utils";
import jsx from "@babel/plugin-syntax-jsx";
import helper from "@babel/helper-builder-react-jsx";
import { types as t } from "@babel/core";

export default declare((api, options) => {
  api.assertVersion(7);

  const THROW_IF_NAMESPACE =
    options.throwIfNamespace === undefined ? true : !!options.throwIfNamespace;

  const PRAGMA_DEFAULT = options.pragma || "React.createElement";
  const PRAGMA_FRAG_DEFAULT = options.pragmaFrag || "React.Fragment";
  const PRAGMA_LIT_DEFAULT = options.pragmaLit || null;

  const JSX_ANNOTATION_REGEX = /\*?\s*@jsx\s+([^\s]+)/;
  const JSX_FRAG_ANNOTATION_REGEX = /\*?\s*@jsxFrag\s+([^\s]+)/;
  const JSX_LIT_ANNOTATION_REGEX = /\*?\s*@jsxLit\s+((?:[*]*[^\s*])+)/;

  // returns a closure that returns an identifier or memberExpression node
  // based on the given id
  const createIdentifierParser = (id: string) => () => {
    return id
      .split(".")
      .map(name => t.identifier(name))
      .reduce((object, property) => t.memberExpression(object, property));
  };

  const visitor = helper({
    pre(state) {
      const tagName = state.tagName;
      const args = state.args;
      if (t.react.isCompatTag(tagName)) {
        args.push(t.stringLiteral(tagName));
      } else {
        args.push(state.tagExpr);
      }
    },

    post(state, pass) {
      state.callee = pass.get("jsxIdentifier")();
    },

    throwIfNamespace: THROW_IF_NAMESPACE,
  });

  visitor.Program = {
    enter(path, state) {
      const { file } = state;

      let pragma = PRAGMA_DEFAULT;
      let pragmaFrag = PRAGMA_FRAG_DEFAULT;
      let pragmaLit = PRAGMA_LIT_DEFAULT;
      let pragmaSet = !!options.pragma;
      let pragmaFragSet = !!options.pragmaFrag;
      let pragmaLitSet = !!options.pragmaLit;

      for (const comment of (file.ast.comments: Array<Object>)) {
        const jsxMatches = JSX_ANNOTATION_REGEX.exec(comment.value);
        if (jsxMatches) {
          pragma = jsxMatches[1];
          pragmaSet = true;
        }
        const jsxFragMatches = JSX_FRAG_ANNOTATION_REGEX.exec(comment.value);
        if (jsxFragMatches) {
          pragmaFrag = jsxFragMatches[1];
          pragmaFragSet = true;
        }
        const jsxLitMatches = JSX_LIT_ANNOTATION_REGEX.exec(comment.value);
        if (jsxLitMatches) {
          pragmaLit = jsxLitMatches[1];
          pragmaLitSet = true;
        }
      }

      state.set("jsxIdentifier", createIdentifierParser(pragma));
      state.set("jsxFragIdentifier", createIdentifierParser(pragmaFrag));
      if (pragmaLitSet) {
        state.set("jsxLitIdentifier", createIdentifierParser(pragmaLit));
      }
      state.set("usedFragment", false);
      state.set("pragmaSet", pragmaSet);
      state.set("pragmaFragSet", pragmaFragSet);
      state.set("pragmaLitSet", pragmaLitSet);
    },
    exit(path, state) {
      if (
        state.get("pragmaSet") &&
        state.get("usedFragment") &&
        !state.get("pragmaFragSet")
      ) {
        throw new Error(
          "transform-react-jsx: pragma has been set but " +
            "pragmafrag has not been set",
        );
      }
    },
  };

  visitor.JSXAttribute = function(path, state) {
    if (path.node.value && path.node.value.type === "StringLiteral") {
      // href="text"  ->  href={ jsxLit('text', 'a[href]') }

      // TODO(mikesamuel): should this go in convertAttributeValue in babel-helper-builder-react-jsx?
      // If so, how do we compute the context without threading path through?
      const litId = state.get("jsxLitIdentifier");
      if (litId) {
        const attrName = t.isJSXIdentifier(path.node.name)
          ? path.node.name.name
          : "*";
        const elName =
          t.isJSXOpeningElement(path.parent) &&
          t.isJSXIdentifier(path.parent.name)
            ? path.parent.name.name
            : "*";
        path.node.value = t.callExpression(litId(), [
          path.node.value,
          t.stringLiteral(`${elName}[${attrName}]`),
        ]);
      }
    }
    if (t.isJSXElement(path.node.value)) {
      path.node.value = t.jsxExpressionContainer(path.node.value);
    }
  };

  visitor.JSXText = function(path, state) {
    const litId = state.get("jsxLitIdentifier");
    if (litId) {
      // TextNode  ->  { jsxLit('TextNode', '#text') }
      path.replaceWith(
        t.jsxExpressionContainer(
          t.callExpression(litId(), [
            t.stringLiteral(path.node.value),
            t.stringLiteral("#text"),
          ]),
        ),
      );
    }
  };

  return {
    inherits: jsx,
    visitor,
  };
});
