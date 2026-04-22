const meta = {
  name: PACKAGE_JSON.name,
  version: PACKAGE_JSON.version,
};

import reportErrorMessageFormat from "./rules/report-error-message-format.js";

const rules = {
  "report-error-message-format": reportErrorMessageFormat,
};

export default { meta, rules };
