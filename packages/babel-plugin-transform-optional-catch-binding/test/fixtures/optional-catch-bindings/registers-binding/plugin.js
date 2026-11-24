export default function () {
  return {
    visitor: {
      CatchClause: {
        exit(path) {
          const { name } = path.node.param;
          if (path.scope.getOwnBinding(name)?.path !== path) {
            throw new Error(`${name} is not registered`);
          }
          path.scope.rename(name, "renamed");
        },
      },
    },
  };
}
