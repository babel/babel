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
 * @fileoverview External declarations for common container JS.
 *
 * TODO(uix-eng): May want a way to conveniently generate this externs to avoid
 * manual changes when we merge Shindig.
 *
 * @externs
 */


google.container = {};

////////////////////////////////////////////////////////////////////////////////
// Externs from container.js
////////////////////////////////////////////////////////////////////////////////

google.container.ContainerConfig = {};

google.container.ContainerRender = {};

/**
 * @param {Object} config
 * @constructor
 */
google.container.Container = function(config) {};

/**
 * @param {Object=} opt_config
 */
google.container.Container.prototype.onConstructed = function(opt_config) {};

/**
 * Create a new gadget site.
 * @param {Element} gadgetEl
 * @param {Element=} opt_bufferEl
 * @return {google.container.GadgetSite}
 */
google.container.Container.prototype.newGadgetSite = function(gadgetEl,
    opt_bufferEl) {};

/**
 * @param {string} id
 * @return {google.container.GadgetSite}
 * @nosideeffects
 */
google.container.Container.prototype.getGadgetSite = function(id) {};

/**
 * @param {string} id
 * @return {google.container.GadgetHolder}
 * @nosideeffects
 */
google.container.Container.prototype.getGadgetHolder = function(id) {};

/**
 * @param {google.container.GadgetSite} site
 * @param {string} gadgetUrl
 * @param {Object} gadgetParams
 * @param {Object} renderParams
 * @param {Function=} opt_callback
 */
google.container.Container.prototype.navigateGadget = function(
    site, gadgetUrl, gadgetParams, renderParams, opt_callback) {};

/**
 * @param {google.container.GadgetSite} site
 */
google.container.Container.prototype.closeGadget = function(site) {};

/**
 * @param {Object} request
 */
google.container.Container.prototype.preloadGadgets = function(request) {};

/**
 * @param {string} url
 * @param {function(Object)=} opt_callback
 */
google.container.Container.prototype.getGadgetMetadata = function(url,
    opt_callback) {};

////////////////////////////////////////////////////////////////////////////////
// Externs from gadget_site.js
////////////////////////////////////////////////////////////////////////////////

/**
 * @param {google.container.Service} service
 * @param {Element} gadgetEl
 * @param {Element=} opt_bufferEl
 * @constructor
 */
google.container.GadgetSite = function(service, gadgetEl, opt_bufferEl) {};

google.container.GadgetSite.prototype.onConstructed = function() {};

/**
 * @param {number} height
 */
google.container.GadgetSite.prototype.setHeight = function(height) {};

/**
 * @param {number} width
 */
google.container.GadgetSite.prototype.setWidth = function(width) {};

/**
 * @param {number} value
 */
google.container.GadgetSite.prototype.setParentId = function(value) {};

/**
 * @return {number}
 * @nosideeffects
 */
google.container.GadgetSite.prototype.getId = function() {};

/**
 * @return {google.container.GadgetHolder}
 * @nosideeffects
 */
google.container.GadgetSite.prototype.getActiveGadgetHolder = function() {};

/**
 * @param {string} name
 * @param {Object=} opt_gadgetInfo
 * @return {Object}
 * @nosideeffects
 */
google.container.GadgetSite.prototype.getFeature = function(name,
    opt_gadgetInfo) {};

/**
 * @param {string} id
 * @return {google.container.GadgetHolder}
 * @nosideeffects
 */
google.container.GadgetSite.prototype.getGadgetHolder = function(id) {};

/**
 * @return {string}
 * @nosideeffects
 */
google.container.GadgetSite.prototype.getParentId = function() {};

/**
 * @param {string} gadgetUrl
 * @param {Object} gadgetParams
 * @param {Object} renderParams
 * @param {Function=} opt_callback
 */
google.container.GadgetSite.prototype.navigateTo = function(gadgetUrl,
    gadgetParams, renderParams, opt_callback) {};

/**
 * @param {Object} gadgetInfo
 * @param {Object} gadgetParams
 * @param {Object} renderParams
 */
google.container.GadgetSite.prototype.render = function(
    gadgetInfo, gadgetParams, renderParams) {};

/**
 * @param {string} serviceName
 * @param {Function} callback
 * @param {...number} var_args
 */
google.container.GadgetSite.prototype.rpcCall = function(serviceName, callback,
    var_args) {};

google.container.GadgetSite.prototype.close = function() {};

////////////////////////////////////////////////////////////////////////////////
// Externs from gadget_holder.js
////////////////////////////////////////////////////////////////////////////////

/**
 * @param {number} siteId
 * @param {Element} el
 * @constructor
 */
google.container.GadgetHolder = function(siteId, el) {};

google.container.GadgetHolder.prototype.onConstructed = function() {};

/**
 * @return {Element}
 * @nosideeffects
 */
google.container.GadgetHolder.prototype.getElement = function() {};

/**
 * @return {string}
 * @nosideeffects
 */
google.container.GadgetHolder.prototype.getIframeId = function() {};

/**
 * @return {Object}
 * @nosideeffects
 */
google.container.GadgetHolder.prototype.getGadgetInfo = function() {};

google.container.GadgetHolder.prototype.dispose = function() {};

/**
 * @return {string}
 * @nosideeffects
 */
google.container.GadgetHolder.prototype.getUrl = function() {};

/**
 * @return {string}
 * @nosideeffects
 */
google.container.GadgetHolder.prototype.getView = function() {};

/**
 * @return {Element}
 * @nosideeffects
 */
google.container.GadgetHolder.prototype.getIframeElement = function() {};

/**
 * @param {string} value
 */
google.container.GadgetHolder.prototype.setSecurityToken = function(value) {};

/**
 * @param {Object} gadgetInfo
 * @param {Object} gadgetParams
 * @param {Object} renderParams
 */
google.container.GadgetHolder.prototype.render = function(gadgetInfo,
    gadgetParams, renderParams) {};

////////////////////////////////////////////////////////////////////////////////
// Externs from service.js
////////////////////////////////////////////////////////////////////////////////

google.container.ServiceConfig = {};

/**
 * @param {Object=} opt_config
 * @constructor
 */
google.container.Service = function(opt_config) {};

/**
 * @param {Object} request
 * @param {function(Object)=} opt_callback
 */
google.container.Service.prototype.getGadgetMetadata = function(request,
    opt_callback) {};

/**
 * @param {Object} request
 * @param {function(Object)=} opt_callback
 */
google.container.Service.prototype.getGadgetToken = function(request,
    opt_callback) {};

/**
 * @param {string} url
 * @return {Object}
 */
google.container.Service.prototype.getCachedGadgetMetadata = function(url) {};

/**
 * @param {string} url
 * @return {Object}
 */
google.container.Service.prototype.getCachedGadgetToken = function(url) {};
