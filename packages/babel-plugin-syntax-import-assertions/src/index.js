import { declare } from "@babel/helper-plugin-utils";

export default declare((api, { version }) => {
  api.assertVersion(7);

  if (typeof version !== "string" || version !== "september-2020") {
    throw new Error(
      "The 'importAssertions' plugin requires a 'version' option," +
        " representing the last proposal update. Currently, the" +
        " only supported value is 'september-2020'.",
    );
  }

  return {
    name: "syntax-import-assertions",

    manipulateOptions(opts, parserOpts) {
      parserOpts.plugins.push(["importAssertions", { version }]);
    },
  };
});
