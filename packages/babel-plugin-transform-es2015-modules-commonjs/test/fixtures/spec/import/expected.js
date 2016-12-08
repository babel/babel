'use strict';

var _elsewhere = babelHelpers.specRequireInterop(require('./elsewhere'));

var _outside = babelHelpers.specRequireInterop(require('./outside'));

var _anywhere = babelHelpers.specRequireInterop(require('./anywhere'));

require('./empty');

require('./imperative');

var _iDontKnow = babelHelpers.specRequireInterop(require('./i-dont-know'));

var _naturally = babelHelpers.specRequireInterop(require('./naturally'));

(0, _outside.default)(_outside.obj.key);

(0, _anywhere.default)(_elsewhere);

_iDontKnow.default[_iDontKnow.what](_naturally.default, _naturally.naturally);

(0, _iDontKnow.who)(_naturally);