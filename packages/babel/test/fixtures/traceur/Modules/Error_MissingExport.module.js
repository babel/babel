// Error: :5:12: 'y' is not exported by 'test/feature/Modules/resources/x.js'
// Error: :5:15: 'z' is not exported by 'test/feature/Modules/resources/x.js'
// Error: :6:9: 'w' is not exported by 'test/feature/Modules/resources/x.js'

import {x, y, z} from './resources/x.js';
import {w} from './resources/x.js';

