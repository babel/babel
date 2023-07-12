const v = 42;
const v2 = Infinity;
var Infinity = 1; // Known inconsistencies
enum StateEnum {
	okay = 0,
	neg = -Infinity,
	pos = Infinity,
	nan = NaN,
	ext = v,
  ext2 = v2,
}
