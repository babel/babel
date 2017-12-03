// Copyright 2012 Traceur Authors.
//
// Licensed under the Apache License, Version 2.0 (the 'License');
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an 'AS IS' BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import {ParseTreeWriter} from './ParseTreeWriter.js';
import {StringSet} from '../util/StringSet.js';

/**
 * Converts a ParseTree to text and a source Map.
 */
export class ParseTreeMapWriter extends ParseTreeWriter {
  /**
   * @param {SourceMapGenerator} sourceMapConfiguration
   * @param {Object} options for ParseTreeWriter
   */
  constructor(sourceMapConfiguration, options = undefined) {
    super(options);
    this.sourceMapGenerator_ = sourceMapConfiguration.sourceMapGenerator;
    this.lowResolution_ = sourceMapConfiguration.lowResolution;
    this.basepath_ = sourceMapConfiguration.basepath;
    this.outputLineCount_ = 1;
    this.isFirstMapping_ = true;
    this.sourcesInMap_ = new StringSet();
    this.relativeSourceName_ = '';
    this.generated_ = null;
    this.original_ = null;
    this.previousMapping_ = null;
  }

  //
  // We get control when we enter and exit an AST branch and when
  // we write tokens. eg:
  // if {
  //  stmt;
  // }
  // enter write-if write-open newline
  //   enter write-stmt exit newline
  // write-close exit newline
  // We want at least one source map record for every output line.
  // Each record covers characters from the line/col to the next record.
  // Debuggers tend to be line-oriented. Thus we want the first record on
  // each line to start at the first column so no record spans lines.

  visitAny(tree) {
    if (tree === null) {
      return;
    }

    if (tree.location !== null)
      this.enterBranch(tree.location);

    super.visitAny(tree);

    if (tree.location !== null)
      this.exitBranch(tree.location);
  }

  writeCurrentln_() {
    super.writeCurrentln_();
    this.flushMappings();
    this.outputLineCount_++;
    // Every time we write an output line, then next mapping will start
    // on column 1.
    this.generated_ = {
      line: this.outputLineCount_,  // lines are one based.
      column: 0 // columns are zero based.
    };
    this.flushMappings();
  }

  write_(value) {
    this.generate();
    super.write_(value);
    this.generate();
  }

  generate() {
    let length = this.currentLine_.length
    let column = length ? length - 1 : 0;
    this.generated_ = {
      line: this.outputLineCount_,
      column: column
    };
    this.flushMappings();
  }

  enterBranch(location) {
    let {line, column, source} = location.start;
    this.originate(line, column, source);
  }

  exitBranch(location) {
    let {line, column, source} = location.end;
    this.originate(line, column ? column - 1 : 0, source);
  }

  /**
  * Set the original coordinates for the generated position.
  * @param {number} line
  * @param {number} column
  * @param {SourceFile} source
  */
  originate(line, column, source) {
    line++;  // source map lib uses one-based lines.
    // Try to get a mapping for every input line.
    if (this.original_ && this.original_.line !== line)
      this.flushMappings();
    // The first mapping on each output line must cover beginning columns.
    this.original_ = {line, column};
    let {name} = source;
    if (name && !this.sourcesInMap_.has(name)) {
      this.sourcesInMap_.add(name);
      this.relativeSourceName_ = relativePath(name, this.basepath_);
      this.sourceMapGenerator_.setSourceContent(this.relativeSourceName_,
          source.contents);
    }
    this.flushMappings();
  }

  flushMappings() {
    if (this.original_ && this.generated_) {
      this.addMapping();
      this.original_ = null;
      this.generated_ = null;
    }
  }

  isSame(lhs, rhs) {
    return lhs.line === rhs.line && lhs.column === rhs.column;
  }

  skipMapping() {
    if (!this.previousMapping_)
      return false;
    if (this.lowResolution_ &&
        this.previousMapping_.generated.line === this.generated_.line)
      return true;
    if (this.isSame(this.previousMapping_.generated, this.generated_) &&
        this.isSame(this.previousMapping_.original, this.original_))
      return true;
  }

  addMapping() {
    if (this.skipMapping())
      return;

    let mapping = {
      generated: this.generated_,
      original: this.original_,
      source: this.relativeSourceName_
    };
    this.sourceMapGenerator_.addMapping(mapping);
    this.previousMapping_ = mapping;
  }
}

export function relativePath(name, sourceRoot) {
  if (!name || name[0] === '@')  // @ means internal name
    return name;
  if (!sourceRoot)
    return name;

  let nameSegments = name.split('/');
  let rootSegments = sourceRoot.split('/');

  if (rootSegments[rootSegments.length - 1]) {
    // We can't patch this up because we can't know whether the caller sent
    // a file path or a directory w/o a slash by mistake
    throw new Error('rootPath must end in /');
  }
  let commonSegmentsLength = 0;
  let uniqueSegments = [];
  let foundUnique = false;
  nameSegments.forEach((segment, index)  => {
    if (!foundUnique && segment === rootSegments[index]) {
      commonSegmentsLength++;
      return;
    }
    foundUnique = true;
    uniqueSegments.push(segment);
  });

  if (commonSegmentsLength < 1 || commonSegmentsLength === rootSegments.length)
    return name;

  let dotDotSegments = rootSegments.length - commonSegmentsLength - 1;
  let segments = [];
  while (dotDotSegments--) {
    segments.push('..');
  }
  segments.push(...uniqueSegments);
  return segments.join('/');
}
