import * as t from "@babel/types";
import annotateAsPure from "@babel/helper-annotate-as-pure";

type ElementState = {
  tagExpr: Object, // tag node
  tagName: ?string, // raw string tag name
  args: Array<Object>, // array of call arguments
  call?: Object, // optional call property that can be set to override the call expression returned
  pure: boolean, // true if the element can be marked with a #__PURE__ annotation
};

export default function (opts) {
  const visitor = {};

  visitor.JSXNamespacedName = function (path) {
    if (opts.throwIfNamespace) {
      throw path.buildCodeFrameError(
        `Namespace tags are not supported by default. React's JSX doesn't support namespace tags. \
You can set \`throwIfNamespace: false\` to bypass this warning.`,
      );
    }
  };

  visitor.JSXSpreadChild = function (path) {
    throw path.buildCodeFrameError(
      "Spread children are not supported in React.",
    );
  };

  visitor.JSXElement = {
    exit(path, file) {
      const callExpr = buildElementCall(path, file);
      if (callExpr) {
        path.replaceWith(t.inherits(callExpr, path.node));
      }
    },
  };

  visitor.JSXFragment = {
    exit(path, file) {
      if (opts.compat) {
        throw path.buildCodeFrameError(
          "Fragment tags are only supported in React 16 and up.",
        );
      }
      const callExpr = buildFragmentCall(path, file);
      if (callExpr) {
        path.replaceWith(t.inherits(callExpr, path.node));
      }
    },
  };

  return visitor;

  function convertJSXIdentifier(node, parent) {
    if (t.isJSXIdentifier(node)) {
      if (node.name === "this" && t.isReferenced(node, parent)) {
        return t.thisExpression();
      } else if (t.isValidIdentifier(node.name, false)) {
        node.type = "Identifier";
      } else {
        return t.stringLiteral(node.name);
      }
    } else if (t.isJSXMemberExpression(node)) {
      return t.memberExpression(
        convertJSXIdentifier(node.object, node),
        convertJSXIdentifier(node.property, node),
      );
    } else if (t.isJSXNamespacedName(node)) {
      /**
       * If there is flag "throwIfNamespace"
       * print XMLNamespace like string literal
       */
      return t.stringLiteral(`${node.namespace.name}:${node.name.name}`);
    }

    return node;
  }

  function convertAttributeValue(node) {
    if (t.isJSXExpressionContainer(node)) {
      return node.expression;
    } else {
      return node;
    }
  }

  function convertAttribute(node) {
    const value = convertAttributeValue(node.value || t.booleanLiteral(true));

    if (t.isJSXSpreadAttribute(node)) {
      return t.spreadElement(node.argument);
    }

    if (t.isStringLiteral(value) && !t.isJSXExpressionContainer(node.value)) {
      value.value = value.value.replace(/\n\s+/g, " ");

      // "raw" JSXText should not be used from a StringLiteral because it needs to be escaped.
      delete value.extra?.raw;
    }

    if (t.isJSXNamespacedName(node.name)) {
      node.name = t.stringLiteral(
        node.name.namespace.name + ":" + node.name.name.name,
      );
    } else if (t.isValidIdentifier(node.name.name, false)) {
      node.name.type = "Identifier";
    } else {
      node.name = t.stringLiteral(node.name.name);
    }

    return t.inherits(t.objectProperty(node.name, value), node);
  }

  function buildElementCall(path, file) {
    if (opts.filter && !opts.filter(path.node, file)) return;

    const openingPath = path.get("openingElement");
    openingPath.parent.children = t.react.buildChildren(openingPath.parent);

    const tagExpr = convertJSXIdentifier(
      openingPath.node.name,
      openingPath.node,
    );
    const args = [];

    let tagName;
    if (t.isIdentifier(tagExpr)) {
      tagName = tagExpr.name;
    } else if (t.isLiteral(tagExpr)) {
      tagName = tagExpr.value;
    }

    const state: ElementState = {
      tagExpr: tagExpr,
      tagName: tagName,
      args: args,
      pure: false,
    };

    if (opts.pre) {
      opts.pre(state, file);
    }

    let attribs = openingPath.node.attributes;
    if (attribs.length) {
      attribs = buildOpeningElementAttributes(attribs);
    } else {
      attribs = t.nullLiteral();
    }

    args.push(attribs, ...path.node.children);

    if (opts.post) {
      opts.post(state, file);
    }

    const call = state.call || t.callExpression(state.callee, args);
    if (state.pure) annotateAsPure(call);

    return call;
  }

  function buildOpeningElementAttributes(attribs) {
    const props = attribs.map(attrib => convertAttribute(attrib));
    return t.objectExpression(props);
  }

  function buildFragmentCall(path, file) {
    if (opts.filter && !opts.filter(path.node, file)) return;

    const openingPath = path.get("openingElement");
    openingPath.parent.children = t.react.buildChildren(openingPath.parent);

    const args = [];
    const tagName = null;
    const tagExpr = file.get("jsxFragIdentifier")();

    const state: ElementState = {
      tagExpr: tagExpr,
      tagName: tagName,
      args: args,
      pure: false,
    };

    if (opts.pre) {
      opts.pre(state, file);
    }

    // no attributes are allowed with <> syntax
    args.push(t.nullLiteral(), ...path.node.children);

    if (opts.post) {
      opts.post(state, file);
    }

    file.set("usedFragment", true);

    const call = state.call || t.callExpression(state.callee, args);
    if (state.pure) annotateAsPure(call);

    return call;
  }
}
