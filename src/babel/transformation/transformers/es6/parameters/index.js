import * as visitors from "../../../../traversal/visitors";

import * as def from "./default";
import * as rest from "./rest";

export var metadata = {
  group: "builtin-advanced"
};

export var visitor = visitors.merge([rest.visitor, def.visitor]);
