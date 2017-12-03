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

export var webLoader = {
  /**
   * @return {Function} A function that aborts the async loading.
   */
  load(url, callback, errback) {
    var xhr = new XMLHttpRequest();
    xhr.onload = () => {
      if (xhr.status == 200 || xhr.status == 0) {
        callback(xhr.responseText);
      } else {
        var err;
        if (xhr.status === 404)
          err = 'File not found \'' + url + '\'';
        else
          err = xhr.status + xhr.statusText;
        errback(err);
      }
      xhr = null;
    };
    xhr.onerror = (err) => {
      errback(err);
    };
    xhr.open('GET', url, true);
    xhr.send();
    return () => {
      xhr && xhr.abort();
    };
  }
};
