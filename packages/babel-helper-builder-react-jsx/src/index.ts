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
import type { PluginPass, NodePath, Visitor, types as t } from "@babel/core";

type ElementState = {
  tagExpr: t.Expression; // tag node,
  tagName: string | undefined | null; // raw string tag name,
  args: Array<any>; // array of call arguments,
  call?: any; // optional call property that can be set to override the call expression returned,
  pure: boolean; // true if the element can be marked with a #__PURE__ annotation
  callee?: any;
};

export interface Options {
  filter?: (node: t.Node, pass: PluginPass) => boolean;
  pre?: (state: ElementState, pass: PluginPass) => void;
  post?: (state: ElementState, pass: PluginPass) => void;
  compat?: boolean;
  pure?: string;
  throwIfNamespace?: boolean;
  useSpread?: boolean;
  useBuiltIns?: boolean;
}

export default function (opts: Options) {
  const visitor: Visitor<PluginPass<Options>> = {};

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
    exit(path, state) {
      const callExpr = buildElementCall(path, state);
      if (callExpr) {
        path.replaceWith(inherits(callExpr, path.node));
      }
    },
  };

  visitor.JSXFragment = {
    exit(path, state) {
      if (opts.compat) {
        throw path.buildCodeFrameError(
          "Fragment tags are only supported in React 16 and up.",
        );
      }
      const callExpr = buildFragmentCall(path, state);
      if (callExpr) {
        path.replaceWith(inherits(callExpr, path.node));
      }
    },
  };

  return visitor;

  function convertJSXIdentifier(
    node: t.JSXIdentifier | t.JSXMemberExpression | t.JSXNamespacedName,
    parent: t.JSXOpeningElement | t.JSXMemberExpression,
  ): t.ThisExpression | t.StringLiteral | t.MemberExpression | t.Identifier {
    if (isJSXIdentifier(node)) {
      if (node.name === "this" && isReferenced(node, parent)) {
        return thisExpression();
      } else if (isValidIdentifier(node.name, false)) {
        // @ts-expect-error casting JSXIdentifier to Identifier
        node.type = "Identifier";
        return node as unknown as t.Identifier;
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

  function convertAttributeValue(
    node: t.JSXAttribute["value"] | t.BooleanLiteral,
  ) {
    if (isJSXExpressionContainer(node)) {
      return node.expression;
    } else {
      return node;
    }
  }

  function convertAttribute(node: t.JSXAttribute | t.JSXSpreadAttribute) {
    if (isJSXSpreadAttribute(node)) {
      return spreadElement(node.argument);
    }
    const value = convertAttributeValue(node.value || booleanLiteral(true));

    if (isStringLiteral(value) && !isJSXExpressionContainer(node.value)) {
      value.value = value.value.replace(/\n\s+/g, " ");

      // "raw" JSXText should not be used from a StringLiteral because it needs to be escaped.
      delete value.extra?.raw;
    }

    if (isJSXNamespacedName(node.name)) {
      // @ts-expect-error Mutating AST nodes
      node.name = stringLiteral(
        node.name.namespace.name + ":" + node.name.name.name,
      );
    } else if (isValidIdentifier(node.name.name, false)) {
      // @ts-expect-error Mutating AST nodes
      node.name.type = "Identifier";
    } else {
      // @ts-expect-error Mutating AST nodes
      node.name = stringLiteral(node.name.name);
    }

    return inherits(
      objectProperty(
        // @ts-expect-error Mutating AST nodes
        node.name,
        value,
      ),
      node,
    );
  }

  function buildElementCall(path: NodePath<t.JSXElement>, pass: PluginPass) {
    if (opts.filter && !opts.filter(path.node, pass)) return;

    const openingPath = path.get("openingElement");
    // @ts-expect-error mutating AST nodes
    path.node.children = react.buildChildren(path.node);

    const tagExpr = convertJSXIdentifier(
      openingPath.node.name,
      openingPath.node,
    );
    const args: (t.Expression | t.JSXElement | t.JSXFragment)[] = [];

    let tagName: string;
    if (isIdentifier(tagExpr)) {
      tagName = tagExpr.name;
    } else if (isStringLiteral(tagExpr)) {
      tagName = tagExpr.value;
    }

    const state: ElementState = {
      tagExpr: tagExpr,
      tagName: tagName,
      args: args,
      pure: false,
    };

    if (opts.pre) {
      opts.pre(state, pass);
    }

    const attribs = openingPath.node.attributes;
    let convertedAttributes: t.Expression;
    if (attribs.length) {
      if (process.env.BABEL_8_BREAKING) {
        convertedAttributes = objectExpression(attribs.map(convertAttribute));
      } else {
        convertedAttributes = buildOpeningElementAttributes(attribs, pass);
      }
    } else {
      convertedAttributes = nullLiteral();
    }

    args.push(
      convertedAttributes,
      // @ts-expect-error JSXExpressionContainer has been transformed by convertAttributeValue
      ...path.node.children,
    );

    if (opts.post) {
      opts.post(state, pass);
    }

    const call = state.call || callExpression(state.callee, args);
    if (state.pure) annotateAsPure(call);

    return call;
  }

  function pushProps(
    _props: (t.ObjectProperty | t.SpreadElement)[],
    objs: t.Expression[],
  ) {
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

  function buildOpeningElementAttributes(
    attribs: (t.JSXAttribute | t.JSXSpreadAttribute)[],
    pass: PluginPass<Options>,
  ): t.Expression {
    let _props: (t.ObjectProperty | t.SpreadElement)[] = [];
    const objs: t.Expression[] = [];

    const { useSpread = false } = pass.opts;
    if (typeof useSpread !== "boolean") {
      throw new Error(
        "transform-react-jsx currently only accepts a boolean option for " +
          "useSpread (defaults to false)",
      );
    }

    const useBuiltIns = pass.opts.useBuiltIns || false;
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
    let convertedAttribs: t.Expression;

    if (objs.length === 1) {
      // only one object
      convertedAttribs = objs[0];
    } else {
      // looks like we have multiple objects
      if (!isObjectExpression(objs[0])) {
        objs.unshift(objectExpression([]));
      }

      const helper = useBuiltIns
        ? memberExpression(identifier("Object"), identifier("assign"))
        : pass.addHelper("extends");

      // spread it
      convertedAttribs = callExpression(helper, objs);
    }

    return convertedAttribs;
  }

  function buildFragmentCall(path: NodePath<t.JSXFragment>, pass: PluginPass) {
    if (opts.filter && !opts.filter(path.node, pass)) return;

    // @ts-expect-error mutating AST nodes
    path.node.children = react.buildChildren(path.node);

    const args: t.Expression[] = [];
    const tagName: null = null;
    const tagExpr = pass.get("jsxFragIdentifier")();

    const state: ElementState = {
      tagExpr: tagExpr,
      tagName: tagName,
      args: args,
      pure: false,
    };

    if (opts.pre) {
      opts.pre(state, pass);
    }

    // no attributes are allowed with <> syntax
    args.push(
      nullLiteral(),
      // @ts-expect-error JSXExpressionContainer has been transformed by convertAttributeValue
      ...path.node.children,
    );

    if (opts.post) {
      opts.post(state, pass);
    }

    pass.set("usedFragment", true);

    const call = state.call || callExpression(state.callee, args);
    if (state.pure) annotateAsPure(call);

    return call;
  }
}
