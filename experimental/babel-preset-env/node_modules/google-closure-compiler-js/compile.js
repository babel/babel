/*
 * Copyright 2016 The Closure Compiler Authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Wrapper for the natively built Closure Compiler GWT binary to
 * work around quirks. Depending on the release, this file could be empty.
 */

'use strict';

const jscomp = require('./jscomp.js');

module.exports = function(flags) {
  const clone = {};
  for (const k in flags) {
    clone[k] = flags[k];
  }
  const out = jscomp(clone);

  // hide weird GWT internals
  out.warnings = Array.prototype.slice.call(out.warnings);
  out.errors = Array.prototype.slice.call(out.errors);

  return out;
};
