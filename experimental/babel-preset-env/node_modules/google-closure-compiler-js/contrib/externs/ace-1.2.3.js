/*
 * Copyright 2016 The Closure Compiler Authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Externs for Ace Editor API v. 1.2.3.
 * @see https://ace.c9.io/#nav=api
 * @externs
 */

/**
 * The main class required to set up an Ace instance in the browser.
 * @const
 * @see https://ace.c9.io/#nav=api&api=ace
 */
var ace;

/**
 * Creates a new EditSession, and returns the associated Document.
 * @param {(!ace.Document|string)} text
 * @param {?} mode // TODO: define !ace.Mode.
 * @return {!ace.Document}
 */
ace.createEditSession = function(text, mode) {};

/**
 * Embeds the Ace editor into the DOM, at the element provided by el.
 * @param {(string|!Element)} el
 * @return {!ace.Editor}
 */
ace.edit = function(el) {};

/**
 * Provides access to require in packed noconflict mode.
 * @param {string} moduleName
 * @return {!Object}
 */
ace.require = function(moduleName) {};

/**
 * Creates a new Anchor and associates it with a document.
 * @constructor
 * @param {!ace.Document} doc
 * @param {number} row
 * @param {number} column
 * @see https://ace.c9.io/#nav=api&api=anchor
 */
ace.Anchor = function(doc, row, column) {};

/**
 * Fires whenever the anchor position changes.
 * @param {string} event
 * @param {function(!Object)} fn
 */
ace.Anchor.prototype.on = function(event, fn) {};

/**
 * When called, the 'change' event listener is removed.
 */
ace.Anchor.prototype.detach = function() {};

/**
 * Returns the current document.
 * @return {!ace.Document}
 */
ace.Anchor.prototype.getDocument = function() {};

/**
 * Returns an object identifying the row and column position of the current
 * anchor.
 * @return {!Object}
 */
ace.Anchor.prototype.getPosition = function() {};

/** Undocumented */
ace.Anchor.prototype.onChange = function() {};

/**
 * Sets the anchor position to the specified row and column. If noClip is true,
 * the position is not clipped.
 * @param {number} row
 * @param {number} column
 * @param {boolean} noClip
 */
ace.Anchor.prototype.setPosition = function(row, column, noClip) {};

/**
 * Creates a new BackgroundTokenizer object.
 * @constructor
 * @param {!ace.Tokenizer} tokenizer
 * @param {!ace.Editor} editor
 * @see https://ace.c9.io/#nav=api&api=background_tokenizer
 */
ace.BackgroundTokenizer = function(tokenizer, editor) {};

/**
 * @param {string} event
 * @param {function(!Object)} fn
 */
ace.BackgroundTokenizer.prototype.on = function(event, fn) {};

/**
 * Emits the 'update' event. firstRow and lastRow are used to define the
 * boundaries of the region to be updated.
 * @param {number} firstRow
 * @param {number} lastRow
 */
ace.BackgroundTokenizer.prototype.fireUpdateEvent = function(firstRow, lastRow) {};

/**
 * Returns the state of tokenization at the end of a row.
 * @param {number} row
 * @return {!Object}
 */
ace.BackgroundTokenizer.prototype.getState = function(row) {};

/**
 * Gives list of tokens of the row (tokens are cached).
 * @param {number} row
 */
ace.BackgroundTokenizer.prototype.getTokens = function(row) {};

/**
 * Sets a new document to associate with this object.
 * @param {!ace.Document} doc
 */
ace.BackgroundTokenizer.prototype.setDocument = function(doc) {};

/**
 * Sets a new tokenizer for this object.
 * @param {!ace.Tokenizer} tokenizer
 */
ace.BackgroundTokenizer.prototype.setTokenizer = function(tokenizer) {};

/**
 * Starts tokenizing at the row indicated.
 * @param {number} startRow
 */
ace.BackgroundTokenizer.prototype.start = function(startRow) {};

/**
 * Stops tokenizing.
 */
ace.BackgroundTokenizer.prototype.stop = function() {};

/**
 * Creates a new Document. If text is included, the Document contains those
 * strings; otherwise, it's empty.
 * @constructor
 * @param {(string|!Array<string>)} text
 * @see https://ace.c9.io/#nav=api&api=document
 */
ace.Document = function(text) {};

/**
 * Fires whenever the document changes.
 * @param {string} event
 * @param {function(!Object)} fn
 */
ace.Document.prototype.on = function(event, fn) {};

/**
 * Applies all the changes previously accumulated.
 * These can be either 'includeText', 'insertLines', 'removeText', and
 * 'removeLines'.
 * @param {!Object} deltas
 */
ace.Document.prototype.applyDeltas = function(deltas) {};

/**
 * Creates a new Anchor to define a floating point in the document.
 * @param {number} row
 * @param {number} column
 */
ace.Document.prototype.createAnchor = function(row, column) {};

/**
 * Returns all lines in the document as string array.
 * @return {!Array<string>}
 */
ace.Document.prototype.getAllLines = function() {};

/**
 * Returns the number of rows in the document.
 * @return {number}
 */
ace.Document.prototype.getLength = function() {};

/**
 * Returns a verbatim copy of the given line as it is in the document
 * @param {number} row
 * @return {!Object}
 */
ace.Document.prototype.getLine = function(row) {};

/**
 * Returns an array of strings of the rows between firstRow and lastRow. This
 * function is inclusive of lastRow.
 * @param {number} firstRow
 * @param {number} lastRow
 * @return {!Array<string>}
 */
ace.Document.prototype.getLines = function(firstRow, lastRow) {};

/**
 * Returns the newline character that's being used, depending on the value of
 * newLineMode.
 * @return {string}
 */
ace.Document.prototype.getNewLineCharacter = function() {};

/**
 * Returns the type of newlines being used; either windows, unix, or auto.
 * @return {string}
 */
ace.Document.prototype.getNewLineMode = function() {};

/**
 * Given a range within the document, this function returns all the text within
 * that range as a single string.
 * @param {!ace.Range} range
 * @return {string}
 */
ace.Document.prototype.getTextRange = function(range) {};

/**
 * Returns all the lines in the document as a single string, split by the new
 * line character.
 * @return {string}
 */
ace.Document.prototype.getValue = function() {};

/**
 * Converts an index position in a document to a {row, column} object.
 * @param {number} index
 * @param {number} startRow
 * @return {{row: number, column: number}}
 */
ace.Document.prototype.indexToPosition = function(index, startRow) {};

/**
 * Inserts a block of text and the indicated position.
 * @param {!Object} position
 * @param {string} text
 * @return {!Object}
 */
ace.Document.prototype.insert = function(position, text) {};

/**
 * Inserts text into the position at the current row. This method also triggers
 * the 'change' event.
 * @param {!Object} position
 * @param {string} text
 * @return {!Object}
 */
ace.Document.prototype.insertInLine = function(position, text) {};

/**
 * Inserts the elements in lines into the document, starting at the row index
 * given by row.
 * This method also triggers the 'change' event.
 * @param {number} row
 * @param {!Array<number>} lines
 * @return {!Object}
 */
ace.Document.prototype.insertLines = function(row, lines) {};

/**
 * Inserts a new line into the document at the current row's position.
 * This method also triggers the 'change' event.
 * @param {!Object} position
 * @return {!Object}
 */
ace.Document.prototype.insertNewLine = function(position) {};

/**
 * Returns true if text is a newline character (either \r\n, \r, or \n).
 * @param {string} text
 * @return {boolean}
 */
ace.Document.prototype.isNewLine = function(text) {};

/**
 * Converts the {row, column} position in a document to the character's index.
 * @param {{row: number, column: number}} pos
 * @param {number} startRow
 * @return {number}
 */
ace.Document.prototype.positionToIndex = function(pos, startRow) {};

/**
 * Removes the range from the document.
 * @param {!ace.Range} range
 * @return {!Object}
 */
ace.Document.prototype.remove = function(range) {};

/**
 * Removes the specified columns from the row. This method also triggers the
 * 'change' event.
 * @param {number} row
 * @param {number} startColumn
 * @param {number} endColumn
 * @return {!Object}
 */
ace.Document.prototype.removeInLine = function(row, startColumn, endColumn) {};

/**
 * Removes a range of full lines. This method also triggers the 'change' event.
 * @param {number} firstRow
 * @param {number} lastRow
 * @return {string}
 */
ace.Document.prototype.removeLines = function(firstRow, lastRow) {};

/**
 * Removes the new line between row and the row immediately following it.
 * This method also triggers the 'change' event.
 * @param {number} row
 */
ace.Document.prototype.removeNewLine = function(row) {};

/**
 * Replaces a range in the document with the new text.
 * @param {!ace.Range} range
 * @param {string} text
 * @return {!Object}
 */
ace.Document.prototype.replace = function(range, text) {};

/**
 * Reverts any changes previously applied.
 * These can be either 'includeText', 'insertLines', 'removeText', and
 * 'removeLines'.
 * @param {!Object} deltas
 */
ace.Document.prototype.revertDeltas = function(deltas) {};

/**
 * Sets the new line mode.
 * @param {string} newLineMode
 */
ace.Document.prototype.setNewLineMode = function(newLineMode) {};

/**
 * Replaces all the lines in the current Document with the value of text.
 * @param {string} text
 */
ace.Document.prototype.setValue = function(text) {};

/**
 * Stores all the data about Editor state providing easy way to change editor's
 * state.
 * @constructor
 * @param {(!ace.Document|string)} text
 * @param {?} mode
 * @see https://ace.c9.io/#nav=api&api=edit_session
 */
ace.EditSession = function(text, mode) {};

/**
 * Adds a dynamic marker to the session.
 * @param {!Object} marker
 * @param {boolean} inFront
 * @return {!Object}
 */
ace.EditSession.prototype.addDynamicMarker = function(marker, inFront) {};

/**
 * Adds className to the row, to be used for CSS stylings and whatnot.
 * @param {number} row
 * @param {string} className
 */
ace.EditSession.prototype.addGutterDecoration = function(row, className) {};

/**
 * Adds a new marker to the given Range. If inFront is true, a front marker is
 * defined, and the 'changeFrontMarker' event fires; otherwise, the
 * 'changeBackMarker' event fires.
 * @param {!ace.Range} range
 * @param {string} clazz
 * @param {!Function|string} type
 * @param {boolean} inFront
 * @return {number}
 */
ace.EditSession.prototype.addMarker = function(range, clazz, type, inFront) {};

/**
 * Clears all the annotations for this session. This function also triggers the
 * 'changeAnnotation' event.
 */
ace.EditSession.prototype.clearAnnotations = function() {};

/**
 * Removes a breakpoint on the row number given by rows. This function also
 * emits the 'changeBreakpoint' event.
 * @param {number} row
 */
ace.EditSession.prototype.clearBreakpoint = function(row) {};

/**
 * Removes all breakpoints on the rows. This function also emits the
 * 'changeBreakpoint' event.
 */
ace.EditSession.prototype.clearBreakpoints = function() {};

/**
 * For the given document row and column, returns the screen column.
 * @param {number} row
 * @param {number} docColumn
 * @return {number}
 */
ace.EditSession.prototype.documentToScreenColumn = function(row, docColumn) {};

/**
 * Converts document coordinates to screen coordinates.
 * This takes into account code folding, word wrap, tab size, and any other
 * visual modifications.
 * @param {number} docRow
 * @param {number} docColumn
 * @return {!Object}
 */
ace.EditSession.prototype.documentToScreenPosition = function(docRow, docColumn) {};

/**
 * For the given document row and column, returns the screen row.
 * @param {number} docRow
 * @param {number} docColumn
 * @return {number}
 */
ace.EditSession.prototype.documentToScreenRow = function(docRow, docColumn) {};

/**
 * Duplicates all the text between firstRow and lastRow.
 * @param {number} firstRow
 * @param {number} lastRow
 * @return {number}
 */
ace.EditSession.prototype.duplicateLines = function(firstRow, lastRow) {};

/**
 * Returns the annotations for the EditSession.
 * @return {!Object}
 */
ace.EditSession.prototype.getAnnotations = function() {};

/**
 * Gets the range of a word, including its right whitespace.
 * @param {number} row
 * @param {number} column
 * @return {!ace.Range}
 */
ace.EditSession.prototype.getAWordRange = function(row, column) {};

/**
 * Returns an array of numbers, indicating which rows have breakpoints.
 * @return {number}
 */
ace.EditSession.prototype.getBreakpoints = function() {};

/**
 * Returns the Document associated with this session.
 * @return {!ace.Document}
 */
ace.EditSession.prototype.getDocument = function() {};

/**
 * For the given document row and column, this returns the column position of
 * the last screen row.
 * @param {number} docRow
 * @param {number} docColumn
 * @return {number}
 */
ace.EditSession.prototype.getDocumentLastRowColumn = function(docRow, docColumn) {};

/**
 * For the given document row and column, this returns the document position of
 * the last row.
 * @param {number} docRow
 * @param {number} docColumn
 * @return {!Object}
 */
ace.EditSession.prototype.getDocumentLastRowColumnPosition = function(docRow, docColumn) {};

/**
 * Returns the number of rows in the document.
 * @return {number}
 */
ace.EditSession.prototype.getLength = function() {};

/**
 * Returns a verbatim copy of the given line as it is in the document
 * @param {number} row
 * @return {string}
 */
ace.EditSession.prototype.getLine = function(row) {};

/**
 * Returns an array of strings of the rows between firstRow and lastRow.
 * This function is inclusive of lastRow.
 * @param {number} firstRow
 * @param {number} lastRow
 * @return {string}
 */
ace.EditSession.prototype.getLines = function(firstRow, lastRow) {};

/**
 * Returns an array containing the IDs of all the markers, either front or back.
 * @param {boolean} inFront
 * @return {!Array<string>}
 */
ace.EditSession.prototype.getMarkers = function(inFront) {};

/**
 * Returns the current text mode.
 * @return {!Object}
 */
ace.EditSession.prototype.getMode = function() {};

/**
 * Returns the current new line mode.
 * @return {string}
 */
ace.EditSession.prototype.getNewLineMode = function() {};

/**
 * Returns true if overwrites are enabled; false otherwise.
 * @return {boolean}
 */
ace.EditSession.prototype.getOverwrite = function() {};

/**
 * Returns number of screenrows in a wrapped line.
 * @param {number} row
 * @return {number}
 */
ace.EditSession.prototype.getRowLength = function(row) {};

/**
 * For the given row, this returns the split data.
 * @param {!Object} row
 * @return {string}
 */
ace.EditSession.prototype.getRowSplitData = function(row) {};

/**
 * Returns the position (on screen) for the last character in the provided
 * screen row.
 * @param {number} screenRow
 * @return {number}
 */
ace.EditSession.prototype.getScreenLastRowColumn = function(screenRow) {};

/**
 * Returns the length of the screen.
 * @return {number}
 */
ace.EditSession.prototype.getScreenLength = function() {};

/**
 * The distance to the next tab stop at the specified screen column.
 * @param {number} screenColumn
 * @return {number}
 */
ace.EditSession.prototype.getScreenTabSize = function(screenColumn) {};

/**
 * Returns the width of the screen.
 * @return {number}
 */
ace.EditSession.prototype.getScreenWidth = function() {};

/**
 * Returns the value of the distance between the left of the editor and the
 * leftmost part of the visible content.
 * @return {number}
 */
ace.EditSession.prototype.getScrollLeft = function() {};

/**
 * Returns the value of the distance between the top of the editor and the
 * topmost part of the visible content.
 * @return {number}
 */
ace.EditSession.prototype.getScrollTop = function() {};

/**
 * Returns selection object.
 * @return {!Object}
 */
ace.EditSession.prototype.getSelection = function() {};

/**
 * Returns the state of tokenization at the end of a row.
 * @param {number} row
 * @return {!Object}
 */
ace.EditSession.prototype.getState = function(row) {};

/**
 * Returns the current tab size.
 * @return {number}
 */
ace.EditSession.prototype.getTabSize = function() {};

/**
 * Returns the current value for tabs. If the user is using soft tabs, this
 * will be a series of spaces (defined by getTabSize()); otherwise it's simply
 * '\t'.
 * @return {string}
 */
ace.EditSession.prototype.getTabString = function() {};

/**
 * Given a range within the document, this function returns all the text
 * within that range as a single string.
 * @param {!ace.Range} range
 * @return {string}
 */
ace.EditSession.prototype.getTextRange = function(range) {};

/**
 * Returns an object indicating the token at the current row. The object has
 * two properties: index and start.
 * @param {number} row
 * @param {number} column
 * @return {!Object}
 */
ace.EditSession.prototype.getTokenAt = function(row, column) {};

/**
 * Starts tokenizing at the row indicated. Returns a list of objects of the
 * tokenized rows.
 * @param {number} row
 * @return {!Array<!Object>} row
 */
ace.EditSession.prototype.getTokens = function(row) {};

/**
 * Returns the current undo manager.
 * @return {!ace.UndoManager}
 */
ace.EditSession.prototype.getUndoManager = function() {};

/**
 * Returns true if soft tabs are being used, false otherwise.
 * @return {boolean}
 */
ace.EditSession.prototype.getUseSoftTabs = function() {};

/**
 * Returns true if workers are being used.
 * @return {boolean}
 */
ace.EditSession.prototype.getUseWorker = function() {};

/**
 * Returns true if wrap mode is being used; false otherwise.
 * @return {boolean}
 */
ace.EditSession.prototype.getUseWrapMode = function() {};

/**
 * Returns the current Document as a string.
 * @return {string}
 */
ace.EditSession.prototype.getValue = function() {};

/**
 * Given a starting row and column, this method returns the Range of the first
 * word boundary it finds.
 * @param {number} row
 * @param {number} column
 * @return {!ace.Range}
 */
ace.EditSession.prototype.getWordRange = function(row, column) {};

/**
 * Returns the value of wrap limit.
 * @return {number}
 */
ace.EditSession.prototype.getWrapLimit = function() {};

/**
 * Returns an object that defines the minimum and maximum of the wrap limit.
 * @return {!Object}
 */
ace.EditSession.prototype.getWrapLimitRange = function() {};

/** Undocumented */
ace.EditSession.prototype.highlight = function() {};

/** Undocumented */
ace.EditSession.prototype.highlightLines = function() {};

/**
 * Indents all the rows, from startRow to endRow (inclusive), by prefixing each
 * row with the token in indentString.
 * @param {number} startRow
 * @param {number} endRow
 * @param {string} indentString
 */
ace.EditSession.prototype.indentRows = function(startRow, endRow, indentString) {};

/**
 * Inserts a block of text and the indicated position.
 * @param {!Object} position
 * @param {string} text
 * @return {!Object}
 */
ace.EditSession.prototype.insert = function(position, text) {};

/**
 * Returns true if the character at the position is a soft tab.
 * @param {!Object} position
 * @return {boolean}
 */
ace.EditSession.prototype.isTabStop = function(position) {};

/**
 * Shifts all the lines in the document down one, starting from firstRow and
 * ending at lastRow.
 * @param {number} firstRow
 * @param {number} lastRow
 * @return {number}
 */
ace.EditSession.prototype.moveLinesDown = function(firstRow, lastRow) {};

/**
 * Shifts all the lines in the document up one, starting from firstRow and
 * ending at lastRow.
 * @param {number} firstRow
 * @param {number} lastRow
 * @return {number}
 */
ace.EditSession.prototype.moveLinesUp = function(firstRow, lastRow) {};

/**
 * Moves a range of text from the given range to the given position.toPosition
 * is an object that looks like this:
 * { row: newRowLocation, column: newColumnLocation }
 * @param {!ace.Range} fromRange
 * @param {{row: number, column: number}} toPosition
 * @return {!ace.Range}
 */
ace.EditSession.prototype.moveText = function(fromRange, toPosition) {};

/**
 * @param {string} event
 * @param {function((Object|number|null))} fn
 */
ace.EditSession.prototype.on = function(event, fn) {};

/** Undocumented */
ace.EditSession.prototype.onChange = function() {};

/** Undocumented */
ace.EditSession.prototype.onChangeFold = function() {};

/**
 * Reloads all the tokens on the current session. This function calls
 * BackgroundTokenizer.start() to all the rows;
 * it also emits the 'tokenizerUpdate' event.
 * @param {!Object} e
 */
ace.EditSession.prototype.onReloadTokenizer = function(e) {};

/**
 * Outdents all the rows defined by the start and end properties of range.
 * @param {!ace.Range} range
 */
ace.EditSession.prototype.outdentRows = function(range) {};

/** Undocumented */
ace.EditSession.prototype.redo = function() {};

/**
 * Re-implements a previously undone change to your document.
 * @param {!Array<!Object>} deltas
 * @param {boolean} dontSelect
 * @return {!ace.Range}
 */
ace.EditSession.prototype.redoChanges = function(deltas, dontSelect) {};

/**
 * Removes the range from the document.
 * @param {!ace.Range} range
 * @return {!Object}
 */
ace.EditSession.prototype.remove = function(range) {};

/**
 * Removes className from the row.
 * @param {number} row
 * @param {string} className
 */
ace.EditSession.prototype.removeGutterDecoration = function(row, className) {};

/**
 * Removes the marker with the specified ID. If this marker was in front, the
 * 'changeFrontMarker' event is emitted.
 * If the marker was in the back, the 'changeBackMarker' event is emitted.
 * @param {number} markerId
 */
ace.EditSession.prototype.removeMarker = function(markerId) {};

/**
 * Replaces a range in the document with the new text.
 * @param {!ace.Range} range
 * @param {string} text
 * @return {!Object}
 */
ace.EditSession.prototype.replace = function(range, text) {};

/** Undocumented */
ace.EditSession.prototype.reset = function() {};

/** Undocumented */
ace.EditSession.prototype.resetCaches = function() {};

/** Undocumented */
ace.EditSession.prototype.screenToDocumentColumn = function() {};

/**
 * Converts characters coordinates on the screen to characters coordinates
 * within the document. This takes into account code folding, word wrap, tab
 * size, and any other visual modifications.
 * @param {number} screenRow
 * @param {number} screenColumn
 * @return {!Object}
 */
ace.EditSession.prototype.screenToDocumentPosition = function(screenRow, screenColumn) {};

/** Undocumented */
ace.EditSession.prototype.screenToDocumentRow = function() {};

/**
 * Sets annotations for the EditSession. This functions emits the
 * 'changeAnnotation' event.
 * @param {!Array<!Object>} annotations
 */
ace.EditSession.prototype.setAnnotations = function(annotations) {};

/**
 * Sets a breakpoint on the row number given by rows. This function also emits
 * the 'changeBreakpoint' event.
 * @param {number} row
 * @param {string} className
 */
ace.EditSession.prototype.setBreakpoint = function(row, className) {};

/**
 * Sets a breakpoint on every row number given by rows. This function also
 * emits the 'changeBreakpoint' event.
 * @param {!Array<number>} rows
 */
ace.EditSession.prototype.setBreakpoints = function(rows) {};

/**
 * Sets the EditSession to point to a new Document. If a BackgroundTokenizer
 * exists, it also points to doc.
 * @param {!ace.Document} doc
 */
ace.EditSession.prototype.setDocument = function(doc) {};

/** Undocumented */
ace.EditSession.prototype.setMode = function() {};

/**
 * Sets the new line mode.
 * @param {string} newLineMode
 */
ace.EditSession.prototype.setNewLineMode = function(newLineMode) {};

/**
 * Pass in true to enable overwrites in your session, or false to disable.
 * @param {boolean} overwrite
 */
ace.EditSession.prototype.setOverwrite = function(overwrite) {};

/**
 * Sets the value of the distance between the left of the editor and the
 * leftmost part of the visible content.
 * @param {!Object} scrollLeft
 */
ace.EditSession.prototype.setScrollLeft = function(scrollLeft) {};

/**
 * This function sets the scroll top value. It also emits the 'changeScrollTop'
 * event.
 * @param {number} scrollTop
 */
ace.EditSession.prototype.setScrollTop = function(scrollTop) {};

/**
 * @param {boolean} margin
 */
ace.EditSession.prototype.setShowPrintMargin = function(margin) {};

/**
 * Set the number of spaces that define a soft tab; for example, passing in
 * 4 transforms the soft tabs to be equivalent to four spaces. This function
 * also emits the changeTabSize event.
 * @param {number} tabSize
 */
ace.EditSession.prototype.setTabSize = function(tabSize) {};

/**
 * Sets the undo manager.
 * @param {!ace.UndoManager} undoManager
 */
ace.EditSession.prototype.setUndoManager = function(undoManager) {};

/**
 * Enables or disables highlighting of the range where an undo occured.
 * @param {boolean} enable
 */
ace.EditSession.prototype.setUndoSelect = function(enable) {};

/**
 * Pass true to enable the use of soft tabs. Soft tabs means you're using
 * spaces instead of the tab character ('\t').
 * @param {boolean} useSoftTabs
 */
ace.EditSession.prototype.setUseSoftTabs = function(useSoftTabs) {};

/**
 * Identifies if you want to use a worker for the EditSession.
 * @param {boolean} useWorker
 */
ace.EditSession.prototype.setUseWorker = function(useWorker) {};

/**
 * Sets whether or not line wrapping is enabled. If useWrapMode is different
 * than the current value, the 'changeWrapMode' event is emitted.
 * @param {boolean} useWrapMode
 */
ace.EditSession.prototype.setUseWrapMode = function(useWrapMode) {};

/**
 * Sets the session text.
 * @param {string} text
 */
ace.EditSession.prototype.setValue = function(text) {};

/**
 * Sets the boundaries of wrap. Either value can be null to have an
 * unconstrained wrap, or, they can be the same number to pin the limit. If the
 * wrap limits for min or max are different, this method also emits the
 * 'changeWrapMode' event.
 * @param {?number} min
 * @param {?number} max
 */
ace.EditSession.prototype.setWrapLimitRange = function(min, max) {};

/**
 * Sets the value of overwrite to the opposite of whatever it currently is.
 */
ace.EditSession.prototype.toggleOverwrite = function() {};

/**
 * Returns the current Document as a string.
 * @override
 */
ace.EditSession.prototype.toString = function() {};

/** Undocumented */
ace.EditSession.prototype.undo = function() {};

/**
 * Reverts previous changes to your document.
 * @param {!Array<!Object>} deltas
 * @param {boolean} dontSelect
 * @return {!Object}
 */
ace.EditSession.prototype.undoChanges = function(deltas, dontSelect) {};

/**
 * Creates a new Editor object.
 * @constructor
 * @param {!ace.VirtualRenderer} renderer
 * @param {!ace.EditSession} session
 * @see https://ace.c9.io/#nav=api&api=editor
 */
ace.Editor = function(renderer, session) {};

/**
 * @param {string} event
 * @param {function((Object|string|null))} fn
 */
ace.Editor.prototype.on = function(event, fn) {};

/**
 * Adds the selection and cursor.
 * @param {!ace.Range} orientedRange
 * @return {!ace.Range}
 */
ace.Editor.prototype.addSelectionMarker = function(orientedRange) {};

/**
 * Aligns the cursors or selected text.
 */
ace.Editor.prototype.alignCursors = function() {};

/**
 * Outdents the current line.
 */
ace.Editor.prototype.blockOutdent = function() {};

/**
 * Blurs the current textInput.
 */
ace.Editor.prototype.blur = function() {};

/**
 * Attempts to center the current selection on the screen.
 */
ace.Editor.prototype.centerSelection = function() {};

/**
 * Empties the selection (by de-selecting it). This function also emits the
 * 'changeSelection' event.
 */
ace.Editor.prototype.clearSelection = function() {};

/**
 * Copies all the selected lines down one row.
 * @return {number}
 */
ace.Editor.prototype.copyLinesDown = function() {};

/**
 * Copies all the selected lines up one row.
 * @return {number}
 */
ace.Editor.prototype.copyLinesUp = function() {};

/**
 * Cleans up the entire editor.
 */
ace.Editor.prototype.destroy = function() {};

/** Undocumented */
ace.Editor.prototype.duplicateSelection = function() {};

/** Undocumented */
ace.Editor.prototype.execCommand = function() {};

/**
 * Removes all the selections except the last added one.
 */
ace.Editor.prototype.exitMultiSelectMode = function() {};

/**
 * Attempts to find needle within the document. For more information on
 * options, see Search.
 * @param {string} needle
 * @param {!Object} options
 * @param {boolean} animate
 */
ace.Editor.prototype.find = function(needle, options, animate) {};

/**
 * Finds and selects all the occurences of needle.
 * @param {string} needle
 * @param {!Object} options
 * @param {boolean} keeps
 * @return {number}
 */
ace.Editor.prototype.findAll = function(needle, options, keeps) {};

/**
 * Performs another search for needle in the document. For more information on
 * options, see Search.
 * @param {!Object} options
 * @param {boolean} animate
 */
ace.Editor.prototype.findNext = function(options, animate) {};

/**
 * Performs a search for needle backwards. For more information on options, see
 * Search.
 * @param {!Object} options
 * @param {boolean} animate
 */
ace.Editor.prototype.findPrevious = function(options, animate) {};

/**
 * Brings the current textInput into focus.
 */
ace.Editor.prototype.focus = function() {};

/**
 * Executes a command for each selection range.
 * @param {string} cmd
 * @param {string} args
 */
ace.Editor.prototype.forEachSelection = function(cmd, args) {};

/** Undocumented */
ace.Editor.prototype.getAnimatedScroll = function() {};

/**
 * Returns true if the behaviors are currently enabled.
 * "Behaviors" in this case is the auto-pairing of special characters, like
 * quotation marks, parenthesis, or brackets.
 * @return {boolean}
 */
ace.Editor.prototype.getBehavioursEnabled = function() {};

/**
 * Returns the string of text currently highlighted.
 * @return {string}
 */
ace.Editor.prototype.getCopyText = function() {};

/**
 * Gets the current position of the cursor.
 * @return {!Object}
 */
ace.Editor.prototype.getCursorPosition = function() {};

/**
 * Returns the screen position of the cursor.
 * @return {number}
 */
ace.Editor.prototype.getCursorPositionScreen = function() {};

/** Undocumented */
ace.Editor.prototype.getDisplayIndentGuides = function() {};

/**
 * Returns the current mouse drag delay.
 * @return {number}
 */
ace.Editor.prototype.getDragDelay = function() {};

/** Undocumented */
ace.Editor.prototype.getFadeFoldWidgets = function() {};

/**
 * Returns the index of the first visible row.
 * @return {number}
 */
ace.Editor.prototype.getFirstVisibleRow = function() {};

/**
 * Returns true if current lines are always highlighted.
 * @return {boolean}
 */
ace.Editor.prototype.getHighlightActiveLine = function() {};

/** Undocumented */
ace.Editor.prototype.getHighlightGutterLine = function() {};

/**
 * Returns true if currently highlighted words are to be highlighted.
 * @return {boolean}
 */
ace.Editor.prototype.getHighlightSelectedWord = function() {};

/**
 * Returns the keyboard handler, such as "vim" or "windows".
 * @return {string}
 */
ace.Editor.prototype.getKeyboardHandler = function() {};

/**
 * Returns an object containing all the search options. For more information on
 * options, see Search.
 * @return {!Object}
 */
ace.Editor.prototype.getLastSearchOptions = function() {};

/**
 * Returns the index of the last visible row.
 * @return {number}
 */
ace.Editor.prototype.getLastVisibleRow = function() {};

/**
 * Works like EditSession.getTokenAt(), except it returns a number.
 * @param {!Object} row
 * @param {!Object} column
 * @return {number}
 */
ace.Editor.prototype.getNumberAt = function(row, column) {};

/**
 * Returns true if overwrites are enabled; false otherwise.
 * @return {boolean}
 */
ace.Editor.prototype.getOverwrite = function() {};

/**
 * Returns the column number of where the print margin is.
 * @return {number}
 */
ace.Editor.prototype.getPrintMarginColumn = function() {};

/**
 * Returns true if the editor is set to read-only mode.
 * @return {boolean}
 */
ace.Editor.prototype.getReadOnly = function() {};

/**
 * Returns the value indicating how fast the mouse scroll speed is (in
 * milliseconds).
 * @return {number}
 */
ace.Editor.prototype.getScrollSpeed = function() {};

/**
 * Returns selection object.
 * @return {!ace.Selection}
 */
ace.Editor.prototype.getSelection = function() {};

/**
 * Returns the Range for the selected text.
 * @return {!ace.Range}
 */
ace.Editor.prototype.getSelectionRange = function() {};

/**
 * Returns the current selection style.
 * @return {string}
 */
ace.Editor.prototype.getSelectionStyle = function() {};

/**
 * Returns the current session being used.
 * @return {!ace.EditSession}
 */
ace.Editor.prototype.getSession = function() {};

/**
 * Returns true if the fold widgets are shown.
 * @return {boolean}
 */
ace.Editor.prototype.getShowFoldWidgets = function() {};

/**
 * Returns true if invisible characters are being shown.
 * @return {boolean}
 */
ace.Editor.prototype.getShowInvisibles = function() {};

/**
 * Returns true if the print margin is being shown.
 * @return {boolean}
 */
ace.Editor.prototype.getShowPrintMargin = function() {};

/**
 * Returns the path of the current theme.
 * @return {string}
 */
ace.Editor.prototype.getTheme = function() {};

/**
 * Returns the current session's content.
 * @return {string}
 */
ace.Editor.prototype.getValue = function() {};

/**
 * Returns true if the wrapping behaviors are currently enabled.
 */
ace.Editor.prototype.getWrapBehavioursEnabled = function() {};

/**
 * Moves the cursor to the specified line number, and also into the indiciated
 * column.
 * @param {number} lineNumber
 * @param {number} column
 * @param {boolean} animate
 */
ace.Editor.prototype.gotoLine = function(lineNumber, column, animate) {};

/**
 * Shifts the document to wherever "page down" is, as well as moving the cursor
 * position.
 */
ace.Editor.prototype.gotoPageDown = function() {};

/**
 * Shifts the document to wherever "page up" is, as well as moving the cursor
 * position.
 */
ace.Editor.prototype.gotoPageUp = function() {};

/**
 * Indents the current line.
 */
ace.Editor.prototype.indent = function() {};

/**
 * Inserts text into wherever the cursor is pointing.
 * @param {string} text
 */
ace.Editor.prototype.insert = function(text) {};

/**
 * Returns true if the current textInput is in focus.
 * @return {boolean}
 */
ace.Editor.prototype.isFocused = function() {};

/**
 * Indicates if the entire row is currently visible on the screen.
 * @param {number} row
 * @return {boolean}
 */
ace.Editor.prototype.isRowFullyVisible = function(row) {};

/**
 * Indicates if the row is currently visible on the screen.
 * @param {number} row
 * @return {boolean}
 */
ace.Editor.prototype.isRowVisible = function(row) {};

/**
 * Moves the cursor's row and column to the next matching bracket.
 * @param {!Object} select
 */
ace.Editor.prototype.jumpToMatching = function(select) {};

/**
 * If the character before the cursor is a number, this functions changes its
 * value by amount.
 * @param {number} amount
 */
ace.Editor.prototype.modifyNumber = function(amount) {};

/**
 * Moves the cursor to the specified row and column. Note that this does not
 * de-select the current selection.
 * @param {number} row
 * @param {number} column
 */
ace.Editor.prototype.moveCursorTo = function(row, column) {};

/**
 * Moves the cursor to the position indicated by pos.row and pos.column.
 * @param {{row: number, column: number}} pos
 */
ace.Editor.prototype.moveCursorToPosition = function(pos) {};

/**
 * Shifts all the selected lines down one row.
 * @return {number}
 */
ace.Editor.prototype.moveLinesDown = function() {};

/**
 * Shifts all the selected lines up one row.
 * @return {number}
 */
ace.Editor.prototype.moveLinesUp = function() {};

/** Undocumented */
ace.Editor.prototype.moveText = function() {};

/**
 * Moves the cursor down in the document the specified number of times. Note
 * that this does de-select the current selection.
 * @param {number} times
 */
ace.Editor.prototype.navigateDown = function(times) {};

/**
 * Moves the cursor to the end of the current file. Note that this does
 * de-select the current selection.
 */
ace.Editor.prototype.navigateFileEnd = function() {};

/**
 * Moves the cursor to the start of the current file. Note that this does
 * de-select the current selection.
 */
ace.Editor.prototype.navigateFileStart = function() {};

/**
 * Moves the cursor left in the document the specified number of times. Note
 * that this does de-select the current selection.
 * @param {number} times
 */
ace.Editor.prototype.navigateLeft = function(times) {};

/**
 * Moves the cursor to the end of the current line. Note that this does
 * de-select the current selection.
 */
ace.Editor.prototype.navigateLineEnd = function() {};

/**
 * Moves the cursor to the start of the current line. Note that this does
 * de-select the current selection.
 */
ace.Editor.prototype.navigateLineStart = function() {};

/**
 * Moves the cursor right in the document the specified number of times. Note
 * that this does de-select the current selection.
 * @param {number} times
 */
ace.Editor.prototype.navigateRight = function(times) {};

/**
 * Moves the cursor to the specified row and column. Note that this does
 * de-select the current selection.
 * @param {number} row
 * @param {number} column
 */
ace.Editor.prototype.navigateTo = function(row, column) {};

/**
 * Moves the cursor up in the document the specified number of times. Note that
 * this does de-select the current selection.
 * @param {number} times
 */
ace.Editor.prototype.navigateUp = function(times) {};

/**
 * Moves the cursor to the word immediately to the left of the current
 * position. Note that this does de-select the current selection.
 */
ace.Editor.prototype.navigateWordLeft = function() {};

/**
 * Moves the cursor to the word immediately to the right of the current
 * position. Note that this does de-select the current selection.
 */
/** Undocumented */
ace.Editor.prototype.navigateWordRight = function() {};

/** Undocumented */
ace.Editor.prototype.onBlur = function() {};

/** Undocumented */
ace.Editor.prototype.onChangeAnnotation = function() {};

/** Undocumented */
ace.Editor.prototype.onChangeBackMarker = function() {};

/** Undocumented */
ace.Editor.prototype.onChangeBreakpoint = function() {};

/** Undocumented */
ace.Editor.prototype.onChangeFold = function() {};

/** Undocumented */
ace.Editor.prototype.onChangeFrontMarker = function() {};

/** Undocumented */
ace.Editor.prototype.onChangeMode = function() {};

/** Undocumented */
ace.Editor.prototype.onChangeWrapLimit = function() {};

/** Undocumented */
ace.Editor.prototype.onChangeWrapMode = function() {};

/** Undocumented */
ace.Editor.prototype.onCommandKey = function() {};

/** Undocumented */
ace.Editor.prototype.onCompositionEnd = function() {};

/** Undocumented */
ace.Editor.prototype.onCompositionStart = function() {};

/** Undocumented */
ace.Editor.prototype.onCompositionUpdate = function() {};

/**
 * Called whenever a text "copy" happens.
 */
ace.Editor.prototype.onCopy = function() {};

/**
 * Emitted when the selection changes.
 */
ace.Editor.prototype.onCursorChange = function() {};

/**
 * Called whenever a text "cut" happens.
 */
ace.Editor.prototype.onCut = function() {};

/** Undocumented */
ace.Editor.prototype.onDocumentChange = function() {};

/** Undocumented */
ace.Editor.prototype.onFocus = function() {};

/**
 * Called whenever a text "paste" happens.
 * @param {string} text
 */
ace.Editor.prototype.onPaste = function(text) {};

/** Undocumented */
ace.Editor.prototype.onScrollLeftChange = function() {};

/** Undocumented */
ace.Editor.prototype.onScrollTopChange = function() {};

/** Undocumented */
ace.Editor.prototype.onSelectionChange = function() {};

/** Undocumented */
ace.Editor.prototype.onTextInput = function() {};

/** Undocumented */
ace.Editor.prototype.onTokenizerUpdate = function() {};

/**
 * Perform a redo operation on the document, reimplementing the last change.
 */
ace.Editor.prototype.redo = function() {};

/**
 * Removes words of text from the editor. A "word" is defined as a string of
 * characters bookended by whitespace.
 * @param {string} dir
 */
ace.Editor.prototype.remove = function(dir) {};

/**
 * Removes all the lines in the current selection.
 */
ace.Editor.prototype.removeLines = function() {};

/**
 * Removes the selection marker.
 * @param {!ace.Range} range
 */
ace.Editor.prototype.removeSelectionMarker = function(range) {};

/**
 * Removes all the words to the right of the current selection, until the end
 * of the line.
 */
ace.Editor.prototype.removeToLineEnd = function() {};

/**
 * Removes all the words to the left of the current selection, until the start
 * of the line.
 */
ace.Editor.prototype.removeToLineStart = function() {};

/**
 * Removes the word directly to the left of the current selection.
 */
ace.Editor.prototype.removeWordLeft = function() {};

/**
 * Removes the word directly to the right of the current selection.
 */
ace.Editor.prototype.removeWordRight = function() {};

/**
 * Replaces the first occurance of options.needle with the value in replacement.
 * @param {string} replacement
 * @return {{needle: string}} options
 */
ace.Editor.prototype.replace = function(replacement, options) {};

/**
 * Replaces all occurences of options.needle with the value in replacement.
 * @param {string} replacement
 * @return {{needle: string}} options
 */
ace.Editor.prototype.replaceAll = function(replacement, options) {};

/**
 * Triggers a resize of the editor.
 * @param {boolean} force
 */
ace.Editor.prototype.resize = function(force) {};

/** Undocumented */
ace.Editor.prototype.revealRange = function() {};

/**
 * Scrolls the document to wherever "page down" is, without changing the cursor
 * position.
 */
ace.Editor.prototype.scrollPageDown = function() {};

/**
 * Scrolls the document to wherever "page up" is, without changing the cursor
 * position.
 */
ace.Editor.prototype.scrollPageUp = function() {};

/**
 * Scrolls to a line. If center is true, it puts the line in middle of screen
 * (or attempts to).
 * @param {number} line
 * @param {boolean} center
 * @param {boolean} animate
 * @param {!Function} callback
 */
ace.Editor.prototype.scrollToLine = function(line, center, animate, callback) {};

/**
 * Moves the editor to the specified row.
 * @param {!Object} row
 */
ace.Editor.prototype.scrollToRow = function(row) {};

/**
 * Selects all the text in editor.
 */
ace.Editor.prototype.selectAll = function() {};

/**
 * Finds the next occurence of text in an active selection and adds it to the
 * selections.
 * @param {number} dir
 * @param {boolean} skip
 */
ace.Editor.prototype.selectMore = function(dir, skip) {};

/**
 * Adds a cursor above or below the active cursor.
 * @param {number} dir
 * @param {boolean} skip
 */
ace.Editor.prototype.selectMoreLines = function(dir, skip) {};

/**
 * Selects the text from the current position of the document until where a
 * "page down" finishes.
 */
ace.Editor.prototype.selectPageDown = function() {};

/**
 * Selects the text from the current position of the document until where a
 * "page up" finishes.
 */
ace.Editor.prototype.selectPageUp = function() {};

/** Undocumented */
ace.Editor.prototype.setAnimatedScroll = function() {};

/**
 * Specifies whether to use behaviors or not.
 * "Behaviors" in this case is the auto-pairing of special characters, like
 * quotation marks, parenthesis, or brackets.
 * @param {boolean} enabled
 */
ace.Editor.prototype.setBehavioursEnabled = function(enabled) {};

/** Undocumented */
ace.Editor.prototype.setDisplayIndentGuides = function() {};

/**
 * Sets the delay (in milliseconds) of the mouse drag.
 * @param {number} dragDelay
 */
ace.Editor.prototype.setDragDelay = function(dragDelay) {};

/** Undocumented */
ace.Editor.prototype.setFadeFoldWidgets = function() {};

/**
 * Set a new font size (in pixels) for the editor text.
 * @param {number} size
 */
ace.Editor.prototype.setFontSize = function(size) {};

/**
 * Determines whether or not the current line should be highlighted.
 * @param {boolean} shouldHighlight
 */
ace.Editor.prototype.setHighlightActiveLine = function(shouldHighlight) {};

/** Undocumented */
ace.Editor.prototype.setHighlightGutterLine = function() {};

/**
 * Determines if the currently selected word should be highlighted.
 * @param {boolean} shouldHighlight
 */
ace.Editor.prototype.setHighlightSelectedWord = function(shouldHighlight) {};

/**
 * Sets a new key handler, such as "vim" or "windows".
 * @param {string} keyboardHandler
 */
ace.Editor.prototype.setKeyboardHandler = function(keyboardHandler) {};

/**
 * Pass in true to enable overwrites in your session, or false to disable. If
 * overwrites is enabled, any text you enter will type over any text after it.
 * If the value of overwrite changes, this function also emits the
 * changeOverwrite event.
 * @param {boolean} overwrite
 */
ace.Editor.prototype.setOverwrite = function(overwrite) {};

/**
 * Sets the column defining where the print margin should be.
 * @param {number} showPrintMargin
 */
ace.Editor.prototype.setPrintMarginColumn = function(showPrintMargin) {};

/**
 * If readOnly is true, then the editor is set to read-only mode, and none of
 * the content can change.
 * @param {boolean} readOnly
 */
ace.Editor.prototype.setReadOnly = function(readOnly) {};

/**
 * Sets how fast the mouse scrolling should do.
 * @param {number} speed
 */
ace.Editor.prototype.setScrollSpeed = function(speed) {};

/**
 * Indicates how selections should occur.
 * @param {string} style
 */
ace.Editor.prototype.setSelectionStyle = function(style) {};

/**
 * Sets a new editsession to use. This method also emits the 'changeSession'
 * event.
 * @param {!ace.EditSession} session
 */
ace.Editor.prototype.setSession = function(session) {};

/**
 * Indicates whether the fold widgets are shown or not.
 * @param {boolean} show
 */
ace.Editor.prototype.setShowFoldWidgets = function(show) {};

/**
 * If showInvisibles is set to true, invisible characters—like spaces or new
 * lines—are show in the editor.
 * @param {boolean} showInvisibles
 */
ace.Editor.prototype.setShowInvisibles = function(showInvisibles) {};

/**
 * If showPrintMargin is set to true, the print margin is shown in the editor.
 * @param {boolean} showPrintMargin
 */
ace.Editor.prototype.setShowPrintMargin = function(showPrintMargin) {};

/**
 * Adds a new class, style, to the editor.
 * @param {string} style
 */
ace.Editor.prototype.setStyle = function(style) {};

/**
 * Sets a new theme for the editor. theme should exist, and be a directory
 * path, like ace/theme/textmate.
 * @param {string} theme
 */
ace.Editor.prototype.setTheme = function(theme) {};

/**
 * Sets the current document to val.
 * @param {string} val
 * @param {number} cursorPos
 * @return {string}
 */
ace.Editor.prototype.setValue = function(val, cursorPos) {};

/**
 * Specifies whether to use wrapping behaviors or not, i.e. automatically
 * wrapping the selection with characters such as brackets when such a
 * character is typed in.
 * @param {boolean} enabled
 */
ace.Editor.prototype.setWrapBehavioursEnabled = function(enabled) {};

/** Undocumented */
ace.Editor.prototype.sortLines = function() {};

/**
 * Splits the line at the current selection (by inserting an '\n').
 */
ace.Editor.prototype.splitLine = function() {};

/**
 * Given the currently selected range, this function either comments all the
 * lines, or uncomments all of them.
 */
ace.Editor.prototype.toggleCommentLines = function() {};

/**
 * Sets the value of overwrite to the opposite of whatever it currently is.
 */
ace.Editor.prototype.toggleOverwrite = function() {};

/**
 * Converts the current selection entirely into lowercase.
 */
ace.Editor.prototype.toLowerCase = function() {};

/**
 * Converts the current selection entirely into uppercase.
 */
ace.Editor.prototype.toUpperCase = function() {};

/**
 * Transposes current line.
 */
ace.Editor.prototype.transposeLetters = function() {};

/**
 * Transposes the selected ranges.
 * @param {number} dir
 */
ace.Editor.prototype.transposeSelections = function(dir) {};

/**
 * Perform an undo operation on the document, reverting the last change.
 */
ace.Editor.prototype.undo = function() {};

/**
 * Removes the class style from the editor.
 * @param {!Object} style
 */
ace.Editor.prototype.unsetStyle = function(style) {};

/**
 * Updates the cursor and marker layers.
 */
ace.Editor.prototype.updateSelectionMarkers = function() {};

/**
 * Creates a new Range object with the given starting and ending row and column
 * points.
 * @constructor
 * @param {number} startRow
 * @param {number} startColumn
 * @param {number} endRow
 * @param {number} endColumn
 * @see https://ace.c9.io/#nav=api&api=range
 */
ace.Range = function(startRow, startColumn, endRow, endColumn) {};

/**
 * Returns the part of the current Range that occurs within the boundaries of
 * firstRow and lastRow as a new Range object.
 * @param {number} firstRow
 * @param {number} lastRow
 * @return {!ace.Range}
 */
ace.Range.prototype.clipRows = function(firstRow, lastRow) {};

/**
 * Returns a duplicate of the calling range.
 * @return {!ace.Range}
 */
ace.Range.prototype.clone = function() {};

/**
 * Returns a range containing the starting and ending rows of the original
 * range, but with a column value of 0.
 * @return {!ace.Range}
 */
ace.Range.prototype.collapseRows = function() {};

/**
 * Checks the row and column points with the row and column points of the
 * calling range.
 * @param {number} row
 * @param {number} column
 * @return {number}
 */
ace.Range.prototype.compare = function(row, column) {};

/**
 * Checks the row and column points with the row and column points of the
 * calling range.
 * @param {number} row
 * @param {number} column
 * @return {number}
 */
ace.Range.prototype.compareEnd = function(row, column) {};

/**
 * Checks the row and column points with the row and column points of the
 * calling range.
 * @param {number} row
 * @param {number} column
 * @return {number}
 */
ace.Range.prototype.compareInside = function(row, column) {};

/**
 * Checks the row and column points of p with the row and column points of the
 * calling range.
 * @param {!ace.Range} range
 * @return {number}
 */
ace.Range.prototype.comparePoint = function(range)  {};

/**
 * Compares this range (A) with another range (B).
 * @param {!ace.Range} range
 * @return {number}
 */
ace.Range.prototype.compareRange = function(range) {};

/**
 * Checks the row and column points with the row and column points of the
 * calling range.
 * @param {number} row
 * @param {number} column
 * @return {number}
 */
ace.Range.prototype.compareStart = function(row, column) {};

/**
 * Returns true if the row and column provided are within the given range.
 * This can better be expressed as returning true if:
 *   this.start.row <= row <= this.end.row &&
 *   this.start.column <= column <= this.end.column
 * @param {number} row
 * @param {number} column
 * @return {boolean}
 */
ace.Range.prototype.contains = function(row, column) {};

/**
 * Checks the start and end points of range and compares them to the calling
 * range. Returns true if the range is contained within the caller's range.
 * @param {!ace.Range} range
 * @return {boolean}
 */
ace.Range.prototype.containsRange = function(range) {};

/**
 * Changes the row and column points for the calling range for both the
 * starting and ending points.
 * @param {number} row
 * @param {number} column
 * @return {!ace.Range}
 */
ace.Range.prototype.extend = function(row, column) {};

/**
 * Creates and returns a new Range based on the row and column of the given
 * parameters.
 * @param {!ace.Range} start
 * @param {!ace.Range} end
 * @return {!ace.Range}
 */
ace.Range.prototype.fromPoints = function(start, end) {};

/**
 * Returns true if the row and column are within the given range.
 * @param {number} row
 * @param {number} column
 * @return {boolean}
 */
ace.Range.prototype.inside = function(row, column) {};

/**
 * Returns true if the row and column are within the given range.
 * @param {number} row
 * @param {number} column
 * @return {boolean}
 */
ace.Range.prototype.insideEnd = function(row, column) {};

/**
 * Returns true if the row and column are within the given range's starting
 * points.
 * @param {number} row
 * @param {number} column
 * @return {boolean}
 */
ace.Range.prototype.insideStart = function(row, column) {};

/**
 * Returns true if passed in range intersects with the one calling this method.
 * @param {!ace.Range} range
 * @return {boolean}
 */
ace.Range.prototype.intersects = function(range) {};

/** Undocumented */
ace.Range.prototype.isEmpty = function() {};

/**
 * Returns true if the caller's ending row point is the same as row, and if the
 * caller's ending column is the same as column.
 * @param {number} row
 * @param {number} column
 * @return {boolean}
 */
ace.Range.prototype.isEnd = function(row, column) {};

/**
 * Returns true if and only if the starting row and column, and ending row and
 * column, are equivalent to those given by range.
 * @param {!ace.Range} range
 * @return {boolean}
 */
ace.Range.prototype.isEqual = function(range) {};

/**
 * Returns true if the range spans across multiple lines.
 * @return {boolean}
 */
ace.Range.prototype.isMultiLine = function()  {};

/**
 * Returns true if the caller's starting row point is the same as row, and if
 * the caller's starting column is the same as column.
 * @param {number} row
 * @param {number} column
 * @return {boolean}
 */
ace.Range.prototype.isStart = function(row, column) {};

/**
 * Sets the starting row and column for the range.
 * @param {number} row
 * @param {number} column
 * @return {!Object}
 */
ace.Range.prototype.setEnd = function(row, column) {};

/**
 * Sets the starting row and column for the range.
 * @param {number} row
 * @param {number} column
 * @return {!Object}
 */
ace.Range.prototype.setStart = function(row, column) {};

/**
 * Given the current Range, this function converts those starting and ending
 * points into screen positions,
 * and then returns a new Range object.
 * @param {!ace.EditSession} session
 * @return {!ace.Range}
 */
ace.Range.prototype.toScreenRange = function(session) {};

/**
 * Returns a string containing the range's row and column information, given
 * like this:
 *   [start.row/start.column] -> [end.row/end.column]
 * @override
 */
ace.Range.prototype.toString = function() {};

/**
 * Creates a new ScrollBar. parent is the owner of the scroll bar.
 * @constructor
 * @param {!Element} parent
 * @see https://ace.c9.io/#nav=api&api=scrollbar
 */
ace.ScrollBar = function(parent) {};

/**
 * Emitted when the scroll bar, well, scrolls.
 * @param {string} event
 * @param {function(!Object)} fn
 */
ace.ScrollBar.prototype.on = function(event, fn) {};

/**
 * Returns the width of the scroll bar.
 * @return {number}
 */
ace.ScrollBar.prototype.getWidth = function() {};

/** Undocumented */
ace.ScrollBar.prototype.onScroll = function() {};

/**
 * Sets the height of the scroll bar, in pixels.
 * @param {number} height
 */
ace.ScrollBar.prototype.setHeight = function(height) {};

/**
 * Sets the inner height of the scroll bar, in pixels.
 * @param {number} height
 */
ace.ScrollBar.prototype.setInnerHeight = function(height) {};

/**
 * Sets the scroll top of the scroll bar.
 * @param {number} scrollTop
 */
ace.ScrollBar.prototype.setScrollTop = function(scrollTop) {};

/**
 * Creates a new Search object.
 * @constructor
 * @see https://ace.c9.io/#nav=api&api=search
 */
ace.Search = function() {};

/**
 * Searches for options.needle. If found, this method returns the Range where
 * the text first occurs. If options.backwards is true, the search goes
 * backwards in the session.
 * @param {!ace.EditSession} session
 * @return {!ace.Range}
 */
ace.Search.prototype.find = function(session) {};

/**
 * Searches for all occurances options.needle.
 * If found, this method returns an array of Ranges where the text first occurs.
 * If options.backwards is true, the search goes backwards in the session.
 * @param {!ace.EditSession} session
 * @return {!ace.Range}
 */
ace.Search.prototype.findAll = function(session) {};

/**
 * Returns an object containing all the search options.
 * @return {!Object}
 */
ace.Search.prototype.getOptions = function() {};

/**
 * Searches for options.needle in input, and, if found, replaces it with
 * replacement.
 * @param {string} input
 * @param {string} replacement
 * @return {string}
 */
ace.Search.prototype.replace = function(input, replacement) {};

/**
 * Sets the search options via the options parameter.
 * @param {{needle: string, backwards: boolean}} options
 * @return {!ace.Search}
 */
ace.Search.prototype.set = function(options) {};

/** Undocumented */
ace.Search.prototype.setOptions = function() {};

/**
 * Creates a new Selection object.
 * @constructor
 * @param {!ace.EditSession} session
 * @see https://ace.c9.io/#nav=api&api=selection
 */
ace.Selection = function(session) {};

/**
 * @param {string} event
 * @param {!Function} fn
 */
ace.Selection.prototype.on = function(event, fn) {};

/**
 * Adds a range to a selection by entering multiselect mode, if necessary.
 * @param {!ace.Range} range
 * @param {boolean} $blockChangeEvents
 */
ace.Selection.prototype.addRange = function(range, $blockChangeEvents) {};

/**
 * Empties the selection (by de-selecting it). This function also emits the
 * 'changeSelection' event.
 */
ace.Selection.prototype.clearSelection = function() {};

/** Undocumented */
ace.Selection.prototype.detach = function() {};

/** Undocumented */
ace.Selection.prototype.fromOrientedRange = function() {};

/**
 * Returns a concatenation of all the ranges.
 * @return {!Array<!Object>}
 */
ace.Selection.prototype.getAllRanges = function() {};

/**
 * Gets the current position of the cursor.
 * @return {number}
 */
ace.Selection.prototype.getCursor = function() {};

/** Undocumented */
ace.Selection.prototype.getLineRange = function() {};

/**
 * Returns the Range for the selected text.
 * @return {!ace.Range}
 */
ace.Selection.prototype.getRange = function() {};

/**
 * Returns an object containing the row and column of the calling selection
 * anchor.
 * @return {!Object}
 */
ace.Selection.prototype.getSelectionAnchor = function() {};

/**
 * Returns an object containing the row and column of the calling selection
 * lead.
 * @return {!Object}
 */
ace.Selection.prototype.getSelectionLead = function() {};

/**
 * Moves the selection to highlight the entire word.
 * @param {!Object} row
 * @param {!Object} column
 */
ace.Selection.prototype.getWordRange = function(row, column) {};

/**
 * Returns true if the selection is going backwards in the document.
 * @return {boolean}
 */
ace.Selection.prototype.isBackwards = function() {};

/**
 * Returns true if the selection is empty.
 * @return {boolean}
 */
ace.Selection.prototype.isEmpty = function() {};

/**
 * Returns true if the selection is a multi-line.
 * @return {boolean}
 */
ace.Selection.prototype.isMultiLine = function() {};

/**
 * Merges overlapping ranges ensuring consistency after changes.
 */
ace.Selection.prototype.mergeOverlappingRanges = function() {};

/**
 * Moves the cursor to position indicated by the parameters. Negative numbers
 * move the cursor backwards in the document.
 * @param {number} rows
 * @param {number} chars
 */
ace.Selection.prototype.moveCursorBy = function(rows, chars) {};

/**
 * Moves the cursor down one row.
 */
ace.Selection.prototype.moveCursorDown = function() {};

/**
 * Moves the cursor to the end of the file.
 */
ace.Selection.prototype.moveCursorFileEnd = function() {};

/**
 * Moves the cursor to the start of the file.
 */
ace.Selection.prototype.moveCursorFileStart = function() {};

/**
 * Moves the cursor left one column.
 */
ace.Selection.prototype.moveCursorLeft = function() {};

/**
 * Moves the cursor to the end of the line.
 */
ace.Selection.prototype.moveCursorLineEnd = function() {};

/**
 * Moves the cursor to the start of the line.
 */
ace.Selection.prototype.moveCursorLineStart = function() {};

/**
 * Moves the cursor to the word on the left.
 */
ace.Selection.prototype.moveCursorLongWordLeft = function() {};

/**
 * Moves the cursor to the word on the right.
 */
ace.Selection.prototype.moveCursorLongWordRight = function() {};

/**
 * Moves the cursor right one column.
 */
ace.Selection.prototype.moveCursorRight = function() {};

/** Undocumented */
ace.Selection.prototype.moveCursorShortWordLeft = function() {};

/** Undocumented */
ace.Selection.prototype.moveCursorShortWordRight = function() {};

/**
 * Moves the cursor to the row and column provided.
 * If preventUpdateDesiredColumn is true, then the cursor stays in the same
 * column position as its original point.
 * @param {number} row
 * @param {number} column
 * @param {boolean} keepDesiredColumn
 */
ace.Selection.prototype.moveCursorTo = function(row, column, keepDesiredColumn) {};

/**
 * Moves the selection to the position indicated by its row and column.
 * @param {!Object} position
 */
ace.Selection.prototype.moveCursorToPosition = function(position) {};

/**
 * Moves the cursor to the screen position indicated by row and column.
 * If preventUpdateDesiredColumn is true, then the cursor stays in the same
 * column position as its original point.
 * @param {number} row
 * @param {number} column
 * @param {boolean} keepDesiredColumn
 */
ace.Selection.prototype.moveCursorToScreen = function(row, column, keepDesiredColumn) {};

/**
 * Moves the cursor up one row.
 */
ace.Selection.prototype.moveCursorUp = function() {};

/** Undocumented */
ace.Selection.prototype.moveCursorWordLeft = function() {};

/** Undocumented */
ace.Selection.prototype.moveCursorWordRight = function() {};

/**
 * Gets list of ranges composing rectangular block on the screen.
 * @param {!Object} screenCursor
 * @param {!ace.Anchor} screenAnchor
 * @param {boolean} includeEmptyLines
 * @return {!ace.Range}
 */
ace.Selection.prototype.rectangularRangeBlock = function(screenCursor, screenAnchor, includeEmptyLines) {};

/**
 * Selects all the text in the document.
 */
ace.Selection.prototype.selectAll = function() {};

/**
 * Selects a word, including its right whitespace.
 */
ace.Selection.prototype.selectAWord = function() {};

/**
 * Moves the selection down one row.
 */
ace.Selection.prototype.selectDown = function() {};

/**
 * Moves the selection to the end of the file.
 */
ace.Selection.prototype.selectFileEnd = function() {};

/**
 * Moves the selection to the start of the file.
 */
ace.Selection.prototype.selectFileStart = function() {};

/**
 * Moves the selection left one column.
 */
ace.Selection.prototype.selectLeft = function() {};

/**
 * Selects the entire line.
 */
ace.Selection.prototype.selectLine = function() {};

/**
 * Moves the selection to the end of the current line.
 */
ace.Selection.prototype.selectLineEnd = function() {};

/**
 * Moves the selection to the beginning of the current line.
 */
ace.Selection.prototype.selectLineStart = function() {};

/**
 * Moves the selection right one column.
 */
ace.Selection.prototype.selectRight = function() {};

/**
 * Moves the selection cursor to the indicated row and column.
 * @param {number} row
 * @param {number} column
 */
ace.Selection.prototype.selectTo = function(row, column) {};

/**
 * Moves the selection cursor to the row and column indicated by pos.
 * @param {!Object} pos
 */
ace.Selection.prototype.selectToPosition = function(pos) {};

/**
 * Moves the selection up one row.
 */
ace.Selection.prototype.selectUp = function() {};

/**
 * Selects an entire word boundary.
 */
ace.Selection.prototype.selectWord = function() {};

/**
 * Moves the selection to the first word on the left.
 */
ace.Selection.prototype.selectWordLeft = function() {};

/**
 * Moves the selection to the first word on the right.
 */
ace.Selection.prototype.selectWordRight = function() {};

/**
 * Sets the row and column position of the anchor. This function also emits the
 * 'changeSelection' event.
 * @param {number} row
 * @param {number} column
 */
ace.Selection.prototype.setSelectionAnchor = function(row, column) {};

/**
 * Sets the selection to the provided range.
 * @param {!ace.Range} range
 * @param {boolean} reverse
 */
ace.Selection.prototype.setSelectionRange = function(range, reverse) {};

/**
 * Shifts the selection up (or down, if isBackwards() is true) the given number
 * of columns.
 * @param {number} columns
 */
ace.Selection.prototype.shiftSelection = function(columns) {};

/**
 * Splits all the ranges into lines.
 */
ace.Selection.prototype.splitIntoLines = function() {};

/**
 * Removes a Range containing pos (if it exists).
 * @param {!ace.Range} pos
 */
ace.Selection.prototype.substractPoint = function(pos) {};

/** Undocumented */
ace.Selection.prototype.toggleBlockSelection = function() {};

/** Undocumented */
ace.Selection.prototype.toOrientedRange = function() {};

/** Undocumented */
ace.Selection.prototype.toSingleRange = function() {};

/**
 * Creates a new token iterator object. The inital token index is set to the
 * provided row and column coordinates.
 * @constructor
 * @param {!ace.EditSession} session
 * @param {number} initialRow
 * @param {number} initialColumn
 * @see https://ace.c9.io/#nav=api&api=token_iterator
 */
ace.TokenIterator = function(session, initialRow, initialColumn) {};

/**
 * Returns the current tokenized string.
 * @return {string}
 */
ace.TokenIterator.prototype.getCurrentToken = function() {};

/**
 * Returns the current column.
 * @return {number}
 */
ace.TokenIterator.prototype.getCurrentTokenColumn = function() {};

/**
 * Returns the current row.
 * @return {number}
 */
ace.TokenIterator.prototype.getCurrentTokenRow = function() {};

/**
 * Tokenizes all the items from the current point to the row prior in the
 * document.
 * @return {string}
 */
ace.TokenIterator.prototype.stepBackward = function() {};

/**
 * Tokenizes all the items from the current point until the next row in the
 * document. If the current point is at the end of the file, this function
 * returns null. Otherwise, it returns the tokenized string.
 * @return {?string}
 */
ace.TokenIterator.prototype.stepForward = function() {};

/**
 * Constructs a new tokenizer based on the given rules and flags.
 * @constructor
 * @param {!Object} rules
 * @param {string} flag
 * @see https://ace.c9.io/#nav=api&api=tokenizer
 */
ace.Tokenizer = function(rules, flag) {};

/**
 * Returns an object containing two properties: tokens, which contains all the
 * tokens; and state, the current state.
 * @param {!Object} line
 * @param {!Object} startState
 * @return {{tokens: !Array<!Object>, state: !Object}}
 */
ace.Tokenizer.prototype.getLineTokens = function(line, startState) {};

/**
 * Resets the current undo state and creates a new UndoManager.
 * @constructor
 * @see https://ace.c9.io/#nav=api&api=undomanager
 */
ace.UndoManager = function() {};

/**
 * Provides a means for implementing your own undo manager. options has one
 * property, args, an Array, with two elements: deltaSets and doc.
 * @param {{args: !Array<!Object>}} options
 */
ace.UndoManager.prototype.execute = function(options) {};

/**
 * Returns true if there are redo operations left to perform.
 * @return {boolean}
 */
ace.UndoManager.prototype.hasRedo = function() {};

/**
 * Returns true if there are undo operations left to perform.
 * @return {boolean}
 */
ace.UndoManager.prototype.hasUndo = function() {};

/**
 * Perform a redo operation on the document, reimplementing the last change.
 * @param {boolean} dontSelect
 */
ace.UndoManager.prototype.redo = function(dontSelect) {};

/**
 * Destroys the stack of undo and redo redo operations.
 */
ace.UndoManager.prototype.reset = function() {};

/**
 * Perform an undo operation on the document, reverting the last change.
 * @param {boolean} dontSelect
 * @return {!ace.Range}
 */
ace.UndoManager.prototype.undo = function(dontSelect) {};

/**
 * Constructs a new VirtualRenderer within the container specified, applying
 * the given theme.
 * @constructor
 * @param {!Element} container
 * @param {string} theme
 * @see https://ace.c9.io/#nav=api&api=virtual_renderer
 */
ace.VirtualRenderer = function(container, theme) {};

/** Undocumented */
ace.VirtualRenderer.prototype._loadTheme = function() {};

/**
 * Deprecated (moved to EditSession)
 * @deprecated
 * @param {!Object} row
 */
ace.VirtualRenderer.prototype.addGutterDecoration = function(row, className) {};

/**
 * Adjusts the wrap limit, which is the number of characters that can fit
 * within the width of the edit area on screen.
 */
ace.VirtualRenderer.prototype.adjustWrapLimit = function() {};

/** Undocumented */
ace.VirtualRenderer.prototype.alignCursor = function() {};

/** Undocumented */
ace.VirtualRenderer.prototype.animateScrolling = function() {};

/**
 * Destroys the text and cursor layers for this renderer.
 */
ace.VirtualRenderer.prototype.destroy = function() {};

/**
 * Returns whether an animated scroll happens or not.
 * @return {boolean}
 */
ace.VirtualRenderer.prototype.getAnimatedScroll = function() {};

/**
 * Returns the root element containing this renderer.
 * @return {!Element}
 */
ace.VirtualRenderer.prototype.getContainerElement = function() {};

/** Undocumented */
ace.VirtualRenderer.prototype.getDisplayIndentGuides = function() {};

/** Undocumented */
ace.VirtualRenderer.prototype.getFadeFoldWidgets = function() {};

/**
 * Returns the index of the first fully visible row.
 * "Fully" here means that the characters in the row are not truncated; that
 * the top and the bottom of the row are on the screen.
 */
ace.VirtualRenderer.prototype.getFirstFullyVisibleRow = function() {};

/**
 * Returns the index of the first visible row.
 * @return {number}
 */
ace.VirtualRenderer.prototype.getFirstVisibleRow = function() {};

/** Undocumented */
ace.VirtualRenderer.prototype.getHighlightGutterLine = function() {};

/**
 * Returns whether the horizontal scrollbar is set to be always visible.
 * @return {boolean}
 */
ace.VirtualRenderer.prototype.getHScrollBarAlwaysVisible = function() {};

/**
 * Returns the index of the last fully visible row.
 * "Fully" here means that the characters in the row are not truncated; that
 * the top and the bottom of the row are on the screen.
 * @return {number}
 */
ace.VirtualRenderer.prototype.getLastFullyVisibleRow = function() {};

/**
 * Returns the index of the last visible row.
 * @return {number}
 */
ace.VirtualRenderer.prototype.getLastVisibleRow = function() {};

/**
 * Returns the element that the mouse events are attached to.
 * @return {!Element}
 */
ace.VirtualRenderer.prototype.getMouseEventTarget = function() {};

/**
 * Returns whether the print margin column is being shown or not.
 * @return {boolean}
 */
ace.VirtualRenderer.prototype.getPrintMarginColumn = function() {};

/**
 * Returns the last visible row, regardless of whether it's fully visible or
 * not.
 * @return {number}
 */
ace.VirtualRenderer.prototype.getScrollBottomRow = function() {};

/**
 * Returns the value of the distance between the left of the editor and the
 * leftmost part of the visible content.
 * @return {number}
 */
ace.VirtualRenderer.prototype.getScrollLeft = function() {};

/**
 * Returns the value of the distance between the top of the editor and the
 * topmost part of the visible content.
 * @return {number}
 */
ace.VirtualRenderer.prototype.getScrollTop = function() {};

/**
 * Returns the first visible row, regardless of whether it's fully visible or
 * not.
 * @return {number}
 */
ace.VirtualRenderer.prototype.getScrollTopRow = function() {};

/**
 * Returns true if the gutter is being shown.
 * @return {boolean}
 */
ace.VirtualRenderer.prototype.getShowGutter = function() {};

/**
 * Returns whether invisible characters are being shown or not.
 * @return {boolean}
 */
ace.VirtualRenderer.prototype.getShowInvisibles = function() {};

/**
 * Returns whether the print margin is being shown or not.
 * @return {boolean}
 */
ace.VirtualRenderer.prototype.getShowPrintMargin = function() {};

/**
 * Returns the element to which the hidden text area is added.
 * @return {!Element}
 */
ace.VirtualRenderer.prototype.getTextAreaContainer = function() {};

/**
 * Returns the path of the current theme.
 * @return {string}
 */
ace.VirtualRenderer.prototype.getTheme = function() {};

/**
 * Hides the current composition.
 */
ace.VirtualRenderer.prototype.hideComposition = function() {};

/**
 * Hides the cursor icon.
 */
ace.VirtualRenderer.prototype.hideCursor = function() {};

/**
 * Returns true if you can still scroll by either parameter; in other words,
 * you haven't reached the end of the file or line.
 * @param {number} deltaX
 * @param {number} deltaY
 * @return {boolean}
 */
ace.VirtualRenderer.prototype.isScrollableBy = function(deltaX, deltaY) {};

/** Undocumented */
ace.VirtualRenderer.prototype.onChangeTabSize = function() {};

/** Undocumented */
ace.VirtualRenderer.prototype.onGutterResize = function() {};

/**
 * Triggers a resize of the editor.
 * @param {boolean} force
 * @param {number} gutterWidth
 * @param {number} width
 * @param {number} height
 */
ace.VirtualRenderer.prototype.onResize = function(force, gutterWidth, width, height) {};

/** Undocumented */
ace.VirtualRenderer.prototype.pixelToScreenCoordinates = function() {};

/**
 * Deprecated (moved to EditSession)
 * @deprecated
 * @param {!Object} row
 * @param {!Object} className
 */
ace.VirtualRenderer.prototype.removeGutterDecoration = function(row, className) {};

/** Undocumented */
ace.VirtualRenderer.prototype.screenToTextCoordinates = function() {};

/**
 * Scrolls the editor across both x- and y-axes.
 * @param {number} deltaX
 * @param {number} deltaY
 */
ace.VirtualRenderer.prototype.scrollBy = function(deltaX, deltaY) {};

/**
 * Scrolls the cursor into the first visibile area of the editor
 * @param {!Object} cursor
 * @param {!Object} offset
 */
ace.VirtualRenderer.prototype.scrollCursorIntoView = function(cursor, offset) {};

/** Undocumented */
ace.VirtualRenderer.prototype.scrollSelectionIntoView = function() {};

/**
 * Gracefully scrolls the editor to the row indicated.
 * @param {number} line
 * @param {boolean} center
 * @param {boolean} animate
 * @param {!Function} callback
 */
ace.VirtualRenderer.prototype.scrollToLine = function(line, center, animate, callback) {};

/**
 * Gracefully scrolls from the top of the editor to the row indicated.
 * @param {number} row
 */
ace.VirtualRenderer.prototype.scrollToRow = function(row) {};

/**
 * Scrolls the editor across the x-axis to the pixel indicated.
 * @param {number} scrollLeft
 * @return {number}
 */
ace.VirtualRenderer.prototype.scrollToX = function(scrollLeft) {};

/**
 * Scrolls the editor to the y pixel indicated.
 * @param {number} scrollTop
 * @return {number}
 */
ace.VirtualRenderer.prototype.scrollToY = function(scrollTop) {};

/**
 * Identifies whether you want to have an animated scroll or not.
 * @param {boolean} shouldAnimate
 */
ace.VirtualRenderer.prototype.setAnimatedScroll = function(shouldAnimate) {};

/**
 * Sets annotations for the gutter.
 * @param {!Array<!Object>} annotations
 */
ace.VirtualRenderer.prototype.setAnnotations = function(annotations) {};

/**
 * @param {string} text
 */
ace.VirtualRenderer.prototype.setCompositionText = function(text) {};

/** Undocumented */
ace.VirtualRenderer.prototype.setDisplayIndentGuides = function() {};

/** Undocumented */
ace.VirtualRenderer.prototype.setFadeFoldWidgets = function() {};

/** Undocumented */
ace.VirtualRenderer.prototype.setHighlightGutterLine = function() {};

/**
 * Identifies whether you want to show the horizontal scrollbar or not.
 * @param {boolean} alwaysVisible
 */
ace.VirtualRenderer.prototype.setHScrollBarAlwaysVisible = function(alwaysVisible) {};

/**
 * Sets the padding for all the layers.
 * @param {number} padding
 */
ace.VirtualRenderer.prototype.setPadding = function(padding) {};

/**
 * Identifies whether you want to show the print margin column or not.
 * @param {boolean} showPrintMargin
 */
ace.VirtualRenderer.prototype.setPrintMarginColumn = function(showPrintMargin) {};

/**
 * Associates the renderer with an EditSession.
 * @param {!ace.EditSession} session
 */
ace.VirtualRenderer.prototype.setSession = function(session) {};

/**
 * Identifies whether you want to show the gutter or not.
 * @param {boolean} show
 */
ace.VirtualRenderer.prototype.setShowGutter = function(show) {};

/**
 * Identifies whether you want to show invisible characters or not.
 * @param {boolean} showInvisibles
 */
ace.VirtualRenderer.prototype.setShowInvisibles = function(showInvisibles) {};

/**
 * Identifies whether you want to show the print margin or not.
 * @param {boolean} showPrintMargin
 */
ace.VirtualRenderer.prototype.setShowPrintMargin = function(showPrintMargin) {};

/** Undocumented */
ace.VirtualRenderer.prototype.setStyle = function() {};

/**
 * Sets a new theme for the editor. theme should exist, and be a directory
 * path, like ace/theme/textmate.
 * @param {string} theme
 */
ace.VirtualRenderer.prototype.setTheme = function(theme) {};

/**
 * Shows the cursor icon.
 */
ace.VirtualRenderer.prototype.showCursor = function() {};

/**
 * Returns an object containing the pageX and pageY coordinates of the document
 * position.
 * @param {number} row
 * @param {number} column
 * @return {!Object}
 */
ace.VirtualRenderer.prototype.textToScreenCoordinates = function(row, column) {};

/**
 * Removes the class style from the editor.
 * @param {string} style
 */
ace.VirtualRenderer.prototype.unsetStyle = function(style) {};

/**
 * Schedules an update to all the back markers in the document.
 */
ace.VirtualRenderer.prototype.updateBackMarkers = function() {};

/**
 * Redraw breakpoints.
 * @param {!Object} rows
 */
ace.VirtualRenderer.prototype.updateBreakpoints = function(rows) {};

/** Undocumented */
ace.VirtualRenderer.prototype.updateCharacterSize = function() {};

/**
 * Updates the cursor icon.
 */
ace.VirtualRenderer.prototype.updateCursor = function() {};

/**
 * Updates the font size.
 */
ace.VirtualRenderer.prototype.updateFontSize = function() {};

/**
 * Schedules an update to all the front markers in the document.
 */
ace.VirtualRenderer.prototype.updateFrontMarkers = function() {};

/**
 * Triggers a full update of all the layers, for all the rows.
 * @param {boolean} force
 */
ace.VirtualRenderer.prototype.updateFull = function(force) {};

/**
 * Triggers a partial update of the text, from the range given by the two
 * parameters.
 * @param {number} firstRow
 * @param {number} lastRow
 */
ace.VirtualRenderer.prototype.updateLines = function(firstRow, lastRow) {};

/**
 * Triggers a full update of the text, for all the rows.
 */
ace.VirtualRenderer.prototype.updateText = function() {};

/**
 * Blurs the current container.
 */
ace.VirtualRenderer.prototype.visualizeBlur = function() {};

/**
 * Focuses the current container.
 */
ace.VirtualRenderer.prototype.visualizeFocus = function() {};
