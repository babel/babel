import def, * as m from './resources/default-and-named.js';
import def2, {x} from './resources/default-and-named.js';
import def3, {x as y} from './resources/default-and-named.js';

assert.equal(def, 'default');
assert.equal(def2, 'default');
assert.equal(def3, 'default');

assert.equal(x, 'x');
assert.equal(y, 'x');
