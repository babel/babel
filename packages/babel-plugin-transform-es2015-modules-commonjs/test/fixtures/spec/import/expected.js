'use strict';

const _elsewhere = babelHelpers.specRequireInterop(require('./elsewhere'));

const _outside = babelHelpers.specRequireInterop(require('./outside'));

const _anywhere = babelHelpers.specRequireInterop(require('./anywhere'));

require('./empty');

require('./imperative');

const _iDontKnow = babelHelpers.specRequireInterop(require('./i-dont-know'));

const _naturally = babelHelpers.specRequireInterop(require('./naturally'));

(0, _outside.default)(_outside.obj.key);

(0, _anywhere.default)(_elsewhere);

_iDontKnow.default[_iDontKnow.what](_naturally.default, _naturally.naturally);

(0, _iDontKnow.who)(_naturally);