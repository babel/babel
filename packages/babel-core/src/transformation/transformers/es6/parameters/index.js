import { visitors } from "babel-traverse";

import * as def from "./default";
import * as rest from "./rest";

export var metadata = {
  group: "builtin-advanced"
};

/**
 * [Please add a description.]
 */

export var visitor = visitors.merge([rest.visitor, def.visitor]);
