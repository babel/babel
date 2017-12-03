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
 * @fileoverview Externs needed for Silverlight.
 * @externs
 * @author nicksantos@google.com (Nick Santos)
 */

/**
 * @constructor
 * @see http://msdn.microsoft.com/en-us/library/bb980101(v=VS.95).aspx
 */
function SilverlightPlugin() {}

SilverlightPlugin.prototype.createFromXaml;

SilverlightPlugin.prototype.createFromXamlDownloader;

SilverlightPlugin.prototype.createObject;

SilverlightPlugin.prototype.findName;

SilverlightPlugin.prototype.getSystemGlyphTypefaces;

SilverlightPlugin.prototype.isVersionSupported;

SilverlightPlugin.prototype.accessibility;

SilverlightPlugin.prototype.actualHeight;

SilverlightPlugin.prototype.actualWidth;

SilverlightPlugin.prototype.background;

SilverlightPlugin.prototype.enableAutoZoom;

SilverlightPlugin.prototype.enableFramerateCounter;

SilverlightPlugin.prototype.enableHtmlAccess;

SilverlightPlugin.prototype.enableRedrawRegions;

/** @deprecated */
SilverlightPlugin.prototype.framerate;

SilverlightPlugin.prototype.fullScreen;

/** @deprecated */
SilverlightPlugin.prototype.ignoreBrowserVer;

SilverlightPlugin.prototype.initParams;

/** @deprecated */
SilverlightPlugin.prototype.inplaceInstallPrompt;

SilverlightPlugin.prototype.isLoaded;

/** @deprecated */
SilverlightPlugin.prototype.isWindowless;

SilverlightPlugin.prototype.maxFramerate;

SilverlightPlugin.prototype.root;

SilverlightPlugin.prototype.source;

SilverlightPlugin.prototype.windowless;

SilverlightPlugin.prototype.onerror;

SilverlightPlugin.prototype.onfullscreenchanged;

SilverlightPlugin.prototype.onload;

SilverlightPlugin.prototype.onresize;

SilverlightPlugin.prototype.onzoom;

/**
 * @constructor
 * @see http://msdn.microsoft.com/en-us/library/bb980127(v=VS.95).aspx
 */
function SilverlightDependencyObject() {}

SilverlightErrorEventArgs.prototype.findName;

/** @return {SilverlightPlugin} */
SilverlightErrorEventArgs.prototype.getHost;

/**
 * @constructor
 * @extends {SilverlightDependencyObject}
 * @see http://msdn.microsoft.com/en-us/library/bb979960(v=VS.95).aspx
 */
function SilverlightErrorEventArgs() {}

SilverlightErrorEventArgs.prototype.equals;

SilverlightErrorEventArgs.prototype.getValue;

SilverlightErrorEventArgs.prototype.setValue;

SilverlightErrorEventArgs.prototype.errorCode;

SilverlightErrorEventArgs.prototype.errorMessage;

SilverlightErrorEventArgs.prototype.errorType;

SilverlightErrorEventArgs.prototype.name;

/**
 * @constructor
 * @extends {SilverlightErrorEventArgs}
 * @see http://msdn.microsoft.com/en-us/library/bb979960(v=VS.95).aspx
 */
function SilverlightRuntimeErrorEventArgs() {}

SilverlightRuntimeErrorEventArgs.prototype.charPosition;

SilverlightRuntimeErrorEventArgs.prototype.lineNumber;

SilverlightRuntimeErrorEventArgs.prototype.methodName;

/**
 * @constructor
 * @extends {SilverlightErrorEventArgs}
 * @see http://msdn.microsoft.com/en-us/library/bb980114(v=VS.95).aspx
 */
function SilverlightParserErrorEventArgs() {}

SilverlightParserErrorEventArgs.prototype.charPosition;

SilverlightParserErrorEventArgs.prototype.lineNumber;

SilverlightParserErrorEventArgs.prototype.xamlFile;

SilverlightParserErrorEventArgs.prototype.xmlAttribute;

SilverlightParserErrorEventArgs.prototype.xmlElement;
