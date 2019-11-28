import noDeprecatedClone from "./rules/no-deprecated-clone";
import noUndefinedIdentifier from "./rules/no-undefined-identifier";
import pluginName from "./rules/plugin-name";

export default {
  rules: {
    "no-deprecated-clone": noDeprecatedClone,
    "no-undefined-identifier": noUndefinedIdentifier,
    "plugin-name": pluginName,
  },
  configs: {
    recommended: {
      plugins: ["@babel/development"],
      rules: {
        "@babel/development/no-deprecated-clone": "error",
        "@babel/development/no-undefined-identifier": "error",
        "@babel/development/plugin-name": "error",
      },
    },
  },
};
