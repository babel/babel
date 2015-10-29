/* @flow */

import cloneDeep from "lodash/lang/cloneDeep";
import has from "lodash/object/has";
import traverse from "babel-traverse";
import * as babylon from "babylon";
import * as t from "babel-types";

let TEMPLATE_SKIP = Symbol();

export default function (code: string): Function {
  // since we lazy parse the template, we get the current stack so we have the
  // original stack to append if it errors when parsing
  let stack = new Error().stack.split("\n").slice(1).join("\n");

  let getAst = function () {
    let ast;

    try {
      ast = babylon.parse(code, {
        allowReturnOutsideFunction: true,
        allowSuperOutsideMethod: true
      });

      ast = traverse.removeProperties(ast);
    } catch (err) {
      err.stack = `${err.stack}from\n${stack}`;
      throw err;
    }

    getAst = function () {
      return ast;
    };

    return ast;
  };

  return function (...args) {
    return useTemplate(getAst(), args);
  };
}

function useTemplate(ast, nodes?: Array<Object>) {
  ast = cloneDeep(ast);
  let { program } = ast;

  if (nodes.length) {
    traverse(ast, templateVisitor, null, nodes);
  }

  if (program.body.length > 1) {
    return program.body;
  } else {
    return program.body[0];
  }
}

let templateVisitor = {
  // 360
  noScope: true,

  enter(path, args) {
    let { node } = path;
    if (node[TEMPLATE_SKIP]) return path.skip();

    if (t.isExpressionStatement(node)) {
      node = node.expression;
    }

    let replacement;

    if (t.isIdentifier(node)) {
      if (has(args[0], node.name)) {
        replacement = args[0][node.name];
      } else if (node.name[0] === "$") {
        let i = +node.name.slice(1);
        if (args[i]) replacement = args[i];
      }
    }

    if (replacement === null) {
      path.remove();
    }

    if (replacement) {
      replacement[TEMPLATE_SKIP] = true;
      path.replaceInline(replacement);
    }
  },

  exit({ node }) {
    traverse.clearNode(node);
  }
};
