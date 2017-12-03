var Module = require('module')
  , dirname = require('path').dirname
  , join = require('path').join
  , resolve = require('path').resolve
  , callerId = require('caller-id')
  , originalLoader = Module._load
  , mockExports   = {}
  , pendingMockExports = {}
  ;

Module._load = function(request, parent) {
  var fullFilePath = getFullPath(request, parent.filename);

  if (pendingMockExports.hasOwnProperty(fullFilePath)){
    mockExports[fullFilePath] = typeof pendingMockExports[fullFilePath] === 'string' ?
        require(pendingMockExports[fullFilePath]) :
        pendingMockExports[fullFilePath];

    delete pendingMockExports[fullFilePath];
  }

  return mockExports.hasOwnProperty(fullFilePath)
    ? mockExports[fullFilePath]
    : originalLoader.apply(this, arguments);
};

function startMocking(path, mockExport) {
  var calledFrom = callerId.getData().filePath;

  if (typeof mockExport === 'string') {
    mockExport = getFullPath(mockExport, calledFrom);
  }

  pendingMockExports[getFullPath(path, calledFrom)] = mockExport;
}

function stopMocking(path) {
  var calledFrom = callerId.getData().filePath;
  var fullPath = getFullPath(path, calledFrom);
  delete pendingMockExports[fullPath];
  delete mockExports[fullPath];
}

function stopMockingAll() {
  mockExports = {};
  pendingMockExports = {};
}

function reRequire(path) {
  var module = getFullPath(path, callerId.getData().filePath);
  delete require.cache[require.resolve(module)];
  return require(module);
}

function isInNodePath(resolvedPath) {
  if (!resolvedPath) return false;

  return Module.globalPaths
    .map(function(nodePath) {
      return resolve(process.cwd(), nodePath) + '/';
    })
    .some(function(fullNodePath) {
      return resolvedPath.indexOf(fullNodePath) === 0;
    });
}

function getFullPath(path, calledFrom) {
  var resolvedPath;
  try {
    resolvedPath = require.resolve(path);
  } catch(e) { }

  var isLocalModule = /^\.{1,2}[/\\]?/.test(path);
  var isInPath = isInNodePath(resolvedPath);
  var isExternal = !isLocalModule && /[/\\]node_modules[/\\]/.test(resolvedPath);
  var isSystemModule = resolvedPath === path;

  if (isExternal || isSystemModule || isInPath) {
    return resolvedPath;
  }

  if (!isLocalModule) {
    return path;
  }

  var localModuleName = join(dirname(calledFrom), path);
  try {
    return Module._resolveFilename(localModuleName);
  } catch (e) {
    if (isModuleNotFoundError(e)) { return localModuleName; }
    else { throw e; }
  }
}

function isModuleNotFoundError(e){
  return e.code && e.code === 'MODULE_NOT_FOUND'
}

module.exports = startMocking;
module.exports.stop = stopMocking;
module.exports.stopAll = stopMockingAll;
module.exports.reRequire = reRequire;
