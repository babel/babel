import * as util from "../../../util";

export function transformerList(val) {
  return util.arrayify(val);
}

transformerList.validate = function (key, val, pipeline) {
  if (val.indexOf("all") >= 0 || val.indexOf(true) >= 0) {
    val = Object.keys(pipeline.transformers);
  }

  return pipeline._ensureTransformerNames(key, val);
};

export function number(val) {
  return +val;
}

export function boolean(val) {
  return !!val;
}

export function booleanString(val) {
  return util.booleanify(val);
}

export function list(val) {
  return util.list(val);
}
