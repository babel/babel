import "./core.ts";
import "./flow.ts";
import "./jsx.ts";
import "./misc.ts";
import "./experimental.ts";
import "./typescript.ts";
import {
  VISITOR_KEYS,
  ALIAS_KEYS,
  FLIPPED_ALIAS_KEYS,
  NODE_FIELDS,
  BUILDER_KEYS,
  DEPRECATED_KEYS,
  NODE_PARENT_VALIDATIONS,
} from "./utils.ts";
import {
  PLACEHOLDERS,
  PLACEHOLDERS_ALIAS,
  PLACEHOLDERS_FLIPPED_ALIAS,
} from "./placeholders.ts";
import { DEPRECATED_ALIASES } from "./deprecated-aliases.ts";

(
  Object.keys(DEPRECATED_ALIASES) as (keyof typeof DEPRECATED_ALIASES)[]
).forEach(deprecatedAlias => {
  FLIPPED_ALIAS_KEYS[deprecatedAlias] =
    FLIPPED_ALIAS_KEYS[DEPRECATED_ALIASES[deprecatedAlias]];
});

const TYPES: Array<string> = [].concat(
  Object.keys(VISITOR_KEYS),
  Object.keys(FLIPPED_ALIAS_KEYS),
  Object.keys(DEPRECATED_KEYS),
);

export {
  VISITOR_KEYS,
  ALIAS_KEYS,
  FLIPPED_ALIAS_KEYS,
  NODE_FIELDS,
  BUILDER_KEYS,
  DEPRECATED_ALIASES,
  DEPRECATED_KEYS,
  NODE_PARENT_VALIDATIONS,
  PLACEHOLDERS,
  PLACEHOLDERS_ALIAS,
  PLACEHOLDERS_FLIPPED_ALIAS,
  TYPES,
};

export type { FieldOptions } from "./utils.ts";
