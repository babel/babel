import toFastProperties from "to-fast-properties";
import "./core";
import "./flow";
import "./jsx";
import "./misc";
import "./experimental";
import "./typescript";
import {
  VISITOR_KEYS,
  ALIAS_KEYS,
  FLIPPED_ALIAS_KEYS,
  NODE_FIELDS,
  BUILDER_KEYS,
  DEPRECATED_KEYS,
  NODE_PARENT_VALIDATIONS,
} from "./utils";
import {
  PLACEHOLDERS,
  PLACEHOLDERS_ALIAS,
  PLACEHOLDERS_FLIPPED_ALIAS,
} from "./placeholders";
import { DEPRECATED_ALIASES } from "./deprecated-aliases";

(
  Object.keys(DEPRECATED_ALIASES) as (keyof typeof DEPRECATED_ALIASES)[]
).forEach(deprecatedAlias => {
  FLIPPED_ALIAS_KEYS[deprecatedAlias] =
    FLIPPED_ALIAS_KEYS[DEPRECATED_ALIASES[deprecatedAlias]];
});

// We do this here, because at this point the visitor keys should be ready and setup
toFastProperties(VISITOR_KEYS);
toFastProperties(ALIAS_KEYS);
toFastProperties(FLIPPED_ALIAS_KEYS);
toFastProperties(NODE_FIELDS);
toFastProperties(BUILDER_KEYS);
toFastProperties(DEPRECATED_KEYS);

toFastProperties(PLACEHOLDERS_ALIAS);
toFastProperties(PLACEHOLDERS_FLIPPED_ALIAS);

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

export type { FieldOptions } from "./utils";
