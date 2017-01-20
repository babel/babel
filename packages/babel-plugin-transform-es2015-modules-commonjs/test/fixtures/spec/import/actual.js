import * as namespace from './elsewhere';

import { default as outside, obj } from './outside';

outside(obj.key);

import something from './anywhere';

something(namespace);

import {} from './empty';

import './imperative';

import who, { what } from './i-dont-know';

import why, * as because from './naturally';

who[what](why, because.naturally);

import { who as naturally } from './i-dont-know';

naturally(because);
