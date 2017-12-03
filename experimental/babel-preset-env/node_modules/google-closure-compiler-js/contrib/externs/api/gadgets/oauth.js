/*
 * Copyright 2009 Google Inc.
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
 * @fileoverview Externs file for OAuth specific functionality in the OpenSocial
 * gadget libraries. Note this may not be comprehensive.
 * @see http://code.google.com/apis/gadgets/docs/oauth.html
 * @externs
 */


// Namespace for OAuth
gadgets.oauth = {};


/**
 * An OAuth popup for granting one time access to user data.
 * @param {string} destination Target URL for the popup window.
 * @param {string} windowOptions Options for window.open, used to specify
 *     look and feel of the window.
 * @param {Function} openCallback Function to call when the window is
 *     opened.
 * @param {Function} closeCallback Function to call when the window is
 *     closed.
 * @constructor
 */
gadgets.oauth.Popup = function(destination, windowOptions,
                               openCallback, closeCallback) {};

/**
 * @return {Function} An onclick handler for the "open the approval window"
 *     link
 */
gadgets.oauth.Popup.prototype.createOpenerOnClick = function() {};

/**
 * @return {Function} An onclick handler for the "I've approved" link.
 *     This may not ever be called. If we successfully detect that the
 *     window was closed, this link is unnecessary.
 */
gadgets.oauth.Popup.prototype.createApprovedOnClick = function() {};

