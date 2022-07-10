import { x } from './x.js';

if (true) {
	const x = 1;
	console.log(x);
}

new (class extends x {})();
