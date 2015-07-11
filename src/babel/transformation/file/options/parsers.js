import slash from "slash";
import * as util from "../../../util";

/**
 * Get a transformer list from a value.
 */

export function transformerList(val) {
  return util.arrayify(val);
}

/**
 * Validate transformer list. Maps "all" to all transformer names.
 */

transformerList.validate = function (key, val, pipeline) {
  if (val.indexOf("all") >= 0 || val.indexOf(true) >= 0) {
    val = Object.keys(pipeline.transformers);
  }

  return pipeline._ensureTransformerNames(key, val);
};

/**
 * Cast a value to a number.
 */

export function number(val) {
  return +val;
}

/**
 * Cast a value to a boolean.
 */

export var filename = slash;

/**
 * [Please add a description.]
 */

export function boolean(val) {
  return !!val;
}

/**
 * Cast a boolean-like string to a boolean.
 */

export function booleanString(val) {
  return util.booleanify(val);
}

/**
 * Cast a value to an array, splitting strings by ",".
 */

export function list(val) {
  return util.list(val);
}
