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
 * A position in a source string - includes offset, line and column.
 */
export class SourcePosition {
  /**
   * @param {SourceFile} source
   * @param {number} offset
   */
  constructor(source, offset) {
    this.source = source;
    this.offset = offset;
    this.line_ = -1;
    this.column_ = -1;
  }

  get line() {
    if (this.line_ === -1)
      this.line_ = this.source.lineNumberTable.getLine(this.offset);
    return this.line_;
  }

  get column() {
    if (this.column_ === -1)
      this.column_ = this.source.lineNumberTable.getColumn(this.offset);
    return this.column_;
  }

  toString() {
    let name = this.source ? this.source.name : '';
    return `${name}:${this.line + 1}:${this.column + 1}`;
  }
}
