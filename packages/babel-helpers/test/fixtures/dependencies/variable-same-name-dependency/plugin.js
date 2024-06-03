import { stringifyMetadata } from "../../../../scripts/build-helper-metadata.js";
import defineHelper, {
  defineHelperAndGetMetadata,
} from "../../../helpers/define-helper.js";

export default function (babel) {
  const dependency = defineHelper(babel, import.meta.url, "dependency", `
    export default function fn() {}
  `);

  const { id: main, metadata } = defineHelperAndGetMetadata(
    babel,
    import.meta.url,
    "main",
    `
      import dep from "${dependency}";

      export default function helper() {
        let x = dep;
        return function (dep) {
          return x() + dep;
        }
      }
    `
  );

  return {
    visitor: {
      Identifier(path) {
        if (path.node.name !== "REPLACE_ME") return;
        const helper = this.addHelper(main);
        path.replaceWith(helper);
      },
      Program(path) {
        babel.types.addComment(
          path.node,
          "trailing",
          `"main" metadata:${stringifyMetadata(metadata)}`
        );
      },
    },
  };
}
