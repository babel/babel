/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

var jstransform = require('./src/jstransform');
var arrowFuncVisitors = require('./visitors/es6-arrow-function-visitors');
var restParamVisitors = require('./visitors/es6-rest-param-visitors');
var es7SpreadPropertyVisitors = require('./visitors/es7-spread-property-visitors');

exports.process = function(sourceText, sourcePath) {
  return jstransform.transform(
    arrowFuncVisitors.visitorList
      .concat(restParamVisitors.visitorList)
      .concat(es7SpreadPropertyVisitors.visitorList),
    sourceText
  ).code;
};
