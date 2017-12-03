/*
 * Copyright 2012 The Closure Compiler Authors
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
 * @fileoverview Definitions for objects in the synchronous File API, File
 * Writer API, and File System API. Details of the API are at:
 * http://www.w3.org/TR/FileAPI/
 * http://www.w3.org/TR/file-writer-api/
 * http://www.w3.org/TR/file-system-api/
 *
 * @externs
 * @author dpapad@google.com (Demetrios Papadopoulos)
 */


/**
 * @see http://www.w3.org/TR/file-writer-api/#idl-def-FileWriterSync
 * @constructor
 */
function FileWriterSync() {}

/**
 * @see http://www.w3.org/TR/file-writer-api/#widl-FileWriterSync-position
 * @type {number}
 * @const
 */
FileWriterSync.prototype.position;

/**
 * @see http://www.w3.org/TR/file-writer-api/#widl-FileWriterSync-length
 * @type {number}
 * @const
 */
FileWriterSync.prototype.length;

/**
 * @see http://www.w3.org/TR/file-writer-api/#widl-FileWriter-write
 * @param {!Blob} blob
 * @return {undefined}
 */
FileWriterSync.prototype.write = function(blob) {};

/**
 * @see http://www.w3.org/TR/file-writer-api/#widl-FileWriterSync-seek
 * @param {number} offset
 * @return {undefined}
 */
FileWriterSync.prototype.seek = function(offset) {};

/**
 * @see http://www.w3.org/TR/file-writer-api/#widl-FileWriterSync-truncate
 * @param {number} size
 * @return {undefined}
 */
FileWriterSync.prototype.truncate = function(size) {};

/**
 * @see http://www.w3.org/TR/FileAPI/#FileReaderSyncSync
 * @constructor
 */
function FileReaderSync() {}

/**
 * @see http://www.w3.org/TR/FileAPI/#dfn-readAsArrayBufferSync
 * @param {!Blob} blob
 * @return {!ArrayBuffer}
 */
FileReaderSync.prototype.readAsArrayBuffer = function(blob) {};

/**
 * @see http://www.w3.org/TR/FileAPI/#dfn-readAsBinaryStringSync
 * @param {!Blob} blob
 * @return {string}
 */
FileReaderSync.prototype.readAsBinaryString = function(blob) {};

/**
 * @see http://www.w3.org/TR/FileAPI/#dfn-readAsTextSync
 * @param {!Blob} blob
 * @param {string=} encoding
 * @return {string}
 */
FileReaderSync.prototype.readAsText = function(blob, encoding) {};

/**
 * @see http://www.w3.org/TR/FileAPI/#dfn-readAsDataURLSync
 * @param {!Blob} blob
 * @return {string}
 */
FileReaderSync.prototype.readAsDataURL = function(blob) {};

/**
 * LocalFileSystemSync interface, implemented by WorkerGlobalScope.
 * @see http://www.w3.org/TR/file-system-api/#idl-def-LocalFileSystemSync
 * @constructor
 */
function LocalFileSystemSync() {}

/**
 * @see http://www.w3.org/TR/file-system-api/
 *     #the-synchronous-filesystem-interface
 * @constructor
 */
function FileSystemSync() {}

/**
 * @see http://www.w3.org/TR/file-system-api/#widl-FileSystemSync-name
 * @type {string}
 * @const
 */
FileSystemSync.prototype.name;

/**
 * @see http://www.w3.org/TR/file-system-api/#widl-FileSystemSync-root
 * @type {!DirectoryEntrySync}
 * @const
 */
FileSystemSync.prototype.root;

/**
 * @see http://www.w3.org/TR/file-system-api/#widl-LocalFileSystemSync-requestFileSystemSync-FileSystemSync-unsigned-short-type-unsigned-long-long-size
 * @param {number} type
 * @param {number} size
 * @return {!FileSystemSync}
 */
function requestFileSystemSync(type, size) {}

/**
 * @see http://www.w3.org/TR/file-system-api/#widl-LocalFileSystemSync-requestFileSystemSync-FileSystemSync-unsigned-short-type-unsigned-long-long-size
 * @param {number} type
 * @param {number} size
 * @return {!FileSystemSync}
 */
function webkitRequestFileSystemSync(type, size) {}

/**
 * @see http://www.w3.org/TR/file-system-api/#the-entrysync-interface
 * @constructor
 */
function EntrySync() {};

/**
 * @see http://www.w3.org/TR/file-system-api/#widl-EntrySync-isFile
 * @type {boolean}
 * @const
 */
EntrySync.prototype.isFile;

/**
 * @see http://www.w3.org/TR/file-system-api/#widl-EntrySync-isDirectory
 * @type {boolean}
 * @const
 */
EntrySync.prototype.isDirectory;

/**
 * @see http://www.w3.org/TR/file-system-api/#widl-EntrySync-name
 * @type {string}
 * @const
 */
EntrySync.prototype.name;

/**
 * @see http://www.w3.org/TR/file-system-api/#widl-EntrySync-fullPath
 * @type {string}
 * @const
 */
EntrySync.prototype.fullPath;

/**
 * @see http://www.w3.org/TR/file-system-api/#widl-EntrySync-filesystem
 * @type {!FileSystemSync}
 * @const
 */
EntrySync.prototype.filesystem;

/**
 * @see http://www.w3.org/TR/file-system-api/#widl-EntrySync-moveTo
 * @param {!DirectoryEntrySync} parent
 * @param {string=} newName
 * @return {!EntrySync}
 */
EntrySync.prototype.moveTo = function(parent, newName) {};

/**
 * @see http://www.w3.org/TR/file-system-api/#widl-EntrySync-copyTo
 * @param {!DirectoryEntrySync} parent
 * @param {string=} newName
 * @return {!EntrySync}
 */
EntrySync.prototype.copyTo = function(parent, newName) {};

/**
 * @see http://www.w3.org/TR/file-system-api/#widl-EntrySync-toURL
 * @param {string=} mimeType
 * @return {string}
 */
EntrySync.prototype.toURL = function(mimeType) {};

/**
 * @see http://www.w3.org/TR/file-system-api/#widl-EntrySync-remove
 * @return {undefined}
 */
EntrySync.prototype.remove = function() {};

/**
 * @see http://www.w3.org/TR/file-system-api/#widl-EntrySync-getMetadata
 * @return {!Metadata}
 */
EntrySync.prototype.getMetadata = function() {};

/**
 * @see http://www.w3.org/TR/file-system-api/#widl-EntrySync-getParent
 * @return {!DirectoryEntrySync}
 */
EntrySync.prototype.getParent = function() {};

/**
 * @see http://www.w3.org/TR/file-system-api/#the-directoryentrysync-interface
 * @constructor
 * @extends {EntrySync}
 */
function DirectoryEntrySync() {};

/**
 * @see http://www.w3.org/TR/file-system-api/#widl-DirectoryEntrySync-createReader
 * @return {!DirectoryReaderSync}
 */
DirectoryEntrySync.prototype.createReader = function() {};

/**
 * @see http://www.w3.org/TR/file-system-api/#widl-DirectoryEntrySync-getFile
 * @param {string} path
 * @param {Object=} options
 * @return {!FileEntrySync}
 */
DirectoryEntrySync.prototype.getFile = function(path, options) {};

/**
 * @see http://www.w3.org/TR/file-system-api/#widl-DirectoryEntrySync-getDirectory
 * @param {string} path
 * @param {Object=} options
 * @return {!DirectoryEntrySync}
 */
DirectoryEntrySync.prototype.getDirectory = function(path, options) {};

/**
 * @see http://www.w3.org/TR/file-system-api/#widl-DirectoryEntrySync-removeRecursively
 * @return {undefined}
 */
DirectoryEntrySync.prototype.removeRecursively = function() {};

/**
 * @see http://www.w3.org/TR/file-system-api/#the-directoryreadersync-interface
 * @constructor
 */
function DirectoryReaderSync() {};

/**
 * @see http://www.w3.org/TR/file-system-api/#widl-DirectoryReaderSync-readEntries
 * @return {!Array<!EntrySync>}
 */
DirectoryReaderSync.prototype.readEntries = function() {};

/**
 * @see http://www.w3.org/TR/file-system-api/#the-fileentrysync-interface
 * @constructor
 * @extends {EntrySync}
 */
function FileEntrySync() {};

/**
 * @see http://www.w3.org/TR/file-system-api/#widl-FileEntrySync-createWriter
 * @return {!FileWriterSync}
 */
FileEntrySync.prototype.createWriter = function() {};

/**
 * @see http://www.w3.org/TR/file-system-api/#widl-FileEntrySync-file
 * @return {!File}
 */
FileEntrySync.prototype.file = function() {};

/**
 * @see http://www.w3.org/TR/file-system-api/#the-fileexception-exception
 * @constructor
 */
function FileException() {}

/**
 * @see http://www.w3.org/TR/FileAPI/#dfn-NOT_FOUND_ERR
 * @type {number}
 */
FileException.prototype.NOT_FOUND_ERR = 1;

/** @type {number} */
FileException.NOT_FOUND_ERR = 1;

/**
 * @see http://www.w3.org/TR/FileAPI/#dfn-SECURITY_ERR
 * @type {number}
 */
FileException.prototype.SECURITY_ERR = 2;

/** @type {number} */
FileException.SECURITY_ERR = 2;

/**
 * @see http://www.w3.org/TR/FileAPI/#widl-FileException-ABORT_ERR
 * @type {number}
 */
FileException.prototype.ABORT_ERR = 3;

/** @type {number} */
FileException.ABORT_ERR = 3;

/**
 * @see http://www.w3.org/TR/FileAPI/#widl-FileException-NOT_READABLE_ERR
 * @type {number}
 */
FileException.prototype.NOT_READABLE_ERR = 4;

/** @type {number} */
FileException.NOT_READABLE_ERR = 4;

/**
 * @see http://www.w3.org/TR/FileAPI/#widl-FileException-ENCODING_ERR
 * @type {number}
 */
FileException.prototype.ENCODING_ERR = 5;

/** @type {number} */
FileException.ENCODING_ERR = 5;

/**
 * @see http://www.w3.org/TR/file-writer-api/#widl-FileException-NO_MODIFICATION_ALLOWED_ERR
 * @type {number}
 */
FileException.prototype.NO_MODIFICATION_ALLOWED_ERR = 6;

/** @type {number} */
FileException.NO_MODIFICATION_ALLOWED_ERR = 6;

/**
 * @see http://www.w3.org/TR/file-writer-api/#widl-FileException-INVALID_STATE_ERR
 * @type {number}
 */
FileException.prototype.INVALID_STATE_ERR = 7;

/** @type {number} */
FileException.INVALID_STATE_ERR = 7;

/**
 * @see http://www.w3.org/TR/file-writer-api/#widl-FileException-SYNTAX_ERR
 * @type {number}
 */
FileException.prototype.SYNTAX_ERR = 8;

/** @type {number} */
FileException.SYNTAX_ERR = 8;

/**
 * @see http://www.w3.org/TR/file-system-api/#widl-FileException-INVALID_MODIFICATION_ERR
 * @type {number}
 */
FileException.prototype.INVALID_MODIFICATION_ERR = 9;

/** @type {number} */
FileException.INVALID_MODIFICATION_ERR = 9;

/**
 * @see http://www.w3.org/TR/file-system-api/#widl-FileException-QUOTA_EXCEEDED_ERR
 * @type {number}
 */
FileException.prototype.QUOTA_EXCEEDED_ERR = 10;

/** @type {number} */
FileException.QUOTA_EXCEEDED_ERR = 10;

/**
 * @see http://www.w3.org/TR/file-system-api/#widl-FileException-TYPE_MISMATCH_ERR
 * @type {number}
 */
FileException.prototype.TYPE_MISMATCH_ERR = 11;

/** @type {number} */
FileException.TYPE_MISMATCH_ERR = 11;

/**
 * @see http://www.w3.org/TR/file-system-api/#widl-FileException-PATH_EXISTS_ERR
 * @type {number}
 */
FileException.prototype.PATH_EXISTS_ERR = 12;

/** @type {number} */
FileException.PATH_EXISTS_ERR = 12;

/**
 * @see http://www.w3.org/TR/FileAPI/#dfn-code-exception
 * @type {number}
 */
FileException.prototype.code;
