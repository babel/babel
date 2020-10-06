import { declare } from "@babel/helper-plugin-utils";
import syntaxClassStaticBlock from "@babel/plugin-syntax-class-static-block";

export default declare(({ types: t, template, assertVersion }) => {
  assertVersion(7);

  return {
    name: "proposal-class-static-block",
    inherits: syntaxClassStaticBlock,
    visitor: {
      StaticBlock(path) {
        const staticBlockRef = path.scope.generateUidIdentifier("init");
        const classPath = path.parentPath.parentPath;
        path.replaceWith(
          t.classMethod(
            "method",
            staticBlockRef,
            [],
            t.BlockStatement(
              // Add completion record. A static block can not contain directly
              // `return`, `break`, `continue`. So `return this` must be executed.
              path.node.body.concat([
                template.ast`delete this.${t.cloneNode(staticBlockRef)};`,
                template.ast`return this;`,
              ]),
            ),
            /* computed */ false,
            /* static */ true,
          ),
        );
        const classId = classPath.node.id;
        if (!classId) {
          // If `classId` is not defined, we don't have to preserve the class binding
          // `class { }` transformed as `(class { })._init()`
          classPath.replaceWith(
            template.ast`(${classPath.node}).${t.cloneNode(staticBlockRef)}()`,
          );
        } else {
          // If `classId` is defined, preserve the class binding.
          // `class Foo { }` transformed as `(Foo = (class Foo { })._init())`
          classPath.node.type = "ClassExpression";
          classPath.replaceWith(
            template.ast`${t.cloneNode(classId)} = (${
              classPath.node
            }).${t.cloneNode(staticBlockRef)}()`,
          );
          classPath.insertBefore(template.ast`let ${t.cloneNode(classId)};`);
        }
      },
    },
  };
});
