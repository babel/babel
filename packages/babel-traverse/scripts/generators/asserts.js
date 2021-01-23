"use strict";
const t = require("@babel/types");

module.exports = function generateAsserts() {
  let output = `/*
 * This file is auto-generated! Do not modify it directly.
 * To re-generate run 'make build'
 */
import * as t from "@babel/types";
import NodePath from "../index";


export interface NodePathAssetions {`;

  for (const type of t.TYPES) {
    output += `
  assert${type}(
    opts?: object,
  ): asserts this is NodePath<t.${type}>;`;
  }

  output += `
}`;

  return output;
};
