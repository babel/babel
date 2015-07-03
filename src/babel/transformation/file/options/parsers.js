import slash from "slash";
import * as util from "../../../util";

/**
 * [Please add a description.]
 */

export function transformerList(val) {
  return util.arrayify(val);
}

/**
 * [Please add a description.]
 */

transformerList.validate = function (key, val, pipeline) {
  if (val.indexOf("all") >= 0 || val.indexOf(true) >= 0) {
    val = Object.keys(pipeline.transformers);
  }

  return pipeline._ensureTransformerNames(key, val);
};

/**
 * [Please add a description.]
 */

export function number(val) {
  return +val;
}

/**
 * [Please add a description.]
 */

export var filename = slash;

/**
 * [Please add a description.]
 */

export function boolean(val) {
  return !!val;
}

/**
 * [Please add a description.]
 */

export function booleanString(val) {
  return util.booleanify(val);
}

/**
 * [Please add a description.]
 */

export function list(val) {
  return util.list(val);
}
