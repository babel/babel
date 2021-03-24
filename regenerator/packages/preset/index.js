/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

module.exports = {
  plugins: [
    require("@babel/plugin-syntax-async-generators"),
    require("@babel/plugin-proposal-function-sent"),
    require("@babel/plugin-transform-classes"),
    require("@babel/plugin-transform-arrow-functions"),
    require("@babel/plugin-transform-block-scoping"),
    require("@babel/plugin-transform-for-of"),
    require("regenerator-transform").default
  ]
};
