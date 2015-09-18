import { visitors } from "babel-traverse";

import * as def from "./default";
import * as rest from "./rest";

export let metadata = {
  group: "builtin-advanced"
};

export let visitor = visitors.merge([rest.visitor, def.visitor]);
