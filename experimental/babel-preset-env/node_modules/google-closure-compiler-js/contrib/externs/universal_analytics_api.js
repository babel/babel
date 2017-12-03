/*
 * Copyright 2010 The Closure Compiler Authors.
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
 * Universal Analytics externs.
 * @see https://developers.google.com/analytics/devguides/collection/analyticsjs/method-reference
 * @externs
 */

/**
 * @interface
 */
var _ua_tracker = function() {};

/**
 * Retrieves a field from this tracker's model.
 *
 * @param {string} name Name of the field to return.
 * @return {*} The value associated with the given name.
 */
_ua_tracker.prototype.get = function(name) {};

/**
 * Updates one of more fields. This method accepts two formats for its
 * parameter list. To update a single field, the following form may be used:
 *
 *     set(name, value)
 *
 * To update multiple fields at once, an Object form is also available:
 *
 *     set({'field1': 'value1', 'field2', 'value2'});
 *
 * @param {string|!Object} nameOrObj Name of the field to update or an Object
 *     containing multiple field names and values to update.
 * @param {*} value The value to set. This parameter is ignored when the first
 *     parameter is an Object.
 */
_ua_tracker.prototype.set = function(nameOrObj, value) {};

/**
 * Sends a tracking beacon.
 *
 * This method provides a variety of acceptable parameters. In the simplest
 * format, users may invoke this method with a single object parameter and all
 * fields from that object will be copied into the model as temporary fields.
 *
 * Alternatively, users may call this method using positional parameters. In
 * that case, the first parameter is always interpreted as hitType, while the
 * remaining parameters are interpreted based on the provided hitType.
 *
 * All positional parameters are optional. Additionally the final parameter in
 * any call is allowed to be an object of fields to copy.
 *
 * @param {...} var_args Arguments.
 */
_ua_tracker.prototype.send = function(var_args) {};

/**
 * Universal Analytics main ga object.
 * @param {...*} var_args
 * @return {undefined}
 */
var ga = function(var_args) {};

/**
 * Creates a new Tracker object. If a tracker with the same name already
 * exists, this method will return the existing tracker instead.
 *
 * @param {...*} var_args Argument list.
 * @return {!_ua_tracker} The newly created tracker object.
 */
ga.create = function(var_args) {};

/**
 * Returns a tracker object with the given name, or undefined if no matching
 * tracker object was found.
 *
 * @param {string} name Name of the tracker object to retrieve.
 * @return {!_ua_tracker|undefined} The tracker object with the given name.
 */
ga.getByName = function(name) {};

/**
 * Returns an array of Tracker objects in the order they were created.
 *
 * @return {!Array.<!_ua_tracker>} An array of tracker objects.
 */
ga.getAll = function() {};

/**
 * Utility function that prints the contents of each tracker's model.
 * @return {undefined}
 */
ga.dump = function() {};
