import def from './import-export-default.js';
import { isHoisted } from './import-export-default.js';
import { a, b, c, C, F } from './import-export-from.js';
import { legacyRelative } from 'node:./import-export-legacy.js';
import legacyPackage from 'pkg';

export const tests = {

  'imports and exports' (test) {
      test
      ._('exported variables')
      .equals(a, 'export-a')
      .equals(b, 'export-b')
      .equals(c, 'export-c')

      ._('functions')
      .equals(F(), 'export-F')

      ._('classes')
      .equals(C.x(), 'export-C')
      ;
  },

  'legacy import' (test) {
      test
      ._('relative import')
      .equals(legacyRelative, 'legacy-relative')
      ._('package import with default')
      .equals(legacyPackage(), 'legacy-package')
      ;
  },

  'default export' (test) {
      test
      ._('default function')
      .equals(def(), 'default-export')
      ._('default declarations are hoisted')
      .equals(isHoisted, true)
      ;
  }

};
