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

import {SourcePosition} from '../util/SourcePosition.js';
import {SourceRange} from '../util/SourceRange.js';
import {isLineTerminator} from './Scanner.js';

// Largest int that can be distinguished
// assert(n + 1 === n)
// assert(n - 1 !== n)
const MAX_INT_REPRESENTATION = 9007199254740992;

function computeLineStartOffsets(source) {
  let lineStartOffsets = [0];
  let k = 1;
  for (let index = 0; index < source.length; index++) {
    let code = source.charCodeAt(index);
    if (isLineTerminator(code)) {
      if (code === 13 &&  // \r
          source.charCodeAt(index + 1) === 10) {  // \n
        index++;
      }
      lineStartOffsets[k++] = index + 1;
    }
  }
  lineStartOffsets[k++] = MAX_INT_REPRESENTATION;
  return lineStartOffsets;
}

/**
 * Maps offsets into a source string into line/column positions.
 *
 * Immutable.
 */
export class LineNumberTable {
  /**
   * @param {SourceFile} sourceFile
   */
  constructor(sourceFile) {
    this.sourceFile_ = sourceFile;
    this.lineStartOffsets_ = null;
    this.lastLine_ = 0;
    this.lastOffset_ = -1;
  }

  ensureLineStartOffsets_() {
    if (!this.lineStartOffsets_) {
      this.lineStartOffsets_ =
          computeLineStartOffsets(this.sourceFile_.contents);
    }
  }

  /**
   * @return {SourcePosition}
   */
  getSourcePosition(offset) {
    return new SourcePosition(this.sourceFile_, offset);
  }

  getLine(offset) {
    // It turns out that almost all calls to this function are done in an
    // incremental order, usually very close to the last offset. We therefore
    // just iterate from the last position.
    if (offset === this.lastOffset_)
      return this.lastLine_;

    this.ensureLineStartOffsets_();

    if (offset < 0)
      return 0;

    let line;
    if (offset < this.lastOffset_) {
      for (let i = this.lastLine_; i >= 0; i--) {
        if (this.lineStartOffsets_[i] <= offset) {
          line = i;
          break;
        }
      }
    } else {
      for (let i = this.lastLine_; true; i++) {
        if (this.lineStartOffsets_[i] > offset) {
          line = i - 1;
          break;
        }
      }
    }

    this.lastLine_ = line;
    this.lastOffset_ = offset;
    return line;
  }

  offsetOfLine(line) {
    this.ensureLineStartOffsets_();
    return this.lineStartOffsets_[line];
  }

  getColumn(offset) {
    let line = this.getLine(offset);
    return offset - this.lineStartOffsets_[line];
  }

  /** @return {SourceRange} */
  getSourceRange(startOffset, endOffset) {
    return new SourceRange(this.getSourcePosition(startOffset),
                           this.getSourcePosition(endOffset));
  }
}
