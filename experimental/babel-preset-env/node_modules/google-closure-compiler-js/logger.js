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
 * @fileoverview Logger for Closure Compiler output.
 */

'use strict';

const ESC = '\u001B';
const COLOR_END = ESC + '[0m';
const COLOR_RED = ESC + '[91m';
const COLOR_GREEN = ESC + '[92m';
const COLOR_YELLOW = ESC + '[93m';

/**
 * @param {string} line to generate prefix for
 * @param {number} charNo to generate prefix at
 * @return {string} prefix for showing a caret
 */
function caretPrefix(line, charNo) {
  return line.substr(0, charNo).replace(/[^\t]/g, ' ');
}


/**
 * @param {!Object} options
 * @param {!Object} output
 * @param {function(string)} logger
 * @return {boolean} Whether this output should fail a compilation.
 */
module.exports = function(options, output, logger) {
  logger = logger || console.warn;
  // TODO(samthor): If this file has a sourceMap, then follow it back out of the rabbit hole.
  function fileFor(file) {
    if (!file) { return null; }

    // Filenames are the same across source and externs, so prefer source files.
    for (const files of [options.jsCode, options.externs]) {
      if (!files) { continue; }

      for (const cand of files) {
        if (cand.path == file) {
          return cand;
        }
      }
    }

    return null;
  }

  function writemsg(color, msg) {
    if (!msg.file && msg.lineNo < 0) {
      logger(msg.type);
    } else {
      logger(`${msg.file}:${msg.lineNo} (${msg.type})`)
    }
    logger(msg.description);

    const file = fileFor(msg.file);
    if (file) {
      const lines = file.src.split('\n');  // TODO(samthor): cache this for logger?
      const line = lines[msg.lineNo - 1] || '';
      logger(color + line + COLOR_END);
      logger(COLOR_GREEN + caretPrefix(line, msg.charNo) + '^' + COLOR_END);
    }
    logger('');
  }

  output.warnings.forEach(writemsg.bind(null, COLOR_YELLOW));
  output.errors.forEach(writemsg.bind(null, COLOR_RED));

  return output.errors.length > 0;
};
