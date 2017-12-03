// Copyright 2013 Traceur Authors.
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

var fs = require('fs');

function stripShebang(data) {
  if (/^#!/.test(data))
    data = '//' + data;
  return data;
}

var nodeLoader = {
  load: function(url, callback, errback) {
    fs.readFile(url, 'utf8', function(err, data) {
      if (err) {
        err.message = err.message.replace('ENOENT, open', 'File not found');
        errback(err);
      } else {
        callback(stripShebang(data));
      }
    });

    // Returns an abort function.
    return function() {
      callback = function() {};
    };
  }
};

module.exports = nodeLoader;
