/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

module.exports = {
  plugins: [
    require("babel-plugin-syntax-async-functions"),
    require("babel-plugin-syntax-async-generators"),
    require("babel-plugin-transform-es2015-classes"),
    require("babel-plugin-transform-es2015-arrow-functions"),
    require("babel-plugin-transform-es2015-block-scoping"),
    require("babel-plugin-transform-es2015-for-of"),
    require("regenerator-transform").default
  ]
};
