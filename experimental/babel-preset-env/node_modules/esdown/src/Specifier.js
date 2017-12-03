const NODE_SCHEME = /^node:/i;
const URI_SCHEME = /^[a-z]+:/i;
const NOT_PACKAGE = /^(?:\.{0,2}\/|[a-z]+:)/i;

const NODE_INTERNAL_MODULE = new RegExp('^(?:' + [
  'assert', 'buffer', 'child_process', 'cluster', 'console', 'constants', 'crypto',
  'dgram', 'dns', 'domain', 'events', 'freelist', 'fs', 'http', 'https', 'module',
  'net', 'os', 'path', 'process', 'punycode', 'querystring', 'readline', 'repl',
  'smalloc', 'stream', 'string_decoder', 'sys', 'timers', 'tls', 'tty', 'url', 'util',
  'v8', 'vm', 'zlib',
].join('|') + ')$');

export function isLegacyScheme(spec) {
  return NODE_SCHEME.test(spec);
}

export function removeScheme(uri) {
  return uri.replace(URI_SCHEME, '');
}

export function hasScheme(uri) {
  return URI_SCHEME.test(uri);
}

export function addLegacyScheme(uri) {
  return 'node:' + uri;
}

export function isRelativePath(spec) {
  return spec.startsWith('.') || spec.startsWith('/');
}

export function isPackageSpecifier(spec) {
  return !NOT_PACKAGE.test(spec);
}

export function isNodeModule(specifier) {
  return NODE_INTERNAL_MODULE.test(specifier);
}
