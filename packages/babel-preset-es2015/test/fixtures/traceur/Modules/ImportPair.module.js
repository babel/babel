import def, * as m from './resources/default-and-named.js';
import def2, {x} from './resources/default-and-named.js';
import def3, {x as y} from './resources/default-and-named.js';

expect(def).toBe('default');
expect(def2).toBe('default');
expect(def3).toBe('default');

expect(x).toBe('x');
expect(y).toBe('x');
