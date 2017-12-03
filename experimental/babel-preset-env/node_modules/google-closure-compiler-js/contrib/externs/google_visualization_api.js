/*
 * Copyright 2012 The Closure Compiler Authors.
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
 * @fileoverview This file exposes the external Google Visualization API.
 *
 * The file can be used to enable auto complete of objects and methods provided
 * by the Google Visualization API, and for easier exploration of the API.
 *
 * To enable auto complete in a development environment - copy the file into the
 * project you are working on where the development tool you are using can index
 * the file.
 *
 * Disclaimer: there may be missing classes and methods and the file may
 * be updated and/or changed. For the most up to date API reference please visit:
 * {@link https://developers.google.com/chart/interactive/docs/reference}
 *
 * @externs
 */


/**
 * @const
 */
google.visualization = {};



/**
 * @param {(string|Object)=} opt_data
 * @param {number=} opt_version
 * @constructor
 */
google.visualization.DataTable = function(opt_data, opt_version) {};


/**
 * @param {string|!Object} type
 * @param {string=} opt_label
 * @param {string=} opt_id
 * @return {number}
 */
google.visualization.DataTable.prototype.addColumn =
    function(type, opt_label, opt_id) {};


/**
 * @param {!Array=} opt_cellArray
 * @return {number}
 */
google.visualization.DataTable.prototype.addRow = function(opt_cellArray) {};


/**
 * @param {number|!Array} numOrArray
 * @return {number}
 */
google.visualization.DataTable.prototype.addRows = function(numOrArray) {};


/**
 * @return {google.visualization.DataTable}
 */
google.visualization.DataTable.prototype.clone = function() {};


/**
 * @param {number} columnIndex
 * @return {string}
 */
google.visualization.DataTable.prototype.getColumnId = function(columnIndex) {};


/**
 * @param {number} columnIndex
 * @return {string}
 */
google.visualization.DataTable.prototype.getColumnLabel =
    function(columnIndex) {};


/**
 * @param {number} columnIndex
 * @return {string}
 */
google.visualization.DataTable.prototype.getColumnPattern =
    function(columnIndex) {};


/**
 * @param {number} columnIndex
 * @return {!Object}
 */
google.visualization.DataTable.prototype.getColumnProperties =
    function(columnIndex) {};


/**
 * @param {number} columnIndex
 * @param {string} property
 * @return {string}
 */
google.visualization.DataTable.prototype.getColumnProperty =
    function(columnIndex, property) {};


/**
 * @param {number} columnIndex
 * @return {!Object}
 */
google.visualization.DataTable.prototype.getColumnRange =
    function(columnIndex) {};


/**
 * @param {number} columnIndex
 * @return {string}
 */
google.visualization.DataTable.prototype.getColumnRole =
    function(columnIndex) {};


/**
 * @param {number} columnIndex
 * @return {string}
 */
google.visualization.DataTable.prototype.getColumnType =
    function(columnIndex) {};


/**
 * @param {number} columnIndex
 * @return {!Array.<Object>}
 */
google.visualization.DataTable.prototype.getDistinctValues =
    function(columnIndex) {};


/**
 * @param {!Array.<Object>} columnFilters
 * @return {!Array.<number>}
 */
google.visualization.DataTable.prototype.getFilteredRows =
    function(columnFilters) {};


/**
 * @param {number} rowIndex
 * @param {number} columnIndex
 * @return {string}
 */
google.visualization.DataTable.prototype.getFormattedValue =
    function(rowIndex, columnIndex) {};


/**
 * @return {number}
 */
google.visualization.DataTable.prototype.getNumberOfColumns = function() {};


/**
 * @return {number}
 */
google.visualization.DataTable.prototype.getNumberOfRows = function() {};


/**
 * @param {number} rowIndex
 * @param {number} columnIndex
 * @return {!Object}
 */
google.visualization.DataTable.prototype.getProperties =
    function(rowIndex, columnIndex) {};


/**
 * @param {number} rowIndex
 * @param {number} columnIndex
 * @param {string} property
 * @return {*}
 */
google.visualization.DataTable.prototype.getProperty =
    function(rowIndex, columnIndex, property) {};


/**
 * @param {number} rowIndex
 * @return {!Object}
 */
google.visualization.DataTable.prototype.getRowProperties =
    function(rowIndex) {};


/**
 * @param {number} rowIndex
 * @param {string} property
 * @return {*}
 */
google.visualization.DataTable.prototype.getRowProperty =
    function(rowIndex, property) {};


/**
 * @param {number|!Object|Array.<number>|Array.<Object>} sortColumns
 * @return {!Array.<number>}
 */
google.visualization.DataTable.prototype.getSortedRows =
    function(sortColumns) {};


/**
 * @return {Object}
 */
google.visualization.DataTable.prototype.getTableProperties = function() {};


/**
 * @param {string} property
 * @return {*}
 */
google.visualization.DataTable.prototype.getTableProperty =
    function(property) {};


/**
 * @param {number} rowIndex
 * @param {number} columnIndex
 * @return {*}
 */
google.visualization.DataTable.prototype.getValue =
    function(rowIndex, columnIndex) {};


/**
 * @param {number} atColIndex
 * @param {string} type
 * @param {string=} opt_label
 * @param {string=} opt_id
 * @return {undefined}
 */
google.visualization.DataTable.prototype.insertColumn =
    function(atColIndex, type, opt_label, opt_id) {};


/**
 * @param {number} atRowIndex
 * @param {number|Array} numOrArray
 * @return {undefined}
 */
google.visualization.DataTable.prototype.insertRows =
    function(atRowIndex, numOrArray) {};


/**
 * @param {number} colIndex
 * @return {undefined}
 */
google.visualization.DataTable.prototype.removeColumn = function(colIndex) {};


/**
 * @param {number} fromColIndex
 * @param {number} numCols
 * @return {undefined}
 */
google.visualization.DataTable.prototype.removeColumns =
    function(fromColIndex, numCols) {};


/**
 * @param {number} rowIndex
 * @return {undefined}
 */
google.visualization.DataTable.prototype.removeRow = function(rowIndex) {};


/**
 * @param {number} fromRowIndex
 * @param {number} numRows
 */
google.visualization.DataTable.prototype.removeRows =
    function(fromRowIndex, numRows) {};


/**
 * @param {number} rowIndex
 * @param {number} columnIndex
 * @param {*=} opt_value
 * @param {string=} opt_formattedValue
 * @param {Object=} opt_props
 * @return {undefined}
 */
google.visualization.DataTable.prototype.setCell =
    function(rowIndex, columnIndex, opt_value, opt_formattedValue, opt_props) {};


/**
 * @param {number} columnIndex
 * @param {string} newLabel
 * @return {undefined}
 */
google.visualization.DataTable.prototype.setColumnLabel =
    function(columnIndex, newLabel) {};


/**
 * @param {number} columnIndex
 * @param {Object} properties
 * @return {undefined}
 */
google.visualization.DataTable.prototype.setColumnProperties =
    function(columnIndex, properties) {};


/**
 * @param {number} columnIndex
 * @param {string} property
 * @param {*} value
 */
google.visualization.DataTable.prototype.setColumnProperty =
    function(columnIndex, property, value) {};


/**
 * @param {number} rowIndex
 * @param {number} columnIndex
 * @param {?string} formattedValue
 * @return {undefined}
 */
google.visualization.DataTable.prototype.setFormattedValue =
    function(rowIndex, columnIndex, formattedValue) {};


/**
 * @param {number} rowIndex
 * @param {number} columnIndex
 * @param {Object} properties
 * @return {undefined}
 */
google.visualization.DataTable.prototype.setProperties =
    function(rowIndex, columnIndex, properties) {};


/**
 * @param {number} rowIndex
 * @param {number} columnIndex
 * @param {string} property
 * @param {*} value
 * @return {undefined}
 */
google.visualization.DataTable.prototype.setProperty =
    function(rowIndex, columnIndex, property, value) {};


/**
 * @param {number} rowIndex
 * @param {Object} properties
 * @return {undefined}
 */
google.visualization.DataTable.prototype.setRowProperties =
    function(rowIndex, properties) {};


/**
 * @param {number} rowIndex
 * @param {string} property
 * @param {*} value
 * @return {undefined}
 */
google.visualization.DataTable.prototype.setRowProperty =
    function(rowIndex, property, value) {};


/**
 * @param {Object} properties
 * @return {undefined}
 */
google.visualization.DataTable.prototype.setTableProperties =
    function(properties) {};


/**
 * @param {string} property
 * @param {*} value
 * @return {undefined}
 */
google.visualization.DataTable.prototype.setTableProperty =
    function(property, value) {};


/**
 * @param {number} rowIndex
 * @param {number} columnIndex
 * @param {*} value
 * @return {undefined}
 */
google.visualization.DataTable.prototype.setValue =
    function(rowIndex, columnIndex, value) {};


/**
 * @param {Array.<Object>} sortColumns
 * @return {undefined}
 */
google.visualization.DataTable.prototype.sort = function(sortColumns) {};


/**
 * @return {string} JSON representation.
 * @override
 */
google.visualization.DataTable.prototype.toJSON = function() {};



/**
 * @param {Object} responseObj
 * @constructor
 */
google.visualization.QueryResponse = function(responseObj) {};


/**
 * @return {google.visualization.DataTable}
 */
google.visualization.QueryResponse.prototype.getDataTable = function() {};


/**
 * @return {string}
 */
google.visualization.QueryResponse.prototype.getDetailedMessage = function() {};


/**
 * @return {string}
 */
google.visualization.QueryResponse.prototype.getMessage = function() {};


/**
 * @return {Array.<string>}
 */
google.visualization.QueryResponse.prototype.getReasons = function() {};


/**
 * @return {boolean}
 */
google.visualization.QueryResponse.prototype.hasWarning = function() {};


/**
 * @return {boolean}
 */
google.visualization.QueryResponse.prototype.isError = function() {};



/**
 * @param {string} dataSourceUrl
 * @param {Object=} opt_options
 * @constructor
 */
google.visualization.Query = function(dataSourceUrl, opt_options) {};


/**
 * @return {undefined}
 */
google.visualization.Query.prototype.abort = function() {};


/**
 * @param {function(google.visualization.QueryResponse)} responseHandler
 * @return {undefined}
 */
google.visualization.Query.prototype.send = function(responseHandler) {};


/**
 * @param {string} queryString
 * @return {undefined}
 */
google.visualization.Query.prototype.setQuery = function(queryString) {};


/**
 * @param {number} intervalSeconds
 * @return {undefined}
 */
google.visualization.Query.prototype.setRefreshInterval =
    function(intervalSeconds) {};


/**
 * @param {number} timeoutSeconds
 * @return {undefined}
 */
google.visualization.Query.prototype.setTimeout = function(timeoutSeconds) {};


/**
 * @const
 */
google.visualization.errors = {};


/**
 * @param {Node} container
 * @param {string} message
 * @param {Object=} opt_detailedMessage
 * @param {Object=} opt_options
 * @return {string}
 */
google.visualization.errors.addError =
    function(container, message, opt_detailedMessage, opt_options) {};


/**
 * @param {Node} container
 * @param {google.visualization.QueryResponse} response
 * @return {string}
 */
google.visualization.errors.addErrorFromQueryResponse =
    function(container, response) {};


/**
 * @param {string} errorId
 * @return {Node}
 */
google.visualization.errors.getContainer = function(errorId) {};


/**
 * @param {Node} container
 * @return {undefined}
 */
google.visualization.errors.removeAll = function(container) {};


/**
 * @param {string} id
 * @return {boolean}
 */
google.visualization.errors.removeError = function(id) {};


/**
 * @const
 */
google.visualization.events = {};


/**
 * @param {!Object} eventSource
 * @param {string} eventName
 * @param {!Function} eventHandler
 * @return {Object}
 */
google.visualization.events.addListener =
    function(eventSource, eventName, eventHandler) {};


/**
 * @param {!Object} eventSource
 * @param {string} eventName
 * @param {!Function} eventHandler
 * @return {!Object}
 */
google.visualization.events.addOneTimeListener =
    function(eventSource, eventName, eventHandler) {};


/**
 * @param {Object} listener
 * @return {undefined}
 */
google.visualization.events.removeListener = function(listener) {};


/**
 * @param {Object} eventSource
 * @return {undefined}
 */
google.visualization.events.removeAllListeners = function(eventSource) {};


/**
 * @param {!Object} eventSource
 * @param {string} eventName
 * @param {Object=} opt_eventDetails
 */
google.visualization.events.trigger =
    function(eventSource, eventName, opt_eventDetails) {};



/**
 * @param {google.visualization.DataTable} dataTable
 * @constructor
 */
google.visualization.DataView = function(dataTable) {};


/**
 * @param {google.visualization.DataTable} dataTable
 * @param {string} view
 * @return {google.visualization.DataView}
 */
google.visualization.DataView.fromJSON = function(dataTable, view) {};


/**
 * @param {number} columnIndex
 * @return {string}
 */
google.visualization.DataView.prototype.getColumnId = function(columnIndex) {};


/**
 * @param {number} columnIndex
 * @return {string}
 */
google.visualization.DataView.prototype.getColumnLabel =
    function(columnIndex) {};


/**
 * @param {number} columnIndex
 * @return {string}
 */
google.visualization.DataView.prototype.getColumnPattern =
    function(columnIndex) {};


/**
 * @param {number} columnIndex
 * @return {!Object}
 */
google.visualization.DataView.prototype.getColumnProperties =
    function(columnIndex) {};


/**
 * @param {number} columnIndex
 * @param {string} property
 * @return {string}
 */
google.visualization.DataView.prototype.getColumnProperty =
    function(columnIndex, property) {};


/**
 * @param {number} columnIndex
 * @return {!Object}
 */
google.visualization.DataView.prototype.getColumnRange =
    function(columnIndex) {};


/**
 * @param {number} columnIndex
 * @return {string}
 */
google.visualization.DataView.prototype.getColumnRole =
    function(columnIndex) {};


/**
 * @param {number} columnIndex
 * @return {string}
 */
google.visualization.DataView.prototype.getColumnType =
    function(columnIndex) {};


/**
 * @param {number} columnIndex
 * @return {!Array.<Object>}
 */
google.visualization.DataView.prototype.getDistinctValues =
    function(columnIndex) {};


/**
 * @param {!Array.<Object>} columnFilters
 * @return {!Array.<number>}
 */
google.visualization.DataView.prototype.getFilteredRows =
    function(columnFilters) {};


/**
 * @param {number} rowIndex
 * @param {number} columnIndex
 * @return {string}
 */
google.visualization.DataView.prototype.getFormattedValue =
    function(rowIndex, columnIndex) {};


/**
 * @return {number}
 */
google.visualization.DataView.prototype.getNumberOfColumns = function() {};


/**
 * @return {number}
 */
google.visualization.DataView.prototype.getNumberOfRows = function() {};


/**
 * @param {number} rowIndex
 * @param {number} columnIndex
 * @return {!Object}
 */
google.visualization.DataView.prototype.getProperties =
    function(rowIndex, columnIndex) {};


/**
 * @param {number} rowIndex
 * @param {number} columnIndex
 * @param {string} property
 * @return {*}
 */
google.visualization.DataView.prototype.getProperty =
    function(rowIndex, columnIndex, property) {};


/**
 * @param {number} rowIndex
 * @return {!Object}
 */
google.visualization.DataView.prototype.getRowProperties =
    function(rowIndex) {};


/**
 * @param {number} rowIndex
 * @param {string} property
 * @return {*}
 */
google.visualization.DataView.prototype.getRowProperty =
    function(rowIndex, property) {};


/**
 * @param {number|!Object|Array.<number>|Array.<Object>} sortColumns
 * @return {!Array.<number>}
 */
google.visualization.DataView.prototype.getSortedRows =
    function(sortColumns) {};


/**
 * @return {Object}
 */
google.visualization.DataView.prototype.getTableProperties = function() {};


/**
 * @param {string} property
 * @return {*}
 */
google.visualization.DataView.prototype.getTableProperty =
    function(property) {};


/**
 * @param {number} rowIndex
 * @param {number} columnIndex
 * @return {*}
 */
google.visualization.DataView.prototype.getValue =
    function(rowIndex, columnIndex) {};


/**
 * @param {number} viewColumnIndex
 * @return {number}
 */
google.visualization.DataView.prototype.getTableColumnIndex =
    function(viewColumnIndex) {};


/**
 * @param {number} viewRowIndex
 * @return {number}
 */
google.visualization.DataView.prototype.getTableRowIndex =
    function(viewRowIndex) {};


/**
 *
 * @param {number} tableColumnIndex
 * @return {number}
 */
google.visualization.DataView.prototype.getViewColumnIndex =
    function(tableColumnIndex) {};


/**
 * @return {!Array.<number>}
 */
google.visualization.DataView.prototype.getViewColumns = function() {};


/**
 *
 * @param {number} tableRowIndex
 * @return {number}
 */
google.visualization.DataView.prototype.getViewRowIndex =
    function(tableRowIndex) {};


/**
 * @return {!Array.<number>}
 */
google.visualization.DataView.prototype.getViewRows = function() {};


/**
 * @param {Array.<number>} colIndices
 * @return {undefined}
 */
google.visualization.DataView.prototype.hideColumns = function(colIndices) {};


/**
 * @param {number|!Array.<number>} arg0
 * @param {number=} opt_arg1
 * @return {undefined}
 */
google.visualization.DataView.prototype.hideRows = function(arg0, opt_arg1) {};


/**
 * @param {!Array.<!Object|number>} colIndices
 * @return {undefined}
 */
google.visualization.DataView.prototype.setColumns = function(colIndices) {};


/**
 * @param {number|!Array.<number>} arg0
 * @param {number=} opt_arg1
 * @return {undefined}
 */
google.visualization.DataView.prototype.setRows = function(arg0, opt_arg1) {};


/**
 * @return {google.visualization.DataTable}
 */
google.visualization.DataView.prototype.toDataTable = function() {};


/**
 * @return {string} JSON representation.
 * @override
 */
google.visualization.DataView.prototype.toJSON = function() {};



/**
 * @param {Object=} opt_options
 * @constructor
 */
google.visualization.ArrowFormat = function(opt_options) {};


/**
 * @param {google.visualization.DataTable} dataTable
 * @param {number} columnIndex
 * @return {undefined}
 */
google.visualization.ArrowFormat.prototype.format =
    function(dataTable, columnIndex) {};



/**
 * @param {Object=} opt_options
 * @constructor
 */
google.visualization.BarFormat = function(opt_options) {};


/**
 * @param {google.visualization.DataTable} dataTable
 * @param {number} columnIndex
 * @return {undefined}
 */
google.visualization.BarFormat.prototype.format =
    function(dataTable, columnIndex) {};



/**
 * @constructor
 */
google.visualization.ColorFormat = function() {};


/**
 * @param {*} from
 * @param {*} to
 * @param {string} color
 * @param {string} bgcolor
 * @return {undefined}
 */
google.visualization.ColorFormat.prototype.addRange =
    function(from, to, color, bgcolor) {};

/**
 * @param {*} from
 * @param {*} to
 * @param {string} color
 * @param {string} fromBgColor
 * @param {string} toBgColor
 * @return {undefined}
 */

google.visualization.ColorFormat.prototype.addGradientRange =
    function(from, to, color, fromBgColor, toBgColor) {};


/**
 * @param {google.visualization.DataTable} dataTable
 * @param {number} columnIndex
 * @return {undefined}
 */
google.visualization.ColorFormat.prototype.format =
    function(dataTable, columnIndex) {};



/**
 * @param {Object=} opt_options
 * @constructor
 */
google.visualization.DateFormat = function(opt_options) {};


/**
 * @param {google.visualization.DataTable} dataTable
 * @param {number} columnIndex
 * @return {undefined}
 */
google.visualization.DateFormat.prototype.format =
    function(dataTable, columnIndex) {};


/**
 * @param {!Date} value
 * @return {*}
 */
google.visualization.DateFormat.prototype.formatValue = function(value) {};



/**
 * @param {Object=} opt_options
 * @constructor
 */
google.visualization.NumberFormat = function(opt_options) {};


/**
 * @param {google.visualization.DataTable} dataTable
 * @param {number} columnIndex
 * @return {undefined}
 */
google.visualization.NumberFormat.prototype.format =
    function(dataTable, columnIndex) {};


/**
 * @param {number} value
 * @return {*}
 */
google.visualization.NumberFormat.prototype.formatValue = function(value) {};



/**
 * @param {string} pattern
 * @constructor
 */
google.visualization.PatternFormat = function(pattern) {};


/**
 * @param {google.visualization.DataTable} dataTable
 * @param {!Array.<number>} srcColumnIndices
 * @param {number=} opt_dstColumnIndex
 * @return {undefined}
 */
google.visualization.PatternFormat.prototype.format =
    function(dataTable, srcColumnIndices, opt_dstColumnIndex) {};



/**
 * @constructor
 */
google.visualization.GadgetHelper = function() {};


/**
 * @param {!Object} prefs
 * @return  {google.visualization.Query}
 */
google.visualization.GadgetHelper.prototype.createQueryFromPrefs =
    function(prefs) {};


/**
 * @param {google.visualization.QueryResponse} response
 * @return {boolean}
 */
google.visualization.GadgetHelper.prototype.validateResponse =
    function(response) {};



/**
 * @interface
 */
google.visualization.IChart = function() {};


/**
 * @return {undefined}
 */
google.visualization.IChart.prototype.clearChart = function() {};


/**
 * @param {!Object} data
 * @param {Object=} opt_options
 * @return {undefined}
 */
google.visualization.IChart.prototype.draw = function(data, opt_options) {};


/**
 * @return {!Array.<Object>}
 */
google.visualization.IChart.prototype.getSelection = function() {};


/**
 * @param {(!Array.<Object>|Array|null)=} opt_selection
 * @return {undefined}
 */
google.visualization.IChart.prototype.setSelection = function(opt_selection) {};



/**
 * @param {Node} container
 * @constructor
 */
google.visualization.AnnotatedTimeLine = function(container) {};


/**
 * @param {!Object} data
 * @param {Object=} opt_options
 * @return {undefined}
 */
google.visualization.AnnotatedTimeLine.prototype.draw =
    function(data, opt_options) {};


/**
 * @return {!Array.<Object>}
 */
google.visualization.AnnotatedTimeLine.prototype.getSelection = function() {};


/**
 * @param {(!Array.<Object>|Array|null)=} opt_selection
 * @return {undefined}
 */
google.visualization.AnnotatedTimeLine.prototype.setSelection =
    function(opt_selection) {};


/**
 * @return {!Object}
 */
google.visualization.AnnotatedTimeLine.prototype.getVisibleChartRange =
    function() {};


/**
 * @param {Date} firstDate
 * @param {Date} lastDate
 * @return {undefined}
 */
google.visualization.AnnotatedTimeLine.prototype.setVisibleChartRange =
    function(firstDate, lastDate) {};


/**
 * @param {number|!Array.<number>} columnIndexes
 * @return {undefined}
 */
google.visualization.AnnotatedTimeLine.prototype.showDataColumns =
    function(columnIndexes) {};


/**
 * @param {number|!Array.<number>} columnIndexes
 * @return {undefined}
 */
google.visualization.AnnotatedTimeLine.prototype.hideDataColumns =
    function(columnIndexes) {};

/**
 * @param {Node} container
 * @constructor
 */
google.visualization.AnnotationChart = function(container) {};
/**
 * @return {!Array.<Object>}
 */
google.visualization.AnnotationChart.prototype.clearChart = function() {};

/**
 * @param {!Object} data
 * @param {Object=} opt_options
 * @return {undefined}
 */
google.visualization.AnnotationChart.prototype.draw =
    function(data, opt_options) {};

/**
 * @return {!Array.<Object>}
 */
google.visualization.AnnotationChart.prototype.getContainer = function() {};

/**
 * @return {!Array.<Object>}
 */
google.visualization.AnnotationChart.prototype.getSelection = function() {};

/**
 * @param {(!Array.<Object>|Array|null)=} opt_selection
 * @return {undefined}
 */
google.visualization.AnnotationChart.prototype.setSelection =
    function(opt_selection) {};


/**
 * @return {!Object}
 */
google.visualization.AnnotationChart.prototype.getVisibleChartRange =
    function() {};


/**
 * @param {Date} firstDate
 * @param {Date} lastDate
 * @return {undefined}
 */
google.visualization.AnnotationChart.prototype.setVisibleChartRange =
    function(firstDate, lastDate) {};


/**
 * @param {number|!Array.<number>} columnIndexes
 * @return {undefined}
 */
google.visualization.AnnotationChart.prototype.showDataColumns =
    function(columnIndexes) {};


/**
 * @param {number|!Array.<number>} columnIndexes
 * @return {undefined}
 */
google.visualization.AnnotationChart.prototype.hideDataColumns =
    function(columnIndexes) {};



/**
 * @param {Node} container
 * @constructor
 * @implements {google.visualization.IChart}
 */
google.visualization.AreaChart = function(container) {};


/**
 * @override
 */
google.visualization.AreaChart.prototype.clearChart = function() {};


/**
 * @override
 */
google.visualization.AreaChart.prototype.draw = function(data, opt_options) {};


/**
 * @override
 */
google.visualization.AreaChart.prototype.getSelection = function() {};


/**
 * @override
 */
google.visualization.AreaChart.prototype.setSelection =
    function(opt_selection) {};



/**
 * @param {Node} container
 * @constructor
 * @implements {google.visualization.IChart}
 */
google.visualization.BarChart = function(container) {};


/**
 * @override
 */
google.visualization.BarChart.prototype.clearChart = function() {};


/**
 * @override */
google.visualization.BarChart.prototype.draw = function(data, opt_options) {};


/**
 * @override */
google.visualization.BarChart.prototype.getSelection = function() {};


/**
 * @override */
google.visualization.BarChart.prototype.setSelection =
    function(opt_selection) {};



/**
 * @param {Node} container
 * @constructor
 * @implements {google.visualization.IChart}
 */
google.visualization.BubbleChart = function(container) {};


/**
 * @override
 */
google.visualization.BubbleChart.prototype.clearChart = function() {};


/**
 * @override
 */
google.visualization.BubbleChart.prototype.draw =
    function(data, opt_options) {};


/**
 * @override
 */
google.visualization.BubbleChart.prototype.getSelection = function() {};


/**
 * @override
 */
google.visualization.BubbleChart.prototype.setSelection =
    function(opt_selection) {};



/**
 * @param {Node} container
 * @constructor
 * @implements {google.visualization.IChart}
 */
google.visualization.CandlestickChart = function(container) {};


/**
 * @override
 */
google.visualization.CandlestickChart.prototype.clearChart = function() {};


/**
 * @override
 */
google.visualization.CandlestickChart.prototype.draw =
    function(data, opt_options) {};


/**
 * @override
 */
google.visualization.CandlestickChart.prototype.getSelection = function() {};


/**
 * @override
 */
google.visualization.CandlestickChart.prototype.setSelection =
    function(opt_selection) {};



/**
 * @param {Node} container
 * @constructor
 * @implements {google.visualization.IChart}
 */
google.visualization.ColumnChart = function(container) {};


/**
 * @override
 */
google.visualization.ColumnChart.prototype.clearChart = function() {};


/**
 * @override
 */
google.visualization.ColumnChart.prototype.draw =
    function(data, opt_options) {};


/**
 * @override
 */
google.visualization.ColumnChart.prototype.getSelection = function() {};


/**
 * @override
 */
google.visualization.ColumnChart.prototype.setSelection =
    function(opt_selection) {};



/**
 * @param {Node} container
 * @constructor
 * @implements {google.visualization.IChart}
 */
google.visualization.ComboChart = function(container) {};


/**
 * @override
 */
google.visualization.ComboChart.prototype.clearChart = function() {};


/**
 * @override
 */
google.visualization.ComboChart.prototype.draw = function(data, opt_options) {};


/**
 * @override
 */
google.visualization.ComboChart.prototype.getSelection = function() {};


/**
 * @override
 */
google.visualization.ComboChart.prototype.setSelection =
    function(opt_selection) {};



/**
 * @param {Node} container
 * @constructor
 */
google.visualization.Gauge = function(container) {};


/**
 * @return {undefined}
 */
google.visualization.Gauge.prototype.clearChart = function() {};


/**
 * @param {!Object} data
 * @param {Object=} opt_options
 * @return {undefined}
 */
google.visualization.Gauge.prototype.draw = function(data, opt_options) {};



/**
 * @param {Node} container
 * @constructor
 * @implements {google.visualization.IChart}
 */
google.visualization.GeoChart = function(container) {};


/**
 * @override
 */
google.visualization.GeoChart.prototype.clearChart = function() {};


/**
 * @override
 */
google.visualization.GeoChart.prototype.draw = function(data, opt_options) {};


/**
 * @override
 */
google.visualization.GeoChart.prototype.getSelection = function() {};


/**
 * @override
 */
google.visualization.GeoChart.prototype.setSelection =
    function(opt_selection) {};



/**
 * @param {Node} container
 * @constructor
 */
google.visualization.GeoMap = function(container) {};


/**
 * @param {!Object} data
 * @param {Object=} opt_options
 * @return {undefined}
 */
google.visualization.GeoMap.prototype.draw = function(data, opt_options) {};


/**
 * @return {!Array.<Object>}
 */
google.visualization.GeoMap.prototype.getSelection = function() {};


/**
 * @param {(!Array.<Object>|Array|null)=} opt_selection
 * @return {undefined}
 */
google.visualization.GeoMap.prototype.setSelection = function(opt_selection) {};



/**
 * @param {Node} container
 * @constructor
 */
google.visualization.Map = function(container) {};


/**
 * @param {!Object} data
 * @param {Object=} opt_options
 * @return {undefined}
 */
google.visualization.Map.prototype.draw = function(data, opt_options) {};


/**
 * @return {!Array.<Object>}
 */
google.visualization.Map.prototype.getSelection = function() {};


/**
 * @param {(!Array.<Object>|Array|null)=} opt_selection
 * @return {undefined}
 */
google.visualization.Map.prototype.setSelection = function(opt_selection) {};



/**
 * @param {Node} container
 * @constructor
 * @deprecated
 */
google.visualization.ImageAreaChart = function(container) {};


/**
 * @param {!Object} data
 * @param {Object=} opt_options
 * @return {undefined}
 */
google.visualization.ImageAreaChart.prototype.draw =
    function(data, opt_options) {};



/**
 * @param {Node} container
 * @constructor
 * @deprecated
 */
google.visualization.ImageBarChart = function(container) {};


/**
 * @param {!Object} data
 * @param {Object=} opt_options
 * @return {undefined}
 */
google.visualization.ImageBarChart.prototype.draw =
    function(data, opt_options) {};



/**
 * @param {Node} container
 * @constructor
 * @deprecated
 */
google.visualization.ImageCandlestickChart = function(container) {};


/**
 * @param {!Object} data
 * @param {Object=} opt_options
 * @return {undefined}
 */
google.visualization.ImageCandlestickChart.prototype.draw =
    function(data, opt_options) {};



/**
 * @param {Node} container
 * @constructor
 * @deprecated
 */
google.visualization.ImageChart = function(container) {};


/**
 * @param {!Object} data
 * @param {Object=} opt_options
 * @return {undefined}
 */
google.visualization.ImageChart.prototype.draw = function(data, opt_options) {};



/**
 * @param {Node} container
 * @constructor
 * @deprecated
 */
google.visualization.ImageLineChart = function(container) {};


/**
 * @param {!Object} data
 * @param {Object=} opt_options
 * @return {undefined}
 */
google.visualization.ImageLineChart.prototype.draw =
    function(data, opt_options) {};



/**
 * @param {Node} container
 * @constructor
 * @deprecated
 */
google.visualization.ImagePieChart = function(container) {};


/**
 * @param {!Object} data
 * @param {Object=} opt_options
 * @return {undefined}
 */
google.visualization.ImagePieChart.prototype.draw =
    function(data, opt_options) {};



/**
 * @param {Node} container
 * @constructor
 */
google.visualization.ImageSparkLine = function(container) {};


/**
 * @param {!Object} data
 * @param {Object=} opt_options
 * @return {undefined}
 */
google.visualization.ImageSparkLine.prototype.draw =
    function(data, opt_options) {};


/**
 * @return {!Array.<Object>}
 */
google.visualization.ImageSparkLine.prototype.getSelection = function() {};


/**
 * @param {(!Array.<Object>|Array|null)=} opt_selection
 * @return {undefined}
 */
google.visualization.ImageSparkLine.prototype.setSelection =
    function(opt_selection) {};



/**
 * @param {Node} container
 * @constructor
 */
google.visualization.IntensityMap = function(container) {};


/**
 * @param {!Object} data
 * @param {Object=} opt_options
 * @return {undefined}
 */
google.visualization.IntensityMap.prototype.draw =
    function(data, opt_options) {};


/**
 * @return {!Array.<Object>}
 */
google.visualization.IntensityMap.prototype.getSelection = function() {};


/**
 * @param {(!Array.<Object>|Array|null)=} opt_selection
 * @return {undefined}
 */
google.visualization.IntensityMap.prototype.setSelection =
    function(opt_selection) {};



/**
 * @param {Node} container
 * @constructor
 * @implements {google.visualization.IChart}
 */
google.visualization.LineChart = function(container) {};


/**
 * @override
 */
google.visualization.LineChart.prototype.clearChart = function() {};


/**
 * @override */
google.visualization.LineChart.prototype.draw = function(data, opt_options) {};


/**
 * @override
 */
google.visualization.LineChart.prototype.getSelection = function() {};


/**
 * @override
 */
google.visualization.LineChart.prototype.setSelection =
    function(opt_selection) {};



/**
 * @param {Node} container
 * @constructor
 */
google.visualization.MotionChart = function(container) {};


/**
 * @param {!Object} data
 * @param {Object=} opt_options
 * @return {undefined}
 */
google.visualization.MotionChart.prototype.draw =
    function(data, opt_options) {};


/**
 * @return {undefined}
 */
google.visualization.MotionChart.prototype.getState = function() {};



/**
 * @param {Node} container
 * @constructor
 */
google.visualization.OrgChart = function(container) {};


/**
 * @param {!Object} data
 * @param {Object=} opt_options
 * @return {undefined}
 */
google.visualization.OrgChart.prototype.draw = function(data, opt_options) {};


/**
 * @return {!Array.<Object>}
 */
google.visualization.OrgChart.prototype.getSelection = function() {};


/**
 * @param {(!Array.<Object>|Array|null)=} opt_selection
 * @return {undefined}
 */
google.visualization.OrgChart.prototype.setSelection =
    function(opt_selection) {};


/**
 * @return {!Array.<number>}
 */
google.visualization.OrgChart.prototype.getCollapsedNodes = function() {};


/**
 * @param {number} rowInd
 * @return {!Array.<number>}
 */
google.visualization.OrgChart.prototype.getChildrenIndexes =
    function(rowInd) {};


/**
 * @param {number} rowInd
 * @param {boolean} collapse
 * @return {undefined}
 */
google.visualization.OrgChart.prototype.collapse =
    function(rowInd, collapse) {};



/**
 * @param {Node} container
 * @constructor
 * @implements {google.visualization.IChart}
 */
google.visualization.PieChart = function(container) {};


/**
 * @override
 */
google.visualization.PieChart.prototype.clearChart = function() {};


/**
 * @override
 */
google.visualization.PieChart.prototype.draw = function(data, opt_options) {};


/**
 * @override
 */
google.visualization.PieChart.prototype.getSelection = function() {};


/**
 * @override
 */
google.visualization.PieChart.prototype.setSelection =
    function(opt_selection) {};



/**
 * @param {Node} container
 * @constructor
 * @implements {google.visualization.IChart}
 */
google.visualization.ScatterChart = function(container) {};


/**
 * @override
 */
google.visualization.ScatterChart.prototype.clearChart = function() {};


/**
 * @override
 */
google.visualization.ScatterChart.prototype.draw =
    function(data, opt_options) {};


/**
 * @override
 */
google.visualization.ScatterChart.prototype.getSelection = function() {};


/**
 * @override
 */
google.visualization.ScatterChart.prototype.setSelection =
    function(opt_selection) {};



/**
 * @param {Node} container
 * @constructor
 */
google.visualization.SparklineChart = function(container) {};
google.visualization.SparklineChart.prototype.draw =
    function(data, opt_options, opt_state) {};
google.visualization.SparklineChart.prototype.clearChart = function() {};
google.visualization.SparklineChart.prototype.getSelection = function() {};
google.visualization.SparklineChart.prototype.setSelection =
    function(selection) {};



/**
 * @param {Node} container
 * @constructor
 * @implements {google.visualization.IChart}
 */
google.visualization.SteppedAreaChart = function(container) {};


/**
 * @override
 */
google.visualization.SteppedAreaChart.prototype.clearChart = function() {};


/**
 * @override
 */
google.visualization.SteppedAreaChart.prototype.draw =
    function(data, opt_options) {};


/**
 * @override
 */
google.visualization.SteppedAreaChart.prototype.getSelection = function() {};


/**
 * @override
 */
google.visualization.SteppedAreaChart.prototype.setSelection =
    function(opt_selection) {};



/**
 * @param {Node} container
 * @constructor
 * @implements {google.visualization.IChart}
 */
google.visualization.Table = function(container) {};


/**
 * @override
 */
google.visualization.Table.prototype.clearChart = function() {};


/**
 * @override
 */
google.visualization.Table.prototype.draw = function(data, opt_options) {};


/**
 * @override
 */
google.visualization.Table.prototype.getSelection = function() {};


/**
 * @return {!Object}
 */
google.visualization.Table.prototype.getSortInfo = function() {};


/**
 * @override
 */
google.visualization.Table.prototype.setSelection = function(opt_selection) {};



/**
 * @param {Node} container
 * @constructor
 * @implements {google.visualization.IChart}
 */
google.visualization.Timeline = function(container) {};


/**
 * @override
 */
google.visualization.Timeline.prototype.clearChart = function() {};


/**
 * @override
 */
google.visualization.Timeline.prototype.draw = function(data, opt_options) {};


/**
 * @override
 */
google.visualization.Timeline.prototype.getSelection = function() {};


/**
 * @override
 */
google.visualization.Timeline.prototype.setSelection = function(opt_selection) {};



/**
 * @param {Node} container
 * @constructor
 * @implements {google.visualization.IChart}
 */
google.visualization.TreeMap = function(container) {};


/**
 * @override
 */
google.visualization.TreeMap.prototype.clearChart = function() {};


/**
 * @override */
google.visualization.TreeMap.prototype.draw = function(data, opt_options) {};


/**
 * @override
 */
google.visualization.TreeMap.prototype.getSelection = function() {};


/**
 * @return {undefined}
 */
google.visualization.TreeMap.prototype.goUpAndDraw = function() {};


/**
 * @override
 */
google.visualization.TreeMap.prototype.setSelection =
    function(opt_selection) {};

google.visualization.drawToolbar = function(container, components) {};



/**
 * @param {!Object|string=} opt_specification
 * @constructor
 */
google.visualization.ChartWrapper = function(opt_specification) {};


/**
 * @param {Node=} opt_container
 * @return {undefined}
 */
google.visualization.ChartWrapper.prototype.draw = function(opt_container) {};


/**
 * @return {string} JSON representation.
 * @override
 */
google.visualization.ChartWrapper.prototype.toJSON = function() {};


/**
 * @return {google.visualization.ChartWrapper}
 */
google.visualization.ChartWrapper.prototype.clone = function() {};


/**
 * @return {string}
 */
google.visualization.ChartWrapper.prototype.getDataSourceUrl = function() {};


/**
 * @return {google.visualization.DataTable}
 */
google.visualization.ChartWrapper.prototype.getDataTable = function() {};


/**
 * @return {*}
 */
google.visualization.ChartWrapper.prototype.getChart = function() {};


/**
 * @return {string}
 */
google.visualization.ChartWrapper.prototype.getChartName = function() {};


/**
 * @return {string}
 */
google.visualization.ChartWrapper.prototype.getChartType = function() {};


/**
 * @return {string}
 */
google.visualization.ChartWrapper.prototype.getContainerId = function() {};


/**
 * @return {string}
 */
google.visualization.ChartWrapper.prototype.getQuery = function() {};


/**
 * @return {number}
 */
google.visualization.ChartWrapper.prototype.getRefreshInterval = function() {};


/**
 * @param {string} key
 * @param {*=} opt_default
 */
google.visualization.ChartWrapper.prototype.getOption =
    function(key, opt_default) {};


/**
 * @return {!Object}
 */
google.visualization.ChartWrapper.prototype.getOptions = function() {};


/**
 * @return {google.visualization.DataView|!Array.<google.visualization.DataView>}
 */
google.visualization.ChartWrapper.prototype.getView = function() {};


/**
 * @param {string} dataSourceUrl
 * @return {undefined}
 */
google.visualization.ChartWrapper.prototype.setDataSourceUrl =
    function(dataSourceUrl) {};


/**
 * @param {null|string|google.visualization.DataTable} dataTable
 * @return {undefined}
 */
google.visualization.ChartWrapper.prototype.setDataTable =
    function(dataTable) {};


/**
 * @param {string} chartName
 * @return {undefined}
 */
google.visualization.ChartWrapper.prototype.setChartName =
    function(chartName) {};


/**
 * @param {string} chartType
 * @return {undefined}
 */
google.visualization.ChartWrapper.prototype.setChartType =
    function(chartType) {};


/**
 * @param {string} containerId
 * @return {undefined}
 */
google.visualization.ChartWrapper.prototype.setContainerId =
    function(containerId) {};


/**
 * @param {string} query
 * @return {undefined}
 */
google.visualization.ChartWrapper.prototype.setQuery = function(query) {};


/**
 * @param {number} refreshInterval
 * @return {undefined}
 */
google.visualization.ChartWrapper.prototype.setRefreshInterval =
    function(refreshInterval) {};


/**
 * @param {string|google.visualization.DataView|!Array.<google.visualization.DataView>} view
 * @return {undefined}
 */
google.visualization.ChartWrapper.prototype.setView = function(view) {};


/**
 * @param {string} key
 * @param {*} value
 */
google.visualization.ChartWrapper.prototype.setOption = function(key, value) {};


/**
 * @param {!Object} options
 */
google.visualization.ChartWrapper.prototype.setOptions = function(options) {};



/**
 * @param {!Object|string=} opt_specification
 * @constructor
 */
google.visualization.ControlWrapper = function(opt_specification) {};


/**
 * @param {Node=} opt_container
 * @return {undefined}
 */
google.visualization.ControlWrapper.prototype.draw = function(opt_container) {};


/**
 * @return {string} JSON representation.
 * @override
 */
google.visualization.ControlWrapper.prototype.toJSON = function() {};


/**
 * @return {google.visualization.ControlWrapper}
 */
google.visualization.ControlWrapper.prototype.clone = function() {};


/**
 * @return {string}
 */
google.visualization.ControlWrapper.prototype.getControlType = function() {};


/**
 * @return {string}
 */
google.visualization.ControlWrapper.prototype.getControlName = function() {};


/**
 * @return {*}
 */
google.visualization.ControlWrapper.prototype.getControl = function() {};


/**
 * @return {string}
 */
google.visualization.ControlWrapper.prototype.getContainerId = function() {};


/**
 * @param {string} key
 * @param {*=} opt_default
 */
google.visualization.ControlWrapper.prototype.getOption =
    function(key, opt_default) {};


/**
 * @return {!Object}
 */
google.visualization.ControlWrapper.prototype.getOptions = function() {};


/**
 * @return {!Object}
 */
google.visualization.ControlWrapper.prototype.getState = function() {};


/**
 * @param {string} controlType
 * @return {undefined}
 */
google.visualization.ControlWrapper.prototype.setControlType =
    function(controlType) {};


/**
 * @param {string} controlName
 * @return {undefined}
 */
google.visualization.ControlWrapper.prototype.setControlName =
    function(controlName) {};


/**
 * @param {string} containerId
 * @return {undefined}
 */
google.visualization.ControlWrapper.prototype.setContainerId =
    function(containerId) {};


/**
 * @param {string} key
 * @param {*} value
 */
google.visualization.ControlWrapper.prototype.setOption =
    function(key, value) {};


/**
 * @param {!Object} options
 */
google.visualization.ControlWrapper.prototype.setOptions = function(options) {};


/**
 * @param {!Object} state
 */
google.visualization.ControlWrapper.prototype.setState = function(state) {};



/**
 * @param {Object=} opt_config
 * @constructor
 */
google.visualization.ChartEditor = function(opt_config) {};


/**
 * @param {google.visualization.ChartWrapper} chartWrapper
 * @param {Object=} opt_options
 * @return {null}
 */
google.visualization.ChartEditor.prototype.openDialog =
    function(chartWrapper, opt_options) {};


/**
 * @return {google.visualization.ChartWrapper}
 */
google.visualization.ChartEditor.prototype.getChartWrapper = function() {};


/**
 * @param {google.visualization.ChartWrapper} chartWrapper
 * @return {null}
 */
google.visualization.ChartEditor.prototype.setChartWrapper =
    function(chartWrapper) {};


/**
 * @return {null}
 */
google.visualization.ChartEditor.prototype.closeDialog = function() {};



/**
 * @param {Node} container
 * @constructor
 */
google.visualization.Dashboard = function(container) {};


/**
 * @param {google.visualization.ControlWrapper|!Array.<google.visualization.ControlWrapper>} controls
 * @param {google.visualization.ChartWrapper|!Array.<google.visualization.ChartWrapper>} charts
 */
google.visualization.Dashboard.prototype.bind = function(controls, charts) {};


/**
 * @param {string|google.visualization.DataTable|google.visualization.DataView} dataTable
 */
google.visualization.Dashboard.prototype.draw = function(dataTable) {};



/** @constructor */
google.visualization.StringFilter = function(container) {};
google.visualization.StringFilter.prototype.draw =
    function(dataTable, opt_options, opt_state) {};
google.visualization.StringFilter.prototype.applyFilter = function() {};
google.visualization.StringFilter.prototype.getState = function() {};
google.visualization.StringFilter.prototype.resetControl = function() {};



/**
 * @param {Node} container
 * @constructor
 */
google.visualization.NumberRangeFilter = function(container) {};
google.visualization.NumberRangeFilter.prototype.draw =
    function(dataTable, opt_options, opt_state) {};
google.visualization.NumberRangeFilter.prototype.applyFilter = function() {};
google.visualization.NumberRangeFilter.prototype.getState = function() {};
google.visualization.NumberRangeFilter.prototype.resetControl = function() {};



/**
 * @param {Node} container
 * @constructor
 */
google.visualization.CategoryFilter = function(container) {};
google.visualization.CategoryFilter.prototype.draw =
    function(dataTable, opt_options, opt_state) {};
google.visualization.CategoryFilter.prototype.applyFilter = function() {};
google.visualization.CategoryFilter.prototype.getState = function() {};
google.visualization.CategoryFilter.prototype.resetControl = function() {};



/**
 * @param {Node} container
 * @constructor
 */
google.visualization.ChartRangeFilter = function(container) {};
google.visualization.ChartRangeFilter.prototype.draw =
    function(dataTable, opt_options, opt_state) {};
google.visualization.ChartRangeFilter.prototype.applyFilter = function() {};
google.visualization.ChartRangeFilter.prototype.getState = function() {};
google.visualization.ChartRangeFilter.prototype.resetControl = function() {};
