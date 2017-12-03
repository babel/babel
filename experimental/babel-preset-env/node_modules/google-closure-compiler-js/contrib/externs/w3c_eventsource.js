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
 * @fileoverview Definitions for W3C's EventSource API.
 * @see http://www.w3.org/TR/eventsource/
 *
 * @externs
 */

/**
 * @constructor
 * @implements {EventTarget}
 * @param {string} url
 * @param {Object=} opt_eventSourceInitDict
 */
function EventSource(url, opt_eventSourceInitDict) {}

/** @override */
EventSource.prototype.addEventListener = function(type, listener, opt_options) {
};

/** @override */
EventSource.prototype.removeEventListener = function(
    type, listener, opt_options) {};

/** @override */
EventSource.prototype.dispatchEvent = function(evt) {};

/**
 * @type {string}
 * @const
 */
EventSource.prototype.url;

/** @type {boolean} */
EventSource.prototype.withCredentials;

/**
 * @type {number}
 * @const
 */
EventSource.prototype.CONNECTING = 0;

/**
 * @type {number}
 * @const
 */
EventSource.prototype.OPEN = 1;

/**
 * @type {number}
 * @const
 */
EventSource.prototype.CLOSED = 2;

/**
 * @type {number}
 * @const
 */
EventSource.prototype.readyState;

/**
 * @type {?function(!Event)}
 */
EventSource.prototype.onopen = function(e) {};

/**
 * @type {?function(!MessageEvent<*>)}
 */
EventSource.prototype.onmessage = function(e) {};

/**
 * @type {?function(!Event)}
 */
EventSource.prototype.onerror = function(e) {};

/**
 * @type {function()}
 */
EventSource.prototype.close = function() {};
