"use strict";

const getReferenceOrigin = require("./utils/get-reference-origin");

function reportNoPlugin(context /*: Context */, node /*: Node */) {
  context.report({
    node,
    message: "This file does not export a Babel plugin",
  });
}

function is(type /*: string */) /*: (node: Node) => boolean */ {
  return node => node.type === type;
}

module.exports = {
  meta: {
    schema: [],
  },
  create(context /*: Context */) {
    return {
      Program(program /*: Node */) {
        if (!program.body.some(is("ExportDefaultDeclaration"))) {
          return reportNoPlugin(context, program);
        }
      },
      ExportDefaultDeclaration(exportDefaultDecl) {
        let plugin = exportDefaultDecl.declaration;

        if (plugin.type === "CallExpression") {
          // export default declare(api => { ... });
          const origin = getReferenceOrigin(plugin.callee, context.getScope());

          if (
            origin &&
            origin.kind === "import" &&
            origin.name === "declare" &&
            origin.source === "@babel/helper-plugin-utils"
          ) {
            plugin = plugin.arguments[0];
          }
        }

        if (!plugin.type.includes("Function")) {
          return reportNoPlugin(context, exportDefaultDecl.parent);
        }

        const returnNode = plugin.body.body.find(is("ReturnStatement"));
        if (!returnNode || returnNode.argument.type !== "ObjectExpression") {
          return reportNoPlugin(context, exportDefaultDecl.parent);
        }

        if (!returnNode.argument.properties.some(p => p.key.name === "name")) {
          context.report(
            returnNode,
            "This Babel plugin doesn't have a 'name' property."
          );
        }
      },
    };
  },
};
