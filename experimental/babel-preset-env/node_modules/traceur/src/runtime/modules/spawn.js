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

export default function spawn(self, args, gen) {
  return new Promise((resolve, reject) => {
    function fulfill(v) {
      try {
        step(gen.next(v));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(v) {
      try {
        step(gen.throw(v));
      } catch (e) {
        reject(e);
      }
    }

    function step(res) {
      if (res.done) {
        resolve(res.value);
      } else {
        Promise.resolve(res.value).then(fulfill, rejected);
      }
    }

    step((gen = gen.apply(self, args)).next());
  });
}
