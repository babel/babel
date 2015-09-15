import isString from "lodash/lang/isString";
import esutils from "esutils";

export default function (t, opts) {
  var visitor = {};

  visitor.JSXNamespacedName = function (path) {
    throw path.buildCodeFrameError("Namespace tags are not supported. ReactJSX is not XML.");
  };

  visitor.JSXElement = {
    exit(path, file) {
      var callExpr = buildElementCall(path.get("openingElement"), file);

      callExpr.arguments = callExpr.arguments.concat(path.node.children);

      if (callExpr.arguments.length >= 3) {
        callExpr._prettyCall = true;
      }

      return t.inherits(callExpr, path.node);
    }
  };

  return visitor;

  function convertFunctionName(path) {
    var { node } = path;

    if (path.isJSXIdentifier()) {
      if (node.name === "this" && path.isReferenced()) {
        return t.thisExpression();
      } else if (esutils.keyword.isIdentifierNameES6(node.name)) {
        node.type = "Identifier";
      } else {
        return t.stringLiteral(node.name);
      }
    } else if (path.isJSXMemberExpression()) {
      node.computed = t.isLiteral(node.property);
      node.type = "MemberExpression";
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
    var value = convertAttributeValue(node.value || t.booleanLiteral(true));

    if (t.isLiteral(value) && isString(value.value)) {
      value.value = value.value.replace(/\n\s+/g, " ");
    }

    node.name.type = "Identifier";

    return t.inherits(t.property("init", node.name, value), node);
  }

  function buildElementCall(path, file) {
    path.parent.children = t.react.buildChildren(path.parent);

    var tagExpr = convertFunctionName(path.get("name"));
    var args = [];

    var tagName;
    if (t.isIdentifier(tagExpr)) {
      tagName = tagExpr.name;
    } else if (t.isLiteral(tagExpr)) {
      tagName = tagExpr.value;
    }

    var state = {
      tagExpr: tagExpr,
      tagName: tagName,
      args:    args
    };

    if (opts.pre) {
      opts.pre(state, file);
    }

    var attribs = path.node.attributes;
    if (attribs.length) {
      attribs = buildOpeningElementAttributes(attribs, file);
    } else {
      attribs = t.nullLiteral();
    }

    args.push(attribs);

    if (opts.post) {
      opts.post(state, file);
    }

    return state.call || t.callExpression(state.callee, args);
  }

  /**
   * The logic for this is quite terse. It's because we need to
   * support spread elements. We loop over all attributes,
   * breaking on spreads, we then push a new object containg
   * all prior attributes to an array for later processing.
   */

  function buildOpeningElementAttributes(attribs, file) {
    var _props = [];
    var objs = [];

    function pushProps() {
      if (!_props.length) return;

      objs.push(t.objectExpression(_props));
      _props = [];
    }

    while (attribs.length) {
      var prop = attribs.shift();
      if (t.isJSXSpreadAttribute(prop)) {
        pushProps();
        objs.push(prop.argument);
      } else {
        _props.push(convertAttribute(prop));
      }
    }

    pushProps();

    if (objs.length === 1) {
      // only one object
      attribs = objs[0];
    } else {
      // looks like we have multiple objects
      if (!t.isObjectExpression(objs[0])) {
        objs.unshift(t.objectExpression([]));
      }

      // spread it
      attribs = t.callExpression(
        file.addHelper("extends"),
        objs
      );
    }

    return attribs;
  }
}
