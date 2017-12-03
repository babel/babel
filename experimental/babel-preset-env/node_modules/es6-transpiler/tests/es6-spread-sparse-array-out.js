var S_ITER$0 = typeof Symbol!=='undefined'&&Symbol&&Symbol.iterator||'@@iterator';var S_MARK$0 = typeof Symbol!=='undefined'&&Symbol&&Symbol["__setObjectSetter__"];function ITER$0(v,f){if(v){if(Array.isArray(v))return f?v.slice():v;var i,r;if(S_MARK$0)S_MARK$0(v);if(typeof v==='object'&&typeof (f=v[S_ITER$0])==='function'){i=f.call(v);r=[];}else if((v+'')==='[object Generator]'){i=v;r=[];};if(S_MARK$0)S_MARK$0(void 0);if(r) {while((f=i['next']()),f['done']!==true)r.push(f['value']);return r;}}throw new Error(v+' is not iterable')};{
	var b = [1,2,3];
	var a = (new Array(2)).concat([].concat(ITER$0(b)))
	console.log(a.join("|") === [ , , 1, 2, 3].join("|"));
}

{
	var b$0 = [1,2,3];
	var a$0 = (new Array(1)).concat([].concat(ITER$0(b$0)))
	console.log(a$0.join("|") === [ , 1, 2, 3].join("|"));
}

{
	var b$1 = [1,2,3];
	var a$1 = [ ].concat(ITER$0(b$1), (new Array(1)), ITER$0(b$1))
	console.log(a$1.join("|") === [1, 2, 3, , 1, 2, 3].join("|"));
}

{
	var b$2 = [1,2,3];
	var a$2 = [ , ,1].concat(ITER$0(b$2))
	console.log(a$2.join("|") === [ , , 1, 1, 2, 3].join("|"));
}

{
	var b$3 = [1,2,3];
	var a$3 = [ , ,1].concat((new Array(2)), ITER$0(b$3))
	console.log(a$3.join("|") === [ , , 1, , , 1, 2, 3].join("|"));
}

{
	var b$4 = [1,2,3];
	var a$4 = [ , ,1].concat((new Array(2)), ITER$0(b$4), (new Array(2)))
	console.log(a$4.join("|") === [ , , 1, , , 1, 2, 3, , ,].join("|"));
}

{
	var b$5 = [1,2,3];
	var a$5 = [ , ,1].concat((new Array(2)), ITER$0(b$5, true), [4], (new Array(2)), [b$5])
	console.log(a$5.join("|") === [ , , 1, , , 1, 2, 3, 4, , , [1, 2, 3]].join("|"));
}

{
	var b$6 = [1,2,3];
	var a$6 = [ , ,1].concat((new Array(2)), ITER$0(b$6), [4], (new Array(2)), [7])
	console.log(a$6.join("|") === [ , , 1, , , 1, 2, 3, 4, , , 7].join("|"));
}

{
	var b$7 = [1,2,3];
	var a$7 = [ , ,1].concat((new Array(2)), ITER$0(b$7), [4], (new Array(2)), [7, 8, 9])
	console.log(a$7.join("|") === [ , , 1, , , 1, 2, 3, 4, , , 7, 8, 9].join("|"));
}
