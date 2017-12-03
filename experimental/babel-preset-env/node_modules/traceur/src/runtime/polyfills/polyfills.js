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

import {polyfillAll} from './utils.js'

// The Makefile lists the polyfills to include.
polyfillAll(Reflect.global);

// Override setupGlobals so that we can add our polyfills.
var setupGlobals = $traceurRuntime.setupGlobals;
$traceurRuntime.setupGlobals = function(global) {
  setupGlobals(global);
  polyfillAll(global);
};
