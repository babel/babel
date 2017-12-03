/*
 * Copyright 2010 Google Inc.
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
 * @fileoverview Externs file for OpenSocial shindig libraries.
 * Note this may not be comprehensive.
 *
 * @see http://incubator.apache.org/shindig/shindig-1.1.x/shindig-features/jsdoc
 * @externs
 */

// Root namespace for shindig related functionality.
var shindig = {};

/**
 * Implements a safer random() method that is seeded from
 * screen width/height and (presumably random/unguessable) mouse
 * movement, in an effort to create a better seed for random().
 * @return {number} The random number.
 */
shindig.random = function() {};

/**
 * Implements a SHA1 hasher.
 * @return {{reset: function(), update:
 * function((Array<number>|string),number=), digest:
 * function():Array<number>, digestString: function():string}} SHA1
 * hasher object. Methods of the returned object are: reset() which
 * resets the internal accumulator, update(bytes, opt_length) which
 * adds a byte array or string to the internal accumulator (or
 * optionally just a prefix of length opt_length), digest() which
 * returns a finalized hash as an array of 20 byte values, and
 * digestString() which returns a hex-encoded string containing a
 * finalized hash.
 */
shindig.sha1 = function() {};
