/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
 * additional grant of patent rights can be found in the PATENTS file in
 * the same directory.
 */

export default function (context) {
  const plugin = {
    visitor: require("./visit").visitor,
  };

  // Some presets manually call child presets, but fail to pass along the
  // context object. Out of an abundance of caution, we verify that it
  // exists first to avoid causing unnecessary breaking changes.
  const version = context && context.version;

  // The "name" property is not allowed in older versions of Babel (6.x)
  // and will cause the plugin validator to throw an exception.
  if (version && parseInt(version, 10) >= 7) {
    plugin.name = "regenerator-transform";
  }

  return plugin;
}
