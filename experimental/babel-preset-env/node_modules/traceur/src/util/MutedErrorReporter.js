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

import {ErrorReporter} from './ErrorReporter.js';

/**
 * An error reporter that doesn't output errors; it just records
 * whether an error occurred.
 *
 * <p>{@code MutedErrorReporter} instances are used by the parser to
 * observe whether speculative parses fail before committing to
 * parsing them.
 */
export class MutedErrorReporter extends ErrorReporter {
  reportMessageInternal(location, format, args) {
    // message.dropOn(floor);
  }
}
