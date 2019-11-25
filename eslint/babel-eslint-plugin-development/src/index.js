import noDeprecatedClone from "./rules/no-deprecated-clone";
import noUndefinedIdentifier from "./rules/no-undefined-identifier";
import pluginName from "./rules/plugin-name";

export default {
  rules: {
    "no-deprecated-clone": noDeprecatedClone,
    "no-undefined-identifier": noUndefinedIdentifier,
    "plugin-name": pluginName,
  },
};
