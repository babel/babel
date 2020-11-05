Array.map;
function* makeIterator() {
	yield 1;
	yield 2;
}
for (const itItem of makeIterator()) {
	console.log(itItem);
}
