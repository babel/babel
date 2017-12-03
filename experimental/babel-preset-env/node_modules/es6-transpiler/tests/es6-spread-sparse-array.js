{
	let b = [1,2,3];
	let a = [ , , ...b]
	console.log(a.join("|") === [ , , 1, 2, 3].join("|"));
}

{
	let b = [1,2,3];
	let a = [ , ...b]
	console.log(a.join("|") === [ , 1, 2, 3].join("|"));
}

{
	let b = [1,2,3];
	let a = [...b , , ...b]
	console.log(a.join("|") === [1, 2, 3, , 1, 2, 3].join("|"));
}

{
	let b = [1,2,3];
	let a = [ , ,1, ...b]
	console.log(a.join("|") === [ , , 1, 1, 2, 3].join("|"));
}

{
	let b = [1,2,3];
	let a = [ , ,1, , , ...b]
	console.log(a.join("|") === [ , , 1, , , 1, 2, 3].join("|"));
}

{
	let b = [1,2,3];
	let a = [ , ,1, , , ...b, , , ]
	console.log(a.join("|") === [ , , 1, , , 1, 2, 3, , ,].join("|"));
}

{
	let b = [1,2,3];
	let a = [ , ,1, , , ...b, 4, , , b]
	console.log(a.join("|") === [ , , 1, , , 1, 2, 3, 4, , , [1, 2, 3]].join("|"));
}

{
	let b = [1,2,3];
	let a = [ , ,1, , , ...b, 4, , , 7]
	console.log(a.join("|") === [ , , 1, , , 1, 2, 3, 4, , , 7].join("|"));
}

{
	let b = [1,2,3];
	let a = [ , ,1, , , ...b, 4, , , 7, 8, 9]
	console.log(a.join("|") === [ , , 1, , , 1, 2, 3, 4, , , 7, 8, 9].join("|"));
}
