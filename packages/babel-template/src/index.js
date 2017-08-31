import cloneDeep from "lodash/cloneDeep";
import has from "lodash/has";
import traverse from "babel-traverse";
import * as babylon from "babylon";

const FROM_TEMPLATE = new Set();

export default function(code: string, opts?: Object): Function {
  // since we lazy parse the template, we get the current stack so we have the
  // original stack to append if it errors when parsing
  let stack;
  try {
    // error stack gets populated in IE only on throw
    // (https://msdn.microsoft.com/en-us/library/hh699850(v=vs.94).aspx)
    throw new Error();
  } catch (error) {
    if (error.stack) {
      // error.stack does not exists in IE <= 9
      stack = error.stack
        .split("\n")
        .slice(1)
        .join("\n");
    }
  }

  opts = Object.assign(
    {
      allowReturnOutsideFunction: true,
      allowSuperOutsideMethod: true,
      preserveComments: false,
    },
    opts,
  );

  let getAst = function() {
    let ast;

    try {
      ast = babylon.parse(code, opts);

      ast = traverse.removeProperties(ast, {
        preserveComments: opts.preserveComments,
      });
    } catch (err) {
      err.stack = `${err.stack}from\n${stack}`;
      throw err;
    }

    getAst = function() {
      return ast;
    };

    return ast;
  };

  return function(...args) {
    return useTemplate(getAst(), args);
  };
}

function useTemplate(ast, nodes?: Array<Object>) {
  ast = cloneDeep(ast);
  const { program } = ast;

  if (nodes.length) {
    traverse.cheap(ast, function(node) {
      FROM_TEMPLATE.add(node);
    });

    traverse(ast, templateVisitor, null, nodes);

    FROM_TEMPLATE.clear();
  }

  if (program.body.length > 1) {
    return program.body;
  } else {
    return program.body[0];
  }
}

const templateVisitor = {
  // 360
  noScope: true,

  Identifier(path, args) {
    const { node, parentPath } = path;
    if (!FROM_TEMPLATE.has(node)) return path.skip();

    let replacement;
    if (has(args[0], node.name)) {
      replacement = args[0][node.name];
    } else if (node.name[0] === "$") {
      const i = +node.name.slice(1);
      if (args[i]) replacement = args[i];
    }

    if (parentPath.isExpressionStatement()) {
      path = parentPath;
    }

    if (replacement === null) {
      path.remove();
    } else if (replacement) {
      path.replaceInline(replacement);
      path.skip();
    }
  },

  exit({ node }) {
    if (!node.loc) {
      traverse.clearNode(node);
    }
  },
};
