import { declare } from "@babel/helper-plugin-utils";

export default declare(api => {
  api.assertVersion(
    process.env.BABEL_8_BREAKING && process.env.IS_PUBLISH
      ? PACKAGE_JSON.version
      : 7,
  );

  return {
    name: "transform-optional-catch-binding",
    inherits: USE_ESM
      ? undefined
      : IS_STANDALONE
        ? undefined
        : // eslint-disable-next-line no-restricted-globals
          require("@babel/plugin-syntax-optional-catch-binding").default,

    visitor: {
      CatchClause(path) {
        if (!path.node.param) {
          const uid = path.scope.generateUidIdentifier("unused");
          const paramPath = path.get("param");
          paramPath.replaceWith(uid);
        }
      },
    },
  };
});
