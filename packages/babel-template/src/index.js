import cloneDeep from "lodash/lang/cloneDeep";
import isEmpty from "lodash/lang/isEmpty";
import has from "lodash/object/has";
import traverse from "babel-traverse";
import * as babylon from "babylon";
import * as t from "babel-types";

export default function (code) {
  var stack = new Error().stack.split("\n").slice(1).join("\n");

  var getAst = function () {
    try {
      var ast = babylon.parse(code, {
        allowReturnOutsideFunction: true
      }).program;

      ast = traverse.removeProperties(ast);
    } catch (err) {
      err.stack = `${err.stack}from\n${stack}`;
    }

    getAst = function () {
      return ast;
    };

    return ast;
  };

  return function (nodes, keepExpression) {
    return useTemplate(getAst(), nodes, keepExpression);
  };
}

function useTemplate(ast, nodes?: Array<Object>, keepExpression?: boolean) {
  if (nodes === true) {
    keepExpression = true;
    nodes = null;
  }

  ast = cloneDeep(ast);

  if (!isEmpty(nodes)) {
    traverse(ast, templateVisitor, null, nodes);
  }

  if (ast.body.length > 1) {
    return ast.body;
  }

  var node = ast.body[0];
  if (!keepExpression && t.isExpressionStatement(node)) {
    return node.expression;
  } else {
    return node;
  }
}

var templateVisitor = {
  // 360
  noScope: true,

  enter(path, nodes) {
    var { node } = path;

    if (t.isExpressionStatement(node)) {
      node = node.expression;
    }

    if (t.isIdentifier(node) && has(nodes, node.name)) {
      path.skip();
      path.replaceInline(nodes[node.name]);
    }
  },

  exit({ node }) {
    traverse.clearNode(node);
  }
};
