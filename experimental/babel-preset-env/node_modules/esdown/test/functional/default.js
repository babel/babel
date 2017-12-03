// POST-BUILD

import { runTests } from 'moon-unit';
import { tests as arrowTests } from './arrow-functions.js';
import { tests as computed } from './computed.js';
import { tests as destructuringTests } from './destructuring.js';
import { tests as templateTests } from './templates.js';
import { tests as restTests } from './rest-spread.js';
import { tests as defaultTests } from './default-params.js';
import { tests as moduleTests } from './import-export.js';
import { tests as objectSpread } from './object-spread.js';

export function main() {

    return runTests({

        'Arrow Functions': arrowTests,
        'Computed Properties': computed,
        'Object Spread': objectSpread,
        'Destructuring': destructuringTests,
        'Templates': templateTests,
        'Rest and Spread': restTests,
        'Default Params': defaultTests,
        'Import/Export': moduleTests,

    });
}
