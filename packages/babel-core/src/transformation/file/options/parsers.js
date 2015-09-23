/* @flow */

import slash from "slash";
import * as util from "../../../util";

export function number(val: any): number {
  return +val;
}

export let filename = slash;

export function boolean(val: any): boolean {
  return !!val;
}

export function booleanString(val: any): boolean | any {
  return util.booleanify(val);
}

export function list(val: any): Array<string> {
  return util.list(val);
}
