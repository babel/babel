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

/**
 * A range of positions in a source string.
 */
export class SourceRange {
  /**
   * @param {SourcePosition} start Start is inclusive.
   * @param {SourcePosition} end End is exclusive.
   */
  constructor(start, end) {
    this.start = start;
    this.end = end;
  }

  toString() {
    let str = this.start.source.contents;
    return str.slice(this.start.offset, this.end.offset);
  }
}
