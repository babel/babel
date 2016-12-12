'use strict';

// definitely not this
import _Object$defineProperty from 'babel-runtime/core-js/object/define-property';
import _Object$keys from 'babel-runtime/core-js/object/keys';
import _specNamespaceGet from 'babel-runtime/helpers/specNamespaceGet';
Object.defineProperty(exports, "__esModule", {
  value: true
});
import _specImportCheck from 'babel-runtime/helpers/specImportCheck';
import _specRequireInterop from 'babel-runtime/helpers/specRequireInterop';

const _baz = _specRequireInterop(require('baz'));

_Object$keys(_baz).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;

  _Object$defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _baz[key];
    }
  });
});

const _foo = _specRequireInterop(require('foo'));

_specImportCheck(_foo, ['foo']);

const _bar = _specRequireInterop(require('bar'));

_specNamespaceGet(_bar, true && 'bar');