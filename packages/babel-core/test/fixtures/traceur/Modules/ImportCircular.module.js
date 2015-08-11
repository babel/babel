// Error: Unsupported circular dependency between test/feature/Modules/ImportCircular.module.js and test/feature/Modules/resources/clockwise.js

import {clockwise} from './resources/clockwise.js';
export function counterclockwise() {
  return clockwise();
}
