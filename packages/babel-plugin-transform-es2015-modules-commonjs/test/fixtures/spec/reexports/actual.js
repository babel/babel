import * as namespace from './somewhere';

export { stuff as renamed } from './elsewhere'

import { stuff } from './somewhereElse';

export { namespace };

export { stuff as default };

export * from './i-dont-know';

export { default as why } from './because';
