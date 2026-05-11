import { declare } from "@babel/helper-plugin-utils";

export interface Options {
  /** @deprecated Use the `noNewArrows` assumption instead. */
  spec?: boolean;
}

export default declare((api, options: Options) => {
  api.assertVersion(REQUIRED_VERSION("^7.0.0-0 || ^8.0.0"));

  if ("spec" in options) {
    console.warn(
      "@babel/plugin-transform-arrow-functions: The 'spec' option has been deprecated, " +
        `use the 'noNewArrows: ${!options.spec}' assumption instead (https://babeljs.io/assumptions).`,
    );
  }

  const noNewArrows = api.assumption("noNewArrows") ?? !options.spec;

  return {
    name: "transform-arrow-functions",

    visitor: {
      ArrowFunctionExpression(path) {
        // In some conversion cases, it may have already been converted to a function while this callback
        // was queued up.
        if (!path.isArrowFunctionExpression()) return;

        path.arrowFunctionToExpression({
          // While other utils may be fine inserting other arrows to make more transforms possible,
          // the arrow transform itself absolutely cannot insert new arrow functions.
          allowInsertArrow: false,
          noNewArrows,
        });
      },
    },
  };
});
