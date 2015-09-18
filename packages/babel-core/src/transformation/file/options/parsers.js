import slash from "slash";
import * as util from "../../../util";

export function number(val) {
  return +val;
}

export let filename = slash;

export function boolean(val) {
  return !!val;
}

export function booleanString(val) {
  return util.booleanify(val);
}

export function list(val) {
  return util.list(val);
}
