import { declare } from "@babel/helper-plugin-utils";

export default declare(api => {
  api.assertVersion(REQUIRED_VERSION(7));

  return {
    name: "proposal-do-expressions",
    manipulateOptions: (_, parser) => parser.plugins.push("doExpressions"),

    visitor: {
      DoExpression: {
        exit(path) {
          const { node } = path;
          if (node.async) {
            // Async do expressions are not yet supported
            return;
          }
          const body = node.body.body;
          if (body.length) {
            path.replaceExpressionWithStatements(body);
          } else {
            path.replaceWith(path.scope.buildUndefinedNode());
          }
        },
      },
    },
  };
});
