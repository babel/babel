import transform from "./../index";
import * as util from  "../../util";

export function transformerList(key, val) {
  val = util.arrayify(val);

  if (val.indexOf("all") >= 0 || val.indexOf(true) >= 0) {
    val = Object.keys(transform.transformers);
  }

  return transform._ensureTransformerNames(key, val);
}

export function boolean(key, val) {
  return !!val;
}

export function booleanString(key, val) {
  return util.booleanify(val);
}

export function list(key, val) {
  return util.list(val);
}
