import {
  booleanLiteral,
  callExpression,
  identifier,
  inherits,
  isIdentifier,
  isJSXExpressionContainer,
  isJSXIdentifier,
  isJSXMemberExpression,
  isJSXNamespacedName,
  isJSXSpreadAttribute,
  isLiteral,
  isObjectExpression,
  isReferenced,
  isStringLiteral,
  isValidIdentifier,
  memberExpression,
  nullLiteral,
  objectExpression,
  objectProperty,
  react,
  spreadElement,
  stringLiteral,
  thisExpression,
} from "@babel/types";
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
        path.replaceWith(inherits(callExpr, path.node));
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
        path.replaceWith(inherits(callExpr, path.node));
      }
    },
  };

  return visitor;

  function convertJSXIdentifier(node, parent) {
    if (isJSXIdentifier(node)) {
      if (node.name === "this" && isReferenced(node, parent)) {
        return thisExpression();
      } else if (isValidIdentifier(node.name, false)) {
        node.type = "Identifier";
      } else {
        return stringLiteral(node.name);
      }
    } else if (isJSXMemberExpression(node)) {
      return memberExpression(
        convertJSXIdentifier(node.object, node),
        convertJSXIdentifier(node.property, node),
      );
    } else if (isJSXNamespacedName(node)) {
      /**
       * If there is flag "throwIfNamespace"
       * print XMLNamespace like string literal
       */
      return stringLiteral(`${node.namespace.name}:${node.name.name}`);
    }

    return node;
  }

  function convertAttributeValue(node) {
    if (isJSXExpressionContainer(node)) {
      return node.expression;
    } else {
      return node;
    }
  }

  function convertAttribute(node) {
    const value = convertAttributeValue(node.value || booleanLiteral(true));

    if (isJSXSpreadAttribute(node)) {
      return spreadElement(node.argument);
    }

    if (isStringLiteral(value) && !isJSXExpressionContainer(node.value)) {
      value.value = value.value.replace(/\n\s+/g, " ");

      // "raw" JSXText should not be used from a StringLiteral because it needs to be escaped.
      delete value.extra?.raw;
    }

    if (isJSXNamespacedName(node.name)) {
      node.name = stringLiteral(
        node.name.namespace.name + ":" + node.name.name.name,
      );
    } else if (isValidIdentifier(node.name.name, false)) {
      node.name.type = "Identifier";
    } else {
      node.name = stringLiteral(node.name.name);
    }

    return inherits(objectProperty(node.name, value), node);
  }

  function buildElementCall(path, file) {
    if (opts.filter && !opts.filter(path.node, file)) return;

    const openingPath = path.get("openingElement");
    openingPath.parent.children = react.buildChildren(openingPath.parent);

    const tagExpr = convertJSXIdentifier(
      openingPath.node.name,
      openingPath.node,
    );
    const args = [];

    let tagName;
    if (isIdentifier(tagExpr)) {
      tagName = tagExpr.name;
    } else if (isLiteral(tagExpr)) {
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
      if (process.env.BABEL_8_BREAKING) {
        attribs = objectExpression(attribs.map(convertAttribute));
      } else {
        attribs = buildOpeningElementAttributes(attribs, file);
      }
    } else {
      attribs = nullLiteral();
    }

    args.push(attribs, ...path.node.children);

    if (opts.post) {
      opts.post(state, file);
    }

    const call = state.call || callExpression(state.callee, args);
    if (state.pure) annotateAsPure(call);

    return call;
  }

  function pushProps(_props, objs) {
    if (!_props.length) return _props;

    objs.push(objectExpression(_props));
    return [];
  }

  /**
   * The logic for this is quite terse. It's because we need to
   * support spread elements. We loop over all attributes,
   * breaking on spreads, we then push a new object containing
   * all prior attributes to an array for later processing.
   */

  function buildOpeningElementAttributes(attribs, file) {
    let _props = [];
    const objs = [];

    const { useSpread = false } = file.opts;
    if (typeof useSpread !== "boolean") {
      throw new Error(
        "transform-react-jsx currently only accepts a boolean option for " +
          "useSpread (defaults to false)",
      );
    }

    const useBuiltIns = file.opts.useBuiltIns || false;
    if (typeof useBuiltIns !== "boolean") {
      throw new Error(
        "transform-react-jsx currently only accepts a boolean option for " +
          "useBuiltIns (defaults to false)",
      );
    }

    if (useSpread && useBuiltIns) {
      throw new Error(
        "transform-react-jsx currently only accepts useBuiltIns or useSpread " +
          "but not both",
      );
    }

    if (useSpread) {
      const props = attribs.map(convertAttribute);
      return objectExpression(props);
    }

    while (attribs.length) {
      const prop = attribs.shift();
      if (isJSXSpreadAttribute(prop)) {
        _props = pushProps(_props, objs);
        objs.push(prop.argument);
      } else {
        _props.push(convertAttribute(prop));
      }
    }

    pushProps(_props, objs);

    if (objs.length === 1) {
      // only one object
      attribs = objs[0];
    } else {
      // looks like we have multiple objects
      if (!isObjectExpression(objs[0])) {
        objs.unshift(objectExpression([]));
      }

      const helper = useBuiltIns
        ? memberExpression(identifier("Object"), identifier("assign"))
        : file.addHelper("extends");

      // spread it
      attribs = callExpression(helper, objs);
    }

    return attribs;
  }

  function buildFragmentCall(path, file) {
    if (opts.filter && !opts.filter(path.node, file)) return;

    const openingPath = path.get("openingElement");
    openingPath.parent.children = react.buildChildren(openingPath.parent);

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
    args.push(nullLiteral(), ...path.node.children);

    if (opts.post) {
      opts.post(state, file);
    }

    file.set("usedFragment", true);

    const call = state.call || callExpression(state.callee, args);
    if (state.pure) annotateAsPure(call);

    return call;
  }
}
