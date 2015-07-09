import estraverse from "estraverse";
import extend from "lodash/object/extend";
import * as t from "./types";

// estraverse

extend(estraverse.VisitorKeys, t.VISITOR_KEYS);
