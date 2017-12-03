// Copyright 2016 Traceur Authors.
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

import {CommandOptions} from '../Options.js';

function forEachPrologLine(s, f) {
  let inProlog = true;
  for (let i = 0; inProlog && i < s.length; ) {
    let j = s.indexOf('\n', i);
    if (j == -1)
      break;
    if (s[i] === '/' && s[i + 1] === '/') {
      let line = s.slice(i, j);
      f(line);
      i = j + 1;
    } else {
      inProlog = false;
    }
  }
}

export default function parseProlog(source) {
  let returnValue = {
    onlyInBrowser: false,
    skip: false,
    get shouldHaveErrors() {
      return this.expectedErrors.length !== 0;
    },
    expectedErrors: [],
    async: false
  };
  forEachPrologLine(source, (line) => {
    let m;
    if (line.indexOf('// Only in browser.') === 0) {
      returnValue.onlyInBrowser = true;
    } else if (line.indexOf('// Skip') === 0) {
      if (line.indexOf('// Skip.') === 0) {
        returnValue.skip = true;
      } else {
        // eval remainder of line.
        let skip = false;
        try {
            skip = eval(line.slice('// Skip'.length));
        } catch (ex) {
            skip = true;
        }
        returnValue.skip = !!skip;
      }
    } else if (line.indexOf('// Async.') === 0) {
      returnValue.async = true;
    } else if ((m = /\/\ Options:\s*(.+)/.exec(line))) {
      returnValue.traceurOptions = traceur.util.CommandOptions.fromString(m[1]);
    } else if ((m = /\/\/ Error:\s*(.+)/.exec(line))) {
      returnValue.expectedErrors.push(m[1]);
    }
  });
  return returnValue;
}
