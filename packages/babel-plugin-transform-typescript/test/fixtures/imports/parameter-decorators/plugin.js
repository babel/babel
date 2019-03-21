"use strict";
// https://github.com/benderTheCrime/babel-plugin-transform-function-parameter-decorators/

Object.defineProperty(exports, "__esModule", {
  value: true,
});

exports.default = function(_ref) {
  var types = _ref.types;

  return {
    visitor: {
      Function: function parseFunctionPath(path) {
        (path.get("params") || [])
          .slice()
          .reverse()
          .forEach(function(param) {
            var name = param.node.name;
            var paramUidName = path.scope.generateUidIdentifier(name).name;
            var resultantDecorator = void 0;

            (param.node.decorators || [])
              .slice()
              .reverse()
              .forEach(function(decorator) {
                resultantDecorator = types.callExpression(
                  decorator.expression,
                  [resultantDecorator || types.Identifier(paramUidName)]
                );
              });

            if (resultantDecorator) {
              var decoratedParamUidName = path.scope.generateUidIdentifier(name)
                .name;

              path.scope.rename(name, decoratedParamUidName);
              param.parentPath
                .get("body")
                .unshiftContainer(
                  "body",
                  types.variableDeclaration("var", [
                    types.variableDeclarator(
                      types.Identifier(decoratedParamUidName),
                      resultantDecorator
                    ),
                  ])
                );
              param.replaceWith(types.Identifier(paramUidName));
            }
          });
      },
    },
  };
};
