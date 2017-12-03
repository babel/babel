/*
 * Copyright 2017 The Closure Compiler Authors
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
 * @fileoverview Definitions for globals in Safari.  This file describes the
 * externs API for the safari.* object when running in a normal browser
 * context.
 * @see https://developer.apple.com/library/content/documentation/NetworkingInternet/Conceptual/NotificationProgrammingGuideForWebsites/PushNotifications/PushNotifications.html#//apple_ref/doc/uid/TP40013225-CH3-SW1
 * @externs
 */


/**
 * namespace
 * @const
 */
var safari = {};


/**
 * @typedef {{permission: (string), deviceToken: (string|undefined)}}
 */
var PermissionObject;


/**
 * @const
 */
safari.pushNotification = {};


/**
 * @param {string} websitePushID
 * @return {!PermissionObject}
 */
safari.pushNotification.permission = function(websitePushID) {};


/**
 * @param {string} url
 * @param {string} websitePushID
 * @param {!Object<string, string>} userInfo
 * @param {function(!PermissionObject)} callback
 */
safari.pushNotification.requestPermission = function(url, websitePushID, userInfo, callback) {};
