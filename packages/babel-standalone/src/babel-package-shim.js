/**
 * A shim that replaces Babel's require('package.json') statement.
 * Babel requires the entire package.json file just to get the version number.
 */

/* global BABEL_VERSION */

export const version = BABEL_VERSION;
