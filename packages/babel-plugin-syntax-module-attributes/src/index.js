import { declare } from "@babel/helper-plugin-utils";

export default declare((api, { version }) => {
  api.assertVersion(7);

  if (typeof version !== "string" || version !== "apr-2020") {
    throw new Error(
      "The 'moduleAttributes' plugin requires a 'version' option," +
        " representing the last proposal update. Currently, the" +
        " only supported value is 'apr-2020'.",
    );
  }

  return {
    name: "syntax-module-attributes",

    manipulateOptions(opts, parserOpts) {
      parserOpts.plugins.push(["moduleAttributes", { version }]);
    },
  };
});
