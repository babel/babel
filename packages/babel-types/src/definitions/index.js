// @flow
import toFastProperties from "to-fast-properties";
import "./core";
import "./es2015";
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

// We do this here, because at this point the visitor keys should be ready and setup
toFastProperties(VISITOR_KEYS);
toFastProperties(ALIAS_KEYS);
toFastProperties(FLIPPED_ALIAS_KEYS);
toFastProperties(NODE_FIELDS);
toFastProperties(BUILDER_KEYS);
toFastProperties(DEPRECATED_KEYS);

toFastProperties(PLACEHOLDERS_ALIAS);
toFastProperties(PLACEHOLDERS_FLIPPED_ALIAS);

const TYPES: Array<string> = Object.keys(VISITOR_KEYS)
  .concat(Object.keys(FLIPPED_ALIAS_KEYS))
  .concat(Object.keys(DEPRECATED_KEYS));

export {
  VISITOR_KEYS,
  ALIAS_KEYS,
  FLIPPED_ALIAS_KEYS,
  NODE_FIELDS,
  BUILDER_KEYS,
  DEPRECATED_KEYS,
  NODE_PARENT_VALIDATIONS,
  PLACEHOLDERS,
  PLACEHOLDERS_ALIAS,
  PLACEHOLDERS_FLIPPED_ALIAS,
  TYPES,
};
