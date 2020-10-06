import { declare } from "@babel/helper-plugin-utils";
import syntaxClassStaticBlock from "@babel/plugin-syntax-class-static-block";

export default declare(({ types: t, template, assertVersion }) => {
  // todo remove this check after Babel 7.12.0 is published
  if (process.env.NODE_ENV !== "test") {
    assertVersion("^7.12.0");
  }

  return {
    name: "proposal-class-static-block",
    inherits: syntaxClassStaticBlock,
    visitor: {
      StaticBlock(path) {
        const staticBlockRef = path.scope.generateUidIdentifier("");
        const classBody = path.parentPath;
        classBody.pushContainer(
          "body",
          t.classPrivateProperty(
            t.privateName(staticBlockRef),
            template.expression.ast`(() => { ${path.node.body} })()`,
            [],
            /* static */ true,
          ),
        );
        path.remove();
      },
    },
  };
});
