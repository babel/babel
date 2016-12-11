'use strict';

const _a = babelHelpers.specRequireInterop(require('a'));

babelHelpers.specImportCheck(_a, ['a']);


const name = 'a';

const ident = _a.a;
const literal = _a['a'];
const computed = babelHelpers.specNamespaceGet(_a, name);
const recursive = babelHelpers.specNamespaceGet(_a, babelHelpers.specNamespaceGet(_a, name));
const symbol = babelHelpers.specNamespaceGet(_a, Symbol.toStringTag);