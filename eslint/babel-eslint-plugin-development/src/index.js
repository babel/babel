import noDeprecatedClone from "./rules/no-deprecated-clone.js";
import noUndefinedIdentifier from "./rules/no-undefined-identifier.js";
import pluginName from "./rules/plugin-name.js";

const meta = {
  name: PACKAGE_JSON.name,
  version: PACKAGE_JSON.version,
};

const rules = {
  "no-deprecated-clone": noDeprecatedClone,
  "no-undefined-identifier": noUndefinedIdentifier,
  "plugin-name": pluginName,
};

export default { meta, rules };
