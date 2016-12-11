'use strict';

require('a');

require('b');

const _c = babelHelpers.specRequireInterop(require('c'));

const _d = babelHelpers.specRequireInterop(require('d'));

babelHelpers.specImportCheck(_d, 'd', ['default']);

const _e = babelHelpers.specRequireInterop(require('e'));

babelHelpers.specImportCheck(_e, 'e', ['name']);
babelHelpers.specImportCheck(_c, 'c', ['name']);


_c.name;
_d.default;
_e.name;