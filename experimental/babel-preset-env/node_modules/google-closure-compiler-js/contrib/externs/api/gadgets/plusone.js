/*
 * Copyright 2011 Google Inc.
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
 * @fileoverview Extern declarations for namespaces and functions that the
 * plusone widget defines.
 *
 * Contact sandbar-eng@google.com for any changes.
 *
 * @see https://code.google.com/apis/+1button/#jsapi
 * @externs
 */

/**
 * Namespace associated with Google APIs.
 * @suppress {duplicate}
 */
var gapi = {};


/**
 * Namespace associated with Plusone API.
 * @type {Object}
 */
gapi.plusone = {};


/**
 * This renders all +1 tags/classes in the specified container, which may be
 * either an element (by value) or a string element ID. This function would be
 * used only if the <script> tag sets parsetags to explicit, which you might do
 * for performance reasons.
 * @param {(Element|string)=} opt_container The container for which to render +1 buttons.
 *     If the container parameter is omitted, all +1 tags and classes on the
 *     page will be rendered.
 */
gapi.plusone.go = function(opt_container) {};


/**
 * This renders a +1 button widget within the specified container element.
 * @param {Element|string} id An element by value or a string element ID.
 * @param {Object} params +1 tag parameters.
 */
gapi.plusone.render = function(id, params) {};


/**
 * Container to define user supplied configuration for the plusone button.
 */
var ___gcfg = {};
