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

import {ErrorReporter} from '../util/ErrorReporter.js';

export class MultipleErrors extends Error {
  constructor(errors) {
    super();
    this.message = errors ? errors.join('\n') : '';
    this.name = 'MultipleErrors';
    // Access for alternative formatting.
    this.errors = errors;
  }
}

export class CollectingErrorReporter extends ErrorReporter {
  constructor() {
    super();
    this.errors = [];
  }
  reportMessageInternal(location, message) {
    this.errors.push(`${location.start}: ${message}`);
  }
  errorsAsString() {
    return this.toError().message;
  }
  toError() {
    return new MultipleErrors(this.errors);
  }
}
