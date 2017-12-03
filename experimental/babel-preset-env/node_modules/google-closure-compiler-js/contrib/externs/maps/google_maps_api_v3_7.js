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
 * @fileoverview Externs for the Google Maps v3.7 API.
 * @see http://code.google.com/apis/maps/documentation/javascript/reference.html
 * @externs
 */

google.maps = {};

/**
 * @enum {number}
 */
google.maps.Animation = {
  DROP: 1,
  BOUNCE: 2
};

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
 * @param {(google.maps.CircleOptions|Object.<string, *>)=} opt_opts
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
 * @param {google.maps.LatLng} center
 * @return {undefined}
 */
google.maps.Circle.prototype.setCenter = function(center) {};

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
 * @param {(google.maps.CircleOptions|Object.<string, *>)} options
 * @return {undefined}
 */
google.maps.Circle.prototype.setOptions = function(options) {};

/**
 * @param {number} radius
 * @return {undefined}
 */
google.maps.Circle.prototype.setRadius = function(radius) {};

/**
 * @constructor
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
 * @type {number}
 */
google.maps.CircleOptions.prototype.strokeWeight;

/**
 * @type {number}
 */
google.maps.CircleOptions.prototype.zIndex;

/**
 * @enum {number}
 */
google.maps.ControlPosition = {
  BOTTOM_CENTER: 1,
  TOP_RIGHT: 2,
  RIGHT_BOTTOM: 3,
  BOTTOM_RIGHT: 4,
  LEFT_TOP: 5,
  LEFT_BOTTOM: 6,
  TOP_LEFT: 7,
  TOP_CENTER: 8,
  LEFT_CENTER: 9,
  RIGHT_CENTER: 10,
  RIGHT_TOP: 11,
  BOTTOM_LEFT: 12
};

/**
 * @constructor
 */
google.maps.DirectionsLeg = function() {};

/**
 * @type {google.maps.Distance}
 */
google.maps.DirectionsLeg.prototype.distance;

/**
 * @type {google.maps.Duration}
 */
google.maps.DirectionsLeg.prototype.duration;

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
 * @param {(google.maps.DirectionsRendererOptions|Object.<string, *>)=} opt_opts
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
 * @param {(google.maps.DirectionsRendererOptions|Object.<string, *>)} options
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
 * @constructor
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
 * @type {(google.maps.MarkerOptions|Object.<string, *>)}
 */
google.maps.DirectionsRendererOptions.prototype.markerOptions;

/**
 * @type {Node}
 */
google.maps.DirectionsRendererOptions.prototype.panel;

/**
 * @type {(google.maps.PolylineOptions|Object.<string, *>)}
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
 * @constructor
 */
google.maps.DirectionsRequest = function() {};

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
 * @constructor
 */
google.maps.DirectionsResult = function() {};

/**
 * @type {Array.<google.maps.DirectionsRoute>}
 */
google.maps.DirectionsResult.prototype.routes;

/**
 * @constructor
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
 * @param {(google.maps.DirectionsRequest|Object.<string, *>)} request
 * @param {function(google.maps.DirectionsResult, google.maps.DirectionsStatus)} callback
 * @return {undefined}
 */
google.maps.DirectionsService.prototype.route = function(request, callback) {};

/**
 * @enum {string}
 */
google.maps.DirectionsStatus = {
  MAX_WAYPOINTS_EXCEEDED: '1',
  OK: '2',
  ZERO_RESULTS: '3',
  INVALID_REQUEST: '4',
  UNKNOWN_ERROR: '5',
  REQUEST_DENIED: '6',
  NOT_FOUND: '7',
  OVER_QUERY_LIMIT: ''
};

/**
 * @constructor
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
 * @type {google.maps.TravelMode}
 */
google.maps.DirectionsStep.prototype.travel_mode;

/**
 * @constructor
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
 * @constructor
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
  ZERO_RESULTS: '1',
  NOT_FOUND: '2',
  OK: '3'
};

/**
 * @constructor
 */
google.maps.DistanceMatrixRequest = function() {};

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
 * @constructor
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
 * @constructor
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
 * @constructor
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
 * @param {(google.maps.DistanceMatrixRequest|Object.<string, *>)} request
 * @param {function(google.maps.DistanceMatrixResponse, google.maps.DistanceMatrixStatus)} callback
 * @return {undefined}
 */
google.maps.DistanceMatrixService.prototype.getDistanceMatrix = function(request, callback) {};

/**
 * @enum {string}
 */
google.maps.DistanceMatrixStatus = {
  OK: '1',
  INVALID_REQUEST: '2',
  MAX_ELEMENTS_EXCEEDED: '3',
  UNKNOWN_ERROR: '4',
  REQUEST_DENIED: '5',
  MAX_DIMENSIONS_EXCEEDED: '6',
  OVER_QUERY_LIMIT: ''
};

/**
 * @constructor
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
 * @constructor
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
 * @param {(google.maps.PathElevationRequest|Object.<string, *>)} request
 * @param {function(Array.<google.maps.ElevationResult>, google.maps.ElevationStatus)} callback
 * @return {undefined}
 */
google.maps.ElevationService.prototype.getElevationAlongPath = function(request, callback) {};

/**
 * @param {(google.maps.LocationElevationRequest|Object.<string, *>)} request
 * @param {function(Array.<google.maps.ElevationResult>, google.maps.ElevationStatus)} callback
 * @return {undefined}
 */
google.maps.ElevationService.prototype.getElevationForLocations = function(request, callback) {};

/**
 * @enum {string}
 */
google.maps.ElevationStatus = {
  INVALID_REQUEST: '1',
  UNKNOWN_ERROR: '2',
  OK: '3',
  REQUEST_DENIED: '4',
  OVER_QUERY_LIMIT: ''
};

/**
 * @constructor
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
 * @param {(google.maps.FusionTablesLayerOptions|Object.<string, *>)} options
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
 * @param {(google.maps.FusionTablesLayerOptions|Object.<string, *>)} options
 * @return {undefined}
 */
google.maps.FusionTablesLayer.prototype.setOptions = function(options) {};

/**
 * @constructor
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
 * @constructor
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
 * @type {Object}
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
 * @type {(google.maps.FusionTablesMarkerOptions|Object.<string, *>)}
 */
google.maps.FusionTablesStyle.prototype.markerOptions;

/**
 * @type {(google.maps.FusionTablesPolygonOptions|Object.<string, *>)}
 */
google.maps.FusionTablesStyle.prototype.polygonOptions;

/**
 * @type {(google.maps.FusionTablesPolylineOptions|Object.<string, *>)}
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
 * @param {(google.maps.GeocoderRequest|Object.<string, *>)} request
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
  RANGE_INTERPOLATED: '1',
  ROOFTOP: '2',
  APPROXIMATE: '3',
  GEOMETRIC_CENTER: '4'
};

/**
 * @constructor
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
 * @type {google.maps.LatLng}
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
 * @type {Array.<string>}
 */
google.maps.GeocoderResult.prototype.types;

/**
 * @enum {string}
 */
google.maps.GeocoderStatus = {
  OK: '1',
  ZERO_RESULTS: '2',
  INVALID_REQUEST: '3',
  UNKNOWN_ERROR: '4',
  REQUEST_DENIED: '5',
  ERROR: '6',
  OVER_QUERY_LIMIT: ''
};

/**
 * @param {string} url
 * @param {google.maps.LatLngBounds} bounds
 * @param {(google.maps.GroundOverlayOptions|Object.<string, *>)=} opt_opts
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
 * @return {string}
 */
google.maps.GroundOverlay.prototype.getUrl = function() {};

/**
 * @param {google.maps.Map} map
 * @return {undefined}
 */
google.maps.GroundOverlay.prototype.setMap = function(map) {};

/**
 * @constructor
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
 * @param {(google.maps.ImageMapTypeOptions|Object.<string, *>)} opts
 * @constructor
 */
google.maps.ImageMapType = function(opts) {};

/**
 * @constructor
 */
google.maps.ImageMapTypeOptions = function() {};

/**
 * @type {string}
 */
google.maps.ImageMapTypeOptions.prototype.alt;

/**
 * @type {function(google.maps.Point, number):string}
 * @nosideeffects
 */
google.maps.ImageMapTypeOptions.prototype.getTileUrl;

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
 * @param {(google.maps.InfoWindowOptions|Object.<string, *>)=} opt_opts
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
 * @param {(google.maps.InfoWindowOptions|Object.<string, *>)} options
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
 * @constructor
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
 * @type {google.maps.LatLng}
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
 * @param {string} url
 * @param {(google.maps.KmlLayerOptions|Object.<string, *>)=} opt_opts
 * @extends {google.maps.MVCObject}
 * @constructor
 */
google.maps.KmlLayer = function(url, opt_opts) {};

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
 * @return {string}
 */
google.maps.KmlLayer.prototype.getUrl = function() {};

/**
 * @param {google.maps.Map} map
 * @return {undefined}
 */
google.maps.KmlLayer.prototype.setMap = function(map) {};

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
 * @type {string}
 */
google.maps.KmlLayerMetadata.prototype.name;

/**
 * @type {string}
 */
google.maps.KmlLayerMetadata.prototype.snippet;

/**
 * @constructor
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
google.maps.KmlLayerOptions.prototype.suppressInfoWindows;

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
 * @constructor
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
 * @param {function(*, number)} callback
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
 * @return {*}
 */
google.maps.MVCArray.prototype.getAt = function(i) {};

/**
 * @nosideeffects
 * @return {number}
 */
google.maps.MVCArray.prototype.getLength = function() {};

/**
 * @param {number} i
 * @param {*} elem
 * @return {undefined}
 */
google.maps.MVCArray.prototype.insertAt = function(i, elem) {};

/**
 * @return {*}
 */
google.maps.MVCArray.prototype.pop = function() {};

/**
 * @param {*} elem
 * @return {number}
 */
google.maps.MVCArray.prototype.push = function(elem) {};

/**
 * @param {number} i
 * @return {*}
 */
google.maps.MVCArray.prototype.removeAt = function(i) {};

/**
 * @param {number} i
 * @param {*} elem
 * @return {undefined}
 */
google.maps.MVCArray.prototype.setAt = function(i, elem) {};

/**
 * @constructor
 */
google.maps.MVCObject = function() {};

/**
 * @param {string} key
 * @param {google.maps.MVCObject} target
 * @param {string=} opt_targetKey
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
 * @return {*}
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
 * @param {(google.maps.MapOptions|Object.<string, *>)=} opt_opts
 * @extends {google.maps.MVCObject}
 * @constructor
 */
google.maps.Map = function(mapDiv, opt_opts) {};

/**
 * @type {Array.<google.maps.MVCArray.<Node>>}
 */
google.maps.Map.prototype.controls;

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
 * @type {google.maps.MapTypeRegistry}
 */
google.maps.Map.prototype.mapTypes;

/**
 * @type {google.maps.MVCArray.<google.maps.MapType>}
 */
google.maps.Map.prototype.overlayMapTypes;

/**
 * @param {number} x
 * @param {number} y
 * @return {undefined}
 */
google.maps.Map.prototype.panBy = function(x, y) {};

/**
 * @param {google.maps.LatLng} latLng
 * @return {undefined}
 */
google.maps.Map.prototype.panTo = function(latLng) {};

/**
 * @param {google.maps.LatLngBounds} latLngBounds
 * @return {undefined}
 */
google.maps.Map.prototype.panToBounds = function(latLngBounds) {};

/**
 * @param {google.maps.LatLng} latlng
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
 * @param {(google.maps.MapOptions|Object.<string, *>)} options
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
 * @constructor
 */
google.maps.MapCanvasProjection = function() {};

/**
 * @param {google.maps.Point} pixel
 * @return {google.maps.LatLng}
 */
google.maps.MapCanvasProjection.prototype.fromContainerPixelToLatLng = function(pixel) {};

/**
 * @param {google.maps.Point} pixel
 * @return {google.maps.LatLng}
 */
google.maps.MapCanvasProjection.prototype.fromDivPixelToLatLng = function(pixel) {};

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
 * @constructor
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
google.maps.MapOptions.prototype.mapTypeControl;

/**
 * @type {(google.maps.MapTypeControlOptions|Object.<string, *>)}
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
 * @type {(google.maps.OverviewMapControlOptions|Object.<string, *>)}
 */
google.maps.MapOptions.prototype.overviewMapControlOptions;

/**
 * @type {boolean}
 */
google.maps.MapOptions.prototype.panControl;

/**
 * @type {(google.maps.PanControlOptions|Object.<string, *>)}
 */
google.maps.MapOptions.prototype.panControlOptions;

/**
 * @type {boolean}
 */
google.maps.MapOptions.prototype.rotateControl;

/**
 * @type {(google.maps.RotateControlOptions|Object.<string, *>)}
 */
google.maps.MapOptions.prototype.rotateControlOptions;

/**
 * @type {boolean}
 */
google.maps.MapOptions.prototype.scaleControl;

/**
 * @type {(google.maps.ScaleControlOptions|Object.<string, *>)}
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
 * @type {(google.maps.StreetViewControlOptions|Object.<string, *>)}
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
 * @type {(google.maps.ZoomControlOptions|Object.<string, *>)}
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
google.maps.MapPanes.prototype.floatShadow;

/**
 * @type {Node}
 */
google.maps.MapPanes.prototype.mapPane;

/**
 * @type {Node}
 */
google.maps.MapPanes.prototype.overlayImage;

/**
 * @type {Node}
 */
google.maps.MapPanes.prototype.overlayLayer;

/**
 * @type {Node}
 */
google.maps.MapPanes.prototype.overlayMouseTarget;

/**
 * @type {Node}
 */
google.maps.MapPanes.prototype.overlayShadow;

/**
 * @constructor
 */
google.maps.MapType = function() {};

/**
 * @type {string}
 */
google.maps.MapType.prototype.alt;

/**
 * @param {google.maps.Point} tileCoord
 * @param {number} zoom
 * @param {Node} ownerDocument
 * @return {Node}
 */
google.maps.MapType.prototype.getTile = function(tileCoord, zoom, ownerDocument) {};

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
 * @type {?google.maps.Projection}
 */
google.maps.MapType.prototype.projection;

/**
 * @type {number}
 */
google.maps.MapType.prototype.radius;

/**
 * @param {Node} tile
 * @return {undefined}
 */
google.maps.MapType.prototype.releaseTile = function(tile) {};

/**
 * @type {google.maps.Size}
 */
google.maps.MapType.prototype.tileSize;

/**
 * @constructor
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
  HORIZONTAL_BAR: 2,
  DROPDOWN_MENU: 3
};

/**
 * @enum {string}
 */
google.maps.MapTypeId = {
  TERRAIN: '1',
  SATELLITE: '2',
  HYBRID: '3',
  ROADMAP: '4'
};

/**
 * @extends {google.maps.MVCObject}
 * @constructor
 */
google.maps.MapTypeRegistry = function() {};

/**
 * @param {string} id
 * @param {google.maps.MapType} mapType
 * @return {undefined}
 * @override
 */
google.maps.MapTypeRegistry.prototype.set = function(id, mapType) {};

/**
 * @constructor
 */
google.maps.MapTypeStyle = function() {};

/**
 * @type {google.maps.MapTypeStyleElementType}
 */
google.maps.MapTypeStyle.prototype.elementType;

/**
 * @type {google.maps.MapTypeStyleFeatureType}
 */
google.maps.MapTypeStyle.prototype.featureType;

/**
 * @type {Array.<google.maps.MapTypeStyler>}
 */
google.maps.MapTypeStyle.prototype.stylers;

/**
 * @enum {string}
 */
google.maps.MapTypeStyleElementType = {

};

/**
 * @enum {number}
 */
google.maps.MapTypeStyleFeatureType = {

};

/**
 * @constructor
 */
google.maps.MapTypeStyler = function() {};

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
 * @constructor
 */
google.maps.MapsEventListener = function() {};

/**
 * @param {(google.maps.MarkerOptions|Object.<string, *>)=} opt_opts
 * @extends {google.maps.MVCObject}
 * @constructor
 */
google.maps.Marker = function(opt_opts) {};

/**
 * @constant
 * @type {number|string}
 */
google.maps.Marker.MAX_ZINDEX;

/**
 * @nosideeffects
 * @return {?google.maps.Animation}
 */
google.maps.Marker.prototype.getAnimation = function() {};

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
 * @return {boolean}
 */
google.maps.Marker.prototype.getFlat = function() {};

/**
 * @nosideeffects
 * @return {string|google.maps.MarkerImage}
 */
google.maps.Marker.prototype.getIcon = function() {};

/**
 * @nosideeffects
 * @return {google.maps.Map|google.maps.StreetViewPanorama}
 */
google.maps.Marker.prototype.getMap = function() {};

/**
 * @nosideeffects
 * @return {google.maps.LatLng}
 */
google.maps.Marker.prototype.getPosition = function() {};

/**
 * @nosideeffects
 * @return {string|google.maps.MarkerImage}
 */
google.maps.Marker.prototype.getShadow = function() {};

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
 * @param {boolean} flag
 * @return {undefined}
 */
google.maps.Marker.prototype.setDraggable = function(flag) {};

/**
 * @param {boolean} flag
 * @return {undefined}
 */
google.maps.Marker.prototype.setFlat = function(flag) {};

/**
 * @param {string|google.maps.MarkerImage} icon
 * @return {undefined}
 */
google.maps.Marker.prototype.setIcon = function(icon) {};

/**
 * @param {google.maps.Map|google.maps.StreetViewPanorama} map
 * @return {undefined}
 */
google.maps.Marker.prototype.setMap = function(map) {};

/**
 * @param {(google.maps.MarkerOptions|Object.<string, *>)} options
 * @return {undefined}
 */
google.maps.Marker.prototype.setOptions = function(options) {};

/**
 * @param {google.maps.LatLng} latlng
 * @return {undefined}
 */
google.maps.Marker.prototype.setPosition = function(latlng) {};

/**
 * @param {string|google.maps.MarkerImage} shadow
 * @return {undefined}
 */
google.maps.Marker.prototype.setShadow = function(shadow) {};

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
 * @param {string} url
 * @param {google.maps.Size=} opt_size
 * @param {google.maps.Point=} opt_origin
 * @param {google.maps.Point=} opt_anchor
 * @param {google.maps.Size=} opt_scaledSize
 * @constructor
 */
google.maps.MarkerImage = function(url, opt_size, opt_origin, opt_anchor, opt_scaledSize) {};

/**
 * @type {google.maps.Point}
 */
google.maps.MarkerImage.prototype.anchor;

/**
 * @type {google.maps.Point}
 */
google.maps.MarkerImage.prototype.origin;

/**
 * @type {google.maps.Size}
 */
google.maps.MarkerImage.prototype.scaledSize;

/**
 * @type {google.maps.Size}
 */
google.maps.MarkerImage.prototype.size;

/**
 * @type {string}
 */
google.maps.MarkerImage.prototype.url;

/**
 * @constructor
 */
google.maps.MarkerOptions = function() {};

/**
 * @type {google.maps.Animation}
 */
google.maps.MarkerOptions.prototype.animation;

/**
 * @type {boolean}
 */
google.maps.MarkerOptions.prototype.clickable;

/**
 * @type {string}
 */
google.maps.MarkerOptions.prototype.cursor;

/**
 * @type {boolean}
 */
google.maps.MarkerOptions.prototype.draggable;

/**
 * @type {boolean}
 */
google.maps.MarkerOptions.prototype.flat;

/**
 * @type {string|google.maps.MarkerImage}
 */
google.maps.MarkerOptions.prototype.icon;

/**
 * @type {google.maps.Map|google.maps.StreetViewPanorama}
 */
google.maps.MarkerOptions.prototype.map;

/**
 * @type {boolean}
 */
google.maps.MarkerOptions.prototype.optimized;

/**
 * @type {google.maps.LatLng}
 */
google.maps.MarkerOptions.prototype.position;

/**
 * @type {boolean}
 */
google.maps.MarkerOptions.prototype.raiseOnDrag;

/**
 * @type {string|google.maps.MarkerImage}
 */
google.maps.MarkerOptions.prototype.shadow;

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
 * @constructor
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
 * @constructor
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
 * @param {google.maps.LatLng} latlng
 * @param {function(google.maps.MaxZoomResult)} callback
 * @return {undefined}
 */
google.maps.MaxZoomService.prototype.getMaxZoomAtLatLng = function(latlng, callback) {};

/**
 * @enum {string}
 */
google.maps.MaxZoomStatus = {
  OK: '1',
  ERROR: '2'
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
 * @return {google.maps.Map}
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
 * @constructor
 */
google.maps.OverviewMapControlOptions = function() {};

/**
 * @type {boolean}
 */
google.maps.OverviewMapControlOptions.prototype.opened;

/**
 * @constructor
 */
google.maps.PanControlOptions = function() {};

/**
 * @type {google.maps.ControlPosition}
 */
google.maps.PanControlOptions.prototype.position;

/**
 * @constructor
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
 * @param {number} x
 * @param {number} y
 * @constructor
 */
google.maps.Point = function(x, y) {};

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
 * @type {number}
 */
google.maps.Point.prototype.x;

/**
 * @type {number}
 */
google.maps.Point.prototype.y;

/**
 * @param {(google.maps.PolygonOptions|Object.<string, *>)=} opt_opts
 * @extends {google.maps.MVCObject}
 * @constructor
 */
google.maps.Polygon = function(opt_opts) {};

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
 * @param {(google.maps.PolygonOptions|Object.<string, *>)} options
 * @return {undefined}
 */
google.maps.Polygon.prototype.setOptions = function(options) {};

/**
 * @param {google.maps.MVCArray.<google.maps.LatLng>|Array.<google.maps.LatLng>} path
 * @return {undefined}
 */
google.maps.Polygon.prototype.setPath = function(path) {};

/**
 * @param {google.maps.MVCArray.<google.maps.MVCArray.<google.maps.LatLng>>|google.maps.MVCArray.<google.maps.LatLng>|Array.<Array.<google.maps.LatLng>>|Array.<google.maps.LatLng>} paths
 * @return {undefined}
 */
google.maps.Polygon.prototype.setPaths = function(paths) {};

/**
 * @constructor
 */
google.maps.PolygonOptions = function() {};

/**
 * @type {boolean}
 */
google.maps.PolygonOptions.prototype.clickable;

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
 * @type {google.maps.MVCArray.<google.maps.MVCArray.<google.maps.LatLng>>|google.maps.MVCArray.<google.maps.LatLng>|Array.<Array.<google.maps.LatLng>>|Array.<google.maps.LatLng>}
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
 * @type {number}
 */
google.maps.PolygonOptions.prototype.strokeWeight;

/**
 * @type {number}
 */
google.maps.PolygonOptions.prototype.zIndex;

/**
 * @param {(google.maps.PolylineOptions|Object.<string, *>)=} opt_opts
 * @extends {google.maps.MVCObject}
 * @constructor
 */
google.maps.Polyline = function(opt_opts) {};

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
 * @param {(google.maps.PolylineOptions|Object.<string, *>)} options
 * @return {undefined}
 */
google.maps.Polyline.prototype.setOptions = function(options) {};

/**
 * @param {google.maps.MVCArray.<google.maps.LatLng>|Array.<google.maps.LatLng>} path
 * @return {undefined}
 */
google.maps.Polyline.prototype.setPath = function(path) {};

/**
 * @constructor
 */
google.maps.PolylineOptions = function() {};

/**
 * @type {boolean}
 */
google.maps.PolylineOptions.prototype.clickable;

/**
 * @type {boolean}
 */
google.maps.PolylineOptions.prototype.geodesic;

/**
 * @type {google.maps.Map}
 */
google.maps.PolylineOptions.prototype.map;

/**
 * @type {google.maps.MVCArray.<google.maps.LatLng>|Array.<google.maps.LatLng>}
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
 * @type {number}
 */
google.maps.PolylineOptions.prototype.zIndex;

/**
 * @constructor
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
 * @param {(google.maps.RectangleOptions|Object.<string, *>)=} opt_opts
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
google.maps.Rectangle.prototype.getEditable = function() {};

/**
 * @nosideeffects
 * @return {google.maps.Map}
 */
google.maps.Rectangle.prototype.getMap = function() {};

/**
 * @param {google.maps.LatLngBounds} bounds
 * @return {undefined}
 */
google.maps.Rectangle.prototype.setBounds = function(bounds) {};

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
 * @param {(google.maps.RectangleOptions|Object.<string, *>)} options
 * @return {undefined}
 */
google.maps.Rectangle.prototype.setOptions = function(options) {};

/**
 * @constructor
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
 * @type {number}
 */
google.maps.RectangleOptions.prototype.strokeWeight;

/**
 * @type {number}
 */
google.maps.RectangleOptions.prototype.zIndex;

/**
 * @constructor
 */
google.maps.RotateControlOptions = function() {};

/**
 * @type {google.maps.ControlPosition}
 */
google.maps.RotateControlOptions.prototype.position;

/**
 * @constructor
 */
google.maps.ScaleControlOptions = function() {};

/**
 * @type {google.maps.ControlPosition}
 */
google.maps.ScaleControlOptions.prototype.position;

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
 * @param {google.maps.Size} other
 * @return {boolean}
 */
google.maps.Size.prototype.equals = function(other) {};

/**
 * @type {number}
 */
google.maps.Size.prototype.height;

/**
 * @return {string}
 */
google.maps.Size.prototype.toString = function() {};

/**
 * @type {number}
 */
google.maps.Size.prototype.width;

/**
 * @constructor
 */
google.maps.StreetViewAddressControlOptions = function() {};

/**
 * @type {google.maps.ControlPosition}
 */
google.maps.StreetViewAddressControlOptions.prototype.position;

/**
 * @constructor
 */
google.maps.StreetViewControlOptions = function() {};

/**
 * @type {google.maps.ControlPosition}
 */
google.maps.StreetViewControlOptions.prototype.position;

/**
 * @constructor
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
 * @constructor
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
 * @param {Node} container
 * @param {(google.maps.StreetViewPanoramaOptions|Object.<string, *>)=} opt_opts
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
 * @return {string}
 */
google.maps.StreetViewPanorama.prototype.getPano = function() {};

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
 * @return {boolean}
 */
google.maps.StreetViewPanorama.prototype.getVisible = function() {};

/**
 * @param {function(string):google.maps.StreetViewPanoramaData} provider
 * @return {undefined}
 */
google.maps.StreetViewPanorama.prototype.registerPanoProvider = function(provider) {};

/**
 * @param {string} pano
 * @return {undefined}
 */
google.maps.StreetViewPanorama.prototype.setPano = function(pano) {};

/**
 * @param {google.maps.LatLng} latLng
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
 * @constructor
 */
google.maps.StreetViewPanoramaData = function() {};

/**
 * @type {string}
 */
google.maps.StreetViewPanoramaData.prototype.copyright;

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
 * @constructor
 */
google.maps.StreetViewPanoramaOptions = function() {};

/**
 * @type {boolean}
 */
google.maps.StreetViewPanoramaOptions.prototype.addressControl;

/**
 * @type {(google.maps.StreetViewAddressControlOptions|Object.<string, *>)}
 */
google.maps.StreetViewPanoramaOptions.prototype.addressControlOptions;

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
google.maps.StreetViewPanoramaOptions.prototype.linksControl;

/**
 * @type {boolean}
 */
google.maps.StreetViewPanoramaOptions.prototype.panControl;

/**
 * @type {(google.maps.PanControlOptions|Object.<string, *>)}
 */
google.maps.StreetViewPanoramaOptions.prototype.panControlOptions;

/**
 * @type {string}
 */
google.maps.StreetViewPanoramaOptions.prototype.pano;

/**
 * @type {function(string):google.maps.StreetViewPanoramaData}
 */
google.maps.StreetViewPanoramaOptions.prototype.panoProvider;

/**
 * @type {google.maps.LatLng}
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
 * @type {(google.maps.ZoomControlOptions|Object.<string, *>)}
 */
google.maps.StreetViewPanoramaOptions.prototype.zoomControlOptions;

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
 * @type {number}
 */
google.maps.StreetViewPov.prototype.zoom;

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
 * @param {google.maps.LatLng} latlng
 * @param {number} radius
 * @param {function(google.maps.StreetViewPanoramaData, google.maps.StreetViewStatus)} callback
 * @return {undefined}
 */
google.maps.StreetViewService.prototype.getPanoramaByLocation = function(latlng, radius, callback) {};

/**
 * @enum {string}
 */
google.maps.StreetViewStatus = {
  UNKNOWN_ERROR: '1',
  ZERO_RESULTS: '2',
  OK: '3'
};

/**
 * @constructor
 */
google.maps.StreetViewTileData = function() {};

/**
 * @type {number}
 */
google.maps.StreetViewTileData.prototype.centerHeading;

/**
 * @param {string} pano
 * @param {number} tileZoom
 * @param {number} tileX
 * @param {number} tileY
 * @return {string}
 */
google.maps.StreetViewTileData.prototype.getTileUrl = function(pano, tileZoom, tileX, tileY) {};

/**
 * @type {google.maps.Size}
 */
google.maps.StreetViewTileData.prototype.tileSize;

/**
 * @type {google.maps.Size}
 */
google.maps.StreetViewTileData.prototype.worldSize;

/**
 * @param {Array.<google.maps.MapTypeStyle>} styles
 * @param {(google.maps.StyledMapTypeOptions|Object.<string, *>)=} opt_options
 * @constructor
 */
google.maps.StyledMapType = function(styles, opt_options) {};

/**
 * @constructor
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
 * @enum {string}
 */
google.maps.TravelMode = {
  WALKING: '1',
  DRIVING: '2',
  BICYCLING: '3'
};

/**
 * @enum {number}
 */
google.maps.UnitSystem = {
  METRIC: 1,
  IMPERIAL: 2
};

/**
 * @constructor
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
  SMALL_RECTANGLE: '1',
  SMALL_SQUARE: '2',
  SQUARE: '3',
  BUTTON: '4',
  VERTICAL_BANNER: '5',
  WIDE_SKYSCRAPER: '6',
  HALF_BANNER: '7',
  SKYSCRAPER: '8',
  MEDIUM_RECTANGLE: '9',
  LARGE_RECTANGLE: '10',
  BANNER: '11',
  LEADERBOARD: ''
};

/**
 * @param {Node} container
 * @param {(google.maps.adsense.AdUnitOptions|Object.<string, *>)} opts
 * @extends {google.maps.MVCObject}
 * @constructor
 */
google.maps.adsense.AdUnit = function(container, opts) {};

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
 * @constructor
 */
google.maps.adsense.AdUnitOptions = function() {};

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

// Namespace
google.maps.drawing = {};

/**
 * @constructor
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
 * @param {(google.maps.drawing.DrawingManagerOptions|Object.<string, *>)=} opt_options
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
 * @constructor
 */
google.maps.drawing.DrawingManagerOptions = function() {};

/**
 * @type {(google.maps.CircleOptions|Object.<string, *>)}
 */
google.maps.drawing.DrawingManagerOptions.prototype.circleOptions;

/**
 * @type {boolean}
 */
google.maps.drawing.DrawingManagerOptions.prototype.drawingControl;

/**
 * @type {(google.maps.drawing.DrawingControlOptions|Object.<string, *>)}
 */
google.maps.drawing.DrawingManagerOptions.prototype.drawingControlOptions;

/**
 * @type {?google.maps.drawing.OverlayType}
 */
google.maps.drawing.DrawingManagerOptions.prototype.drawingMode;

/**
 * @type {google.maps.Map}
 */
google.maps.drawing.DrawingManagerOptions.prototype.map;

/**
 * @type {(google.maps.MarkerOptions|Object.<string, *>)}
 */
google.maps.drawing.DrawingManagerOptions.prototype.markerOptions;

/**
 * @type {(google.maps.PolygonOptions|Object.<string, *>)}
 */
google.maps.drawing.DrawingManagerOptions.prototype.polygonOptions;

/**
 * @type {(google.maps.PolylineOptions|Object.<string, *>)}
 */
google.maps.drawing.DrawingManagerOptions.prototype.polylineOptions;

/**
 * @type {(google.maps.RectangleOptions|Object.<string, *>)}
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
  MARKER: '1',
  CIRCLE: '2',
  POLYLINE: '3',
  POLYGON: '4',
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
google.maps.geometry.spherical = {};

/**
 * @param {Array.<google.maps.LatLng>|google.maps.MVCArray.<google.maps.LatLng>} loop
 * @param {number=} opt_radius
 * @return {number}
 */
google.maps.geometry.spherical.computeArea = function(loop, opt_radius) {};

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
 * @constructor
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
 * @param {(google.maps.panoramio.PanoramioLayerOptions|Object.<string, *>)=} opt_opts
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
 * @param {(google.maps.panoramio.PanoramioLayerOptions|Object.<string, *>)} options
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
 * @constructor
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
 * @constructor
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
 * @param {(google.maps.places.AutocompleteOptions|Object.<string, *>)=} opt_opts
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
 * @param {Array.<string>} types
 * @return {undefined}
 */
google.maps.places.Autocomplete.prototype.setTypes = function(types) {};

/**
 * @constructor
 */
google.maps.places.AutocompleteOptions = function() {};

/**
 * @type {google.maps.LatLngBounds}
 */
google.maps.places.AutocompleteOptions.prototype.bounds;

/**
 * @type {Array.<string>}
 */
google.maps.places.AutocompleteOptions.prototype.types;

/**
 * @constructor
 */
google.maps.places.PlaceDetailsRequest = function() {};

/**
 * @type {string}
 */
google.maps.places.PlaceDetailsRequest.prototype.reference;

/**
 * @constructor
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
 * @constructor
 */
google.maps.places.PlaceResult = function() {};

/**
 * @type {Array.<google.maps.GeocoderAddressComponent>}
 */
google.maps.places.PlaceResult.prototype.address_components;

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
 * @type {string}
 */
google.maps.places.PlaceResult.prototype.html_attributions;

/**
 * @type {string}
 */
google.maps.places.PlaceResult.prototype.icon;

/**
 * @type {string}
 */
google.maps.places.PlaceResult.prototype.id;

/**
 * @type {string}
 */
google.maps.places.PlaceResult.prototype.international_phone_number;

/**
 * @type {string}
 */
google.maps.places.PlaceResult.prototype.name;

/**
 * @type {number}
 */
google.maps.places.PlaceResult.prototype.rating;

/**
 * @type {string}
 */
google.maps.places.PlaceResult.prototype.reference;

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
 * @type {google.maps.LatLng}
 */
google.maps.places.PlaceSearchRequest.prototype.location;

/**
 * @type {string}
 */
google.maps.places.PlaceSearchRequest.prototype.name;

/**
 * @type {number}
 */
google.maps.places.PlaceSearchRequest.prototype.radius;

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
 * @param {(google.maps.places.PlaceDetailsRequest|Object.<string, *>)} request
 * @param {function(google.maps.places.PlaceResult, google.maps.places.PlacesServiceStatus)} callback
 * @return {undefined}
 */
google.maps.places.PlacesService.prototype.getDetails = function(request, callback) {};

/**
 * @param {(google.maps.places.PlaceSearchRequest|Object.<string, *>)} request
 * @param {function(Array.<google.maps.places.PlaceResult>, google.maps.places.PlacesServiceStatus)} callback
 * @return {undefined}
 */
google.maps.places.PlacesService.prototype.search = function(request, callback) {};

/**
 * @enum {string}
 */
google.maps.places.PlacesServiceStatus = {
  OK: '1',
  ZERO_RESULTS: '2',
  INVALID_REQUEST: '3',
  UNKNOWN_ERROR: '4',
  REQUEST_DENIED: '5',
  OVER_QUERY_LIMIT: ''
};

