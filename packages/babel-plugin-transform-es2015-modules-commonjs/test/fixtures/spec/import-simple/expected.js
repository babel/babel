'use strict';

require('a');

require('b');

const _c = babelHelpers.specRequireInterop(require('c'));

babelHelpers.specImportCheck(_c, ['name']);

const _d = babelHelpers.specRequireInterop(require('d'));

babelHelpers.specImportCheck(_d, ['default']);

const _e = babelHelpers.specRequireInterop(require('e'));

babelHelpers.specImportCheck(_e, ['name']);


_c.name;
_d.default;
_e.name;