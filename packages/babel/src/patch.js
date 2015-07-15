import estraverse from "estraverse";
import extend from "lodash/object/extend";
import * as t from "./types";

extend(estraverse.VisitorKeys, t.VISITOR_KEYS);
