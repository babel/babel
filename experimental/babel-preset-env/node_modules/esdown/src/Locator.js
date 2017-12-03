import * as Path from 'path';
import * as FS from 'fs';
import { isPackageSpecifier } from './Specifier.js';

let globalModulePaths = [];
let isWindows = false;

(() => {

  if (typeof process === 'undefined')
    return;

  isWindows = process.platform === 'win32';

  let home = isWindows ? process.env.USERPROFILE : process.env.HOME;
  let paths = [Path.resolve(process.execPath, '..', '..', 'lib', 'node')];

  if (home) {
    paths.unshift(Path.resolve(home, '.node_libraries'));
    paths.unshift(Path.resolve(home, '.node_modules'));
  }

  let nodePath = process.env.NODE_PATH;

  if (nodePath)
    paths = nodePath.split(Path.delimiter).filter(Boolean).concat(paths);

  globalModulePaths = paths;

})();

function isFile(path) {
  let stat;
  try { stat = FS.statSync(path); } catch (x) {}
  return stat && stat.isFile();
}

function isDirectory(path) {
  let stat;
  try { stat = FS.statSync(path); } catch (x) {}
  return stat && stat.isDirectory();
}

function getFolderEntryPoint(dir, legacy) {
  const join = Path.join;

  // Look for an ES entry point first (default.js)
  if (!legacy) {
    let path = join(dir, 'default.js');
    if (isFile(path))
      return { path, legacy: false };
  }

  // == Legacy package lookup rules ==

  let tryPaths = [];

  // Look for a package.json manifest file
  let main = (readPackageManifest(dir) || {}).main;

  // If we have a manifest with a 'main' path...
  if (typeof main === 'string') {
    if (!main.endsWith('/'))
      tryPaths.push(join(dir, main), join(dir, main + '.js'));

    tryPaths.push(join(dir, main, 'index.js'));
  }

  // Try 'index'
  tryPaths.push(join(dir, 'index.js'));

  for (let i = 0; i < tryPaths.length; ++i) {
    let path = tryPaths[i];
    if (isFile(path))
      return { path, legacy: true };
  }

  return null;
}

function readPackageManifest(path) {
  path = Path.join(path, 'package.json');

  if (!isFile(path))
    return null;

  let text = FS.readFileSync(path, 'utf8');

  try {
    return JSON.parse(text);
  } catch (e) {
    e.message = 'Error parsing ' + path + ': ' + e.message;
    throw e;
  }
}

export function locateModule(path, base, legacy) {
  if (isPackageSpecifier(path))
    return locatePackage(path, base, legacy);

  // If the module specifier is neither a package path nor a 'file' path,
  // then just return the specifier itself.  The locator does not have
  // enough information to locate it with any greater precision.
  if (!path.startsWith('.') && !path.startsWith('/'))
    throw new Error('Invalid module path');

  path = Path.resolve(base, path);

  if (isDirectory(path)) {
    // If the path is a directory, then attempt to find the entry point
    // using folder lookup rules
    let pathInfo = getFolderEntryPoint(path, legacy);

    if (pathInfo)
      return pathInfo;
  }

  if (isFile(path))
    return { path, legacy };

  // If we are performing legacy lookup and the path is not found, then
  // attempt to find the file by appending a '.js' or '.json' file extension.
  if (legacy && !path.endsWith('/')) {
    if (isFile(path + '.js'))
      return { path: path + '.js', legacy };

    if (isFile(path + '.json'))
      return { path: path + '.json', legacy };
  }

  throw new Error(`Module ${ path } could not be found`);
}

function locatePackage(name, base, legacy) {
  let pathInfo;

  getPackagePaths(base).some(path => {
    path = Path.resolve(path, name);
    pathInfo = getFolderEntryPoint(path, legacy);

    if (!pathInfo && legacy && isFile(path + '.js'))
      pathInfo = { path: path + '.js', legacy };

    return Boolean(pathInfo);
  });

  if (!pathInfo)
    throw new Error(`Package ${ name } could not be found`);

  return pathInfo;
}

function getPackagePaths(dir) {
  return nodeModulePaths(dir).concat(globalModulePaths);
}

function nodeModulePaths(path) {
  path = Path.resolve(path);

  let parts = path.split(isWindows ? /[\/\\]/ : /\//);
  let paths = [];

  // Build a list of 'node_modules' folder paths, starting from
  // the current directory and then under each parent directory
  for (let i = parts.length - 1; i >= 0; --i) {
    // If this folder is already a node_modules folder, then
    // skip it (we want to avoid 'node_modules/node_modules')
    if (parts[i] === 'node_modules')
      continue;

    paths.push(parts.slice(0, i + 1).join(Path.sep) + Path.sep + 'node_modules');
  }

  return paths;
}
