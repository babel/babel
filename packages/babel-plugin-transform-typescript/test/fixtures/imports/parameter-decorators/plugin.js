// https://github.com/benderTheCrime/babel-plugin-transform-function-parameter-decorators/blob/develop/src/index.js
module.exports = function ({ types }) {
  return {
    visitor: {
      Function: function parseFunctionPath(path) {
        (path.get('params') || [])
          .slice()
          .reverse()
          .forEach(function (param) {
            const name = param.node.name;
            const paramUidName =
              path.scope.generateUidIdentifier(name).name;
            let resultantDecorator;

            (param.node.decorators || [])
              .slice()
              .reverse()
              .forEach(function (decorator) {
                resultantDecorator = types.callExpression(
                  decorator.expression, [
                    resultantDecorator ||
                    types.Identifier(paramUidName)
                  ]
                );
              });

            if (resultantDecorator) {
              const decoratedParamUidName =
                path.scope.generateUidIdentifier(name).name;

              path.scope.rename(name, decoratedParamUidName);
              param.parentPath.get('body').unshiftContainer(
                'body', types.variableDeclaration('var', [
                  types.variableDeclarator(
                    types.Identifier(decoratedParamUidName),
                    resultantDecorator
                  )
                ])
              );
              param.replaceWith(types.Identifier(paramUidName));
            }
          });
      }
    }
  };
}
