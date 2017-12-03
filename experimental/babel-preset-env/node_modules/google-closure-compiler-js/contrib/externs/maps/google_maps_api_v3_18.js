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
 * @fileoverview Externs for the Google Maps v3.18 API.
 * @see http://code.google.com/apis/maps/documentation/javascript/reference.html
 * @externs
 */

google.maps = {};

/**
 * @enum {number}
 */
google.maps.Animation = {
  BOUNCE: 1,
  DROP: 2
};

/**
 * @interface
 */
google.maps.Attribution = function() {};

/**
 * @type {string}
 */
google.maps.Attribution.prototype.iosDeepLinkId;

/**
 * @type {string}
 */
google.maps.Attribution.prototype.source;

/**
 * @type {string}
 */
google.maps.Attribution.prototype.webUrl;

/**
 * @extends {google.maps.MVCObject}
 * @constructor
 */
google.maps.BicyclingLayer = function() {};

/**
 * @nosideeffects
 * @return {google.maps.Map}
 */
google.maps.BicyclingLayer.prototype.getMap = function() {};

/**
 * @param {google.maps.Map} map
 * @return {undefined}
 */
google.maps.BicyclingLayer.prototype.setMap = function(map) {};

/**
 * @param {(google.maps.CircleOptions|Object.<string>)=} opt_opts
 * @extends {google.maps.MVCObject}
 * @constructor
 */
google.maps.Circle = function(opt_opts) {};

/**
 * @nosideeffects
 * @return {google.maps.LatLngBounds}
 */
google.maps.Circle.prototype.getBounds = function() {};

/**
 * @nosideeffects
 * @return {google.maps.LatLng}
 */
google.maps.Circle.prototype.getCenter = function() {};

/**
 * @nosideeffects
 * @return {boolean}
 */
google.maps.Circle.prototype.getDraggable = function() {};

/**
 * @nosideeffects
 * @return {boolean}
 */
google.maps.Circle.prototype.getEditable = function() {};

/**
 * @nosideeffects
 * @return {google.maps.Map}
 */
google.maps.Circle.prototype.getMap = function() {};

/**
 * @nosideeffects
 * @return {number}
 */
google.maps.Circle.prototype.getRadius = function() {};

/**
 * @nosideeffects
 * @return {boolean}
 */
google.maps.Circle.prototype.getVisible = function() {};

/**
 * @param {google.maps.LatLng|google.maps.LatLngLiteral} center
 * @return {undefined}
 */
google.maps.Circle.prototype.setCenter = function(center) {};

/**
 * @param {boolean} draggable
 * @return {undefined}
 */
google.maps.Circle.prototype.setDraggable = function(draggable) {};

/**
 * @param {boolean} editable
 * @return {undefined}
 */
google.maps.Circle.prototype.setEditable = function(editable) {};

/**
 * @param {google.maps.Map} map
 * @return {undefined}
 */
google.maps.Circle.prototype.setMap = function(map) {};

/**
 * @param {google.maps.CircleOptions|Object.<string>} options
 * @return {undefined}
 */
google.maps.Circle.prototype.setOptions = function(options) {};

/**
 * @param {number} radius
 * @return {undefined}
 */
google.maps.Circle.prototype.setRadius = function(radius) {};

/**
 * @param {boolean} visible
 * @return {undefined}
 */
google.maps.Circle.prototype.setVisible = function(visible) {};

/**
 * @interface
 */
google.maps.CircleOptions = function() {};

/**
 * @type {google.maps.LatLng}
 */
google.maps.CircleOptions.prototype.center;

/**
 * @type {boolean}
 */
google.maps.CircleOptions.prototype.clickable;

/**
 * @type {boolean}
 */
google.maps.CircleOptions.prototype.draggable;

/**
 * @type {boolean}
 */
google.maps.CircleOptions.prototype.editable;

/**
 * @type {string}
 */
google.maps.CircleOptions.prototype.fillColor;

/**
 * @type {number}
 */
google.maps.CircleOptions.prototype.fillOpacity;

/**
 * @type {google.maps.Map}
 */
google.maps.CircleOptions.prototype.map;

/**
 * @type {number}
 */
google.maps.CircleOptions.prototype.radius;

/**
 * @type {string}
 */
google.maps.CircleOptions.prototype.strokeColor;

/**
 * @type {number}
 */
google.maps.CircleOptions.prototype.strokeOpacity;

/**
 * @type {google.maps.StrokePosition}
 */
google.maps.CircleOptions.prototype.strokePosition;

/**
 * @type {number}
 */
google.maps.CircleOptions.prototype.strokeWeight;

/**
 * @type {boolean}
 */
google.maps.CircleOptions.prototype.visible;

/**
 * @type {number}
 */
google.maps.CircleOptions.prototype.zIndex;

/**
 * @enum {number}
 */
google.maps.ControlPosition = {
  BOTTOM_CENTER: 1,
  BOTTOM_LEFT: 2,
  BOTTOM_RIGHT: 3,
  LEFT_BOTTOM: 4,
  LEFT_CENTER: 5,
  LEFT_TOP: 6,
  RIGHT_BOTTOM: 7,
  RIGHT_CENTER: 8,
  RIGHT_TOP: 9,
  TOP_CENTER: 10,
  TOP_LEFT: 11,
  TOP_RIGHT: 12
};

/**
 * @param {(google.maps.Data.DataOptions|Object.<string>)=} opt_options
 * @extends {google.maps.MVCObject}
 * @constructor
 */
google.maps.Data = function(opt_options) {};

/**
 * @param {google.maps.Data.Feature|google.maps.Data.FeatureOptions|Object.<string>} feature
 * @return {google.maps.Data.Feature}
 */
google.maps.Data.prototype.add = function(feature) {};

/**
 * @param {Object} geoJson
 * @param {(google.maps.Data.GeoJsonOptions|Object.<string>)=} opt_options
 * @return {Array.<google.maps.Data.Feature>}
 */
google.maps.Data.prototype.addGeoJson = function(geoJson, opt_options) {};

/**
 * @param {google.maps.Data.Feature} feature
 * @return {boolean}
 */
google.maps.Data.prototype.contains = function(feature) {};

/**
 * @param {function(google.maps.Data.Feature)} callback
 * @return {undefined}
 */
google.maps.Data.prototype.forEach = function(callback) {};

/**
 * @param {number|string} id
 * @return {google.maps.Data.Feature|undefined}
 */
google.maps.Data.prototype.getFeatureById = function(id) {};

/**
 * @nosideeffects
 * @return {google.maps.Map}
 */
google.maps.Data.prototype.getMap = function() {};

/**
 * @nosideeffects
 * @return {google.maps.Data.StylingFunction|google.maps.Data.StyleOptions|Object.<string>}
 */
google.maps.Data.prototype.getStyle = function() {};

/**
 * @param {string} url
 * @param {(google.maps.Data.GeoJsonOptions|Object.<string>)=} opt_options
 * @return {undefined}
 */
google.maps.Data.prototype.loadGeoJson = function(url, opt_options) {};

/**
 * @param {google.maps.Data.Feature} feature
 * @param {google.maps.Data.StyleOptions|Object.<string>} style
 * @return {undefined}
 */
google.maps.Data.prototype.overrideStyle = function(feature, style) {};

/**
 * @param {google.maps.Data.Feature} feature
 * @return {undefined}
 */
google.maps.Data.prototype.remove = function(feature) {};

/**
 * @param {google.maps.Data.Feature=} opt_feature
 * @return {undefined}
 */
google.maps.Data.prototype.revertStyle = function(opt_feature) {};

/**
 * @param {google.maps.Map} map
 * @return {undefined}
 */
google.maps.Data.prototype.setMap = function(map) {};

/**
 * @param {google.maps.Data.StylingFunction|google.maps.Data.StyleOptions|Object.<string>} style
 * @return {undefined}
 */
google.maps.Data.prototype.setStyle = function(style) {};

/**
 * @param {function(Object)} callback
 * @return {undefined}
 */
google.maps.Data.prototype.toGeoJson = function(callback) {};

/**
 * @interface
 */
google.maps.Data.AddFeatureEvent = function() {};

/**
 * @type {google.maps.Data.Feature}
 */
google.maps.Data.AddFeatureEvent.prototype.feature;

/**
 * @interface
 */
google.maps.Data.DataOptions = function() {};

/**
 * @type {google.maps.Map}
 */
google.maps.Data.DataOptions.prototype.map;

/**
 * @type {google.maps.Data.StylingFunction|google.maps.Data.StyleOptions|Object.<string>}
 */
google.maps.Data.DataOptions.prototype.style;

/**
 * @param {(google.maps.Data.FeatureOptions|Object.<string>)=} opt_options
 * @constructor
 */
google.maps.Data.Feature = function(opt_options) {};

/**
 * @param {function(*, string)} callback
 * @return {undefined}
 */
google.maps.Data.Feature.prototype.forEachProperty = function(callback) {};

/**
 * @nosideeffects
 * @return {google.maps.Data.Geometry}
 */
google.maps.Data.Feature.prototype.getGeometry = function() {};

/**
 * @nosideeffects
 * @return {number|string|undefined}
 */
google.maps.Data.Feature.prototype.getId = function() {};

/**
 * @param {string} name
 * @return {*}
 */
google.maps.Data.Feature.prototype.getProperty = function(name) {};

/**
 * @param {string} name
 * @return {undefined}
 */
google.maps.Data.Feature.prototype.removeProperty = function(name) {};

/**
 * @param {google.maps.Data.Geometry|google.maps.LatLng|google.maps.LatLngLiteral} newGeometry
 * @return {undefined}
 */
google.maps.Data.Feature.prototype.setGeometry = function(newGeometry) {};

/**
 * @param {string} name
 * @param {*} newValue
 * @return {undefined}
 */
google.maps.Data.Feature.prototype.setProperty = function(name, newValue) {};

/**
 * @param {function(Object)} callback
 * @return {undefined}
 */
google.maps.Data.Feature.prototype.toGeoJson = function(callback) {};

/**
 * @interface
 */
google.maps.Data.FeatureOptions = function() {};

/**
 * @type {google.maps.Data.Geometry|google.maps.LatLng|google.maps.LatLngLiteral}
 */
google.maps.Data.FeatureOptions.prototype.geometry;

/**
 * @type {number|string}
 */
google.maps.Data.FeatureOptions.prototype.id;

/**
 * @type {Object}
 */
google.maps.Data.FeatureOptions.prototype.properties;

/**
 * @interface
 */
google.maps.Data.GeoJsonOptions = function() {};

/**
 * @type {string}
 */
google.maps.Data.GeoJsonOptions.prototype.idPropertyName;

/**
 * @constructor
 */
google.maps.Data.Geometry = function() {};

/**
 * @nosideeffects
 * @return {string}
 */
google.maps.Data.Geometry.prototype.getType = function() {};

/**
 * @param {Array.<google.maps.Data.Geometry|google.maps.LatLng|google.maps.LatLngLiteral>} elements
 * @extends {google.maps.Data.Geometry}
 * @constructor
 */
google.maps.Data.GeometryCollection = function(elements) {};

/**
 * @nosideeffects
 * @return {Array.<google.maps.Data.Geometry>}
 */
google.maps.Data.GeometryCollection.prototype.getArray = function() {};

/**
 * @param {number} n
 * @return {google.maps.Data.Geometry}
 */
google.maps.Data.GeometryCollection.prototype.getAt = function(n) {};

/**
 * @nosideeffects
 * @return {number}
 */
google.maps.Data.GeometryCollection.prototype.getLength = function() {};

/**
 * @nosideeffects
 * @return {string}
 * @override
 */
google.maps.Data.GeometryCollection.prototype.getType = function() {};

/**
 * @param {Array.<google.maps.LatLng|google.maps.LatLngLiteral>} elements
 * @extends {google.maps.Data.Geometry}
 * @constructor
 */
google.maps.Data.LineString = function(elements) {};

/**
 * @nosideeffects
 * @return {Array.<google.maps.LatLng>}
 */
google.maps.Data.LineString.prototype.getArray = function() {};

/**
 * @param {number} n
 * @return {google.maps.LatLng}
 */
google.maps.Data.LineString.prototype.getAt = function(n) {};

/**
 * @nosideeffects
 * @return {number}
 */
google.maps.Data.LineString.prototype.getLength = function() {};

/**
 * @nosideeffects
 * @return {string}
 * @override
 */
google.maps.Data.LineString.prototype.getType = function() {};

/**
 * @param {Array.<google.maps.LatLng|google.maps.LatLngLiteral>} elements
 * @extends {google.maps.Data.Geometry}
 * @constructor
 */
google.maps.Data.LinearRing = function(elements) {};

/**
 * @nosideeffects
 * @return {Array.<google.maps.LatLng>}
 */
google.maps.Data.LinearRing.prototype.getArray = function() {};

/**
 * @param {number} n
 * @return {google.maps.LatLng}
 */
google.maps.Data.LinearRing.prototype.getAt = function(n) {};

/**
 * @nosideeffects
 * @return {number}
 */
google.maps.Data.LinearRing.prototype.getLength = function() {};

/**
 * @nosideeffects
 * @return {string}
 * @override
 */
google.maps.Data.LinearRing.prototype.getType = function() {};

/**
 * @extends {google.maps.MouseEvent}
 * @constructor
 */
google.maps.Data.MouseEvent = function() {};

/**
 * @type {google.maps.Data.Feature}
 */
google.maps.Data.MouseEvent.prototype.feature;

/**
 * @param {Array.<google.maps.Data.LineString|Array.<google.maps.LatLng|google.maps.LatLngLiteral>>} elements
 * @extends {google.maps.Data.Geometry}
 * @constructor
 */
google.maps.Data.MultiLineString = function(elements) {};

/**
 * @nosideeffects
 * @return {Array.<google.maps.Data.LineString>}
 */
google.maps.Data.MultiLineString.prototype.getArray = function() {};

/**
 * @param {number} n
 * @return {google.maps.Data.LineString}
 */
google.maps.Data.MultiLineString.prototype.getAt = function(n) {};

/**
 * @nosideeffects
 * @return {number}
 */
google.maps.Data.MultiLineString.prototype.getLength = function() {};

/**
 * @nosideeffects
 * @return {string}
 * @override
 */
google.maps.Data.MultiLineString.prototype.getType = function() {};

/**
 * @param {Array.<google.maps.LatLng|google.maps.LatLngLiteral>} elements
 * @extends {google.maps.Data.Geometry}
 * @constructor
 */
google.maps.Data.MultiPoint = function(elements) {};

/**
 * @nosideeffects
 * @return {Array.<google.maps.LatLng>}
 */
google.maps.Data.MultiPoint.prototype.getArray = function() {};

/**
 * @param {number} n
 * @return {google.maps.LatLng}
 */
google.maps.Data.MultiPoint.prototype.getAt = function(n) {};

/**
 * @nosideeffects
 * @return {number}
 */
google.maps.Data.MultiPoint.prototype.getLength = function() {};

/**
 * @nosideeffects
 * @return {string}
 * @override
 */
google.maps.Data.MultiPoint.prototype.getType = function() {};

/**
 * @param {Array.<google.maps.Data.Polygon|Array.<google.maps.Data.LinearRing|Array.<google.maps.LatLng|google.maps.LatLngLiteral>>>} elements
 * @extends {google.maps.Data.Geometry}
 * @constructor
 */
google.maps.Data.MultiPolygon = function(elements) {};

/**
 * @nosideeffects
 * @return {Array.<google.maps.Data.Polygon>}
 */
google.maps.Data.MultiPolygon.prototype.getArray = function() {};

/**
 * @param {number} n
 * @return {google.maps.Data.Polygon}
 */
google.maps.Data.MultiPolygon.prototype.getAt = function(n) {};

/**
 * @nosideeffects
 * @return {number}
 */
google.maps.Data.MultiPolygon.prototype.getLength = function() {};

/**
 * @nosideeffects
 * @return {string}
 * @override
 */
google.maps.Data.MultiPolygon.prototype.getType = function() {};

/**
 * @param {google.maps.LatLng|google.maps.LatLngLiteral} latLng
 * @extends {google.maps.Data.Geometry}
 * @constructor
 */
google.maps.Data.Point = function(latLng) {};

/**
 * @nosideeffects
 * @return {google.maps.LatLng}
 */
google.maps.Data.Point.prototype.get = function() {};

/**
 * @nosideeffects
 * @return {string}
 * @override
 */
google.maps.Data.Point.prototype.getType = function() {};

/**
 * @param {Array.<google.maps.Data.LinearRing|Array.<google.maps.LatLng|google.maps.LatLngLiteral>>} elements
 * @extends {google.maps.Data.Geometry}
 * @constructor
 */
google.maps.Data.Polygon = function(elements) {};

/**
 * @nosideeffects
 * @return {Array.<google.maps.Data.LinearRing>}
 */
google.maps.Data.Polygon.prototype.getArray = function() {};

/**
 * @param {number} n
 * @return {google.maps.Data.LinearRing}
 */
google.maps.Data.Polygon.prototype.getAt = function(n) {};

/**
 * @nosideeffects
 * @return {number}
 */
google.maps.Data.Polygon.prototype.getLength = function() {};

/**
 * @nosideeffects
 * @return {string}
 * @override
 */
google.maps.Data.Polygon.prototype.getType = function() {};

/**
 * @interface
 */
google.maps.Data.RemoveFeatureEvent = function() {};

/**
 * @type {google.maps.Data.Feature}
 */
google.maps.Data.RemoveFeatureEvent.prototype.feature;

/**
 * @interface
 */
google.maps.Data.RemovePropertyEvent = function() {};

/**
 * @type {google.maps.Data.Feature}
 */
google.maps.Data.RemovePropertyEvent.prototype.feature;

/**
 * @type {string}
 */
google.maps.Data.RemovePropertyEvent.prototype.name;

/**
 * @type {*}
 */
google.maps.Data.RemovePropertyEvent.prototype.oldValue;

/**
 * @interface
 */
google.maps.Data.SetGeometryEvent = function() {};

/**
 * @type {google.maps.Data.Feature}
 */
google.maps.Data.SetGeometryEvent.prototype.feature;

/**
 * @type {google.maps.Data.Geometry}
 */
google.maps.Data.SetGeometryEvent.prototype.newGeometry;

/**
 * @type {google.maps.Data.Geometry}
 */
google.maps.Data.SetGeometryEvent.prototype.oldGeometry;

/**
 * @interface
 */
google.maps.Data.SetPropertyEvent = function() {};

/**
 * @type {google.maps.Data.Feature}
 */
google.maps.Data.SetPropertyEvent.prototype.feature;

/**
 * @type {string}
 */
google.maps.Data.SetPropertyEvent.prototype.name;

/**
 * @type {*}
 */
google.maps.Data.SetPropertyEvent.prototype.newValue;

/**
 * @type {*}
 */
google.maps.Data.SetPropertyEvent.prototype.oldValue;

/**
 * @interface
 */
google.maps.Data.StyleOptions = function() {};

/**
 * @type {boolean}
 */
google.maps.Data.StyleOptions.prototype.clickable;

/**
 * @type {string}
 */
google.maps.Data.StyleOptions.prototype.cursor;

/**
 * @type {string}
 */
google.maps.Data.StyleOptions.prototype.fillColor;

/**
 * @type {number}
 */
google.maps.Data.StyleOptions.prototype.fillOpacity;

/**
 * @type {string|google.maps.Icon|google.maps.Symbol}
 */
google.maps.Data.StyleOptions.prototype.icon;

/**
 * @type {google.maps.MarkerShape}
 */
google.maps.Data.StyleOptions.prototype.shape;

/**
 * @type {string}
 */
google.maps.Data.StyleOptions.prototype.strokeColor;

/**
 * @type {number}
 */
google.maps.Data.StyleOptions.prototype.strokeOpacity;

/**
 * @type {number}
 */
google.maps.Data.StyleOptions.prototype.strokeWeight;

/**
 * @type {string}
 */
google.maps.Data.StyleOptions.prototype.title;

/**
 * @type {boolean}
 */
google.maps.Data.StyleOptions.prototype.visible;

/**
 * @type {number}
 */
google.maps.Data.StyleOptions.prototype.zIndex;

/**
 * @typedef {function(google.maps.Data.Feature):google.maps.Data.StyleOptions|Object.<string>}
 */
google.maps.Data.StylingFunction;

/**
 * @interface
 */
google.maps.DirectionsLeg = function() {};

/**
 * @type {google.maps.Time}
 */
google.maps.DirectionsLeg.prototype.arrival_time;

/**
 * @type {google.maps.Time}
 */
google.maps.DirectionsLeg.prototype.departure_time;

/**
 * @type {google.maps.Distance}
 */
google.maps.DirectionsLeg.prototype.distance;

/**
 * @type {google.maps.Duration}
 */
google.maps.DirectionsLeg.prototype.duration;

/**
 * @type {google.maps.Duration}
 */
google.maps.DirectionsLeg.prototype.duration_in_traffic;

/**
 * @type {string}
 */
google.maps.DirectionsLeg.prototype.end_address;

/**
 * @type {google.maps.LatLng}
 */
google.maps.DirectionsLeg.prototype.end_location;

/**
 * @type {string}
 */
google.maps.DirectionsLeg.prototype.start_address;

/**
 * @type {google.maps.LatLng}
 */
google.maps.DirectionsLeg.prototype.start_location;

/**
 * @type {Array.<google.maps.DirectionsStep>}
 */
google.maps.DirectionsLeg.prototype.steps;

/**
 * @type {Array.<google.maps.LatLng>}
 */
google.maps.DirectionsLeg.prototype.via_waypoints;

/**
 * @param {(google.maps.DirectionsRendererOptions|Object.<string>)=} opt_opts
 * @extends {google.maps.MVCObject}
 * @constructor
 */
google.maps.DirectionsRenderer = function(opt_opts) {};

/**
 * @nosideeffects
 * @return {google.maps.DirectionsResult}
 */
google.maps.DirectionsRenderer.prototype.getDirections = function() {};

/**
 * @nosideeffects
 * @return {google.maps.Map}
 */
google.maps.DirectionsRenderer.prototype.getMap = function() {};

/**
 * @nosideeffects
 * @return {Node}
 */
google.maps.DirectionsRenderer.prototype.getPanel = function() {};

/**
 * @nosideeffects
 * @return {number}
 */
google.maps.DirectionsRenderer.prototype.getRouteIndex = function() {};

/**
 * @param {google.maps.DirectionsResult} directions
 * @return {undefined}
 */
google.maps.DirectionsRenderer.prototype.setDirections = function(directions) {};

/**
 * @param {google.maps.Map} map
 * @return {undefined}
 */
google.maps.DirectionsRenderer.prototype.setMap = function(map) {};

/**
 * @param {google.maps.DirectionsRendererOptions|Object.<string>} options
 * @return {undefined}
 */
google.maps.DirectionsRenderer.prototype.setOptions = function(options) {};

/**
 * @param {Node} panel
 * @return {undefined}
 */
google.maps.DirectionsRenderer.prototype.setPanel = function(panel) {};

/**
 * @param {number} routeIndex
 * @return {undefined}
 */
google.maps.DirectionsRenderer.prototype.setRouteIndex = function(routeIndex) {};

/**
 * @interface
 */
google.maps.DirectionsRendererOptions = function() {};

/**
 * @type {google.maps.DirectionsResult}
 */
google.maps.DirectionsRendererOptions.prototype.directions;

/**
 * @type {boolean}
 */
google.maps.DirectionsRendererOptions.prototype.draggable;

/**
 * @type {boolean}
 */
google.maps.DirectionsRendererOptions.prototype.hideRouteList;

/**
 * @type {google.maps.InfoWindow}
 */
google.maps.DirectionsRendererOptions.prototype.infoWindow;

/**
 * @type {google.maps.Map}
 */
google.maps.DirectionsRendererOptions.prototype.map;

/**
 * @type {google.maps.MarkerOptions|Object.<string>}
 */
google.maps.DirectionsRendererOptions.prototype.markerOptions;

/**
 * @type {Node}
 */
google.maps.DirectionsRendererOptions.prototype.panel;

/**
 * @type {google.maps.PolylineOptions|Object.<string>}
 */
google.maps.DirectionsRendererOptions.prototype.polylineOptions;

/**
 * @type {boolean}
 */
google.maps.DirectionsRendererOptions.prototype.preserveViewport;

/**
 * @type {number}
 */
google.maps.DirectionsRendererOptions.prototype.routeIndex;

/**
 * @type {boolean}
 */
google.maps.DirectionsRendererOptions.prototype.suppressBicyclingLayer;

/**
 * @type {boolean}
 */
google.maps.DirectionsRendererOptions.prototype.suppressInfoWindows;

/**
 * @type {boolean}
 */
google.maps.DirectionsRendererOptions.prototype.suppressMarkers;

/**
 * @type {boolean}
 */
google.maps.DirectionsRendererOptions.prototype.suppressPolylines;

/**
 * @interface
 */
google.maps.DirectionsRequest = function() {};

/**
 * @type {boolean}
 */
google.maps.DirectionsRequest.prototype.avoidFerries;

/**
 * @type {boolean}
 */
google.maps.DirectionsRequest.prototype.avoidHighways;

/**
 * @type {boolean}
 */
google.maps.DirectionsRequest.prototype.avoidTolls;

/**
 * @type {google.maps.LatLng|string}
 */
google.maps.DirectionsRequest.prototype.destination;

/**
 * @type {boolean}
 */
google.maps.DirectionsRequest.prototype.durationInTraffic;

/**
 * @type {boolean}
 */
google.maps.DirectionsRequest.prototype.optimizeWaypoints;

/**
 * @type {google.maps.LatLng|string}
 */
google.maps.DirectionsRequest.prototype.origin;

/**
 * @type {boolean}
 */
google.maps.DirectionsRequest.prototype.provideRouteAlternatives;

/**
 * @type {string}
 */
google.maps.DirectionsRequest.prototype.region;

/**
 * @type {google.maps.TransitOptions|Object.<string>}
 */
google.maps.DirectionsRequest.prototype.transitOptions;

/**
 * @type {google.maps.TravelMode}
 */
google.maps.DirectionsRequest.prototype.travelMode;

/**
 * @type {google.maps.UnitSystem}
 */
google.maps.DirectionsRequest.prototype.unitSystem;

/**
 * @type {Array.<google.maps.DirectionsWaypoint>}
 */
google.maps.DirectionsRequest.prototype.waypoints;

/**
 * @interface
 */
google.maps.DirectionsResult = function() {};

/**
 * @type {Array.<google.maps.DirectionsRoute>}
 */
google.maps.DirectionsResult.prototype.routes;

/**
 * @interface
 */
google.maps.DirectionsRoute = function() {};

/**
 * @type {google.maps.LatLngBounds}
 */
google.maps.DirectionsRoute.prototype.bounds;

/**
 * @type {string}
 */
google.maps.DirectionsRoute.prototype.copyrights;

/**
 * @type {Array.<google.maps.DirectionsLeg>}
 */
google.maps.DirectionsRoute.prototype.legs;

/**
 * @type {Array.<google.maps.LatLng>}
 */
google.maps.DirectionsRoute.prototype.overview_path;

/**
 * @type {string}
 */
google.maps.DirectionsRoute.prototype.overview_polyline;

/**
 * @type {Array.<string>}
 */
google.maps.DirectionsRoute.prototype.warnings;

/**
 * @type {Array.<number>}
 */
google.maps.DirectionsRoute.prototype.waypoint_order;

/**
 * @constructor
 */
google.maps.DirectionsService = function() {};

/**
 * @param {google.maps.DirectionsRequest|Object.<string>} request
 * @param {function(google.maps.DirectionsResult, google.maps.DirectionsStatus)} callback
 * @return {undefined}
 */
google.maps.DirectionsService.prototype.route = function(request, callback) {};

/**
 * @enum {string}
 */
google.maps.DirectionsStatus = {
  INVALID_REQUEST: '1',
  MAX_WAYPOINTS_EXCEEDED: '2',
  NOT_FOUND: '3',
  OK: '4',
  OVER_QUERY_LIMIT: '5',
  REQUEST_DENIED: '6',
  UNKNOWN_ERROR: '7',
  ZERO_RESULTS: ''
};

/**
 * @interface
 */
google.maps.DirectionsStep = function() {};

/**
 * @type {google.maps.Distance}
 */
google.maps.DirectionsStep.prototype.distance;

/**
 * @type {google.maps.Duration}
 */
google.maps.DirectionsStep.prototype.duration;

/**
 * @type {google.maps.LatLng}
 */
google.maps.DirectionsStep.prototype.end_location;

/**
 * @type {string}
 */
google.maps.DirectionsStep.prototype.instructions;

/**
 * @type {Array.<google.maps.LatLng>}
 */
google.maps.DirectionsStep.prototype.path;

/**
 * @type {google.maps.LatLng}
 */
google.maps.DirectionsStep.prototype.start_location;

/**
 * @type {Array.<google.maps.DirectionsStep>}
 */
google.maps.DirectionsStep.prototype.steps;

/**
 * @type {google.maps.TransitDetails}
 */
google.maps.DirectionsStep.prototype.transit;

/**
 * @type {google.maps.TravelMode}
 */
google.maps.DirectionsStep.prototype.travel_mode;

/**
 * @interface
 */
google.maps.DirectionsWaypoint = function() {};

/**
 * @type {google.maps.LatLng|string}
 */
google.maps.DirectionsWaypoint.prototype.location;

/**
 * @type {boolean}
 */
google.maps.DirectionsWaypoint.prototype.stopover;

/**
 * @interface
 */
google.maps.Distance = function() {};

/**
 * @type {string}
 */
google.maps.Distance.prototype.text;

/**
 * @type {number}
 */
google.maps.Distance.prototype.value;

/**
 * @enum {string}
 */
google.maps.DistanceMatrixElementStatus = {
  NOT_FOUND: '1',
  OK: '2',
  ZERO_RESULTS: '3'
};

/**
 * @interface
 */
google.maps.DistanceMatrixRequest = function() {};

/**
 * @type {boolean}
 */
google.maps.DistanceMatrixRequest.prototype.avoidFerries;

/**
 * @type {boolean}
 */
google.maps.DistanceMatrixRequest.prototype.avoidHighways;

/**
 * @type {boolean}
 */
google.maps.DistanceMatrixRequest.prototype.avoidTolls;

/**
 * @type {Array.<google.maps.LatLng>|Array.<string>}
 */
google.maps.DistanceMatrixRequest.prototype.destinations;

/**
 * @type {boolean}
 */
google.maps.DistanceMatrixRequest.prototype.durationInTraffic;

/**
 * @type {Array.<google.maps.LatLng>|Array.<string>}
 */
google.maps.DistanceMatrixRequest.prototype.origins;

/**
 * @type {string}
 */
google.maps.DistanceMatrixRequest.prototype.region;

/**
 * @type {google.maps.TravelMode}
 */
google.maps.DistanceMatrixRequest.prototype.travelMode;

/**
 * @type {google.maps.UnitSystem}
 */
google.maps.DistanceMatrixRequest.prototype.unitSystem;

/**
 * @interface
 */
google.maps.DistanceMatrixResponse = function() {};

/**
 * @type {Array.<string>}
 */
google.maps.DistanceMatrixResponse.prototype.destinationAddresses;

/**
 * @type {Array.<string>}
 */
google.maps.DistanceMatrixResponse.prototype.originAddresses;

/**
 * @type {Array.<google.maps.DistanceMatrixResponseRow>}
 */
google.maps.DistanceMatrixResponse.prototype.rows;

/**
 * @interface
 */
google.maps.DistanceMatrixResponseElement = function() {};

/**
 * @type {google.maps.Distance}
 */
google.maps.DistanceMatrixResponseElement.prototype.distance;

/**
 * @type {google.maps.Duration}
 */
google.maps.DistanceMatrixResponseElement.prototype.duration;

/**
 * @type {google.maps.DistanceMatrixElementStatus}
 */
google.maps.DistanceMatrixResponseElement.prototype.status;

/**
 * @interface
 */
google.maps.DistanceMatrixResponseRow = function() {};

/**
 * @type {Array.<google.maps.DistanceMatrixResponseElement>}
 */
google.maps.DistanceMatrixResponseRow.prototype.elements;

/**
 * @constructor
 */
google.maps.DistanceMatrixService = function() {};

/**
 * @param {google.maps.DistanceMatrixRequest|Object.<string>} request
 * @param {function(google.maps.DistanceMatrixResponse, google.maps.DistanceMatrixStatus)} callback
 * @return {undefined}
 */
google.maps.DistanceMatrixService.prototype.getDistanceMatrix = function(request, callback) {};

/**
 * @enum {string}
 */
google.maps.DistanceMatrixStatus = {
  INVALID_REQUEST: '1',
  MAX_DIMENSIONS_EXCEEDED: '2',
  MAX_ELEMENTS_EXCEEDED: '3',
  OK: '4',
  OVER_QUERY_LIMIT: '5',
  REQUEST_DENIED: '6',
  UNKNOWN_ERROR: ''
};

/**
 * @interface
 */
google.maps.Duration = function() {};

/**
 * @type {string}
 */
google.maps.Duration.prototype.text;

/**
 * @type {number}
 */
google.maps.Duration.prototype.value;

/**
 * @interface
 */
google.maps.ElevationResult = function() {};

/**
 * @type {number}
 */
google.maps.ElevationResult.prototype.elevation;

/**
 * @type {google.maps.LatLng}
 */
google.maps.ElevationResult.prototype.location;

/**
 * @type {number}
 */
google.maps.ElevationResult.prototype.resolution;

/**
 * @constructor
 */
google.maps.ElevationService = function() {};

/**
 * @param {google.maps.PathElevationRequest|Object.<string>} request
 * @param {function(Array.<google.maps.ElevationResult>, google.maps.ElevationStatus)} callback
 * @return {undefined}
 */
google.maps.ElevationService.prototype.getElevationAlongPath = function(request, callback) {};

/**
 * @param {google.maps.LocationElevationRequest|Object.<string>} request
 * @param {function(Array.<google.maps.ElevationResult>, google.maps.ElevationStatus)} callback
 * @return {undefined}
 */
google.maps.ElevationService.prototype.getElevationForLocations = function(request, callback) {};

/**
 * @enum {string}
 */
google.maps.ElevationStatus = {
  INVALID_REQUEST: '1',
  OK: '2',
  OVER_QUERY_LIMIT: '3',
  REQUEST_DENIED: '4',
  UNKNOWN_ERROR: ''
};

/**
 * @interface
 */
google.maps.FusionTablesCell = function() {};

/**
 * @type {string}
 */
google.maps.FusionTablesCell.prototype.columnName;

/**
 * @type {string}
 */
google.maps.FusionTablesCell.prototype.value;

/**
 * @constructor
 */
google.maps.FusionTablesHeatmap = function() {};

/**
 * @type {boolean}
 */
google.maps.FusionTablesHeatmap.prototype.enabled;

/**
 * @param {google.maps.FusionTablesLayerOptions|Object.<string>} options
 * @extends {google.maps.MVCObject}
 * @constructor
 */
google.maps.FusionTablesLayer = function(options) {};

/**
 * @nosideeffects
 * @return {google.maps.Map}
 */
google.maps.FusionTablesLayer.prototype.getMap = function() {};

/**
 * @param {google.maps.Map} map
 * @return {undefined}
 */
google.maps.FusionTablesLayer.prototype.setMap = function(map) {};

/**
 * @param {google.maps.FusionTablesLayerOptions|Object.<string>} options
 * @return {undefined}
 */
google.maps.FusionTablesLayer.prototype.setOptions = function(options) {};

/**
 * @interface
 */
google.maps.FusionTablesLayerOptions = function() {};

/**
 * @type {boolean}
 */
google.maps.FusionTablesLayerOptions.prototype.clickable;

/**
 * @type {google.maps.FusionTablesHeatmap}
 */
google.maps.FusionTablesLayerOptions.prototype.heatmap;

/**
 * @type {google.maps.Map}
 */
google.maps.FusionTablesLayerOptions.prototype.map;

/**
 * @type {google.maps.FusionTablesQuery}
 */
google.maps.FusionTablesLayerOptions.prototype.query;

/**
 * @type {Array.<google.maps.FusionTablesStyle>}
 */
google.maps.FusionTablesLayerOptions.prototype.styles;

/**
 * @type {boolean}
 */
google.maps.FusionTablesLayerOptions.prototype.suppressInfoWindows;

/**
 * @constructor
 */
google.maps.FusionTablesMarkerOptions = function() {};

/**
 * @type {string}
 */
google.maps.FusionTablesMarkerOptions.prototype.iconName;

/**
 * @interface
 */
google.maps.FusionTablesMouseEvent = function() {};

/**
 * @type {string}
 */
google.maps.FusionTablesMouseEvent.prototype.infoWindowHtml;

/**
 * @type {google.maps.LatLng}
 */
google.maps.FusionTablesMouseEvent.prototype.latLng;

/**
 * @type {google.maps.Size}
 */
google.maps.FusionTablesMouseEvent.prototype.pixelOffset;

/**
 * @type {Object.<google.maps.FusionTablesCell>}
 */
google.maps.FusionTablesMouseEvent.prototype.row;

/**
 * @constructor
 */
google.maps.FusionTablesPolygonOptions = function() {};

/**
 * @type {string}
 */
google.maps.FusionTablesPolygonOptions.prototype.fillColor;

/**
 * @type {number}
 */
google.maps.FusionTablesPolygonOptions.prototype.fillOpacity;

/**
 * @type {string}
 */
google.maps.FusionTablesPolygonOptions.prototype.strokeColor;

/**
 * @type {number}
 */
google.maps.FusionTablesPolygonOptions.prototype.strokeOpacity;

/**
 * @type {number}
 */
google.maps.FusionTablesPolygonOptions.prototype.strokeWeight;

/**
 * @constructor
 */
google.maps.FusionTablesPolylineOptions = function() {};

/**
 * @type {string}
 */
google.maps.FusionTablesPolylineOptions.prototype.strokeColor;

/**
 * @type {number}
 */
google.maps.FusionTablesPolylineOptions.prototype.strokeOpacity;

/**
 * @type {number}
 */
google.maps.FusionTablesPolylineOptions.prototype.strokeWeight;

/**
 * @constructor
 */
google.maps.FusionTablesQuery = function() {};

/**
 * @type {string}
 */
google.maps.FusionTablesQuery.prototype.from;

/**
 * @type {number}
 */
google.maps.FusionTablesQuery.prototype.limit;

/**
 * @type {number}
 */
google.maps.FusionTablesQuery.prototype.offset;

/**
 * @type {string}
 */
google.maps.FusionTablesQuery.prototype.orderBy;

/**
 * @type {string}
 */
google.maps.FusionTablesQuery.prototype.select;

/**
 * @type {string}
 */
google.maps.FusionTablesQuery.prototype.where;

/**
 * @constructor
 */
google.maps.FusionTablesStyle = function() {};

/**
 * @type {google.maps.FusionTablesMarkerOptions|Object.<string>}
 */
google.maps.FusionTablesStyle.prototype.markerOptions;

/**
 * @type {google.maps.FusionTablesPolygonOptions|Object.<string>}
 */
google.maps.FusionTablesStyle.prototype.polygonOptions;

/**
 * @type {google.maps.FusionTablesPolylineOptions|Object.<string>}
 */
google.maps.FusionTablesStyle.prototype.polylineOptions;

/**
 * @type {string}
 */
google.maps.FusionTablesStyle.prototype.where;

/**
 * @constructor
 */
google.maps.Geocoder = function() {};

/**
 * @param {google.maps.GeocoderRequest|Object.<string>} request
 * @param {function(Array.<google.maps.GeocoderResult>, google.maps.GeocoderStatus)} callback
 * @return {undefined}
 */
google.maps.Geocoder.prototype.geocode = function(request, callback) {};

/**
 * @constructor
 */
google.maps.GeocoderAddressComponent = function() {};

/**
 * @type {string}
 */
google.maps.GeocoderAddressComponent.prototype.long_name;

/**
 * @type {string}
 */
google.maps.GeocoderAddressComponent.prototype.short_name;

/**
 * @type {Array.<string>}
 */
google.maps.GeocoderAddressComponent.prototype.types;

/**
 * @interface
 */
google.maps.GeocoderComponentRestrictions = function() {};

/**
 * @type {string}
 */
google.maps.GeocoderComponentRestrictions.prototype.administrativeArea;

/**
 * @type {string}
 */
google.maps.GeocoderComponentRestrictions.prototype.country;

/**
 * @type {string}
 */
google.maps.GeocoderComponentRestrictions.prototype.locality;

/**
 * @type {string}
 */
google.maps.GeocoderComponentRestrictions.prototype.postalCode;

/**
 * @type {string}
 */
google.maps.GeocoderComponentRestrictions.prototype.route;

/**
 * @constructor
 */
google.maps.GeocoderGeometry = function() {};

/**
 * @type {google.maps.LatLngBounds}
 */
google.maps.GeocoderGeometry.prototype.bounds;

/**
 * @type {google.maps.LatLng}
 */
google.maps.GeocoderGeometry.prototype.location;

/**
 * @type {google.maps.GeocoderLocationType}
 */
google.maps.GeocoderGeometry.prototype.location_type;

/**
 * @type {google.maps.LatLngBounds}
 */
google.maps.GeocoderGeometry.prototype.viewport;

/**
 * @enum {string}
 */
google.maps.GeocoderLocationType = {
  APPROXIMATE: '1',
  GEOMETRIC_CENTER: '2',
  RANGE_INTERPOLATED: '3',
  ROOFTOP: '4'
};

/**
 * @interface
 */
google.maps.GeocoderRequest = function() {};

/**
 * @type {string}
 */
google.maps.GeocoderRequest.prototype.address;

/**
 * @type {google.maps.LatLngBounds}
 */
google.maps.GeocoderRequest.prototype.bounds;

/**
 * @type {google.maps.GeocoderComponentRestrictions}
 */
google.maps.GeocoderRequest.prototype.componentRestrictions;

/**
 * @type {google.maps.LatLng|google.maps.LatLngLiteral}
 */
google.maps.GeocoderRequest.prototype.location;

/**
 * @type {string}
 */
google.maps.GeocoderRequest.prototype.region;

/**
 * @constructor
 */
google.maps.GeocoderResult = function() {};

/**
 * @type {Array.<google.maps.GeocoderAddressComponent>}
 */
google.maps.GeocoderResult.prototype.address_components;

/**
 * @type {string}
 */
google.maps.GeocoderResult.prototype.formatted_address;

/**
 * @type {google.maps.GeocoderGeometry}
 */
google.maps.GeocoderResult.prototype.geometry;

/**
 * @type {boolean}
 */
google.maps.GeocoderResult.prototype.partial_match;

/**
 * @type {Array.<string>}
 */
google.maps.GeocoderResult.prototype.postcode_localities;

/**
 * @type {Array.<string>}
 */
google.maps.GeocoderResult.prototype.types;

/**
 * @enum {string}
 */
google.maps.GeocoderStatus = {
  ERROR: '1',
  INVALID_REQUEST: '2',
  OK: '3',
  OVER_QUERY_LIMIT: '4',
  REQUEST_DENIED: '5',
  UNKNOWN_ERROR: '6',
  ZERO_RESULTS: ''
};

/**
 * @param {string} url
 * @param {google.maps.LatLngBounds} bounds
 * @param {(google.maps.GroundOverlayOptions|Object.<string>)=} opt_opts
 * @extends {google.maps.MVCObject}
 * @constructor
 */
google.maps.GroundOverlay = function(url, bounds, opt_opts) {};

/**
 * @nosideeffects
 * @return {google.maps.LatLngBounds}
 */
google.maps.GroundOverlay.prototype.getBounds = function() {};

/**
 * @nosideeffects
 * @return {google.maps.Map}
 */
google.maps.GroundOverlay.prototype.getMap = function() {};

/**
 * @nosideeffects
 * @return {number}
 */
google.maps.GroundOverlay.prototype.getOpacity = function() {};

/**
 * @nosideeffects
 * @return {string}
 */
google.maps.GroundOverlay.prototype.getUrl = function() {};

/**
 * @param {google.maps.Map} map
 * @return {undefined}
 */
google.maps.GroundOverlay.prototype.setMap = function(map) {};

/**
 * @param {number} opacity
 * @return {undefined}
 */
google.maps.GroundOverlay.prototype.setOpacity = function(opacity) {};

/**
 * @interface
 */
google.maps.GroundOverlayOptions = function() {};

/**
 * @type {boolean}
 */
google.maps.GroundOverlayOptions.prototype.clickable;

/**
 * @type {google.maps.Map}
 */
google.maps.GroundOverlayOptions.prototype.map;

/**
 * @type {number}
 */
google.maps.GroundOverlayOptions.prototype.opacity;

/**
 * @interface
 */
google.maps.Icon = function() {};

/**
 * @type {google.maps.Point}
 */
google.maps.Icon.prototype.anchor;

/**
 * @type {google.maps.Point}
 */
google.maps.Icon.prototype.origin;

/**
 * @type {google.maps.Size}
 */
google.maps.Icon.prototype.scaledSize;

/**
 * @type {google.maps.Size}
 */
google.maps.Icon.prototype.size;

/**
 * @type {string}
 */
google.maps.Icon.prototype.url;

/**
 * @interface
 */
google.maps.IconSequence = function() {};

/**
 * @type {boolean}
 */
google.maps.IconSequence.prototype.fixedRotation;

/**
 * @type {google.maps.Symbol}
 */
google.maps.IconSequence.prototype.icon;

/**
 * @type {string}
 */
google.maps.IconSequence.prototype.offset;

/**
 * @type {string}
 */
google.maps.IconSequence.prototype.repeat;

/**
 * @param {google.maps.ImageMapTypeOptions|Object.<string>} opts
 * @implements {google.maps.MapType}
 * @extends {google.maps.MVCObject}
 * @constructor
 */
google.maps.ImageMapType = function(opts) {};

/**
 * @type {string}
 */
google.maps.ImageMapType.prototype.alt;

/**
 * @type {number}
 */
google.maps.ImageMapType.prototype.maxZoom;

/**
 * @type {number}
 */
google.maps.ImageMapType.prototype.minZoom;

/**
 * @type {string}
 */
google.maps.ImageMapType.prototype.name;

/**
 * @type {google.maps.Projection}
 */
google.maps.ImageMapType.prototype.projection;

/**
 * @type {number}
 */
google.maps.ImageMapType.prototype.radius;

/**
 * @type {google.maps.Size}
 */
google.maps.ImageMapType.prototype.tileSize;

/**
 * @nosideeffects
 * @return {number}
 */
google.maps.ImageMapType.prototype.getOpacity = function() {};

/**
 * @param {google.maps.Point} tileCoord
 * @param {number} zoom
 * @param {Document} ownerDocument
 * @return {Node}
 */
google.maps.ImageMapType.prototype.getTile = function(tileCoord, zoom, ownerDocument) {};

/**
 * @param {Node} tile
 * @return {undefined}
 */
google.maps.ImageMapType.prototype.releaseTile = function(tile) {};

/**
 * @param {number} opacity
 * @return {undefined}
 */
google.maps.ImageMapType.prototype.setOpacity = function(opacity) {};

/**
 * @interface
 */
google.maps.ImageMapTypeOptions = function() {};

/**
 * @type {string}
 */
google.maps.ImageMapTypeOptions.prototype.alt;

/**
 * @type {number}
 */
google.maps.ImageMapTypeOptions.prototype.maxZoom;

/**
 * @type {number}
 */
google.maps.ImageMapTypeOptions.prototype.minZoom;

/**
 * @type {string}
 */
google.maps.ImageMapTypeOptions.prototype.name;

/**
 * @type {number}
 */
google.maps.ImageMapTypeOptions.prototype.opacity;

/**
 * @type {google.maps.Size}
 */
google.maps.ImageMapTypeOptions.prototype.tileSize;

/**
 * @param {google.maps.Point} coordinate
 * @param {number} zoom
 * @return {string}
 */
google.maps.ImageMapTypeOptions.prototype.getTileUrl = function(coordinate, zoom) {};

/**
 * @param {(google.maps.InfoWindowOptions|Object.<string>)=} opt_opts
 * @extends {google.maps.MVCObject}
 * @constructor
 */
google.maps.InfoWindow = function(opt_opts) {};

/**
 * @return {undefined}
 */
google.maps.InfoWindow.prototype.close = function() {};

/**
 * @nosideeffects
 * @return {string|Node}
 */
google.maps.InfoWindow.prototype.getContent = function() {};

/**
 * @nosideeffects
 * @return {google.maps.LatLng}
 */
google.maps.InfoWindow.prototype.getPosition = function() {};

/**
 * @nosideeffects
 * @return {number}
 */
google.maps.InfoWindow.prototype.getZIndex = function() {};

/**
 * @param {(google.maps.Map|google.maps.StreetViewPanorama)=} opt_map
 * @param {google.maps.MVCObject=} opt_anchor
 * @return {undefined}
 */
google.maps.InfoWindow.prototype.open = function(opt_map, opt_anchor) {};

/**
 * @param {string|Node} content
 * @return {undefined}
 */
google.maps.InfoWindow.prototype.setContent = function(content) {};

/**
 * @param {google.maps.InfoWindowOptions|Object.<string>} options
 * @return {undefined}
 */
google.maps.InfoWindow.prototype.setOptions = function(options) {};

/**
 * @param {google.maps.LatLng} position
 * @return {undefined}
 */
google.maps.InfoWindow.prototype.setPosition = function(position) {};

/**
 * @param {number} zIndex
 * @return {undefined}
 */
google.maps.InfoWindow.prototype.setZIndex = function(zIndex) {};

/**
 * @interface
 */
google.maps.InfoWindowOptions = function() {};

/**
 * @type {string|Node}
 */
google.maps.InfoWindowOptions.prototype.content;

/**
 * @type {boolean}
 */
google.maps.InfoWindowOptions.prototype.disableAutoPan;

/**
 * @type {number}
 */
google.maps.InfoWindowOptions.prototype.maxWidth;

/**
 * @type {google.maps.Size}
 */
google.maps.InfoWindowOptions.prototype.pixelOffset;

/**
 * @type {google.maps.LatLng|google.maps.LatLngLiteral}
 */
google.maps.InfoWindowOptions.prototype.position;

/**
 * @type {number}
 */
google.maps.InfoWindowOptions.prototype.zIndex;

/**
 * @constructor
 */
google.maps.KmlAuthor = function() {};

/**
 * @type {string}
 */
google.maps.KmlAuthor.prototype.email;

/**
 * @type {string}
 */
google.maps.KmlAuthor.prototype.name;

/**
 * @type {string}
 */
google.maps.KmlAuthor.prototype.uri;

/**
 * @constructor
 */
google.maps.KmlFeatureData = function() {};

/**
 * @type {google.maps.KmlAuthor}
 */
google.maps.KmlFeatureData.prototype.author;

/**
 * @type {string}
 */
google.maps.KmlFeatureData.prototype.description;

/**
 * @type {string}
 */
google.maps.KmlFeatureData.prototype.id;

/**
 * @type {string}
 */
google.maps.KmlFeatureData.prototype.infoWindowHtml;

/**
 * @type {string}
 */
google.maps.KmlFeatureData.prototype.name;

/**
 * @type {string}
 */
google.maps.KmlFeatureData.prototype.snippet;

/**
 * @param {(google.maps.KmlLayerOptions|Object.<string>)=} opt_opts
 * @extends {google.maps.MVCObject}
 * @constructor
 */
google.maps.KmlLayer = function(opt_opts) {};

/**
 * @nosideeffects
 * @return {google.maps.LatLngBounds}
 */
google.maps.KmlLayer.prototype.getDefaultViewport = function() {};

/**
 * @nosideeffects
 * @return {google.maps.Map}
 */
google.maps.KmlLayer.prototype.getMap = function() {};

/**
 * @nosideeffects
 * @return {google.maps.KmlLayerMetadata}
 */
google.maps.KmlLayer.prototype.getMetadata = function() {};

/**
 * @nosideeffects
 * @return {google.maps.KmlLayerStatus}
 */
google.maps.KmlLayer.prototype.getStatus = function() {};

/**
 * @nosideeffects
 * @return {string}
 */
google.maps.KmlLayer.prototype.getUrl = function() {};

/**
 * @nosideeffects
 * @return {number}
 */
google.maps.KmlLayer.prototype.getZIndex = function() {};

/**
 * @param {google.maps.Map} map
 * @return {undefined}
 */
google.maps.KmlLayer.prototype.setMap = function(map) {};

/**
 * @param {string} url
 * @return {undefined}
 */
google.maps.KmlLayer.prototype.setUrl = function(url) {};

/**
 * @param {number} zIndex
 * @return {undefined}
 */
google.maps.KmlLayer.prototype.setZIndex = function(zIndex) {};

/**
 * @constructor
 */
google.maps.KmlLayerMetadata = function() {};

/**
 * @type {google.maps.KmlAuthor}
 */
google.maps.KmlLayerMetadata.prototype.author;

/**
 * @type {string}
 */
google.maps.KmlLayerMetadata.prototype.description;

/**
 * @type {boolean}
 */
google.maps.KmlLayerMetadata.prototype.hasScreenOverlays;

/**
 * @type {string}
 */
google.maps.KmlLayerMetadata.prototype.name;

/**
 * @type {string}
 */
google.maps.KmlLayerMetadata.prototype.snippet;

/**
 * @interface
 */
google.maps.KmlLayerOptions = function() {};

/**
 * @type {boolean}
 */
google.maps.KmlLayerOptions.prototype.clickable;

/**
 * @type {google.maps.Map}
 */
google.maps.KmlLayerOptions.prototype.map;

/**
 * @type {boolean}
 */
google.maps.KmlLayerOptions.prototype.preserveViewport;

/**
 * @type {boolean}
 */
google.maps.KmlLayerOptions.prototype.screenOverlays;

/**
 * @type {boolean}
 */
google.maps.KmlLayerOptions.prototype.suppressInfoWindows;

/**
 * @type {string}
 */
google.maps.KmlLayerOptions.prototype.url;

/**
 * @type {number}
 */
google.maps.KmlLayerOptions.prototype.zIndex;

/**
 * @enum {string}
 */
google.maps.KmlLayerStatus = {
  DOCUMENT_NOT_FOUND: '1',
  DOCUMENT_TOO_LARGE: '2',
  FETCH_ERROR: '3',
  INVALID_DOCUMENT: '4',
  INVALID_REQUEST: '5',
  LIMITS_EXCEEDED: '6',
  OK: '7',
  TIMED_OUT: '8',
  UNKNOWN: ''
};

/**
 * @constructor
 */
google.maps.KmlMouseEvent = function() {};

/**
 * @type {google.maps.KmlFeatureData}
 */
google.maps.KmlMouseEvent.prototype.featureData;

/**
 * @type {google.maps.LatLng}
 */
google.maps.KmlMouseEvent.prototype.latLng;

/**
 * @type {google.maps.Size}
 */
google.maps.KmlMouseEvent.prototype.pixelOffset;

/**
 * @param {number} lat
 * @param {number} lng
 * @param {boolean=} opt_noWrap
 * @constructor
 */
google.maps.LatLng = function(lat, lng, opt_noWrap) {};

/**
 * @param {google.maps.LatLng} other
 * @return {boolean}
 */
google.maps.LatLng.prototype.equals = function(other) {};

/**
 * @return {number}
 */
google.maps.LatLng.prototype.lat = function() {};

/**
 * @return {number}
 */
google.maps.LatLng.prototype.lng = function() {};

/**
 * @return {string}
 */
google.maps.LatLng.prototype.toString = function() {};

/**
 * @param {number=} opt_precision
 * @return {string}
 */
google.maps.LatLng.prototype.toUrlValue = function(opt_precision) {};

/**
 * @param {google.maps.LatLng=} opt_sw
 * @param {google.maps.LatLng=} opt_ne
 * @constructor
 */
google.maps.LatLngBounds = function(opt_sw, opt_ne) {};

/**
 * @param {google.maps.LatLng} latLng
 * @return {boolean}
 */
google.maps.LatLngBounds.prototype.contains = function(latLng) {};

/**
 * @param {google.maps.LatLngBounds} other
 * @return {boolean}
 */
google.maps.LatLngBounds.prototype.equals = function(other) {};

/**
 * @param {google.maps.LatLng} point
 * @return {google.maps.LatLngBounds}
 */
google.maps.LatLngBounds.prototype.extend = function(point) {};

/**
 * @nosideeffects
 * @return {google.maps.LatLng}
 */
google.maps.LatLngBounds.prototype.getCenter = function() {};

/**
 * @nosideeffects
 * @return {google.maps.LatLng}
 */
google.maps.LatLngBounds.prototype.getNorthEast = function() {};

/**
 * @nosideeffects
 * @return {google.maps.LatLng}
 */
google.maps.LatLngBounds.prototype.getSouthWest = function() {};

/**
 * @param {google.maps.LatLngBounds} other
 * @return {boolean}
 */
google.maps.LatLngBounds.prototype.intersects = function(other) {};

/**
 * @return {boolean}
 */
google.maps.LatLngBounds.prototype.isEmpty = function() {};

/**
 * @return {google.maps.LatLng}
 */
google.maps.LatLngBounds.prototype.toSpan = function() {};

/**
 * @return {string}
 */
google.maps.LatLngBounds.prototype.toString = function() {};

/**
 * @param {number=} opt_precision
 * @return {string}
 */
google.maps.LatLngBounds.prototype.toUrlValue = function(opt_precision) {};

/**
 * @param {google.maps.LatLngBounds} other
 * @return {google.maps.LatLngBounds}
 */
google.maps.LatLngBounds.prototype.union = function(other) {};

/**
 * @interface
 */
google.maps.LatLngLiteral = function() {};

/**
 * @type {number}
 */
google.maps.LatLngLiteral.prototype.lat;

/**
 * @type {number}
 */
google.maps.LatLngLiteral.prototype.lng;

/**
 * @interface
 */
google.maps.LocationElevationRequest = function() {};

/**
 * @type {Array.<google.maps.LatLng>}
 */
google.maps.LocationElevationRequest.prototype.locations;

/**
 * @param {Array=} opt_array
 * @extends {google.maps.MVCObject}
 * @constructor
 */
google.maps.MVCArray = function(opt_array) {};

/**
 * @return {undefined}
 */
google.maps.MVCArray.prototype.clear = function() {};

/**
 * @param {function(?, number)} callback
 * @return {undefined}
 */
google.maps.MVCArray.prototype.forEach = function(callback) {};

/**
 * @nosideeffects
 * @return {Array}
 */
google.maps.MVCArray.prototype.getArray = function() {};

/**
 * @param {number} i
 * @return {?}
 */
google.maps.MVCArray.prototype.getAt = function(i) {};

/**
 * @nosideeffects
 * @return {number}
 */
google.maps.MVCArray.prototype.getLength = function() {};

/**
 * @param {number} i
 * @param {?} elem
 * @return {undefined}
 */
google.maps.MVCArray.prototype.insertAt = function(i, elem) {};

/**
 * @return {?}
 */
google.maps.MVCArray.prototype.pop = function() {};

/**
 * @param {?} elem
 * @return {number}
 */
google.maps.MVCArray.prototype.push = function(elem) {};

/**
 * @param {number} i
 * @return {?}
 */
google.maps.MVCArray.prototype.removeAt = function(i) {};

/**
 * @param {number} i
 * @param {?} elem
 * @return {undefined}
 */
google.maps.MVCArray.prototype.setAt = function(i, elem) {};

/**
 * @constructor
 */
google.maps.MVCObject = function() {};

/**
 * @param {string} eventName
 * @param {!Function} handler
 * @return {google.maps.MapsEventListener}
 */
google.maps.MVCObject.prototype.addListener = function(eventName, handler) {};

/**
 * @param {string} key
 * @param {google.maps.MVCObject} target
 * @param {?string=} opt_targetKey
 * @param {boolean=} opt_noNotify
 * @return {undefined}
 */
google.maps.MVCObject.prototype.bindTo = function(key, target, opt_targetKey, opt_noNotify) {};

/**
 * @param {string} key
 * @return {undefined}
 */
google.maps.MVCObject.prototype.changed = function(key) {};

/**
 * @param {string} key
 * @return {?}
 */
google.maps.MVCObject.prototype.get = function(key) {};

/**
 * @param {string} key
 * @return {undefined}
 */
google.maps.MVCObject.prototype.notify = function(key) {};

/**
 * @param {string} key
 * @param {?} value
 * @return {undefined}
 */
google.maps.MVCObject.prototype.set = function(key, value) {};

/**
 * @param {Object|undefined} values
 * @return {undefined}
 */
google.maps.MVCObject.prototype.setValues = function(values) {};

/**
 * @param {string} key
 * @return {undefined}
 */
google.maps.MVCObject.prototype.unbind = function(key) {};

/**
 * @return {undefined}
 */
google.maps.MVCObject.prototype.unbindAll = function() {};

/**
 * @param {Node} mapDiv
 * @param {(google.maps.MapOptions|Object.<string>)=} opt_opts
 * @extends {google.maps.MVCObject}
 * @constructor
 */
google.maps.Map = function(mapDiv, opt_opts) {};

/**
 * @type {Array.<google.maps.MVCArray.<Node>>}
 */
google.maps.Map.prototype.controls;

/**
 * @type {google.maps.Data}
 */
google.maps.Map.prototype.data;

/**
 * @type {google.maps.MapTypeRegistry}
 */
google.maps.Map.prototype.mapTypes;

/**
 * @type {google.maps.MVCArray.<google.maps.MapType>}
 */
google.maps.Map.prototype.overlayMapTypes;

/**
 * @param {google.maps.LatLngBounds} bounds
 * @return {undefined}
 */
google.maps.Map.prototype.fitBounds = function(bounds) {};

/**
 * @nosideeffects
 * @return {google.maps.LatLngBounds}
 */
google.maps.Map.prototype.getBounds = function() {};

/**
 * @nosideeffects
 * @return {google.maps.LatLng}
 */
google.maps.Map.prototype.getCenter = function() {};

/**
 * @nosideeffects
 * @return {Node}
 */
google.maps.Map.prototype.getDiv = function() {};

/**
 * @nosideeffects
 * @return {number}
 */
google.maps.Map.prototype.getHeading = function() {};

/**
 * @nosideeffects
 * @return {google.maps.MapTypeId|string}
 */
google.maps.Map.prototype.getMapTypeId = function() {};

/**
 * @nosideeffects
 * @return {google.maps.Projection}
 */
google.maps.Map.prototype.getProjection = function() {};

/**
 * @nosideeffects
 * @return {google.maps.StreetViewPanorama}
 */
google.maps.Map.prototype.getStreetView = function() {};

/**
 * @nosideeffects
 * @return {number}
 */
google.maps.Map.prototype.getTilt = function() {};

/**
 * @nosideeffects
 * @return {number}
 */
google.maps.Map.prototype.getZoom = function() {};

/**
 * @param {number} x
 * @param {number} y
 * @return {undefined}
 */
google.maps.Map.prototype.panBy = function(x, y) {};

/**
 * @param {google.maps.LatLng|google.maps.LatLngLiteral} latLng
 * @return {undefined}
 */
google.maps.Map.prototype.panTo = function(latLng) {};

/**
 * @param {google.maps.LatLngBounds} latLngBounds
 * @return {undefined}
 */
google.maps.Map.prototype.panToBounds = function(latLngBounds) {};

/**
 * @param {google.maps.LatLng|google.maps.LatLngLiteral} latlng
 * @return {undefined}
 */
google.maps.Map.prototype.setCenter = function(latlng) {};

/**
 * @param {number} heading
 * @return {undefined}
 */
google.maps.Map.prototype.setHeading = function(heading) {};

/**
 * @param {google.maps.MapTypeId|string} mapTypeId
 * @return {undefined}
 */
google.maps.Map.prototype.setMapTypeId = function(mapTypeId) {};

/**
 * @param {google.maps.MapOptions|Object.<string>} options
 * @return {undefined}
 */
google.maps.Map.prototype.setOptions = function(options) {};

/**
 * @param {google.maps.StreetViewPanorama} panorama
 * @return {undefined}
 */
google.maps.Map.prototype.setStreetView = function(panorama) {};

/**
 * @param {number} tilt
 * @return {undefined}
 */
google.maps.Map.prototype.setTilt = function(tilt) {};

/**
 * @param {number} zoom
 * @return {undefined}
 */
google.maps.Map.prototype.setZoom = function(zoom) {};

/**
 * @extends {google.maps.MVCObject}
 * @constructor
 */
google.maps.MapCanvasProjection = function() {};

/**
 * @param {google.maps.Point} pixel
 * @param {boolean=} opt_nowrap
 * @return {google.maps.LatLng}
 */
google.maps.MapCanvasProjection.prototype.fromContainerPixelToLatLng = function(pixel, opt_nowrap) {};

/**
 * @param {google.maps.Point} pixel
 * @param {boolean=} opt_nowrap
 * @return {google.maps.LatLng}
 */
google.maps.MapCanvasProjection.prototype.fromDivPixelToLatLng = function(pixel, opt_nowrap) {};

/**
 * @param {google.maps.LatLng} latLng
 * @return {google.maps.Point}
 */
google.maps.MapCanvasProjection.prototype.fromLatLngToContainerPixel = function(latLng) {};

/**
 * @param {google.maps.LatLng} latLng
 * @return {google.maps.Point}
 */
google.maps.MapCanvasProjection.prototype.fromLatLngToDivPixel = function(latLng) {};

/**
 * @nosideeffects
 * @return {number}
 */
google.maps.MapCanvasProjection.prototype.getWorldWidth = function() {};

/**
 * @interface
 */
google.maps.MapOptions = function() {};

/**
 * @type {string}
 */
google.maps.MapOptions.prototype.backgroundColor;

/**
 * @type {google.maps.LatLng}
 */
google.maps.MapOptions.prototype.center;

/**
 * @type {boolean}
 */
google.maps.MapOptions.prototype.disableDefaultUI;

/**
 * @type {boolean}
 */
google.maps.MapOptions.prototype.disableDoubleClickZoom;

/**
 * @type {boolean}
 */
google.maps.MapOptions.prototype.draggable;

/**
 * @type {string}
 */
google.maps.MapOptions.prototype.draggableCursor;

/**
 * @type {string}
 */
google.maps.MapOptions.prototype.draggingCursor;

/**
 * @type {number}
 */
google.maps.MapOptions.prototype.heading;

/**
 * @type {boolean}
 */
google.maps.MapOptions.prototype.keyboardShortcuts;

/**
 * @type {boolean}
 */
google.maps.MapOptions.prototype.mapMaker;

/**
 * @type {boolean}
 */
google.maps.MapOptions.prototype.mapTypeControl;

/**
 * @type {google.maps.MapTypeControlOptions|Object.<string>}
 */
google.maps.MapOptions.prototype.mapTypeControlOptions;

/**
 * @type {google.maps.MapTypeId}
 */
google.maps.MapOptions.prototype.mapTypeId;

/**
 * @type {number}
 */
google.maps.MapOptions.prototype.maxZoom;

/**
 * @type {number}
 */
google.maps.MapOptions.prototype.minZoom;

/**
 * @type {boolean}
 */
google.maps.MapOptions.prototype.noClear;

/**
 * @type {boolean}
 */
google.maps.MapOptions.prototype.overviewMapControl;

/**
 * @type {google.maps.OverviewMapControlOptions|Object.<string>}
 */
google.maps.MapOptions.prototype.overviewMapControlOptions;

/**
 * @type {boolean}
 */
google.maps.MapOptions.prototype.panControl;

/**
 * @type {google.maps.PanControlOptions|Object.<string>}
 */
google.maps.MapOptions.prototype.panControlOptions;

/**
 * @type {boolean}
 */
google.maps.MapOptions.prototype.rotateControl;

/**
 * @type {google.maps.RotateControlOptions|Object.<string>}
 */
google.maps.MapOptions.prototype.rotateControlOptions;

/**
 * @type {boolean}
 */
google.maps.MapOptions.prototype.scaleControl;

/**
 * @type {google.maps.ScaleControlOptions|Object.<string>}
 */
google.maps.MapOptions.prototype.scaleControlOptions;

/**
 * @type {boolean}
 */
google.maps.MapOptions.prototype.scrollwheel;

/**
 * @type {google.maps.StreetViewPanorama}
 */
google.maps.MapOptions.prototype.streetView;

/**
 * @type {boolean}
 */
google.maps.MapOptions.prototype.streetViewControl;

/**
 * @type {google.maps.StreetViewControlOptions|Object.<string>}
 */
google.maps.MapOptions.prototype.streetViewControlOptions;

/**
 * @type {Array.<google.maps.MapTypeStyle>}
 */
google.maps.MapOptions.prototype.styles;

/**
 * @type {number}
 */
google.maps.MapOptions.prototype.tilt;

/**
 * @type {number}
 */
google.maps.MapOptions.prototype.zoom;

/**
 * @type {boolean}
 */
google.maps.MapOptions.prototype.zoomControl;

/**
 * @type {google.maps.ZoomControlOptions|Object.<string>}
 */
google.maps.MapOptions.prototype.zoomControlOptions;

/**
 * @constructor
 */
google.maps.MapPanes = function() {};

/**
 * @type {Node}
 */
google.maps.MapPanes.prototype.floatPane;

/**
 * @type {Node}
 */
google.maps.MapPanes.prototype.mapPane;

/**
 * @type {Node}
 */
google.maps.MapPanes.prototype.markerLayer;

/**
 * @type {Node}
 */
google.maps.MapPanes.prototype.overlayLayer;

/**
 * @type {Node}
 */
google.maps.MapPanes.prototype.overlayMouseTarget;

/**
 * @interface
 */
google.maps.MapType = function() {};

/**
 * @type {string}
 */
google.maps.MapType.prototype.alt;

/**
 * @type {number}
 */
google.maps.MapType.prototype.maxZoom;

/**
 * @type {number}
 */
google.maps.MapType.prototype.minZoom;

/**
 * @type {string}
 */
google.maps.MapType.prototype.name;

/**
 * @type {google.maps.Projection}
 */
google.maps.MapType.prototype.projection;

/**
 * @type {number}
 */
google.maps.MapType.prototype.radius;

/**
 * @type {google.maps.Size}
 */
google.maps.MapType.prototype.tileSize;

/**
 * @param {google.maps.Point} tileCoord
 * @param {number} zoom
 * @param {Document} ownerDocument
 * @return {Node}
 */
google.maps.MapType.prototype.getTile = function(tileCoord, zoom, ownerDocument) {};

/**
 * @param {Node} tile
 * @return {undefined}
 */
google.maps.MapType.prototype.releaseTile = function(tile) {};

/**
 * @interface
 */
google.maps.MapTypeControlOptions = function() {};

/**
 * @type {Array.<google.maps.MapTypeId>|Array.<string>}
 */
google.maps.MapTypeControlOptions.prototype.mapTypeIds;

/**
 * @type {google.maps.ControlPosition}
 */
google.maps.MapTypeControlOptions.prototype.position;

/**
 * @type {google.maps.MapTypeControlStyle}
 */
google.maps.MapTypeControlOptions.prototype.style;

/**
 * @enum {number}
 */
google.maps.MapTypeControlStyle = {
  DEFAULT: 1,
  DROPDOWN_MENU: 2,
  HORIZONTAL_BAR: 3
};

/**
 * @enum {string}
 */
google.maps.MapTypeId = {
  HYBRID: '1',
  ROADMAP: '2',
  SATELLITE: '3',
  TERRAIN: '4'
};

/**
 * @extends {google.maps.MVCObject}
 * @constructor
 */
google.maps.MapTypeRegistry = function() {};

/**
 * @param {string} id
 * @param {google.maps.MapType|undefined} mapType
 * @return {undefined}
 * @override
 */
google.maps.MapTypeRegistry.prototype.set = function(id, mapType) {};

/**
 * @interface
 */
google.maps.MapTypeStyle = function() {};

/**
 * @type {string}
 */
google.maps.MapTypeStyle.prototype.elementType;

/**
 * @type {string}
 */
google.maps.MapTypeStyle.prototype.featureType;

/**
 * @type {Array.<google.maps.MapTypeStyler>}
 */
google.maps.MapTypeStyle.prototype.stylers;

/**
 * @interface
 */
google.maps.MapTypeStyler = function() {};

/**
 * @type {string}
 */
google.maps.MapTypeStyler.prototype.color;

/**
 * @type {number}
 */
google.maps.MapTypeStyler.prototype.gamma;

/**
 * @type {string}
 */
google.maps.MapTypeStyler.prototype.hue;

/**
 * @type {boolean}
 */
google.maps.MapTypeStyler.prototype.invert_lightness;

/**
 * @type {number}
 */
google.maps.MapTypeStyler.prototype.lightness;

/**
 * @type {number}
 */
google.maps.MapTypeStyler.prototype.saturation;

/**
 * @type {string}
 */
google.maps.MapTypeStyler.prototype.visibility;

/**
 * @type {number}
 */
google.maps.MapTypeStyler.prototype.weight;

/**
 * @constructor
 */
google.maps.MapsEventListener = function() {};

/**
 * @param {(google.maps.MarkerOptions|Object.<string>)=} opt_opts
 * @extends {google.maps.MVCObject}
 * @constructor
 */
google.maps.Marker = function(opt_opts) {};

/**
 * @nosideeffects
 * @return {?google.maps.Animation}
 */
google.maps.Marker.prototype.getAnimation = function() {};

/**
 * @nosideeffects
 * @return {google.maps.Attribution}
 */
google.maps.Marker.prototype.getAttribution = function() {};

/**
 * @nosideeffects
 * @return {boolean}
 */
google.maps.Marker.prototype.getClickable = function() {};

/**
 * @nosideeffects
 * @return {string}
 */
google.maps.Marker.prototype.getCursor = function() {};

/**
 * @nosideeffects
 * @return {boolean}
 */
google.maps.Marker.prototype.getDraggable = function() {};

/**
 * @nosideeffects
 * @return {string|google.maps.Icon|google.maps.Symbol}
 */
google.maps.Marker.prototype.getIcon = function() {};

/**
 * @nosideeffects
 * @return {google.maps.Map|google.maps.StreetViewPanorama}
 */
google.maps.Marker.prototype.getMap = function() {};

/**
 * @nosideeffects
 * @return {number}
 */
google.maps.Marker.prototype.getOpacity = function() {};

/**
 * @nosideeffects
 * @return {google.maps.Place}
 */
google.maps.Marker.prototype.getPlace = function() {};

/**
 * @nosideeffects
 * @return {google.maps.LatLng}
 */
google.maps.Marker.prototype.getPosition = function() {};

/**
 * @nosideeffects
 * @return {google.maps.MarkerShape}
 */
google.maps.Marker.prototype.getShape = function() {};

/**
 * @nosideeffects
 * @return {string}
 */
google.maps.Marker.prototype.getTitle = function() {};

/**
 * @nosideeffects
 * @return {boolean}
 */
google.maps.Marker.prototype.getVisible = function() {};

/**
 * @nosideeffects
 * @return {number}
 */
google.maps.Marker.prototype.getZIndex = function() {};

/**
 * @param {?google.maps.Animation} animation
 * @return {undefined}
 */
google.maps.Marker.prototype.setAnimation = function(animation) {};

/**
 * @param {google.maps.Attribution} attribution
 * @return {undefined}
 */
google.maps.Marker.prototype.setAttribution = function(attribution) {};

/**
 * @param {boolean} flag
 * @return {undefined}
 */
google.maps.Marker.prototype.setClickable = function(flag) {};

/**
 * @param {string} cursor
 * @return {undefined}
 */
google.maps.Marker.prototype.setCursor = function(cursor) {};

/**
 * @param {?boolean} flag
 * @return {undefined}
 */
google.maps.Marker.prototype.setDraggable = function(flag) {};

/**
 * @param {string|google.maps.Icon|google.maps.Symbol} icon
 * @return {undefined}
 */
google.maps.Marker.prototype.setIcon = function(icon) {};

/**
 * @param {google.maps.Map|google.maps.StreetViewPanorama} map
 * @return {undefined}
 */
google.maps.Marker.prototype.setMap = function(map) {};

/**
 * @param {number} opacity
 * @return {undefined}
 */
google.maps.Marker.prototype.setOpacity = function(opacity) {};

/**
 * @param {google.maps.MarkerOptions|Object.<string>} options
 * @return {undefined}
 */
google.maps.Marker.prototype.setOptions = function(options) {};

/**
 * @param {google.maps.Place} place
 * @return {undefined}
 */
google.maps.Marker.prototype.setPlace = function(place) {};

/**
 * @param {google.maps.LatLng|google.maps.LatLngLiteral} latlng
 * @return {undefined}
 */
google.maps.Marker.prototype.setPosition = function(latlng) {};

/**
 * @param {google.maps.MarkerShape} shape
 * @return {undefined}
 */
google.maps.Marker.prototype.setShape = function(shape) {};

/**
 * @param {string} title
 * @return {undefined}
 */
google.maps.Marker.prototype.setTitle = function(title) {};

/**
 * @param {boolean} visible
 * @return {undefined}
 */
google.maps.Marker.prototype.setVisible = function(visible) {};

/**
 * @param {number} zIndex
 * @return {undefined}
 */
google.maps.Marker.prototype.setZIndex = function(zIndex) {};

/**
 * @constant
 * @type {number|string}
 */
google.maps.Marker.MAX_ZINDEX;

/**
 * @interface
 */
google.maps.MarkerOptions = function() {};

/**
 * @type {google.maps.Point}
 */
google.maps.MarkerOptions.prototype.anchorPoint;

/**
 * @type {google.maps.Animation}
 */
google.maps.MarkerOptions.prototype.animation;

/**
 * @type {google.maps.Attribution}
 */
google.maps.MarkerOptions.prototype.attribution;

/**
 * @type {boolean}
 */
google.maps.MarkerOptions.prototype.clickable;

/**
 * @type {boolean}
 */
google.maps.MarkerOptions.prototype.crossOnDrag;

/**
 * @type {string}
 */
google.maps.MarkerOptions.prototype.cursor;

/**
 * @type {boolean}
 */
google.maps.MarkerOptions.prototype.draggable;

/**
 * @type {string|google.maps.Icon|google.maps.Symbol}
 */
google.maps.MarkerOptions.prototype.icon;

/**
 * @type {google.maps.Map|google.maps.StreetViewPanorama}
 */
google.maps.MarkerOptions.prototype.map;

/**
 * @type {number}
 */
google.maps.MarkerOptions.prototype.opacity;

/**
 * @type {boolean}
 */
google.maps.MarkerOptions.prototype.optimized;

/**
 * @type {google.maps.Place}
 */
google.maps.MarkerOptions.prototype.place;

/**
 * @type {google.maps.LatLng}
 */
google.maps.MarkerOptions.prototype.position;

/**
 * @type {google.maps.MarkerShape}
 */
google.maps.MarkerOptions.prototype.shape;

/**
 * @type {string}
 */
google.maps.MarkerOptions.prototype.title;

/**
 * @type {boolean}
 */
google.maps.MarkerOptions.prototype.visible;

/**
 * @type {number}
 */
google.maps.MarkerOptions.prototype.zIndex;

/**
 * @interface
 */
google.maps.MarkerShape = function() {};

/**
 * @type {Array.<number>}
 */
google.maps.MarkerShape.prototype.coords;

/**
 * @type {string}
 */
google.maps.MarkerShape.prototype.type;

/**
 * @interface
 */
google.maps.MaxZoomResult = function() {};

/**
 * @type {google.maps.MaxZoomStatus}
 */
google.maps.MaxZoomResult.prototype.status;

/**
 * @type {number}
 */
google.maps.MaxZoomResult.prototype.zoom;

/**
 * @constructor
 */
google.maps.MaxZoomService = function() {};

/**
 * @param {google.maps.LatLng|google.maps.LatLngLiteral} latlng
 * @param {function(google.maps.MaxZoomResult)} callback
 * @return {undefined}
 */
google.maps.MaxZoomService.prototype.getMaxZoomAtLatLng = function(latlng, callback) {};

/**
 * @enum {string}
 */
google.maps.MaxZoomStatus = {
  ERROR: '1',
  OK: '2'
};

/**
 * @constructor
 */
google.maps.MouseEvent = function() {};

/**
 * @type {google.maps.LatLng}
 */
google.maps.MouseEvent.prototype.latLng;

/**
 * @return {undefined}
 */
google.maps.MouseEvent.prototype.stop = function() {};

/**
 * @extends {google.maps.MVCObject}
 * @constructor
 */
google.maps.OverlayView = function() {};

/**
 * @return {undefined}
 */
google.maps.OverlayView.prototype.draw = function() {};

/**
 * @nosideeffects
 * @return {google.maps.Map|google.maps.StreetViewPanorama}
 */
google.maps.OverlayView.prototype.getMap = function() {};

/**
 * @nosideeffects
 * @return {google.maps.MapPanes}
 */
google.maps.OverlayView.prototype.getPanes = function() {};

/**
 * @nosideeffects
 * @return {google.maps.MapCanvasProjection}
 */
google.maps.OverlayView.prototype.getProjection = function() {};

/**
 * @return {undefined}
 */
google.maps.OverlayView.prototype.onAdd = function() {};

/**
 * @return {undefined}
 */
google.maps.OverlayView.prototype.onRemove = function() {};

/**
 * @param {google.maps.Map|google.maps.StreetViewPanorama} map
 * @return {undefined}
 */
google.maps.OverlayView.prototype.setMap = function(map) {};

/**
 * @interface
 */
google.maps.OverviewMapControlOptions = function() {};

/**
 * @type {boolean}
 */
google.maps.OverviewMapControlOptions.prototype.opened;

/**
 * @interface
 */
google.maps.PanControlOptions = function() {};

/**
 * @type {google.maps.ControlPosition}
 */
google.maps.PanControlOptions.prototype.position;

/**
 * @interface
 */
google.maps.PathElevationRequest = function() {};

/**
 * @type {Array.<google.maps.LatLng>}
 */
google.maps.PathElevationRequest.prototype.path;

/**
 * @type {number}
 */
google.maps.PathElevationRequest.prototype.samples;

/**
 * @interface
 */
google.maps.Place = function() {};

/**
 * @type {google.maps.LatLng|google.maps.LatLngLiteral}
 */
google.maps.Place.prototype.location;

/**
 * @type {string}
 */
google.maps.Place.prototype.placeId;

/**
 * @type {string}
 */
google.maps.Place.prototype.query;

/**
 * @param {number} x
 * @param {number} y
 * @constructor
 */
google.maps.Point = function(x, y) {};

/**
 * @type {number}
 */
google.maps.Point.prototype.x;

/**
 * @type {number}
 */
google.maps.Point.prototype.y;

/**
 * @param {google.maps.Point} other
 * @return {boolean}
 */
google.maps.Point.prototype.equals = function(other) {};

/**
 * @return {string}
 */
google.maps.Point.prototype.toString = function() {};

/**
 * @extends {google.maps.MouseEvent}
 * @constructor
 */
google.maps.PolyMouseEvent = function() {};

/**
 * @type {number}
 */
google.maps.PolyMouseEvent.prototype.edge;

/**
 * @type {number}
 */
google.maps.PolyMouseEvent.prototype.path;

/**
 * @type {number}
 */
google.maps.PolyMouseEvent.prototype.vertex;

/**
 * @param {(google.maps.PolygonOptions|Object.<string>)=} opt_opts
 * @extends {google.maps.MVCObject}
 * @constructor
 */
google.maps.Polygon = function(opt_opts) {};

/**
 * @nosideeffects
 * @return {boolean}
 */
google.maps.Polygon.prototype.getDraggable = function() {};

/**
 * @nosideeffects
 * @return {boolean}
 */
google.maps.Polygon.prototype.getEditable = function() {};

/**
 * @nosideeffects
 * @return {google.maps.Map}
 */
google.maps.Polygon.prototype.getMap = function() {};

/**
 * @nosideeffects
 * @return {google.maps.MVCArray.<google.maps.LatLng>}
 */
google.maps.Polygon.prototype.getPath = function() {};

/**
 * @nosideeffects
 * @return {google.maps.MVCArray.<google.maps.MVCArray.<google.maps.LatLng>>}
 */
google.maps.Polygon.prototype.getPaths = function() {};

/**
 * @nosideeffects
 * @return {boolean}
 */
google.maps.Polygon.prototype.getVisible = function() {};

/**
 * @param {boolean} draggable
 * @return {undefined}
 */
google.maps.Polygon.prototype.setDraggable = function(draggable) {};

/**
 * @param {boolean} editable
 * @return {undefined}
 */
google.maps.Polygon.prototype.setEditable = function(editable) {};

/**
 * @param {google.maps.Map} map
 * @return {undefined}
 */
google.maps.Polygon.prototype.setMap = function(map) {};

/**
 * @param {google.maps.PolygonOptions|Object.<string>} options
 * @return {undefined}
 */
google.maps.Polygon.prototype.setOptions = function(options) {};

/**
 * @param {google.maps.MVCArray.<google.maps.LatLng>|Array.<google.maps.LatLng|google.maps.LatLngLiteral>} path
 * @return {undefined}
 */
google.maps.Polygon.prototype.setPath = function(path) {};

/**
 * @param {google.maps.MVCArray.<google.maps.MVCArray.<google.maps.LatLng>>|google.maps.MVCArray.<google.maps.LatLng>|Array.<Array.<google.maps.LatLng|google.maps.LatLngLiteral>>|Array.<google.maps.LatLng|google.maps.LatLngLiteral>} paths
 * @return {undefined}
 */
google.maps.Polygon.prototype.setPaths = function(paths) {};

/**
 * @param {boolean} visible
 * @return {undefined}
 */
google.maps.Polygon.prototype.setVisible = function(visible) {};

/**
 * @interface
 */
google.maps.PolygonOptions = function() {};

/**
 * @type {boolean}
 */
google.maps.PolygonOptions.prototype.clickable;

/**
 * @type {boolean}
 */
google.maps.PolygonOptions.prototype.draggable;

/**
 * @type {boolean}
 */
google.maps.PolygonOptions.prototype.editable;

/**
 * @type {string}
 */
google.maps.PolygonOptions.prototype.fillColor;

/**
 * @type {number}
 */
google.maps.PolygonOptions.prototype.fillOpacity;

/**
 * @type {boolean}
 */
google.maps.PolygonOptions.prototype.geodesic;

/**
 * @type {google.maps.Map}
 */
google.maps.PolygonOptions.prototype.map;

/**
 * @type {google.maps.MVCArray.<google.maps.MVCArray.<google.maps.LatLng>>|google.maps.MVCArray.<google.maps.LatLng>|Array.<Array.<google.maps.LatLng|google.maps.LatLngLiteral>>|Array.<google.maps.LatLng|google.maps.LatLngLiteral>}
 */
google.maps.PolygonOptions.prototype.paths;

/**
 * @type {string}
 */
google.maps.PolygonOptions.prototype.strokeColor;

/**
 * @type {number}
 */
google.maps.PolygonOptions.prototype.strokeOpacity;

/**
 * @type {google.maps.StrokePosition}
 */
google.maps.PolygonOptions.prototype.strokePosition;

/**
 * @type {number}
 */
google.maps.PolygonOptions.prototype.strokeWeight;

/**
 * @type {boolean}
 */
google.maps.PolygonOptions.prototype.visible;

/**
 * @type {number}
 */
google.maps.PolygonOptions.prototype.zIndex;

/**
 * @param {(google.maps.PolylineOptions|Object.<string>)=} opt_opts
 * @extends {google.maps.MVCObject}
 * @constructor
 */
google.maps.Polyline = function(opt_opts) {};

/**
 * @nosideeffects
 * @return {boolean}
 */
google.maps.Polyline.prototype.getDraggable = function() {};

/**
 * @nosideeffects
 * @return {boolean}
 */
google.maps.Polyline.prototype.getEditable = function() {};

/**
 * @nosideeffects
 * @return {google.maps.Map}
 */
google.maps.Polyline.prototype.getMap = function() {};

/**
 * @nosideeffects
 * @return {google.maps.MVCArray.<google.maps.LatLng>}
 */
google.maps.Polyline.prototype.getPath = function() {};

/**
 * @nosideeffects
 * @return {boolean}
 */
google.maps.Polyline.prototype.getVisible = function() {};

/**
 * @param {boolean} draggable
 * @return {undefined}
 */
google.maps.Polyline.prototype.setDraggable = function(draggable) {};

/**
 * @param {boolean} editable
 * @return {undefined}
 */
google.maps.Polyline.prototype.setEditable = function(editable) {};

/**
 * @param {google.maps.Map} map
 * @return {undefined}
 */
google.maps.Polyline.prototype.setMap = function(map) {};

/**
 * @param {google.maps.PolylineOptions|Object.<string>} options
 * @return {undefined}
 */
google.maps.Polyline.prototype.setOptions = function(options) {};

/**
 * @param {google.maps.MVCArray.<google.maps.LatLng>|Array.<google.maps.LatLng|google.maps.LatLngLiteral>} path
 * @return {undefined}
 */
google.maps.Polyline.prototype.setPath = function(path) {};

/**
 * @param {boolean} visible
 * @return {undefined}
 */
google.maps.Polyline.prototype.setVisible = function(visible) {};

/**
 * @interface
 */
google.maps.PolylineOptions = function() {};

/**
 * @type {boolean}
 */
google.maps.PolylineOptions.prototype.clickable;

/**
 * @type {boolean}
 */
google.maps.PolylineOptions.prototype.draggable;

/**
 * @type {boolean}
 */
google.maps.PolylineOptions.prototype.editable;

/**
 * @type {boolean}
 */
google.maps.PolylineOptions.prototype.geodesic;

/**
 * @type {Array.<google.maps.IconSequence>}
 */
google.maps.PolylineOptions.prototype.icons;

/**
 * @type {google.maps.Map}
 */
google.maps.PolylineOptions.prototype.map;

/**
 * @type {google.maps.MVCArray.<google.maps.LatLng>|Array.<google.maps.LatLng|google.maps.LatLngLiteral>}
 */
google.maps.PolylineOptions.prototype.path;

/**
 * @type {string}
 */
google.maps.PolylineOptions.prototype.strokeColor;

/**
 * @type {number}
 */
google.maps.PolylineOptions.prototype.strokeOpacity;

/**
 * @type {number}
 */
google.maps.PolylineOptions.prototype.strokeWeight;

/**
 * @type {boolean}
 */
google.maps.PolylineOptions.prototype.visible;

/**
 * @type {number}
 */
google.maps.PolylineOptions.prototype.zIndex;

/**
 * @interface
 */
google.maps.Projection = function() {};

/**
 * @param {google.maps.LatLng} latLng
 * @param {google.maps.Point=} opt_point
 * @return {google.maps.Point}
 */
google.maps.Projection.prototype.fromLatLngToPoint = function(latLng, opt_point) {};

/**
 * @param {google.maps.Point} pixel
 * @param {boolean=} opt_nowrap
 * @return {google.maps.LatLng}
 */
google.maps.Projection.prototype.fromPointToLatLng = function(pixel, opt_nowrap) {};

/**
 * @param {(google.maps.RectangleOptions|Object.<string>)=} opt_opts
 * @extends {google.maps.MVCObject}
 * @constructor
 */
google.maps.Rectangle = function(opt_opts) {};

/**
 * @nosideeffects
 * @return {google.maps.LatLngBounds}
 */
google.maps.Rectangle.prototype.getBounds = function() {};

/**
 * @nosideeffects
 * @return {boolean}
 */
google.maps.Rectangle.prototype.getDraggable = function() {};

/**
 * @nosideeffects
 * @return {boolean}
 */
google.maps.Rectangle.prototype.getEditable = function() {};

/**
 * @nosideeffects
 * @return {google.maps.Map}
 */
google.maps.Rectangle.prototype.getMap = function() {};

/**
 * @nosideeffects
 * @return {boolean}
 */
google.maps.Rectangle.prototype.getVisible = function() {};

/**
 * @param {google.maps.LatLngBounds} bounds
 * @return {undefined}
 */
google.maps.Rectangle.prototype.setBounds = function(bounds) {};

/**
 * @param {boolean} draggable
 * @return {undefined}
 */
google.maps.Rectangle.prototype.setDraggable = function(draggable) {};

/**
 * @param {boolean} editable
 * @return {undefined}
 */
google.maps.Rectangle.prototype.setEditable = function(editable) {};

/**
 * @param {google.maps.Map} map
 * @return {undefined}
 */
google.maps.Rectangle.prototype.setMap = function(map) {};

/**
 * @param {google.maps.RectangleOptions|Object.<string>} options
 * @return {undefined}
 */
google.maps.Rectangle.prototype.setOptions = function(options) {};

/**
 * @param {boolean} visible
 * @return {undefined}
 */
google.maps.Rectangle.prototype.setVisible = function(visible) {};

/**
 * @interface
 */
google.maps.RectangleOptions = function() {};

/**
 * @type {google.maps.LatLngBounds}
 */
google.maps.RectangleOptions.prototype.bounds;

/**
 * @type {boolean}
 */
google.maps.RectangleOptions.prototype.clickable;

/**
 * @type {boolean}
 */
google.maps.RectangleOptions.prototype.draggable;

/**
 * @type {boolean}
 */
google.maps.RectangleOptions.prototype.editable;

/**
 * @type {string}
 */
google.maps.RectangleOptions.prototype.fillColor;

/**
 * @type {number}
 */
google.maps.RectangleOptions.prototype.fillOpacity;

/**
 * @type {google.maps.Map}
 */
google.maps.RectangleOptions.prototype.map;

/**
 * @type {string}
 */
google.maps.RectangleOptions.prototype.strokeColor;

/**
 * @type {number}
 */
google.maps.RectangleOptions.prototype.strokeOpacity;

/**
 * @type {google.maps.StrokePosition}
 */
google.maps.RectangleOptions.prototype.strokePosition;

/**
 * @type {number}
 */
google.maps.RectangleOptions.prototype.strokeWeight;

/**
 * @type {boolean}
 */
google.maps.RectangleOptions.prototype.visible;

/**
 * @type {number}
 */
google.maps.RectangleOptions.prototype.zIndex;

/**
 * @interface
 */
google.maps.RotateControlOptions = function() {};

/**
 * @type {google.maps.ControlPosition}
 */
google.maps.RotateControlOptions.prototype.position;

/**
 * @param {Node} container
 * @param {(google.maps.SaveWidgetOptions|Object.<string>)=} opt_opts
 * @constructor
 */
google.maps.SaveWidget = function(container, opt_opts) {};

/**
 * @nosideeffects
 * @return {google.maps.Attribution}
 */
google.maps.SaveWidget.prototype.getAttribution = function() {};

/**
 * @nosideeffects
 * @return {google.maps.Place}
 */
google.maps.SaveWidget.prototype.getPlace = function() {};

/**
 * @param {google.maps.Attribution} attribution
 * @return {undefined}
 */
google.maps.SaveWidget.prototype.setAttribution = function(attribution) {};

/**
 * @param {google.maps.SaveWidgetOptions|Object.<string>} opts
 * @return {undefined}
 */
google.maps.SaveWidget.prototype.setOptions = function(opts) {};

/**
 * @param {google.maps.Place} place
 * @return {undefined}
 */
google.maps.SaveWidget.prototype.setPlace = function(place) {};

/**
 * @interface
 */
google.maps.SaveWidgetOptions = function() {};

/**
 * @type {google.maps.Attribution}
 */
google.maps.SaveWidgetOptions.prototype.attribution;

/**
 * @type {google.maps.Place}
 */
google.maps.SaveWidgetOptions.prototype.place;

/**
 * @interface
 */
google.maps.ScaleControlOptions = function() {};

/**
 * @type {google.maps.ScaleControlStyle}
 */
google.maps.ScaleControlOptions.prototype.style;

/**
 * @enum {number}
 */
google.maps.ScaleControlStyle = {
  DEFAULT: 1
};

/**
 * @param {number} width
 * @param {number} height
 * @param {string=} opt_widthUnit
 * @param {string=} opt_heightUnit
 * @constructor
 */
google.maps.Size = function(width, height, opt_widthUnit, opt_heightUnit) {};

/**
 * @type {number}
 */
google.maps.Size.prototype.height;

/**
 * @type {number}
 */
google.maps.Size.prototype.width;

/**
 * @param {google.maps.Size} other
 * @return {boolean}
 */
google.maps.Size.prototype.equals = function(other) {};

/**
 * @return {string}
 */
google.maps.Size.prototype.toString = function() {};

/**
 * @interface
 */
google.maps.StreetViewAddressControlOptions = function() {};

/**
 * @type {google.maps.ControlPosition}
 */
google.maps.StreetViewAddressControlOptions.prototype.position;

/**
 * @interface
 */
google.maps.StreetViewControlOptions = function() {};

/**
 * @type {google.maps.ControlPosition}
 */
google.maps.StreetViewControlOptions.prototype.position;

/**
 * @extends {google.maps.MVCObject}
 * @constructor
 */
google.maps.StreetViewCoverageLayer = function() {};

/**
 * @nosideeffects
 * @return {google.maps.Map}
 */
google.maps.StreetViewCoverageLayer.prototype.getMap = function() {};

/**
 * @param {google.maps.Map} map
 * @return {undefined}
 */
google.maps.StreetViewCoverageLayer.prototype.setMap = function(map) {};

/**
 * @interface
 */
google.maps.StreetViewLink = function() {};

/**
 * @type {string}
 */
google.maps.StreetViewLink.prototype.description;

/**
 * @type {number}
 */
google.maps.StreetViewLink.prototype.heading;

/**
 * @type {string}
 */
google.maps.StreetViewLink.prototype.pano;

/**
 * @interface
 */
google.maps.StreetViewLocation = function() {};

/**
 * @type {string}
 */
google.maps.StreetViewLocation.prototype.description;

/**
 * @type {google.maps.LatLng}
 */
google.maps.StreetViewLocation.prototype.latLng;

/**
 * @type {string}
 */
google.maps.StreetViewLocation.prototype.pano;

/**
 * @type {string}
 */
google.maps.StreetViewLocation.prototype.shortDescription;

/**
 * @param {Node} container
 * @param {(google.maps.StreetViewPanoramaOptions|Object.<string>)=} opt_opts
 * @extends {google.maps.MVCObject}
 * @constructor
 */
google.maps.StreetViewPanorama = function(container, opt_opts) {};

/**
 * @type {Array.<google.maps.MVCArray.<Node>>}
 */
google.maps.StreetViewPanorama.prototype.controls;

/**
 * @nosideeffects
 * @return {Array.<google.maps.StreetViewLink>}
 */
google.maps.StreetViewPanorama.prototype.getLinks = function() {};

/**
 * @nosideeffects
 * @return {google.maps.StreetViewLocation}
 */
google.maps.StreetViewPanorama.prototype.getLocation = function() {};

/**
 * @nosideeffects
 * @return {string}
 */
google.maps.StreetViewPanorama.prototype.getPano = function() {};

/**
 * @nosideeffects
 * @return {google.maps.StreetViewPov}
 */
google.maps.StreetViewPanorama.prototype.getPhotographerPov = function() {};

/**
 * @nosideeffects
 * @return {google.maps.LatLng}
 */
google.maps.StreetViewPanorama.prototype.getPosition = function() {};

/**
 * @nosideeffects
 * @return {google.maps.StreetViewPov}
 */
google.maps.StreetViewPanorama.prototype.getPov = function() {};

/**
 * @nosideeffects
 * @return {google.maps.StreetViewStatus}
 */
google.maps.StreetViewPanorama.prototype.getStatus = function() {};

/**
 * @nosideeffects
 * @return {boolean}
 */
google.maps.StreetViewPanorama.prototype.getVisible = function() {};

/**
 * @nosideeffects
 * @return {number}
 */
google.maps.StreetViewPanorama.prototype.getZoom = function() {};

/**
 * @param {function(string):google.maps.StreetViewPanoramaData} provider
 * @return {undefined}
 */
google.maps.StreetViewPanorama.prototype.registerPanoProvider = function(provider) {};

/**
 * @param {Array.<google.maps.StreetViewLink>} links
 * @return {undefined}
 */
google.maps.StreetViewPanorama.prototype.setLinks = function(links) {};

/**
 * @param {google.maps.StreetViewPanoramaOptions|Object.<string>} options
 * @return {undefined}
 */
google.maps.StreetViewPanorama.prototype.setOptions = function(options) {};

/**
 * @param {string} pano
 * @return {undefined}
 */
google.maps.StreetViewPanorama.prototype.setPano = function(pano) {};

/**
 * @param {google.maps.LatLng|google.maps.LatLngLiteral} latLng
 * @return {undefined}
 */
google.maps.StreetViewPanorama.prototype.setPosition = function(latLng) {};

/**
 * @param {google.maps.StreetViewPov} pov
 * @return {undefined}
 */
google.maps.StreetViewPanorama.prototype.setPov = function(pov) {};

/**
 * @param {boolean} flag
 * @return {undefined}
 */
google.maps.StreetViewPanorama.prototype.setVisible = function(flag) {};

/**
 * @param {number} zoom
 * @return {undefined}
 */
google.maps.StreetViewPanorama.prototype.setZoom = function(zoom) {};

/**
 * @interface
 */
google.maps.StreetViewPanoramaData = function() {};

/**
 * @type {string}
 */
google.maps.StreetViewPanoramaData.prototype.copyright;

/**
 * @type {string}
 */
google.maps.StreetViewPanoramaData.prototype.imageDate;

/**
 * @type {Array.<google.maps.StreetViewLink>}
 */
google.maps.StreetViewPanoramaData.prototype.links;

/**
 * @type {google.maps.StreetViewLocation}
 */
google.maps.StreetViewPanoramaData.prototype.location;

/**
 * @type {google.maps.StreetViewTileData}
 */
google.maps.StreetViewPanoramaData.prototype.tiles;

/**
 * @interface
 */
google.maps.StreetViewPanoramaOptions = function() {};

/**
 * @type {boolean}
 */
google.maps.StreetViewPanoramaOptions.prototype.addressControl;

/**
 * @type {google.maps.StreetViewAddressControlOptions|Object.<string>}
 */
google.maps.StreetViewPanoramaOptions.prototype.addressControlOptions;

/**
 * @type {boolean}
 */
google.maps.StreetViewPanoramaOptions.prototype.clickToGo;

/**
 * @type {boolean}
 */
google.maps.StreetViewPanoramaOptions.prototype.disableDefaultUI;

/**
 * @type {boolean}
 */
google.maps.StreetViewPanoramaOptions.prototype.disableDoubleClickZoom;

/**
 * @type {boolean}
 */
google.maps.StreetViewPanoramaOptions.prototype.enableCloseButton;

/**
 * @type {boolean}
 */
google.maps.StreetViewPanoramaOptions.prototype.imageDateControl;

/**
 * @type {boolean}
 */
google.maps.StreetViewPanoramaOptions.prototype.linksControl;

/**
 * @type {boolean}
 */
google.maps.StreetViewPanoramaOptions.prototype.panControl;

/**
 * @type {google.maps.PanControlOptions|Object.<string>}
 */
google.maps.StreetViewPanoramaOptions.prototype.panControlOptions;

/**
 * @type {string}
 */
google.maps.StreetViewPanoramaOptions.prototype.pano;

/**
 * @type {google.maps.LatLng|google.maps.LatLngLiteral}
 */
google.maps.StreetViewPanoramaOptions.prototype.position;

/**
 * @type {google.maps.StreetViewPov}
 */
google.maps.StreetViewPanoramaOptions.prototype.pov;

/**
 * @type {boolean}
 */
google.maps.StreetViewPanoramaOptions.prototype.scrollwheel;

/**
 * @type {boolean}
 */
google.maps.StreetViewPanoramaOptions.prototype.visible;

/**
 * @type {boolean}
 */
google.maps.StreetViewPanoramaOptions.prototype.zoomControl;

/**
 * @type {google.maps.ZoomControlOptions|Object.<string>}
 */
google.maps.StreetViewPanoramaOptions.prototype.zoomControlOptions;

/**
 * @param {string} panoId
 * @return {google.maps.StreetViewPanoramaData}
 */
google.maps.StreetViewPanoramaOptions.prototype.panoProvider = function(panoId) {};

/**
 * @constructor
 */
google.maps.StreetViewPov = function() {};

/**
 * @type {number}
 */
google.maps.StreetViewPov.prototype.heading;

/**
 * @type {number}
 */
google.maps.StreetViewPov.prototype.pitch;

/**
 * @constructor
 */
google.maps.StreetViewService = function() {};

/**
 * @param {string} pano
 * @param {function(google.maps.StreetViewPanoramaData, google.maps.StreetViewStatus)} callback
 * @return {undefined}
 */
google.maps.StreetViewService.prototype.getPanoramaById = function(pano, callback) {};

/**
 * @param {google.maps.LatLng|google.maps.LatLngLiteral} latlng
 * @param {number} radius
 * @param {function(google.maps.StreetViewPanoramaData, google.maps.StreetViewStatus)} callback
 * @return {undefined}
 */
google.maps.StreetViewService.prototype.getPanoramaByLocation = function(latlng, radius, callback) {};

/**
 * @enum {string}
 */
google.maps.StreetViewStatus = {
  OK: '1',
  UNKNOWN_ERROR: '2',
  ZERO_RESULTS: '3'
};

/**
 * @interface
 */
google.maps.StreetViewTileData = function() {};

/**
 * @type {number}
 */
google.maps.StreetViewTileData.prototype.centerHeading;

/**
 * @type {google.maps.Size}
 */
google.maps.StreetViewTileData.prototype.tileSize;

/**
 * @type {google.maps.Size}
 */
google.maps.StreetViewTileData.prototype.worldSize;

/**
 * @param {string} pano
 * @param {number} tileZoom
 * @param {number} tileX
 * @param {number} tileY
 * @return {string}
 */
google.maps.StreetViewTileData.prototype.getTileUrl = function(pano, tileZoom, tileX, tileY) {};

/**
 * @enum {number}
 */
google.maps.StrokePosition = {
  CENTER: 1,
  INSIDE: 2,
  OUTSIDE: 3
};

/**
 * @param {Array.<google.maps.MapTypeStyle>} styles
 * @param {(google.maps.StyledMapTypeOptions|Object.<string>)=} opt_options
 * @implements {google.maps.MapType}
 * @extends {google.maps.MVCObject}
 * @constructor
 */
google.maps.StyledMapType = function(styles, opt_options) {};

/**
 * @type {string}
 */
google.maps.StyledMapType.prototype.alt;

/**
 * @type {number}
 */
google.maps.StyledMapType.prototype.maxZoom;

/**
 * @type {number}
 */
google.maps.StyledMapType.prototype.minZoom;

/**
 * @type {string}
 */
google.maps.StyledMapType.prototype.name;

/**
 * @type {google.maps.Projection}
 */
google.maps.StyledMapType.prototype.projection;

/**
 * @type {number}
 */
google.maps.StyledMapType.prototype.radius;

/**
 * @type {google.maps.Size}
 */
google.maps.StyledMapType.prototype.tileSize;

/**
 * @param {google.maps.Point} tileCoord
 * @param {number} zoom
 * @param {Document} ownerDocument
 * @return {Node}
 */
google.maps.StyledMapType.prototype.getTile = function(tileCoord, zoom, ownerDocument) {};

/**
 * @param {Node} tile
 * @return {undefined}
 */
google.maps.StyledMapType.prototype.releaseTile = function(tile) {};

/**
 * @interface
 */
google.maps.StyledMapTypeOptions = function() {};

/**
 * @type {string}
 */
google.maps.StyledMapTypeOptions.prototype.alt;

/**
 * @type {number}
 */
google.maps.StyledMapTypeOptions.prototype.maxZoom;

/**
 * @type {number}
 */
google.maps.StyledMapTypeOptions.prototype.minZoom;

/**
 * @type {string}
 */
google.maps.StyledMapTypeOptions.prototype.name;

/**
 * @interface
 */
google.maps.Symbol = function() {};

/**
 * @type {google.maps.Point}
 */
google.maps.Symbol.prototype.anchor;

/**
 * @type {string}
 */
google.maps.Symbol.prototype.fillColor;

/**
 * @type {number}
 */
google.maps.Symbol.prototype.fillOpacity;

/**
 * @type {google.maps.SymbolPath|string}
 */
google.maps.Symbol.prototype.path;

/**
 * @type {number}
 */
google.maps.Symbol.prototype.rotation;

/**
 * @type {number}
 */
google.maps.Symbol.prototype.scale;

/**
 * @type {string}
 */
google.maps.Symbol.prototype.strokeColor;

/**
 * @type {number}
 */
google.maps.Symbol.prototype.strokeOpacity;

/**
 * @type {number}
 */
google.maps.Symbol.prototype.strokeWeight;

/**
 * @enum {number}
 */
google.maps.SymbolPath = {
  BACKWARD_CLOSED_ARROW: 1,
  BACKWARD_OPEN_ARROW: 2,
  CIRCLE: 3,
  FORWARD_CLOSED_ARROW: 4,
  FORWARD_OPEN_ARROW: 5
};

/**
 * @interface
 */
google.maps.Time = function() {};

/**
 * @type {string}
 */
google.maps.Time.prototype.text;

/**
 * @type {string}
 */
google.maps.Time.prototype.time_zone;

/**
 * @type {Date}
 */
google.maps.Time.prototype.value;

/**
 * @extends {google.maps.MVCObject}
 * @constructor
 */
google.maps.TrafficLayer = function() {};

/**
 * @nosideeffects
 * @return {google.maps.Map}
 */
google.maps.TrafficLayer.prototype.getMap = function() {};

/**
 * @param {google.maps.Map} map
 * @return {undefined}
 */
google.maps.TrafficLayer.prototype.setMap = function(map) {};

/**
 * @interface
 */
google.maps.TransitAgency = function() {};

/**
 * @type {string}
 */
google.maps.TransitAgency.prototype.name;

/**
 * @type {string}
 */
google.maps.TransitAgency.prototype.phone;

/**
 * @type {string}
 */
google.maps.TransitAgency.prototype.url;

/**
 * @interface
 */
google.maps.TransitDetails = function() {};

/**
 * @type {google.maps.TransitStop}
 */
google.maps.TransitDetails.prototype.arrival_stop;

/**
 * @type {google.maps.Time}
 */
google.maps.TransitDetails.prototype.arrival_time;

/**
 * @type {google.maps.TransitStop}
 */
google.maps.TransitDetails.prototype.departure_stop;

/**
 * @type {google.maps.Time}
 */
google.maps.TransitDetails.prototype.departure_time;

/**
 * @type {string}
 */
google.maps.TransitDetails.prototype.headsign;

/**
 * @type {number}
 */
google.maps.TransitDetails.prototype.headway;

/**
 * @type {google.maps.TransitLine}
 */
google.maps.TransitDetails.prototype.line;

/**
 * @type {number}
 */
google.maps.TransitDetails.prototype.num_stops;

/**
 * @extends {google.maps.MVCObject}
 * @constructor
 */
google.maps.TransitLayer = function() {};

/**
 * @nosideeffects
 * @return {google.maps.Map}
 */
google.maps.TransitLayer.prototype.getMap = function() {};

/**
 * @param {google.maps.Map} map
 * @return {undefined}
 */
google.maps.TransitLayer.prototype.setMap = function(map) {};

/**
 * @interface
 */
google.maps.TransitLine = function() {};

/**
 * @type {Array.<google.maps.TransitAgency>}
 */
google.maps.TransitLine.prototype.agencies;

/**
 * @type {string}
 */
google.maps.TransitLine.prototype.color;

/**
 * @type {string}
 */
google.maps.TransitLine.prototype.icon;

/**
 * @type {string}
 */
google.maps.TransitLine.prototype.name;

/**
 * @type {string}
 */
google.maps.TransitLine.prototype.short_name;

/**
 * @type {string}
 */
google.maps.TransitLine.prototype.text_color;

/**
 * @type {string}
 */
google.maps.TransitLine.prototype.url;

/**
 * @type {google.maps.TransitVehicle}
 */
google.maps.TransitLine.prototype.vehicle;

/**
 * @interface
 */
google.maps.TransitOptions = function() {};

/**
 * @type {Date}
 */
google.maps.TransitOptions.prototype.arrivalTime;

/**
 * @type {Date}
 */
google.maps.TransitOptions.prototype.departureTime;

/**
 * @interface
 */
google.maps.TransitStop = function() {};

/**
 * @type {google.maps.LatLng}
 */
google.maps.TransitStop.prototype.location;

/**
 * @type {string}
 */
google.maps.TransitStop.prototype.name;

/**
 * @interface
 */
google.maps.TransitVehicle = function() {};

/**
 * @type {string}
 */
google.maps.TransitVehicle.prototype.icon;

/**
 * @type {string}
 */
google.maps.TransitVehicle.prototype.local_icon;

/**
 * @type {string}
 */
google.maps.TransitVehicle.prototype.name;

/**
 * @type {string}
 */
google.maps.TransitVehicle.prototype.type;

/**
 * @enum {string}
 */
google.maps.TravelMode = {
  BICYCLING: '1',
  DRIVING: '2',
  TRANSIT: '3',
  WALKING: '4'
};

/**
 * @enum {number}
 */
google.maps.UnitSystem = {
  IMPERIAL: 1,
  METRIC: 2
};

/**
 * @interface
 */
google.maps.ZoomControlOptions = function() {};

/**
 * @type {google.maps.ControlPosition}
 */
google.maps.ZoomControlOptions.prototype.position;

/**
 * @type {google.maps.ZoomControlStyle}
 */
google.maps.ZoomControlOptions.prototype.style;

/**
 * @enum {number}
 */
google.maps.ZoomControlStyle = {
  DEFAULT: 1,
  LARGE: 2,
  SMALL: 3
};

// Namespace
google.maps.adsense = {};

/**
 * @enum {string}
 */
google.maps.adsense.AdFormat = {
  BANNER: '1',
  BUTTON: '2',
  HALF_BANNER: '3',
  LARGE_HORIZONTAL_LINK_UNIT: '4',
  LARGE_RECTANGLE: '5',
  LARGE_VERTICAL_LINK_UNIT: '6',
  LEADERBOARD: '7',
  MEDIUM_RECTANGLE: '8',
  MEDIUM_VERTICAL_LINK_UNIT: '9',
  SKYSCRAPER: '10',
  SMALL_HORIZONTAL_LINK_UNIT: '11',
  SMALL_RECTANGLE: '12',
  SMALL_SQUARE: '13',
  SMALL_VERTICAL_LINK_UNIT: '14',
  SQUARE: '15',
  VERTICAL_BANNER: '16',
  WIDE_SKYSCRAPER: '17',
  X_LARGE_VERTICAL_LINK_UNIT: ''
};

/**
 * @param {Node} container
 * @param {google.maps.adsense.AdUnitOptions|Object.<string>} opts
 * @extends {google.maps.MVCObject}
 * @constructor
 */
google.maps.adsense.AdUnit = function(container, opts) {};

/**
 * @nosideeffects
 * @return {string}
 */
google.maps.adsense.AdUnit.prototype.getBackgroundColor = function() {};

/**
 * @nosideeffects
 * @return {string}
 */
google.maps.adsense.AdUnit.prototype.getBorderColor = function() {};

/**
 * @nosideeffects
 * @return {string}
 */
google.maps.adsense.AdUnit.prototype.getChannelNumber = function() {};

/**
 * @nosideeffects
 * @return {Node}
 */
google.maps.adsense.AdUnit.prototype.getContainer = function() {};

/**
 * @nosideeffects
 * @return {google.maps.adsense.AdFormat}
 */
google.maps.adsense.AdUnit.prototype.getFormat = function() {};

/**
 * @nosideeffects
 * @return {google.maps.Map}
 */
google.maps.adsense.AdUnit.prototype.getMap = function() {};

/**
 * @nosideeffects
 * @return {google.maps.ControlPosition}
 */
google.maps.adsense.AdUnit.prototype.getPosition = function() {};

/**
 * @nosideeffects
 * @return {string}
 */
google.maps.adsense.AdUnit.prototype.getPublisherId = function() {};

/**
 * @nosideeffects
 * @return {string}
 */
google.maps.adsense.AdUnit.prototype.getTextColor = function() {};

/**
 * @nosideeffects
 * @return {string}
 */
google.maps.adsense.AdUnit.prototype.getTitleColor = function() {};

/**
 * @nosideeffects
 * @return {string}
 */
google.maps.adsense.AdUnit.prototype.getUrlColor = function() {};

/**
 * @param {string} backgroundColor
 * @return {undefined}
 */
google.maps.adsense.AdUnit.prototype.setBackgroundColor = function(backgroundColor) {};

/**
 * @param {string} borderColor
 * @return {undefined}
 */
google.maps.adsense.AdUnit.prototype.setBorderColor = function(borderColor) {};

/**
 * @param {string} channelNumber
 * @return {undefined}
 */
google.maps.adsense.AdUnit.prototype.setChannelNumber = function(channelNumber) {};

/**
 * @param {google.maps.adsense.AdFormat} format
 * @return {undefined}
 */
google.maps.adsense.AdUnit.prototype.setFormat = function(format) {};

/**
 * @param {google.maps.Map} map
 * @return {undefined}
 */
google.maps.adsense.AdUnit.prototype.setMap = function(map) {};

/**
 * @param {google.maps.ControlPosition} position
 * @return {undefined}
 */
google.maps.adsense.AdUnit.prototype.setPosition = function(position) {};

/**
 * @param {string} textColor
 * @return {undefined}
 */
google.maps.adsense.AdUnit.prototype.setTextColor = function(textColor) {};

/**
 * @param {string} titleColor
 * @return {undefined}
 */
google.maps.adsense.AdUnit.prototype.setTitleColor = function(titleColor) {};

/**
 * @param {string} urlColor
 * @return {undefined}
 */
google.maps.adsense.AdUnit.prototype.setUrlColor = function(urlColor) {};

/**
 * @interface
 */
google.maps.adsense.AdUnitOptions = function() {};

/**
 * @type {string}
 */
google.maps.adsense.AdUnitOptions.prototype.backgroundColor;

/**
 * @type {string}
 */
google.maps.adsense.AdUnitOptions.prototype.borderColor;

/**
 * @type {string}
 */
google.maps.adsense.AdUnitOptions.prototype.channelNumber;

/**
 * @type {google.maps.adsense.AdFormat}
 */
google.maps.adsense.AdUnitOptions.prototype.format;

/**
 * @type {google.maps.Map}
 */
google.maps.adsense.AdUnitOptions.prototype.map;

/**
 * @type {google.maps.ControlPosition}
 */
google.maps.adsense.AdUnitOptions.prototype.position;

/**
 * @type {string}
 */
google.maps.adsense.AdUnitOptions.prototype.publisherId;

/**
 * @type {string}
 */
google.maps.adsense.AdUnitOptions.prototype.textColor;

/**
 * @type {string}
 */
google.maps.adsense.AdUnitOptions.prototype.titleColor;

/**
 * @type {string}
 */
google.maps.adsense.AdUnitOptions.prototype.urlColor;

// Namespace
google.maps.drawing = {};

/**
 * @interface
 */
google.maps.drawing.DrawingControlOptions = function() {};

/**
 * @type {Array.<google.maps.drawing.OverlayType>}
 */
google.maps.drawing.DrawingControlOptions.prototype.drawingModes;

/**
 * @type {google.maps.ControlPosition}
 */
google.maps.drawing.DrawingControlOptions.prototype.position;

/**
 * @param {(google.maps.drawing.DrawingManagerOptions|Object.<string>)=} opt_options
 * @extends {google.maps.MVCObject}
 * @constructor
 */
google.maps.drawing.DrawingManager = function(opt_options) {};

/**
 * @nosideeffects
 * @return {?google.maps.drawing.OverlayType}
 */
google.maps.drawing.DrawingManager.prototype.getDrawingMode = function() {};

/**
 * @nosideeffects
 * @return {google.maps.Map}
 */
google.maps.drawing.DrawingManager.prototype.getMap = function() {};

/**
 * @param {?google.maps.drawing.OverlayType} drawingMode
 * @return {undefined}
 */
google.maps.drawing.DrawingManager.prototype.setDrawingMode = function(drawingMode) {};

/**
 * @param {google.maps.Map} map
 * @return {undefined}
 */
google.maps.drawing.DrawingManager.prototype.setMap = function(map) {};

/**
 * @param {google.maps.drawing.DrawingManagerOptions|Object.<string>} options
 * @return {undefined}
 */
google.maps.drawing.DrawingManager.prototype.setOptions = function(options) {};

/**
 * @interface
 */
google.maps.drawing.DrawingManagerOptions = function() {};

/**
 * @type {google.maps.CircleOptions|Object.<string>}
 */
google.maps.drawing.DrawingManagerOptions.prototype.circleOptions;

/**
 * @type {boolean}
 */
google.maps.drawing.DrawingManagerOptions.prototype.drawingControl;

/**
 * @type {google.maps.drawing.DrawingControlOptions|Object.<string>}
 */
google.maps.drawing.DrawingManagerOptions.prototype.drawingControlOptions;

/**
 * @type {google.maps.drawing.OverlayType}
 */
google.maps.drawing.DrawingManagerOptions.prototype.drawingMode;

/**
 * @type {google.maps.Map}
 */
google.maps.drawing.DrawingManagerOptions.prototype.map;

/**
 * @type {google.maps.MarkerOptions|Object.<string>}
 */
google.maps.drawing.DrawingManagerOptions.prototype.markerOptions;

/**
 * @type {google.maps.PolygonOptions|Object.<string>}
 */
google.maps.drawing.DrawingManagerOptions.prototype.polygonOptions;

/**
 * @type {google.maps.PolylineOptions|Object.<string>}
 */
google.maps.drawing.DrawingManagerOptions.prototype.polylineOptions;

/**
 * @type {google.maps.RectangleOptions|Object.<string>}
 */
google.maps.drawing.DrawingManagerOptions.prototype.rectangleOptions;

/**
 * @constructor
 */
google.maps.drawing.OverlayCompleteEvent = function() {};

/**
 * @type {google.maps.Marker|google.maps.Polygon|google.maps.Polyline|google.maps.Rectangle|google.maps.Circle}
 */
google.maps.drawing.OverlayCompleteEvent.prototype.overlay;

/**
 * @type {google.maps.drawing.OverlayType}
 */
google.maps.drawing.OverlayCompleteEvent.prototype.type;

/**
 * @enum {string}
 */
google.maps.drawing.OverlayType = {
  CIRCLE: '1',
  MARKER: '2',
  POLYGON: '3',
  POLYLINE: '4',
  RECTANGLE: ''
};

// Namespace
google.maps.event = {};

/**
 * @param {Object} instance
 * @param {string} eventName
 * @param {!Function} handler
 * @param {boolean=} opt_capture
 * @return {google.maps.MapsEventListener}
 */
google.maps.event.addDomListener = function(instance, eventName, handler, opt_capture) {};

/**
 * @param {Object} instance
 * @param {string} eventName
 * @param {!Function} handler
 * @param {boolean=} opt_capture
 * @return {google.maps.MapsEventListener}
 */
google.maps.event.addDomListenerOnce = function(instance, eventName, handler, opt_capture) {};

/**
 * @param {Object} instance
 * @param {string} eventName
 * @param {!Function} handler
 * @return {google.maps.MapsEventListener}
 */
google.maps.event.addListener = function(instance, eventName, handler) {};

/**
 * @param {Object} instance
 * @param {string} eventName
 * @param {!Function} handler
 * @return {google.maps.MapsEventListener}
 */
google.maps.event.addListenerOnce = function(instance, eventName, handler) {};

/**
 * @param {Object} instance
 * @return {undefined}
 */
google.maps.event.clearInstanceListeners = function(instance) {};

/**
 * @param {Object} instance
 * @param {string} eventName
 * @return {undefined}
 */
google.maps.event.clearListeners = function(instance, eventName) {};

/**
 * @param {google.maps.MapsEventListener} listener
 * @return {undefined}
 */
google.maps.event.removeListener = function(listener) {};

/**
 * @param {Object} instance
 * @param {string} eventName
 * @param {...*} var_args
 * @return {undefined}
 */
google.maps.event.trigger = function(instance, eventName, var_args) {};

// Namespace
google.maps.geometry = {};

// Namespace
google.maps.geometry.encoding = {};

/**
 * @param {string} encodedPath
 * @return {Array.<google.maps.LatLng>}
 */
google.maps.geometry.encoding.decodePath = function(encodedPath) {};

/**
 * @param {Array.<google.maps.LatLng>|google.maps.MVCArray.<google.maps.LatLng>} path
 * @return {string}
 */
google.maps.geometry.encoding.encodePath = function(path) {};

// Namespace
google.maps.geometry.poly = {};

/**
 * @param {google.maps.LatLng} point
 * @param {google.maps.Polygon} polygon
 * @return {boolean}
 */
google.maps.geometry.poly.containsLocation = function(point, polygon) {};

/**
 * @param {google.maps.LatLng} point
 * @param {google.maps.Polygon|google.maps.Polyline} poly
 * @param {number=} opt_tolerance
 * @return {boolean}
 */
google.maps.geometry.poly.isLocationOnEdge = function(point, poly, opt_tolerance) {};

// Namespace
google.maps.geometry.spherical = {};

/**
 * @param {Array.<google.maps.LatLng>|google.maps.MVCArray.<google.maps.LatLng>} path
 * @param {number=} opt_radius
 * @return {number}
 */
google.maps.geometry.spherical.computeArea = function(path, opt_radius) {};

/**
 * @param {google.maps.LatLng} from
 * @param {google.maps.LatLng} to
 * @param {number=} opt_radius
 * @return {number}
 */
google.maps.geometry.spherical.computeDistanceBetween = function(from, to, opt_radius) {};

/**
 * @param {google.maps.LatLng} from
 * @param {google.maps.LatLng} to
 * @return {number}
 */
google.maps.geometry.spherical.computeHeading = function(from, to) {};

/**
 * @param {Array.<google.maps.LatLng>|google.maps.MVCArray.<google.maps.LatLng>} path
 * @param {number=} opt_radius
 * @return {number}
 */
google.maps.geometry.spherical.computeLength = function(path, opt_radius) {};

/**
 * @param {google.maps.LatLng} from
 * @param {number} distance
 * @param {number} heading
 * @param {number=} opt_radius
 * @return {google.maps.LatLng}
 */
google.maps.geometry.spherical.computeOffset = function(from, distance, heading, opt_radius) {};

/**
 * @param {google.maps.LatLng} to
 * @param {number} distance
 * @param {number} heading
 * @param {number=} opt_radius
 * @return {google.maps.LatLng}
 */
google.maps.geometry.spherical.computeOffsetOrigin = function(to, distance, heading, opt_radius) {};

/**
 * @param {Array.<google.maps.LatLng>|google.maps.MVCArray.<google.maps.LatLng>} loop
 * @param {number=} opt_radius
 * @return {number}
 */
google.maps.geometry.spherical.computeSignedArea = function(loop, opt_radius) {};

/**
 * @param {google.maps.LatLng} from
 * @param {google.maps.LatLng} to
 * @param {number} fraction
 * @return {google.maps.LatLng}
 */
google.maps.geometry.spherical.interpolate = function(from, to, fraction) {};

// Namespace
google.maps.panoramio = {};

/**
 * @interface
 */
google.maps.panoramio.PanoramioFeature = function() {};

/**
 * @type {string}
 */
google.maps.panoramio.PanoramioFeature.prototype.author;

/**
 * @type {string}
 */
google.maps.panoramio.PanoramioFeature.prototype.photoId;

/**
 * @type {string}
 */
google.maps.panoramio.PanoramioFeature.prototype.title;

/**
 * @type {string}
 */
google.maps.panoramio.PanoramioFeature.prototype.url;

/**
 * @type {string}
 */
google.maps.panoramio.PanoramioFeature.prototype.userId;

/**
 * @param {(google.maps.panoramio.PanoramioLayerOptions|Object.<string>)=} opt_opts
 * @extends {google.maps.MVCObject}
 * @constructor
 */
google.maps.panoramio.PanoramioLayer = function(opt_opts) {};

/**
 * @nosideeffects
 * @return {google.maps.Map}
 */
google.maps.panoramio.PanoramioLayer.prototype.getMap = function() {};

/**
 * @nosideeffects
 * @return {string}
 */
google.maps.panoramio.PanoramioLayer.prototype.getTag = function() {};

/**
 * @nosideeffects
 * @return {string}
 */
google.maps.panoramio.PanoramioLayer.prototype.getUserId = function() {};

/**
 * @param {google.maps.Map} map
 * @return {undefined}
 */
google.maps.panoramio.PanoramioLayer.prototype.setMap = function(map) {};

/**
 * @param {google.maps.panoramio.PanoramioLayerOptions|Object.<string>} options
 * @return {undefined}
 */
google.maps.panoramio.PanoramioLayer.prototype.setOptions = function(options) {};

/**
 * @param {string} tag
 * @return {undefined}
 */
google.maps.panoramio.PanoramioLayer.prototype.setTag = function(tag) {};

/**
 * @param {string} userId
 * @return {undefined}
 */
google.maps.panoramio.PanoramioLayer.prototype.setUserId = function(userId) {};

/**
 * @interface
 */
google.maps.panoramio.PanoramioLayerOptions = function() {};

/**
 * @type {boolean}
 */
google.maps.panoramio.PanoramioLayerOptions.prototype.clickable;

/**
 * @type {google.maps.Map}
 */
google.maps.panoramio.PanoramioLayerOptions.prototype.map;

/**
 * @type {boolean}
 */
google.maps.panoramio.PanoramioLayerOptions.prototype.suppressInfoWindows;

/**
 * @type {string}
 */
google.maps.panoramio.PanoramioLayerOptions.prototype.tag;

/**
 * @type {string}
 */
google.maps.panoramio.PanoramioLayerOptions.prototype.userId;

/**
 * @interface
 */
google.maps.panoramio.PanoramioMouseEvent = function() {};

/**
 * @type {google.maps.panoramio.PanoramioFeature}
 */
google.maps.panoramio.PanoramioMouseEvent.prototype.featureDetails;

/**
 * @type {string}
 */
google.maps.panoramio.PanoramioMouseEvent.prototype.infoWindowHtml;

/**
 * @type {google.maps.LatLng}
 */
google.maps.panoramio.PanoramioMouseEvent.prototype.latLng;

/**
 * @type {google.maps.Size}
 */
google.maps.panoramio.PanoramioMouseEvent.prototype.pixelOffset;

// Namespace
google.maps.places = {};

/**
 * @param {HTMLInputElement} inputField
 * @param {(google.maps.places.AutocompleteOptions|Object.<string>)=} opt_opts
 * @extends {google.maps.MVCObject}
 * @constructor
 */
google.maps.places.Autocomplete = function(inputField, opt_opts) {};

/**
 * @nosideeffects
 * @return {google.maps.LatLngBounds}
 */
google.maps.places.Autocomplete.prototype.getBounds = function() {};

/**
 * @nosideeffects
 * @return {google.maps.places.PlaceResult}
 */
google.maps.places.Autocomplete.prototype.getPlace = function() {};

/**
 * @param {google.maps.LatLngBounds} bounds
 * @return {undefined}
 */
google.maps.places.Autocomplete.prototype.setBounds = function(bounds) {};

/**
 * @param {google.maps.places.ComponentRestrictions} restrictions
 * @return {undefined}
 */
google.maps.places.Autocomplete.prototype.setComponentRestrictions = function(restrictions) {};

/**
 * @param {Array.<string>} types
 * @return {undefined}
 */
google.maps.places.Autocomplete.prototype.setTypes = function(types) {};

/**
 * @interface
 */
google.maps.places.AutocompleteOptions = function() {};

/**
 * @type {google.maps.LatLngBounds}
 */
google.maps.places.AutocompleteOptions.prototype.bounds;

/**
 * @type {google.maps.places.ComponentRestrictions}
 */
google.maps.places.AutocompleteOptions.prototype.componentRestrictions;

/**
 * @type {Array.<string>}
 */
google.maps.places.AutocompleteOptions.prototype.types;

/**
 * @interface
 */
google.maps.places.AutocompletePrediction = function() {};

/**
 * @type {string}
 */
google.maps.places.AutocompletePrediction.prototype.description;

/**
 * @type {Array.<google.maps.places.PredictionSubstring>}
 */
google.maps.places.AutocompletePrediction.prototype.matched_substrings;

/**
 * @type {string}
 */
google.maps.places.AutocompletePrediction.prototype.place_id;

/**
 * @type {Array.<google.maps.places.PredictionTerm>}
 */
google.maps.places.AutocompletePrediction.prototype.terms;

/**
 * @type {Array.<string>}
 */
google.maps.places.AutocompletePrediction.prototype.types;

/**
 * @constructor
 */
google.maps.places.AutocompleteService = function() {};

/**
 * @param {google.maps.places.AutocompletionRequest|Object.<string>} request
 * @param {function(Array.<google.maps.places.AutocompletePrediction>, google.maps.places.PlacesServiceStatus)} callback
 * @return {undefined}
 */
google.maps.places.AutocompleteService.prototype.getPlacePredictions = function(request, callback) {};

/**
 * @param {google.maps.places.QueryAutocompletionRequest|Object.<string>} request
 * @param {function(Array.<google.maps.places.QueryAutocompletePrediction>, google.maps.places.PlacesServiceStatus)} callback
 * @return {undefined}
 */
google.maps.places.AutocompleteService.prototype.getQueryPredictions = function(request, callback) {};

/**
 * @interface
 */
google.maps.places.AutocompletionRequest = function() {};

/**
 * @type {google.maps.LatLngBounds}
 */
google.maps.places.AutocompletionRequest.prototype.bounds;

/**
 * @type {google.maps.places.ComponentRestrictions}
 */
google.maps.places.AutocompletionRequest.prototype.componentRestrictions;

/**
 * @type {string}
 */
google.maps.places.AutocompletionRequest.prototype.input;

/**
 * @type {google.maps.LatLng}
 */
google.maps.places.AutocompletionRequest.prototype.location;

/**
 * @type {number}
 */
google.maps.places.AutocompletionRequest.prototype.offset;

/**
 * @type {number}
 */
google.maps.places.AutocompletionRequest.prototype.radius;

/**
 * @type {Array.<string>}
 */
google.maps.places.AutocompletionRequest.prototype.types;

/**
 * @constructor
 */
google.maps.places.ComponentRestrictions = function() {};

/**
 * @type {string}
 */
google.maps.places.ComponentRestrictions.prototype.country;

/**
 * @constructor
 */
google.maps.places.PhotoOptions = function() {};

/**
 * @type {number}
 */
google.maps.places.PhotoOptions.prototype.maxHeight;

/**
 * @type {number}
 */
google.maps.places.PhotoOptions.prototype.maxWidth;

/**
 * @constructor
 */
google.maps.places.PlaceAspectRating = function() {};

/**
 * @type {number}
 */
google.maps.places.PlaceAspectRating.prototype.rating;

/**
 * @type {string}
 */
google.maps.places.PlaceAspectRating.prototype.type;

/**
 * @interface
 */
google.maps.places.PlaceDetailsRequest = function() {};

/**
 * @type {string}
 */
google.maps.places.PlaceDetailsRequest.prototype.placeId;

/**
 * @interface
 */
google.maps.places.PlaceGeometry = function() {};

/**
 * @type {google.maps.LatLng}
 */
google.maps.places.PlaceGeometry.prototype.location;

/**
 * @type {google.maps.LatLngBounds}
 */
google.maps.places.PlaceGeometry.prototype.viewport;

/**
 * @interface
 */
google.maps.places.PlacePhoto = function() {};

/**
 * @type {number}
 */
google.maps.places.PlacePhoto.prototype.height;

/**
 * @type {Array.<string>}
 */
google.maps.places.PlacePhoto.prototype.html_attributions;

/**
 * @type {number}
 */
google.maps.places.PlacePhoto.prototype.width;

/**
 * @param {google.maps.places.PhotoOptions|Object.<string>} opts
 * @return {string}
 */
google.maps.places.PlacePhoto.prototype.getUrl = function(opts) {};

/**
 * @interface
 */
google.maps.places.PlaceResult = function() {};

/**
 * @type {Array.<google.maps.GeocoderAddressComponent>}
 */
google.maps.places.PlaceResult.prototype.address_components;

/**
 * @type {Array.<google.maps.places.PlaceAspectRating>}
 */
google.maps.places.PlaceResult.prototype.aspects;

/**
 * @type {string}
 */
google.maps.places.PlaceResult.prototype.formatted_address;

/**
 * @type {string}
 */
google.maps.places.PlaceResult.prototype.formatted_phone_number;

/**
 * @type {google.maps.places.PlaceGeometry}
 */
google.maps.places.PlaceResult.prototype.geometry;

/**
 * @type {Array.<string>}
 */
google.maps.places.PlaceResult.prototype.html_attributions;

/**
 * @type {string}
 */
google.maps.places.PlaceResult.prototype.icon;

/**
 * @type {string}
 */
google.maps.places.PlaceResult.prototype.international_phone_number;

/**
 * @type {string}
 */
google.maps.places.PlaceResult.prototype.name;

/**
 * @type {boolean}
 */
google.maps.places.PlaceResult.prototype.permanently_closed;

/**
 * @type {Array.<google.maps.places.PlacePhoto>}
 */
google.maps.places.PlaceResult.prototype.photos;

/**
 * @type {string}
 */
google.maps.places.PlaceResult.prototype.place_id;

/**
 * @type {number}
 */
google.maps.places.PlaceResult.prototype.price_level;

/**
 * @type {number}
 */
google.maps.places.PlaceResult.prototype.rating;

/**
 * @type {Array.<google.maps.places.PlaceReview>}
 */
google.maps.places.PlaceResult.prototype.reviews;

/**
 * @type {Array.<string>}
 */
google.maps.places.PlaceResult.prototype.types;

/**
 * @type {string}
 */
google.maps.places.PlaceResult.prototype.url;

/**
 * @type {string}
 */
google.maps.places.PlaceResult.prototype.vicinity;

/**
 * @type {string}
 */
google.maps.places.PlaceResult.prototype.website;

/**
 * @constructor
 */
google.maps.places.PlaceReview = function() {};

/**
 * @type {Array.<google.maps.places.PlaceAspectRating>}
 */
google.maps.places.PlaceReview.prototype.aspects;

/**
 * @type {string}
 */
google.maps.places.PlaceReview.prototype.author_name;

/**
 * @type {string}
 */
google.maps.places.PlaceReview.prototype.author_url;

/**
 * @type {string}
 */
google.maps.places.PlaceReview.prototype.language;

/**
 * @type {string}
 */
google.maps.places.PlaceReview.prototype.text;

/**
 * @constructor
 */
google.maps.places.PlaceSearchPagination = function() {};

/**
 * @type {boolean}
 */
google.maps.places.PlaceSearchPagination.prototype.hasNextPage;

/**
 * @return {undefined}
 */
google.maps.places.PlaceSearchPagination.prototype.nextPage = function() {};

/**
 * @interface
 */
google.maps.places.PlaceSearchRequest = function() {};

/**
 * @type {google.maps.LatLngBounds}
 */
google.maps.places.PlaceSearchRequest.prototype.bounds;

/**
 * @type {string}
 */
google.maps.places.PlaceSearchRequest.prototype.keyword;

/**
 * @type {google.maps.LatLng|google.maps.LatLngLiteral}
 */
google.maps.places.PlaceSearchRequest.prototype.location;

/**
 * @type {number}
 */
google.maps.places.PlaceSearchRequest.prototype.maxPriceLevel;

/**
 * @type {number}
 */
google.maps.places.PlaceSearchRequest.prototype.minPriceLevel;

/**
 * @type {string}
 */
google.maps.places.PlaceSearchRequest.prototype.name;

/**
 * @type {boolean}
 */
google.maps.places.PlaceSearchRequest.prototype.openNow;

/**
 * @type {number}
 */
google.maps.places.PlaceSearchRequest.prototype.radius;

/**
 * @type {google.maps.places.RankBy}
 */
google.maps.places.PlaceSearchRequest.prototype.rankBy;

/**
 * @type {Array.<string>}
 */
google.maps.places.PlaceSearchRequest.prototype.types;

/**
 * @param {HTMLDivElement|google.maps.Map} attrContainer
 * @constructor
 */
google.maps.places.PlacesService = function(attrContainer) {};

/**
 * @param {google.maps.places.PlaceDetailsRequest|Object.<string>} request
 * @param {function(google.maps.places.PlaceResult, google.maps.places.PlacesServiceStatus)} callback
 * @return {undefined}
 */
google.maps.places.PlacesService.prototype.getDetails = function(request, callback) {};

/**
 * @param {google.maps.places.PlaceSearchRequest|Object.<string>} request
 * @param {function(Array.<google.maps.places.PlaceResult>, google.maps.places.PlacesServiceStatus,
               google.maps.places.PlaceSearchPagination)} callback
 * @return {undefined}
 */
google.maps.places.PlacesService.prototype.nearbySearch = function(request, callback) {};

/**
 * @param {google.maps.places.RadarSearchRequest|Object.<string>} request
 * @param {function(Array.<google.maps.places.PlaceResult>, google.maps.places.PlacesServiceStatus)} callback
 * @return {undefined}
 */
google.maps.places.PlacesService.prototype.radarSearch = function(request, callback) {};

/**
 * @param {google.maps.places.TextSearchRequest|Object.<string>} request
 * @param {function(Array.<google.maps.places.PlaceResult>, google.maps.places.PlacesServiceStatus)} callback
 * @return {undefined}
 */
google.maps.places.PlacesService.prototype.textSearch = function(request, callback) {};

/**
 * @enum {string}
 */
google.maps.places.PlacesServiceStatus = {
  INVALID_REQUEST: '1',
  OK: '2',
  OVER_QUERY_LIMIT: '3',
  REQUEST_DENIED: '4',
  UNKNOWN_ERROR: '5',
  ZERO_RESULTS: ''
};

/**
 * @interface
 */
google.maps.places.PredictionSubstring = function() {};

/**
 * @type {number}
 */
google.maps.places.PredictionSubstring.prototype.length;

/**
 * @type {number}
 */
google.maps.places.PredictionSubstring.prototype.offset;

/**
 * @interface
 */
google.maps.places.PredictionTerm = function() {};

/**
 * @type {number}
 */
google.maps.places.PredictionTerm.prototype.offset;

/**
 * @type {string}
 */
google.maps.places.PredictionTerm.prototype.value;

/**
 * @interface
 */
google.maps.places.QueryAutocompletePrediction = function() {};

/**
 * @type {string}
 */
google.maps.places.QueryAutocompletePrediction.prototype.description;

/**
 * @type {Array.<google.maps.places.PredictionSubstring>}
 */
google.maps.places.QueryAutocompletePrediction.prototype.matched_substrings;

/**
 * @type {string}
 */
google.maps.places.QueryAutocompletePrediction.prototype.place_id;

/**
 * @type {Array.<google.maps.places.PredictionTerm>}
 */
google.maps.places.QueryAutocompletePrediction.prototype.terms;

/**
 * @interface
 */
google.maps.places.QueryAutocompletionRequest = function() {};

/**
 * @type {google.maps.LatLngBounds}
 */
google.maps.places.QueryAutocompletionRequest.prototype.bounds;

/**
 * @type {string}
 */
google.maps.places.QueryAutocompletionRequest.prototype.input;

/**
 * @type {google.maps.LatLng}
 */
google.maps.places.QueryAutocompletionRequest.prototype.location;

/**
 * @type {number}
 */
google.maps.places.QueryAutocompletionRequest.prototype.offset;

/**
 * @type {number}
 */
google.maps.places.QueryAutocompletionRequest.prototype.radius;

/**
 * @interface
 */
google.maps.places.RadarSearchRequest = function() {};

/**
 * @type {google.maps.LatLngBounds}
 */
google.maps.places.RadarSearchRequest.prototype.bounds;

/**
 * @type {string}
 */
google.maps.places.RadarSearchRequest.prototype.keyword;

/**
 * @type {google.maps.LatLng|google.maps.LatLngLiteral}
 */
google.maps.places.RadarSearchRequest.prototype.location;

/**
 * @type {string}
 */
google.maps.places.RadarSearchRequest.prototype.name;

/**
 * @type {number}
 */
google.maps.places.RadarSearchRequest.prototype.radius;

/**
 * @type {Array.<string>}
 */
google.maps.places.RadarSearchRequest.prototype.types;

/**
 * @enum {number}
 */
google.maps.places.RankBy = {
  DISTANCE: 1,
  PROMINENCE: 2
};

/**
 * @param {HTMLInputElement} inputField
 * @param {(google.maps.places.SearchBoxOptions|Object.<string>)=} opt_opts
 * @extends {google.maps.MVCObject}
 * @constructor
 */
google.maps.places.SearchBox = function(inputField, opt_opts) {};

/**
 * @nosideeffects
 * @return {google.maps.LatLngBounds}
 */
google.maps.places.SearchBox.prototype.getBounds = function() {};

/**
 * @nosideeffects
 * @return {Array.<google.maps.places.PlaceResult>}
 */
google.maps.places.SearchBox.prototype.getPlaces = function() {};

/**
 * @param {google.maps.LatLngBounds} bounds
 * @return {undefined}
 */
google.maps.places.SearchBox.prototype.setBounds = function(bounds) {};

/**
 * @interface
 */
google.maps.places.SearchBoxOptions = function() {};

/**
 * @type {google.maps.LatLngBounds}
 */
google.maps.places.SearchBoxOptions.prototype.bounds;

/**
 * @interface
 */
google.maps.places.TextSearchRequest = function() {};

/**
 * @type {google.maps.LatLngBounds}
 */
google.maps.places.TextSearchRequest.prototype.bounds;

/**
 * @type {google.maps.LatLng|google.maps.LatLngLiteral}
 */
google.maps.places.TextSearchRequest.prototype.location;

/**
 * @type {string}
 */
google.maps.places.TextSearchRequest.prototype.query;

/**
 * @type {number}
 */
google.maps.places.TextSearchRequest.prototype.radius;

/**
 * @type {Array.<string>}
 */
google.maps.places.TextSearchRequest.prototype.types;

// Namespace
google.maps.visualization = {};

/**
 * @param {google.maps.visualization.DynamicMapsEngineLayerOptions|Object.<string>} options
 * @extends {google.maps.MVCObject}
 * @constructor
 */
google.maps.visualization.DynamicMapsEngineLayer = function(options) {};

/**
 * @param {string} featureId
 * @return {google.maps.visualization.FeatureStyle}
 */
google.maps.visualization.DynamicMapsEngineLayer.prototype.getFeatureStyle = function(featureId) {};

/**
 * @nosideeffects
 * @return {string}
 */
google.maps.visualization.DynamicMapsEngineLayer.prototype.getLayerId = function() {};

/**
 * @nosideeffects
 * @return {string}
 */
google.maps.visualization.DynamicMapsEngineLayer.prototype.getLayerKey = function() {};

/**
 * @nosideeffects
 * @return {google.maps.Map}
 */
google.maps.visualization.DynamicMapsEngineLayer.prototype.getMap = function() {};

/**
 * @nosideeffects
 * @return {string}
 */
google.maps.visualization.DynamicMapsEngineLayer.prototype.getMapId = function() {};

/**
 * @nosideeffects
 * @return {number}
 */
google.maps.visualization.DynamicMapsEngineLayer.prototype.getOpacity = function() {};

/**
 * @nosideeffects
 * @return {google.maps.visualization.MapsEngineStatus}
 */
google.maps.visualization.DynamicMapsEngineLayer.prototype.getStatus = function() {};

/**
 * @param {string} layerId
 * @return {undefined}
 */
google.maps.visualization.DynamicMapsEngineLayer.prototype.setLayerId = function(layerId) {};

/**
 * @param {string} layerKey
 * @return {undefined}
 */
google.maps.visualization.DynamicMapsEngineLayer.prototype.setLayerKey = function(layerKey) {};

/**
 * @param {google.maps.Map} map
 * @return {undefined}
 */
google.maps.visualization.DynamicMapsEngineLayer.prototype.setMap = function(map) {};

/**
 * @param {string} mapId
 * @return {undefined}
 */
google.maps.visualization.DynamicMapsEngineLayer.prototype.setMapId = function(mapId) {};

/**
 * @param {number} opacity
 * @return {undefined}
 */
google.maps.visualization.DynamicMapsEngineLayer.prototype.setOpacity = function(opacity) {};

/**
 * @param {google.maps.visualization.DynamicMapsEngineLayerOptions|Object.<string>} options
 * @return {undefined}
 */
google.maps.visualization.DynamicMapsEngineLayer.prototype.setOptions = function(options) {};

/**
 * @interface
 */
google.maps.visualization.DynamicMapsEngineLayerOptions = function() {};

/**
 * @type {string}
 */
google.maps.visualization.DynamicMapsEngineLayerOptions.prototype.accessToken;

/**
 * @type {boolean}
 */
google.maps.visualization.DynamicMapsEngineLayerOptions.prototype.clickable;

/**
 * @type {string}
 */
google.maps.visualization.DynamicMapsEngineLayerOptions.prototype.layerId;

/**
 * @type {string}
 */
google.maps.visualization.DynamicMapsEngineLayerOptions.prototype.layerKey;

/**
 * @type {google.maps.Map}
 */
google.maps.visualization.DynamicMapsEngineLayerOptions.prototype.map;

/**
 * @type {string}
 */
google.maps.visualization.DynamicMapsEngineLayerOptions.prototype.mapId;

/**
 * @type {number}
 */
google.maps.visualization.DynamicMapsEngineLayerOptions.prototype.opacity;

/**
 * @type {boolean}
 */
google.maps.visualization.DynamicMapsEngineLayerOptions.prototype.suppressInfoWindows;

/**
 * @interface
 */
google.maps.visualization.DynamicMapsEngineMouseEvent = function() {};

/**
 * @type {string}
 */
google.maps.visualization.DynamicMapsEngineMouseEvent.prototype.featureId;

/**
 * @type {google.maps.LatLng}
 */
google.maps.visualization.DynamicMapsEngineMouseEvent.prototype.latLng;

/**
 * @param {function(google.maps.visualization.MapsEngineMouseEvent)} callback
 * @return {undefined}
 */
google.maps.visualization.DynamicMapsEngineMouseEvent.prototype.getDetails = function(callback) {};

/**
 * @interface
 */
google.maps.visualization.FeatureStyle = function() {};

/**
 * @type {string}
 */
google.maps.visualization.FeatureStyle.prototype.fillColor;

/**
 * @type {string}
 */
google.maps.visualization.FeatureStyle.prototype.fillOpacity;

/**
 * @type {string}
 */
google.maps.visualization.FeatureStyle.prototype.iconAnchor;

/**
 * @type {string}
 */
google.maps.visualization.FeatureStyle.prototype.iconClip;

/**
 * @type {string}
 */
google.maps.visualization.FeatureStyle.prototype.iconImage;

/**
 * @type {string}
 */
google.maps.visualization.FeatureStyle.prototype.iconOpacity;

/**
 * @type {string}
 */
google.maps.visualization.FeatureStyle.prototype.iconSize;

/**
 * @type {string}
 */
google.maps.visualization.FeatureStyle.prototype.strokeColor;

/**
 * @type {string}
 */
google.maps.visualization.FeatureStyle.prototype.strokeOpacity;

/**
 * @type {string}
 */
google.maps.visualization.FeatureStyle.prototype.strokeWidth;

/**
 * @type {string}
 */
google.maps.visualization.FeatureStyle.prototype.zIndex;

/**
 * @param {string} property
 * @return {undefined}
 */
google.maps.visualization.FeatureStyle.prototype.reset = function(property) {};

/**
 * @return {undefined}
 */
google.maps.visualization.FeatureStyle.prototype.resetAll = function() {};

/**
 * @param {(google.maps.visualization.HeatmapLayerOptions|Object.<string>)=} opt_opts
 * @extends {google.maps.MVCObject}
 * @constructor
 */
google.maps.visualization.HeatmapLayer = function(opt_opts) {};

/**
 * @nosideeffects
 * @return {google.maps.MVCArray.<google.maps.LatLng|google.maps.visualization.WeightedLocation>}
 */
google.maps.visualization.HeatmapLayer.prototype.getData = function() {};

/**
 * @nosideeffects
 * @return {google.maps.Map}
 */
google.maps.visualization.HeatmapLayer.prototype.getMap = function() {};

/**
 * @param {google.maps.MVCArray.<google.maps.LatLng|google.maps.visualization.WeightedLocation>|
    Array.<google.maps.LatLng|google.maps.visualization.WeightedLocation>} data
 * @return {undefined}
 */
google.maps.visualization.HeatmapLayer.prototype.setData = function(data) {};

/**
 * @param {google.maps.Map} map
 * @return {undefined}
 */
google.maps.visualization.HeatmapLayer.prototype.setMap = function(map) {};

/**
 * @interface
 */
google.maps.visualization.HeatmapLayerOptions = function() {};

/**
 * @type {google.maps.MVCArray.<google.maps.LatLng>}
 */
google.maps.visualization.HeatmapLayerOptions.prototype.data;

/**
 * @type {boolean}
 */
google.maps.visualization.HeatmapLayerOptions.prototype.dissipating;

/**
 * @type {Array.<string>}
 */
google.maps.visualization.HeatmapLayerOptions.prototype.gradient;

/**
 * @type {google.maps.Map}
 */
google.maps.visualization.HeatmapLayerOptions.prototype.map;

/**
 * @type {number}
 */
google.maps.visualization.HeatmapLayerOptions.prototype.maxIntensity;

/**
 * @type {number}
 */
google.maps.visualization.HeatmapLayerOptions.prototype.opacity;

/**
 * @type {number}
 */
google.maps.visualization.HeatmapLayerOptions.prototype.radius;

/**
 * @param {google.maps.visualization.MapsEngineLayerOptions|Object.<string>} options
 * @extends {google.maps.MVCObject}
 * @constructor
 */
google.maps.visualization.MapsEngineLayer = function(options) {};

/**
 * @nosideeffects
 * @return {string}
 */
google.maps.visualization.MapsEngineLayer.prototype.getLayerId = function() {};

/**
 * @nosideeffects
 * @return {string}
 */
google.maps.visualization.MapsEngineLayer.prototype.getLayerKey = function() {};

/**
 * @nosideeffects
 * @return {google.maps.Map}
 */
google.maps.visualization.MapsEngineLayer.prototype.getMap = function() {};

/**
 * @nosideeffects
 * @return {string}
 */
google.maps.visualization.MapsEngineLayer.prototype.getMapId = function() {};

/**
 * @nosideeffects
 * @return {number}
 */
google.maps.visualization.MapsEngineLayer.prototype.getOpacity = function() {};

/**
 * @nosideeffects
 * @return {google.maps.visualization.MapsEngineLayerProperties}
 */
google.maps.visualization.MapsEngineLayer.prototype.getProperties = function() {};

/**
 * @nosideeffects
 * @return {google.maps.visualization.MapsEngineStatus}
 */
google.maps.visualization.MapsEngineLayer.prototype.getStatus = function() {};

/**
 * @nosideeffects
 * @return {number}
 */
google.maps.visualization.MapsEngineLayer.prototype.getZIndex = function() {};

/**
 * @param {string} layerId
 * @return {undefined}
 */
google.maps.visualization.MapsEngineLayer.prototype.setLayerId = function(layerId) {};

/**
 * @param {string} layerKey
 * @return {undefined}
 */
google.maps.visualization.MapsEngineLayer.prototype.setLayerKey = function(layerKey) {};

/**
 * @param {google.maps.Map} map
 * @return {undefined}
 */
google.maps.visualization.MapsEngineLayer.prototype.setMap = function(map) {};

/**
 * @param {string} mapId
 * @return {undefined}
 */
google.maps.visualization.MapsEngineLayer.prototype.setMapId = function(mapId) {};

/**
 * @param {number} opacity
 * @return {undefined}
 */
google.maps.visualization.MapsEngineLayer.prototype.setOpacity = function(opacity) {};

/**
 * @param {google.maps.visualization.MapsEngineLayerOptions|Object.<string>} options
 * @return {undefined}
 */
google.maps.visualization.MapsEngineLayer.prototype.setOptions = function(options) {};

/**
 * @param {number} zIndex
 * @return {undefined}
 */
google.maps.visualization.MapsEngineLayer.prototype.setZIndex = function(zIndex) {};

/**
 * @interface
 */
google.maps.visualization.MapsEngineLayerOptions = function() {};

/**
 * @type {string}
 */
google.maps.visualization.MapsEngineLayerOptions.prototype.accessToken;

/**
 * @type {boolean}
 */
google.maps.visualization.MapsEngineLayerOptions.prototype.clickable;

/**
 * @type {boolean}
 */
google.maps.visualization.MapsEngineLayerOptions.prototype.fitBounds;

/**
 * @type {string}
 */
google.maps.visualization.MapsEngineLayerOptions.prototype.layerId;

/**
 * @type {string}
 */
google.maps.visualization.MapsEngineLayerOptions.prototype.layerKey;

/**
 * @type {google.maps.Map}
 */
google.maps.visualization.MapsEngineLayerOptions.prototype.map;

/**
 * @type {string}
 */
google.maps.visualization.MapsEngineLayerOptions.prototype.mapId;

/**
 * @type {number}
 */
google.maps.visualization.MapsEngineLayerOptions.prototype.opacity;

/**
 * @type {boolean}
 */
google.maps.visualization.MapsEngineLayerOptions.prototype.suppressInfoWindows;

/**
 * @type {number}
 */
google.maps.visualization.MapsEngineLayerOptions.prototype.zIndex;

/**
 * @interface
 */
google.maps.visualization.MapsEngineLayerProperties = function() {};

/**
 * @type {string}
 */
google.maps.visualization.MapsEngineLayerProperties.prototype.name;

/**
 * @interface
 */
google.maps.visualization.MapsEngineMouseEvent = function() {};

/**
 * @type {string}
 */
google.maps.visualization.MapsEngineMouseEvent.prototype.featureId;

/**
 * @type {string}
 */
google.maps.visualization.MapsEngineMouseEvent.prototype.infoWindowHtml;

/**
 * @type {google.maps.LatLng}
 */
google.maps.visualization.MapsEngineMouseEvent.prototype.latLng;

/**
 * @type {google.maps.Size}
 */
google.maps.visualization.MapsEngineMouseEvent.prototype.pixelOffset;

/**
 * @enum {string}
 */
google.maps.visualization.MapsEngineStatus = {
  INVALID_LAYER: '1',
  OK: '2',
  UNKNOWN_ERROR: '3'
};

/**
 * @interface
 */
google.maps.visualization.WeightedLocation = function() {};

/**
 * @type {google.maps.LatLng}
 */
google.maps.visualization.WeightedLocation.prototype.location;

/**
 * @type {number}
 */
google.maps.visualization.WeightedLocation.prototype.weight;

// Namespace
google.maps.weather = {};

/**
 * @extends {google.maps.MVCObject}
 * @constructor
 */
google.maps.weather.CloudLayer = function() {};

/**
 * @nosideeffects
 * @return {google.maps.Map}
 */
google.maps.weather.CloudLayer.prototype.getMap = function() {};

/**
 * @param {google.maps.Map} map
 * @return {undefined}
 */
google.maps.weather.CloudLayer.prototype.setMap = function(map) {};

/**
 * @enum {string}
 */
google.maps.weather.LabelColor = {
  BLACK: '1',
  WHITE: '2'
};

/**
 * @enum {string}
 */
google.maps.weather.TemperatureUnit = {
  CELSIUS: '1',
  FAHRENHEIT: '2'
};

/**
 * @interface
 */
google.maps.weather.WeatherConditions = function() {};

/**
 * @type {string}
 */
google.maps.weather.WeatherConditions.prototype.day;

/**
 * @type {string}
 */
google.maps.weather.WeatherConditions.prototype.description;

/**
 * @type {number}
 */
google.maps.weather.WeatherConditions.prototype.high;

/**
 * @type {number}
 */
google.maps.weather.WeatherConditions.prototype.humidity;

/**
 * @type {number}
 */
google.maps.weather.WeatherConditions.prototype.low;

/**
 * @type {string}
 */
google.maps.weather.WeatherConditions.prototype.shortDay;

/**
 * @type {number}
 */
google.maps.weather.WeatherConditions.prototype.temperature;

/**
 * @type {string}
 */
google.maps.weather.WeatherConditions.prototype.windDirection;

/**
 * @type {number}
 */
google.maps.weather.WeatherConditions.prototype.windSpeed;

/**
 * @interface
 */
google.maps.weather.WeatherFeature = function() {};

/**
 * @type {google.maps.weather.WeatherConditions}
 */
google.maps.weather.WeatherFeature.prototype.current;

/**
 * @type {Array.<google.maps.weather.WeatherForecast>}
 */
google.maps.weather.WeatherFeature.prototype.forecast;

/**
 * @type {string}
 */
google.maps.weather.WeatherFeature.prototype.location;

/**
 * @type {google.maps.weather.TemperatureUnit}
 */
google.maps.weather.WeatherFeature.prototype.temperatureUnit;

/**
 * @type {google.maps.weather.WindSpeedUnit}
 */
google.maps.weather.WeatherFeature.prototype.windSpeedUnit;

/**
 * @interface
 */
google.maps.weather.WeatherForecast = function() {};

/**
 * @type {string}
 */
google.maps.weather.WeatherForecast.prototype.day;

/**
 * @type {string}
 */
google.maps.weather.WeatherForecast.prototype.description;

/**
 * @type {number}
 */
google.maps.weather.WeatherForecast.prototype.high;

/**
 * @type {number}
 */
google.maps.weather.WeatherForecast.prototype.low;

/**
 * @type {string}
 */
google.maps.weather.WeatherForecast.prototype.shortDay;

/**
 * @param {(google.maps.weather.WeatherLayerOptions|Object.<string>)=} opt_opts
 * @extends {google.maps.MVCObject}
 * @constructor
 */
google.maps.weather.WeatherLayer = function(opt_opts) {};

/**
 * @nosideeffects
 * @return {google.maps.Map}
 */
google.maps.weather.WeatherLayer.prototype.getMap = function() {};

/**
 * @param {google.maps.Map} map
 * @return {undefined}
 */
google.maps.weather.WeatherLayer.prototype.setMap = function(map) {};

/**
 * @param {google.maps.weather.WeatherLayerOptions|Object.<string>} options
 * @return {undefined}
 */
google.maps.weather.WeatherLayer.prototype.setOptions = function(options) {};

/**
 * @interface
 */
google.maps.weather.WeatherLayerOptions = function() {};

/**
 * @type {boolean}
 */
google.maps.weather.WeatherLayerOptions.prototype.clickable;

/**
 * @type {google.maps.weather.LabelColor}
 */
google.maps.weather.WeatherLayerOptions.prototype.labelColor;

/**
 * @type {google.maps.Map}
 */
google.maps.weather.WeatherLayerOptions.prototype.map;

/**
 * @type {boolean}
 */
google.maps.weather.WeatherLayerOptions.prototype.suppressInfoWindows;

/**
 * @type {google.maps.weather.TemperatureUnit}
 */
google.maps.weather.WeatherLayerOptions.prototype.temperatureUnits;

/**
 * @type {google.maps.weather.WindSpeedUnit}
 */
google.maps.weather.WeatherLayerOptions.prototype.windSpeedUnits;

/**
 * @interface
 */
google.maps.weather.WeatherMouseEvent = function() {};

/**
 * @type {google.maps.weather.WeatherFeature}
 */
google.maps.weather.WeatherMouseEvent.prototype.featureDetails;

/**
 * @type {string}
 */
google.maps.weather.WeatherMouseEvent.prototype.infoWindowHtml;

/**
 * @type {google.maps.LatLng}
 */
google.maps.weather.WeatherMouseEvent.prototype.latLng;

/**
 * @type {google.maps.Size}
 */
google.maps.weather.WeatherMouseEvent.prototype.pixelOffset;

/**
 * @enum {string}
 */
google.maps.weather.WindSpeedUnit = {
  KILOMETERS_PER_HOUR: '1',
  METERS_PER_SECOND: '2',
  MILES_PER_HOUR: '3'
};

