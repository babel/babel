// Based upon the excellent jsx-transpiler by Inglet Stepanyan (RReverser)
// https://github.com/RReverser/jsx-transpiler

// jsx

import isString from "lodash/lang/isString";
import * as messages from "babel-messages";
import esutils from "esutils";
import { react } from "babel-types";
import * as t from "babel-types";

export default function (opts) {
  let visitor = {};

  visitor.JSXIdentifier = function (node) {
    if (node.name === "this" && this.isReferenced()) {
      return t.thisExpression();
    } else if (esutils.keyword.isIdentifierNameES6(node.name)) {
      node.type = "Identifier";
    } else {
      return t.stringLiteral(node.name);
    }
  };

  visitor.JSXNamespacedName = function () {
    throw this.errorWithNode(messages.get("JSXNamespacedTags"));
  };

  visitor.JSXMemberExpression = {
    exit(node) {
      node.computed = t.isLiteral(node.property);
      node.type = "MemberExpression";
    }
  };

  visitor.JSXExpressionContainer = function (node) {
    return node.expression;
  };

  visitor.JSXAttribute = {
    enter(node) {
      let value = node.value;
      if (t.isLiteral(value) && isString(value.value)) {
        value.value = value.value.replace(/\n\s+/g, " ");
      }
    },

    exit(node) {
      let value = node.value || t.booleanLiteral(true);
      return t.inherits(t.property("init", node.name, value), node);
    }
  };

  visitor.JSXOpeningElement = {
    exit(node, parent, scope, file) {
      parent.children = react.buildChildren(parent);

      let tagExpr = node.name;
      let args = [];

      let tagName;
      if (t.isIdentifier(tagExpr)) {
        tagName = tagExpr.name;
      } else if (t.isLiteral(tagExpr)) {
        tagName = tagExpr.value;
      }

      let state = {
        tagExpr: tagExpr,
        tagName: tagName,
        args:    args
      };

      if (opts.pre) {
        opts.pre(state, file);
      }

      let attribs = node.attributes;
      if (attribs.length) {
        attribs = buildJSXOpeningElementAttributes(attribs, file);
      } else {
        attribs = t.nullLiteral();
      }

      args.push(attribs);

      if (opts.post) {
        opts.post(state, file);
      }

      return state.call || t.callExpression(state.callee, args);
    }
  };

  /**
   * The logic for this is quite terse. It's because we need to
   * support spread elements. We loop over all attributes,
   * breaking on spreads, we then push a new object containg
   * all prior attributes to an array for later processing.
   */

  let buildJSXOpeningElementAttributes = function (attribs, file) {
    let _props = [];
    let objs = [];

    let pushProps = function () {
      if (!_props.length) return;

      objs.push(t.objectExpression(_props));
      _props = [];
    };

    while (attribs.length) {
      let prop = attribs.shift();
      if (t.isJSXSpreadAttribute(prop)) {
        pushProps();
        objs.push(prop.argument);
      } else {
        _props.push(prop);
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
  };

  visitor.JSXElement = {
    exit(node) {
      let callExpr = node.openingElement;

      callExpr.arguments = callExpr.arguments.concat(node.children);

      if (callExpr.arguments.length >= 3) {
        callExpr._prettyCall = true;
      }

      return t.inherits(callExpr, node);
    }
  };

  return visitor;
}
