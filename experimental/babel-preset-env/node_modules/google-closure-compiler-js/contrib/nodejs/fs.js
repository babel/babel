/*
 * Copyright 2012 The Closure Compiler Authors.
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
 * @fileoverview Definitions for node's fs module. Depends on the stream and events module.
 * @see http://nodejs.org/api/fs.html
 * @see https://github.com/joyent/node/blob/master/lib/fs.js
 */

var events = require('events');
var stream = require('stream');

/** @const */
var fs = {};

/**
 * @param {string} oldPath
 * @param {string} newPath
 * @param {function(...)=} callback
 * @return {void}
 */
fs.rename;

/**
 * @param {string} oldPath
 * @param {string} newPath
 * @return {void}
 */
fs.renameSync;

/**
 * @param {*} fd
 * @param {number} len
 * @param {function(...)=} callback
 * @return {void}
 */
fs.truncate;

/**
 * @param {*} fd
 * @param {number} len
 * @return {void}
 */
fs.truncateSync;

/**
 * @param {string} path
 * @param {number} uid
 * @param {number} gid
 * @param {function(...)=} callback
 * @return {void}
 */
fs.chown;

/**
 * @param {string} path
 * @param {number} uid
 * @param {number} gid
 * @return {void}
 */
fs.chownSync;

/**
 * @param {*} fd
 * @param {number} uid
 * @param {number} gid
 * @param {function(...)=} callback
 * @return {void}
 */
fs.fchown;

/**
 * @param {*} fd
 * @param {number} uid
 * @param {number} gid
 * @return {void}
 */
fs.fchownSync;

/**
 * @param {string} path
 * @param {number} uid
 * @param {number} gid
 * @param {function(...)=} callback
 * @return {void}
 */
fs.lchown;

/**
 * @param {string} path
 * @param {number} uid
 * @param {number} gid
 * @return {void}
 */
fs.lchownSync;

/**
 * @param {string} path
 * @param {number} mode
 * @param {function(...)=} callback
 * @return {void}
 */
fs.chmod;

/**
 * @param {string} path
 * @param {number} mode
 * @return {void}
 */
fs.chmodSync;

/**
 * @param {*} fd
 * @param {number} mode
 * @param {function(...)=} callback
 * @return {void}
 */
fs.fchmod;

/**
 * @param {*} fd
 * @param {number} mode
 * @return {void}
 */
fs.fchmodSync;

/**
 * @param {string} path
 * @param {number} mode
 * @param {function(...)=} callback
 * @return {void}
 */
fs.lchmod;

/**
 * @param {string} path
 * @param {number} mode
 * @return {void}
 */
fs.lchmodSync;

/**
 * @param {string} path
 * @param {function(string, fs.Stats)=} callback
 * @return {void}
 */
fs.stat;

/**
 * @param {string} path
 * @return {fs.Stats}
 * @nosideeffects
 */
fs.statSync = function(path) {}

/**
 * @param {*} fd
 * @param {function(string, fs.Stats)=} callback
 * @return {void}
 */
fs.fstat;

/**
 * @param {*} fd
 * @return {fs.Stats}
 * @nosideeffects
 */
fs.fstatSync = function(fd) {}

/**
 * @param {string} path
 * @param {function(string, fs.Stats)=} callback
 * @return {void}
 */
fs.lstat;

/**
 * @param {string} path
 * @return {fs.Stats}
 * @nosideeffects
 */
fs.lstatSync = function(path) {}

/**
 * @param {string} srcpath
 * @param {string} dstpath
 * @param {function(...)=} callback
 * @return {void}
 */
fs.link;

/**
 * @param {string} srcpath
 * @param {string} dstpath
 * @return {void}
 */
fs.linkSync;

/**
 * @param {string} srcpath
 * @param {string} dstpath
 * @param {string=} type
 * @param {function(...)=} callback
 * @return {void}
 */
fs.symlink;

/**
 * @param {string} srcpath
 * @param {string} dstpath
 * @param {string=} type
 * @return {void}
 */
fs.symlinkSync;

/**
 * @param {string} path
 * @param {function(string, string)=} callback
 * @return {void}
 */
fs.readlink;

/**
 * @param {string} path
 * @return {string}
 * @nosideeffects
 */
fs.readlinkSync;

/**
 * @param {string} path
 * @param {Object.<string,string>|function(string, string)=} cache
 * @param {function(string, string)=} callback
 * @return {void}
 */
fs.realpath;

/**
 * @param {string} path
 * @param {Object.<string,string>=} cache
 * @return {string}
 * @nosideeffects
 */
fs.realpathSync;

/**
 * @param {string} path
 * @param {function(...)=} callback
 * @return {void}
 */
fs.unlink;

/**
 * @param {string} path
 * @return {void}
 */
fs.unlinkSync;

/**
 * @param {string} path
 * @param {function(...)=} callback
 * @return {void}
 */
fs.rmdir;

/**
 * @param {string} path
 * @return {void}
 */
fs.rmdirSync;

/**
 * @param {string} path
 * @param {number=} mode
 * @param {function(...)=} callback
 * @return {void}
 */
fs.mkdir;

/**
 * @param {string} path
 * @param {number=} mode
 * @return {void}
 */
fs.mkdirSync;

/**
 * @param {string} path
 * @param {function(string,Array.<string>)=} callback
 * @return {void}
 */
fs.readdir;

/**
 * @param {string} path
 * @return {Array.<string>}
 * @nosideeffects
 */
fs.readdirSync;

/**
 * @param {*} fd
 * @param {function(...)=} callback
 * @return {void}
 */
fs.close;

/**
 * @param {*} fd
 * @return {void}
 */
fs.closeSync;

/**
 * @param {string} path
 * @param {string} flags
 * @param {number=} mode
 * @param {function(string, *)=} callback
 * @return {void}
 */
fs.open;

/**
 * @param {string} path
 * @param {string} flags
 * @param {number=} mode
 * @return {*}
 * @nosideeffects
 */
fs.openSync;

/**
 * @param {string} path
 * @param {number|Date} atime
 * @param {number|Date} mtime
 * @param {function(...)=} callback
 * @return {void}
 */
fs.utimes;

/**
 * @param {string} path
 * @param {number|Date} atime
 * @param {number|Date} mtime
 * @return {void}
 */
fs.utimesSync;

/**
 * @param {*} fd
 * @param {number|Date} atime
 * @param {number|Date} mtime
 * @param {function(...)=} callback
 * @return {void}
 */
fs.futimes;

/**
 * @param {*} fd
 * @param {number|Date} atime
 * @param {number|Date} mtime
 * @return {void}
 */
fs.futimesSync;

/**
 * @param {*} fd
 * @param {function(...)=} callback
 * @return {void}
 */
fs.fsync;

/**
 * @param {*} fd
 * @return {void}
 */
fs.fsyncSync;

/**
 * @param {*} fd
 * @param {*} buffer
 * @param {number} offset
 * @param {number} length
 * @param {number} position
 * @param {function(string, number, *)=} callback
 * @return {void}
 */
fs.write;

/**
 * @param {*} fd
 * @param {*} buffer
 * @param {number} offset
 * @param {number} length
 * @param {number} position
 * @return {number}
 */
fs.writeSync;

/**
 * @param {*} fd
 * @param {*} buffer
 * @param {number} offset
 * @param {number} length
 * @param {number} position
 * @param {function(string, number, *)=} callback
 * @return {void}
 */
fs.read;

/**
 * @param {*} fd
 * @param {*} buffer
 * @param {number} offset
 * @param {number} length
 * @param {number} position
 * @return {number}
 * @nosideeffects
 */
fs.readSync;

/**
 * @param {string} filename
 * @param {string|function(string, *)=}encoding
 * @param {function(string, *)=} callback
 * @return {void}
 */
fs.readFile;

/**
 * @param {string} filename
 * @param {string=} encoding
 * @return {string|Buffer}
 * @nosideeffects
 */
fs.readFileSync;

/**
 * @param {string} filename
 * @param {*} data
 * @param {string|function(string)=} encoding
 * @param {function(string)=} callback
 * @return {void}
 */
fs.writeFile;

/**
 * @param {string} filename
 * @param {*} data
 * @param {string=} encoding
 * @return {void}
 */
fs.writeFileSync;

/**
 * @param {string} filename
 * @param {*} data
 * @param {string|function(string)=} encoding
 * @param {function(string)=} callback
 * @return {void}
 */
fs.appendFile;

/**
 * @param {string} filename
 * @param {*} data
 * @param {string|function(string)=} encoding
 * @return {void}
 */
fs.appendFileSync;

/**
 * @param {string} filename
 * @param {{persistent: boolean, interval: number}|function(*,*)=} options
 * @param {function(*,*)=} listener
 * @return {void}
 */
fs.watchFile;

/**
 * @param {string} filename
 * @param {function(string, string)=} listener
 * @return {void}
 */
fs.unwatchFile;

/**
 *
 * @param {string} filename
 * @param {{persistent: boolean}|function(string, string)=} options
 * @param {function(string, string)=} listener
 * @return {fs.FSWatcher}
 */
fs.watch;

/**
 * @param {string} path
 * @param {function(boolean)} callback
 * @return {void}
 */
fs.exists;

/**
 * @param {string} path
 * @return {boolean}
 * @nosideeffects
 */
fs.existsSync;

/**
 * @constructor
 */
fs.Stats = function () {};

/**
 * @return {boolean}
 * @nosideeffects
 */
fs.Stats.prototype.isFile;

/**
 * @return {boolean}
 * @nosideeffects
 */
fs.Stats.prototype.isDirectory;

/**
 * @return {boolean}
 * @nosideeffects
 */
fs.Stats.prototype.isBlockDevice;

/**
 * @return {boolean}
 * @nosideeffects
 */
fs.Stats.prototype.isCharacterDevice;

/**
 * @return {boolean}
 * @nosideeffects
 */
fs.Stats.prototype.isSymbolicLink;

/**
 * @return {boolean}
 * @nosideeffects
 */
fs.Stats.prototype.isFIFO;

/**
 * @return {boolean}
 * @nosideeffects
 */
fs.Stats.prototype.isSocket;

/**
 * @type {number}
 */
fs.Stats.prototype.dev = 0;

/**
 * @type {number}
 */
fs.Stats.prototype.ino = 0;

/**
 * @type {number}
 */
fs.Stats.prototype.mode = 0;

/**
 * @type {number}
 */
fs.Stats.prototype.nlink = 0;

/**
 * @type {number}
 */
fs.Stats.prototype.uid = 0;

/**
 * @type {number}
 */
fs.Stats.prototype.gid = 0;

/**
 * @type {number}
 */
fs.Stats.prototype.rdev = 0;

/**
 * @type {number}
 */
fs.Stats.prototype.size = 0;

/**
 * @type {number}
 */
fs.Stats.prototype.blkSize = 0;

/**
 * @type {number}
 */
fs.Stats.prototype.blocks = 0;

/**
 * @type {Date}
 */
fs.Stats.prototype.atime;

/**
 * @type {Date}
 */
fs.Stats.prototype.mtime;

/**
 * @type {Date}
 */
fs.Stats.prototype.ctime;

/**
 * @param {string} path
 * @param {{flags: string, encoding: ?string, fd: *, mode: number, bufferSize: number}=} options
 * @return {fs.ReadStream}
 * @nosideeffects
 */
fs.createReadStream;

/**
 * @constructor
 * @extends stream.ReadableStream
 */
fs.ReadStream = function () {};

/**
 * @param {string} path
 * @param {{flags: string, encoding: ?string, mode: number}=} options
 * @return {fs.WriteStream}
 * @nosideeffects
 */
fs.createWriteStream;

/**
 * @constructor
 * @extends stream.WritableStream
 */
fs.WriteStream = function () {};

/**
 * @constructor
 * @extends events.EventEmitter
 */
fs.FSWatcher = function () {};

/**
 * @return {void}
 */
fs.FSWatcher.prototype.close;
