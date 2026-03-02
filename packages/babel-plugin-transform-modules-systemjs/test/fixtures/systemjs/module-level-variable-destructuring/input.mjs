import { x } from './x.js';

if (true) {
	const { x } = { x: 1 };
	console.log(x);
}

new (class extends x {})();
