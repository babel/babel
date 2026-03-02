const v = 42;
const v2 = Infinity;
const v3 = NaN;

{
	let Infinity = 1;
	let NaN = 2;

	enum StateEnum {
		okay = 0,
		neg = -Infinity,
		pos = Infinity,
		nan = NaN,
		negReal = -1 / 0,
		posReal = 1 / 0,
		nanReal = 0 / 0,
		ext = v,
		ext2 = v2,
		ext3 = v3,
	}
}
