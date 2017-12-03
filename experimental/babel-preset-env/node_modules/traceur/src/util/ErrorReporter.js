// Copyright 2012 Traceur Authors.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import {SourceRange} from './SourceRange.js';

/**
 * A conduit for reporting errors and warnings to the user using the Firebug
 * console API.
 */
export class ErrorReporter {
  constructor() {
    this.hadError_ = false;
  }

  /**
   * @param {SourcePosition} location
   * @param {string} message
   */
  reportError(location, message) {
    this.hadError_ = true;
    this.reportMessageInternal(location, message);
  }

  /**
   * @param {SourceRange} location
   * @param {string} message
   */
  reportMessageInternal(location, message) {
    if (location)
      message = `${location.start}: ${message}`;
    console.error(message);
  }

  hadError() {
    return this.hadError_;
  }

  clearError() {
    this.hadError_ = false;
  }
}

/**
 * Formats an error message.
 * @param  {SourcePosition} location If present the source position is
 *     prepended to the message. Use |null| to not include the source
 *     position.
 * @param  {string} text The text to output. %s and %% are the only supported
 *     place holders.
 * @param  {Array=} args Array values to populate the placeholders with.
 * @return {string} The text where the source position has been prepended and
 *     where the place holders have been replaced.
 */
export function format(location, text, args = undefined) {
  let i = 0;
  text = text.replace(/%./g, function(s) {
    switch (s) {
      case '%s':
        return args && args[i++];
      case '%%':
        return '%';
    }
    return s;
  });
  if (location)
    text = `${location}: ${text}`;
  return text;
};

ErrorReporter.format = format;
